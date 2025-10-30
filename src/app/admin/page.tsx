'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { syllabus, Subject, Topic } from '@/lib/syllabus';
import { useFirestore, useUser } from '@/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck, Link, Youtube, FileText, FileQuestion, StickyNote } from 'lucide-react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/Loader';

const ADMIN_UID = "E6cRkM6s6PbhW8T3b0L4VpmoeB32";

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

  const docRef = doc(firestore, `studyMaterials/${subject.id}/topics/${topic.id}`);

  useEffect(() => {
    const fetchMaterials = async () => {
      setIsLoading(true);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMaterials(docSnap.data() as StudyMaterial);
        }
      } catch (error) {
        console.error("Error fetching materials:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMaterials();
  }, [docRef]);

  const handleSave = async () => {
    setIsSaving(true);
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
        if (!loading && (!user || user.uid !== ADMIN_UID)) {
            router.push('/');
        }
    }, [user, loading, router]);

    if (loading || !user || user.uid !== ADMIN_UID) {
        return <Loader />;
    }

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
