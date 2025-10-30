'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { syllabus, Subject, Topic } from '@/lib/syllabus';
import { useFirestore } from '@/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck, Link, Youtube, FileText, FileQuestion, StickyNote } from 'lucide-react';
import { Loader } from '@/components/Loader';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

const ADMIN_EMAIL = "s28252463@gmail.com";

interface StudyMaterial {
  lectureUrl?: string;
  notesUrl?: string;
  questionBankUrl?: string;
  shortNoteUrl?: string;
  annotatedNcertUrl?: string;
}

const AdminTopicEditor = ({ subject, topic }: { subject: Subject | {id: string}, topic: Topic }) => {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [materials, setMaterials] = useState<StudyMaterial>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      if (!firestore) {
          setIsLoading(false);
          return;
      }
      setIsLoading(true);
      const docRef = doc(firestore, `studyMaterials/${subject.id}/topics/${topic.id}`);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMaterials(docSnap.data() as StudyMaterial);
        }
      } catch (error: any) {
        if (error.code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
                path: docRef.path,
                operation: 'get',
            } satisfies SecurityRuleContext);
            errorEmitter.emit('permission-error', permissionError);
        } else {
            console.error("Error fetching materials:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not load study materials.'
            });
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchMaterials();
  }, [firestore, subject.id, topic.id, toast]);

  const handleSave = async () => {
    if (!firestore) return;
    setIsSaving(true);
    const docRef = doc(firestore, `studyMaterials/${subject.id}/topics/${topic.id}`);
    setDoc(docRef, materials, { merge: true })
      .then(() => {
        toast({
          title: "Success!",
          description: `Materials for ${topic.name} have been saved.`,
        });
      })
      .catch((serverError) => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: materials,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const handleInputChange = (field: keyof StudyMaterial, value: string) => {
    setMaterials(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return <div className="p-4 text-sm text-muted-foreground">Loading editor...</div>;
  }
  
  const fields: { key: keyof StudyMaterial; label: string; icon: React.ElementType }[] = [
    { key: 'lectureUrl', label: 'YouTube Lecture URL', icon: Youtube },
    { key: 'notesUrl', label: 'Class Notes URL', icon: FileText },
    { key: 'questionBankUrl', label: 'Question Bank URL', icon: FileQuestion },
    { key: 'shortNoteUrl', label: 'Short Notes URL', icon: StickyNote },
    { key: 'annotatedNcertUrl', label: 'Annotated NCERT URL', icon: Link },
  ];

  return (
    <div className="p-4 space-y-4">
      {fields.map(({key, label, icon: Icon}) => (
        <div key={key} className="space-y-2">
            <Label htmlFor={`${topic.id}-${key}`} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {label}
            </Label>
            <Input
            id={`${topic.id}-${key}`}
            value={materials[key] || ''}
            onChange={(e) => handleInputChange(key, e.target.value)}
            placeholder="Enter Google Drive or YouTube link..."
            />
        </div>
      ))}
      <Button onClick={handleSave} disabled={isSaving}>
        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Save Materials
      </Button>
    </div>
  );
};


const AdminSubjectAccordion = ({ subject }: { subject: Subject }) => {
    return (
        <AccordionItem value={subject.id}>
            <AccordionTrigger>
                <div className="flex items-center gap-3">
                    <subject.icon className="h-6 w-6 text-primary" />
                    <span className="font-headline text-xl">{subject.name}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <Accordion type="multiple" className="w-full pl-4 border-l-2 ml-4">
                    {subject.topics?.map(topic => (
                        <AccordionItem key={topic.id} value={topic.id}>
                            <AccordionTrigger>{topic.name}</AccordionTrigger>
                            <AccordionContent>
                                <AdminTopicEditor subject={subject} topic={topic} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                    {subject.subjects?.map(subSubject => (
                         <AccordionItem key={subSubject.id} value={subSubject.id}>
                            <AccordionTrigger>
                               <div className="flex items-center gap-2">
                                    <subSubject.icon className="h-5 w-5 text-muted-foreground" />
                                    <span className="font-semibold">{subSubject.name}</span>
                                </div>
                            </AccordionTrigger>
                             <AccordionContent>
                                <Accordion type="multiple" className="w-full pl-4 border-l-2 ml-4">
                                     {subSubject.topics?.map(topic => (
                                        <AccordionItem key={topic.id} value={topic.id}>
                                            <AccordionTrigger>{topic.name}</AccordionTrigger>
                                            <AccordionContent>
                                                <AdminTopicEditor subject={subSubject} topic={topic} />
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </AccordionContent>
        </AccordionItem>
    );
};


export default function AdminPage() {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (loading) {
            return; // Wait until user status is determined.
        }
        if (!user || user.email !== ADMIN_EMAIL) {
            router.push('/'); // If not admin, redirect to home.
        }
    }, [user, loading, router]);

    // Show loader while we are determining user status
    if (loading || !user || user.email !== ADMIN_EMAIL) {
        return <Loader />;
    }
    
    // If all checks pass, render the admin panel
    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="shadow-lg">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    <CardTitle className="font-headline text-2xl">Admin Panel</CardTitle>
                </div>
                <CardDescription>
                    Manage study materials for all topics.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {syllabus.map(subject => (
                        <AdminSubjectAccordion key={subject.id} subject={subject} />
                    ))}
                </Accordion>
            </CardContent>
            </Card>
        </div>
    );
}
