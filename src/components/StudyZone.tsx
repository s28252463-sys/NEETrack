'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { syllabus, Subject, Topic } from '@/lib/syllabus';
import { BookOpen, Youtube, FileText, FileQuestion, StickyNote, Link as LinkIcon, Loader2 } from 'lucide-react';
import { YouTubePlayer } from './YouTubePlayer';
import Link from 'next/link';
import { Button } from './ui/button';
import { useUser } from '@/firebase';
import { useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface StudyMaterial {
  lectureUrl?: string;
  notesUrl?: string;
  questionBankUrl?: string;
  shortNoteUrl?: string;
  annotatedNcertUrl?: string;
}


const TopicMaterials = ({ topic }: { topic: Topic }) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { user } = useUser();
  const firestore = useFirestore();
  const [materials, setMaterials] = useState<StudyMaterial | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      if (!user || !firestore) {
        setIsLoading(false);
        return;
      };
      
      const docRef = doc(firestore, `studyMaterials/${topic.id.split('_')[0]}/topics/${topic.id}`);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMaterials(docSnap.data() as StudyMaterial);
        }
      } catch (error) {
        console.error("Failed to fetch study materials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaterials();
  }, [user, firestore, topic.id]);


  const extractVideoId = (url: string) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === 'youtu.be') {
        return urlObj.pathname.slice(1);
      }
      return urlObj.searchParams.get('v');
    } catch {
      return null;
    }
  };
  
  const videoId = materials?.lectureUrl ? extractVideoId(materials.lectureUrl) : null;

  if (isLoading) {
    return <div className="p-4 text-sm text-center text-muted-foreground flex items-center justify-center gap-2"><Loader2 className="animate-spin h-4 w-4" /> Loading materials...</div>
  }

  if (!materials || Object.values(materials).every(v => !v)) {
      return <div className="p-4 text-sm text-center text-muted-foreground">No materials available for this topic yet. Check back soon!</div>
  }

  return (
    <div className="py-4 px-2 space-y-4">
      {videoId && (
         <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2"><Youtube className="text-red-500" /> Lecture Video</h4>
             {activeVideo === topic.id ? (
                <YouTubePlayer videoId={videoId} />
             ) : (
                <Button onClick={() => setActiveVideo(topic.id)}>Load Lecture Video</Button>
             )}
         </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.notesUrl && (
            <Link href={materials.notesUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-muted hover:bg-muted/80 rounded-md transition-colors">
                <FileText className="text-primary h-5 w-5"/>
                <span className="font-medium">Class Notes</span>
            </Link>
        )}
        {materials.questionBankUrl && (
            <Link href={materials.questionBankUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-muted hover:bg-muted/80 rounded-md transition-colors">
                <FileQuestion className="text-primary h-5 w-5"/>
                <span className="font-medium">Question Bank</span>
            </Link>
        )}
         {materials.shortNoteUrl && (
            <Link href={materials.shortNoteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-muted hover:bg-muted/80 rounded-md transition-colors">
                <StickyNote className="text-primary h-5 w-5"/>
                <span className="font-medium">Short Notes</span>
            </Link>
        )}
        {materials.annotatedNcertUrl && (
            <Link href={materials.annotatedNcertUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-muted hover:bg-muted/80 rounded-md transition-colors">
                <LinkIcon className="text-primary h-5 w-5"/>
                <span className="font-medium">Annotated NCERT</span>
            </Link>
        )}
      </div>
    </div>
  );
};


const SubjectZone = ({ subject }: { subject: Subject }) => {
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
                                <TopicMaterials topic={topic} />
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
                                                <TopicMaterials topic={topic} />
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

export function StudyZone() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">Study Zone</CardTitle>
        </div>
        <CardDescription>
          Access lectures, notes, and question banks for every topic.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {syllabus.map(subject => (
            <SubjectZone key={subject.id} subject={subject} />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
