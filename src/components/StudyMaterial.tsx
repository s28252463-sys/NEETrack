'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/firebase/auth/use-user';
import { useFirestore, useStorage } from '@/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, Upload, File as FileIcon, Download, Trash2, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import type { SecurityRuleContext } from '@/firebase/errors';

interface Material {
  id: string;
  fileName: string;
  description: string;
  subject: string;
  fileURL: string;
  storagePath: string;
  uploaderId: string;
  uploaderName: string;
  createdAt: any;
}

export function StudyMaterial() {
  const { user } = useUser();
  const firestore = useFirestore();
  const storage = useStorage();
  const { toast } = useToast();

  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!firestore) return;
    setIsLoading(true);
    const materialsQuery = query(collection(firestore, 'studyMaterials'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(materialsQuery, (snapshot) => {
      const fetchedMaterials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Material));
      setMaterials(fetchedMaterials);
      setIsLoading(false);
    }, (error) => {
      console.error(error);
      const permissionError = new FirestorePermissionError({
          path: 'studyMaterials',
          operation: 'list',
      } satisfies SecurityRuleContext);
      errorEmitter.emit('permission-error', permissionError);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [firestore]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !description || !subject || !user || !storage || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please select a file, provide a description, and choose a subject.',
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const storagePath = `study-materials/${user.uid}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setIsUploading(false);
        toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description: 'Could not upload the file. Please try again.',
        });
        console.error('Upload error:', error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const materialData = {
            fileName: file.name,
            description,
            subject,
            fileURL: downloadURL,
            storagePath: storagePath,
            uploaderId: user.uid,
            uploaderName: user.displayName || 'Anonymous',
            createdAt: serverTimestamp(),
          };

          const materialsColRef = collection(firestore, 'studyMaterials');
          addDoc(materialsColRef, materialData).catch(serverError => {
              const permissionError = new FirestorePermissionError({
                  path: `${materialsColRef.path}/<new_document>`,
                  operation: 'create',
                  requestResourceData: materialData,
              } satisfies SecurityRuleContext);
              errorEmitter.emit('permission-error', permissionError);
          });
          
          toast({
            title: 'Upload Successful',
            description: `${file.name} has been shared.`,
          });

          // Reset form
          setFile(null);
          setDescription('');
          setSubject('');

        } catch (error) {
            console.error('Error post-upload:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to save material details. Please try again.',
            });
        } finally {
            setIsUploading(false);
        }
      }
    );
  };
  
  const handleDelete = async (material: Material) => {
      if (!firestore || !storage || !user || user.uid !== material.uploaderId) return;

      const fileRef = ref(storage, material.storagePath);
      const docRef = doc(firestore, 'studyMaterials', material.id);

      try {
        await deleteObject(fileRef);
        await deleteDoc(docRef);
        toast({
            title: 'Deleted',
            description: `${material.fileName} has been removed.`,
        });
      } catch (error: any) {
         if (error.code === 'storage/unauthorized') {
            const permissionError = new FirestorePermissionError({
                path: material.storagePath,
                operation: 'delete',
            } satisfies SecurityRuleContext);
            errorEmitter.emit('permission-error', permissionError);
         } else if (error.code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
                path: docRef.path,
                operation: 'delete',
            } satisfies SecurityRuleContext);
            errorEmitter.emit('permission-error', permissionError);
         } else {
            console.error("Error deleting material:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not delete the material.',
            });
         }
      }
  }


  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline text-2xl">Study Materials</CardTitle>
          </div>
          <CardDescription>
            Share and access study resources with the community.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleUpload} className="space-y-4 p-4 border rounded-lg bg-card">
              <h3 className="font-semibold font-headline">Share a New Resource</h3>
               <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                            id="description"
                            placeholder="e.g., NCERT Class 12 Physics Part 1"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isUploading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Select onValueChange={setSubject} value={subject} disabled={isUploading}>
                            <SelectTrigger id="subject">
                                <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Physics">Physics</SelectItem>
                                <SelectItem value="Chemistry">Chemistry</SelectItem>
                                <SelectItem value="Botany">Botany</SelectItem>
                                <SelectItem value="Zoology">Zoology</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
              <div className="space-y-2">
                  <Label htmlFor="file-upload">File</Label>
                  <Input 
                      id="file-upload"
                      type="file" 
                      onChange={handleFileChange}
                      disabled={isUploading}
                  />
              </div>
              {isUploading && (
                <div className="space-y-2">
                    <Label>Upload Progress</Label>
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-sm text-muted-foreground">{Math.round(uploadProgress)}% complete</p>
                </div>
              )}
              <Button type="submit" disabled={isUploading}>
                {isUploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</> : <><Upload className="mr-2 h-4 w-4" /> Share Material</>}
              </Button>
            </form>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
          <CardHeader>
              <CardTitle className="font-headline text-xl">Available Resources</CardTitle>
          </CardHeader>
          <CardContent>
              {isLoading ? (
                  <p>Loading materials...</p>
              ) : materials.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No study materials have been shared yet.</p>
              ) : (
                  <ul className="space-y-4">
                      {materials.map(material => (
                          <li key={material.id} className="p-4 border rounded-lg flex flex-col sm:flex-row gap-4 justify-between items-start">
                              <div className="flex items-start gap-4 flex-1">
                                  <FileIcon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                  <div className="flex-1">
                                      <p className="font-semibold">{material.description}</p>
                                      <p className="text-sm text-muted-foreground">
                                          {material.fileName} - <span className="font-medium">{material.subject}</span>
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        Uploaded by {material.uploaderName} on {new Date(material.createdAt?.toDate()).toLocaleDateString()}
                                      </p>
                                  </div>
                              </div>
                              <div className="flex items-center gap-2 self-end sm:self-center">
                                  <Button asChild variant="outline" size="sm">
                                      <a href={material.fileURL} target="_blank" rel="noopener noreferrer">
                                          <Download className="h-4 w-4 mr-2" />
                                          Download
                                      </a>
                                  </Button>
                                  {user && user.uid === material.uploaderId && (
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(material)} aria-label="Delete material">
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                  )}
                              </div>
                          </li>
                      ))}
                  </ul>
              )}
          </CardContent>
      </Card>

    </div>
  );
}