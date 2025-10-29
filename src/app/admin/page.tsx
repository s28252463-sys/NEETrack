'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/auth/use-user';
import { Loader } from '@/components/Loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { syllabus, Subject, Topic } from '@/lib/syllabus';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';
import { BookOpen, Shield } from 'lucide-react';
import Link from 'next/link';

const ADMIN_UID = "6sZhacZybZRnrTh95QdQWYS7RVB2"; // Important: Replace with your actual Firebase User ID

interface StudyMaterial {
  lectureUrl?: string;
  notesUrl?: string;
  questionBankUrl?: string;
  shortNoteUrl?: string;
  annotatedNcertUrl?: string;
}

const TopicEditor = ({ subject, topic }: { subject: Subject | {id: string}, topic: Topic }) => {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [materials, setMaterials] = useState<StudyMaterial>({});
  const [isLoading, setIsLoading] = useState(true);

  const docRef = doc(firestore, `studyMaterials/${subject.id}/topics/${topic.id}`);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMaterials(docSnap.data() as StudyMaterial);
        }
      } catch (e: any) {
        if (e.code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
                path: docRef.path,
                operation: 'get',
            } satisfies SecurityRuleContext);
            errorEmitter.emit('permission-error', permissionError);
        } else {
             toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch materials.' });
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchMaterials();
  }, [docRef, toast]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setDoc(docRef, materials, { merge: true })
        .then(() => {
            toast({ title: 'Success', description: `Materials for ${topic.name} saved.` });
        })
        .catch((serverError) => {
            if (serverError.code === 'permission-denied') {
                const permissionError = new FirestorePermissionError({
                    path: docRef.path,
                    operation: 'update',
                    requestResourceData: materials,
                } satisfies SecurityRuleContext);
                errorEmitter.emit('permission-error', permissionError);
            } else {
                toast({ variant: 'destructive', title: 'Error', description: 'Failed to save materials.' });
            }
        });
  };

  const handleInputChange = (field: keyof StudyMaterial, value: string) => {
    setMaterials(prev => ({ ...prev, [field]: value }));
  };
  
  if (isLoading) {
      return <div className="p-4">Loading editor for {topic.name}...</div>
  }

  return (
    <form onSubmit={handleSave} className="space-y-4 p-4 border-t">
      <h4 className="font-semibold">{topic.name}</h4>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`lecture-${topic.id}`}>Lecture (YouTube URL)</Label>
          <Input id={`lecture-${topic.id}`} value={materials.lectureUrl || ''} onChange={e => handleInputChange('lectureUrl', e.target.value)} />
        </div>
        <div>
          <Label htmlFor={`notes-${topic.id}`}>Class Notes (Drive URL)</Label>
          <Input id={`notes-${topic.id}`} value={materials.notesUrl || ''} onChange={e => handleInputChange('notesUrl', e.target.value)} />
        </div>
        <div>
          <Label htmlFor={`qbank-${topic.id}`}>Question Bank (Drive URL)</Label>
          <Input id={`qbank-${topic.id}`} value={materials.questionBankUrl || ''} onChange={e => handleInputChange('questionBankUrl', e.target.value)} />
        </div>
        <div>
          <Label htmlFor={`shortnote-${topic.id}`}>Short Note (Drive URL)</Label>
          <Input id={`shortnote-${topic.id}`} value={materials.shortNoteUrl || ''} onChange={e => handleInputChange('shortNoteUrl', e.target.value)} />
        </div>
         <div>
          <Label htmlFor={`annotated-ncert-${topic.id}`}>Annotated NCERT (Drive URL)</Label>
          <Input id={`annotated-ncert-${topic.id}`} value={materials.annotatedNcertUrl || ''} onChange={e => handleInputChange('annotatedNcertUrl', e.target.value)} />
        </div>
      </div>
      <Button type="submit" size="sm">Save {topic.name}</Button>
    </form>
  );
};


const SubjectEditor = ({ subject }: { subject: Subject }) => {
  return (
    <AccordionItem value={subject.id}>
      <AccordionTrigger>
        <div className="flex items-center gap-2">
            <subject.icon className="h-5 w-5 text-primary" />
            <span className="font-headline text-lg">{subject.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {subject.topics?.map(topic => (
          <TopicEditor key={topic.id} subject={subject} topic={topic} />
        ))}
         {subject.subjects?.map(subSubject => (
             <div key={subSubject.id} className="ml-4 mt-4 p-2 border rounded-md">
                <h3 className="font-headline text-md flex items-center gap-2 p-2"><subSubject.icon className="h-4 w-4" />{subSubject.name}</h3>
                 {subSubject.topics?.map(topic => (
                    <TopicEditor key={topic.id} subject={subSubject} topic={topic} />
                 ))}
             </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default function AdminPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (user.uid !== ADMIN_UID) {
        router.push('/');
      }
    }
  }, [user, loading, router]);

  if (loading || !user || user.uid !== ADMIN_UID) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold font-headline">Admin Panel</h1>
        </div>
        <Button asChild variant="outline">
          <Link href="/">
            <BookOpen className="mr-2 h-4 w-4" />
            Back to App
          </Link>
        </Button>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Manage Study Materials</CardTitle>
          <CardDescription>
            Add and update YouTube and Google Drive links for each topic in the syllabus.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {syllabus.map(subject => (
              <SubjectEditor key={subject.id} subject={subject} />
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
