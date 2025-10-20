'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { syllabus, allTopics, type Subject, type Topic } from '@/lib/syllabus';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { useUser } from '@/firebase/auth/use-user';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

interface SyllabusTrackerProps {
  onProgressChange: (progress: number) => void;
}

const SubjectAccordion = ({ 
  subject, 
  completedTopics,
  handleToggleTopic
} : { 
  subject: Subject, 
  completedTopics: Set<string>,
  handleToggleTopic: (topicId: string, isCompleted: boolean) => void
}) => {
  const allSubTopics = useMemo(() => subject.topics || subject.subjects?.flatMap(sub => sub.topics || []) || [], [subject]);
  const completedSubTopics = useMemo(() => allSubTopics.filter(t => completedTopics.has(t.id)).length, [allSubTopics, completedTopics]);
  const progress = allSubTopics.length > 0 ? (completedSubTopics / allSubTopics.length) * 100 : 0;
  
  return (
    <AccordionItem value={subject.id} key={subject.id}>
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-4 w-full">
          <subject.icon className="h-6 w-6 text-primary" />
          <div className="flex-grow text-left">
            <p className="font-bold text-lg font-headline">{subject.name}</p>
            <p className="text-sm text-muted-foreground">{completedSubTopics} / {allSubTopics.length} topics completed</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pl-4 border-l-2 ml-7">
        {subject.topics && subject.topics.map((topic) => (
          <div key={topic.id} className="flex items-center space-x-3 py-2">
            <Checkbox
              id={topic.id}
              checked={completedTopics.has(topic.id)}
              onCheckedChange={(checked) => handleToggleTopic(topic.id, !!checked)}
            />
            <Label htmlFor={topic.id} className="text-base cursor-pointer">
              {topic.name}
            </Label>
          </div>
        ))}
        {subject.subjects && (
          <Accordion type="multiple" className="w-full">
            {subject.subjects.map(sub => (
              <SubjectAccordion 
                key={sub.id} 
                subject={sub} 
                completedTopics={completedTopics} 
                handleToggleTopic={handleToggleTopic}
              />
            ))}
          </Accordion>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};


export function SyllabusTracker({ onProgressChange }: SyllabusTrackerProps) {
  const totalTopics = useMemo(() => allTopics.length, []);
  const { user } = useUser();
  const firestore = useFirestore();
  
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      if (user) {
        const userProgressRef = doc(firestore, `users/${user.uid}/progress/syllabus`);
        const docSnap = await getDoc(userProgressRef);
        if (docSnap.exists()) {
          setCompletedTopics(new Set(docSnap.data().completedTopics || []));
        }
      } else {
        const saved = localStorage.getItem('completedTopics');
        if (saved) {
          setCompletedTopics(new Set(JSON.parse(saved)));
        }
      }
      setIsLoading(false);
    }
    loadProgress();
  }, [user, firestore]);
  
  const progress = useMemo(() => (completedTopics.size / totalTopics) * 100, [completedTopics.size, totalTopics]);

  useEffect(() => {
    if (!isLoading) {
      onProgressChange(progress);
      if (user) {
        const userProgressRef = doc(firestore, `users/${user.uid}/progress/syllabus`);
        setDoc(userProgressRef, { completedTopics: Array.from(completedTopics) }, { merge: true });
      } else {
        localStorage.setItem('completedTopics', JSON.stringify(Array.from(completedTopics)));
      }
    }
  }, [completedTopics, progress, onProgressChange, user, firestore, isLoading]);

  const handleToggleTopic = useCallback((topicId: string, isCompleted: boolean) => {
    setCompletedTopics(prev => {
      const newSet = new Set(prev);
      if (isCompleted) {
        newSet.add(topicId);
      } else {
        newSet.delete(topicId);
      }
      return newSet;
    });
  }, []);
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Syllabus Tracker</CardTitle>
        <CardDescription>Mark topics as you complete them to track your progress.</CardDescription>
        <div className="pt-4 space-y-2">
            <div className="flex justify-between text-sm font-medium">
                <span>Overall Progress</span>
                <span className="text-accent-foreground font-bold">{Math.round(progress)}%</span>
            </div>
          <Progress value={progress} className="h-3 [&>div]:bg-accent" />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading your progress...</p>
        ) : (
          <Accordion type="multiple" className="w-full">
            {syllabus.map(subject => (
              <SubjectAccordion 
                key={subject.id} 
                subject={subject} 
                completedTopics={completedTopics} 
                handleToggleTopic={handleToggleTopic}
              />
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
