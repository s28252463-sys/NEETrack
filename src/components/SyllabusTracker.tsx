'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { syllabus, allTopics, type Subject, type Topic } from '@/lib/syllabus';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

export function SyllabusTracker() {
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedCompleted = localStorage.getItem('completedTopics');
    if (storedCompleted) {
      setCompletedTopics(new Set(JSON.parse(storedCompleted)));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('completedTopics', JSON.stringify(Array.from(completedTopics)));
    }
  }, [completedTopics, isClient]);

  const handleTopicToggle = useCallback((topicId: string) => {
    setCompletedTopics(prev => {
      const newCompleted = new Set(prev);
      if (newCompleted.has(topicId)) {
        newCompleted.delete(topicId);
      } else {
        newCompleted.add(topicId);
      }
      return newCompleted;
    });
  }, []);

  const overallProgress = useMemo(() => {
    if (allTopics.length === 0) return 0;
    return (completedTopics.size / allTopics.length) * 100;
  }, [completedTopics.size]);

  const progressBySubject = useMemo(() => {
    return syllabus.reduce((acc, subject) => {
      const completedInSubject = subject.topics.filter(t => completedTopics.has(t.id)).length;
      acc[subject.name] = (completedInSubject / subject.topics.length) * 100;
      return acc;
    }, {} as Record<string, number>);
  }, [completedTopics]);

  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle>Syllabus Tracker</CardTitle>
        <CardDescription>Track your progress through the NEET syllabus.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-white">Overall Progress</span>
            <span className="text-sm font-medium text-white">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} />
        </div>
        <Accordion type="single" collapsible className="w-full">
          {syllabus.map(subject => (
            <AccordionItem value={subject.name} key={subject.name}>
              <AccordionTrigger>
                <div className="flex flex-col items-start w-full">
                  <span>{subject.name}</span>
                  <div className='flex w-full items-center gap-2'>
                    <Progress value={progressBySubject[subject.name] || 0} className="w-[90%] mt-1 h-2" />
                    <span className="text-xs text-muted-foreground">{Math.round(progressBySubject[subject.name] || 0)}%</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {subject.topics.map(topic => (
                    <div key={topic.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={topic.id}
                        checked={completedTopics.has(topic.id)}
                        onCheckedChange={() => handleTopicToggle(topic.id)}
                      />
                      <label
                        htmlFor={topic.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {topic.name}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

    