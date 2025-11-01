'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Book, Target, TestTube, Atom } from 'lucide-react';

const initialSyllabus = [
  {
    id: 'physics',
    name: 'Physics',
    icon: <Atom className="h-5 w-5" />,
    chapters: [
      { id: 'p1', name: 'Units and Measurements', topics: 5, completed: 2 },
      { id: 'p2', name: 'Motion in a Straight Line', topics: 8, completed: 3 },
      { id: 'p3', name: 'Thermodynamics', topics: 12, completed: 0 },
    ],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: <TestTube className="h-5 w-5" />,
    chapters: [
      { id: 'c1', name: 'Some Basic Concepts of Chemistry', topics: 6, completed: 6 },
      { id: 'c2', name: 'Structure of Atom', topics: 9, completed: 4 },
      { id: 'c3', name: 'Chemical Bonding', topics: 11, completed: 5 },
    ],
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: <Target className="h-5 w-5" />,
    chapters: [
      { id: 'b1', name: 'The Living World', topics: 4, completed: 4 },
      { id: 'b2', name: 'Cell: The Unit of Life', topics: 10, completed: 10 },
      { id: 'b3', name: 'Human Reproduction', topics: 7, completed: 2 },
    ],
  },
];

type Chapter = {
  id: string;
  name: string;
  topics: number;
  completed: number;
};

type Subject = {
  id: string;
  name: string;
  icon: React.ReactNode;
  chapters: Chapter[];
};

const SyllabusTracker = () => {
  const [syllabus, setSyllabus] = useState(initialSyllabus);

  const handleTopicToggle = (subjectId: string, chapterId: string, isChecked: boolean) => {
    setSyllabus((prevSyllabus) =>
      prevSyllabus.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            chapters: subject.chapters.map((chapter) => {
              if (chapter.id === chapterId) {
                const newCompleted = isChecked
                  ? Math.min(chapter.topics, chapter.completed + 1)
                  : Math.max(0, chapter.completed - 1);
                return { ...chapter, completed: newCompleted };
              }
              return chapter;
            }),
          };
        }
        return subject;
      })
    );
  };
  
  const getSubjectProgress = (chapters: Chapter[]) => {
    const totalTopics = chapters.reduce((sum, chap) => sum + chap.topics, 0);
    const completedTopics = chapters.reduce((sum, chap) => sum + chap.completed, 0);
    return totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
  };

  return (
    <Card className="w-full max-w-4xl bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-6 w-6" />
          Syllabus Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {syllabus.map((subject) => (
            <AccordionItem value={subject.id} key={subject.id}>
              <AccordionTrigger>
                <div className="flex w-full items-center gap-4">
                  {subject.icon}
                  <span className="flex-1 text-left font-semibold">{subject.name}</span>
                  <div className="flex items-center gap-2 w-48">
                    <Progress value={getSubjectProgress(subject.chapters)} className="h-2" />
                    <span className="text-xs text-muted-foreground w-12 text-right">
                      {Math.round(getSubjectProgress(subject.chapters))}%
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-4">
                <div className="space-y-4">
                  {subject.chapters.map((chapter) => (
                    <div key={chapter.id}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{chapter.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {chapter.completed} / {chapter.topics} topics
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                         <Progress value={(chapter.completed / chapter.topics) * 100} className="h-1.5" />
                      </div>
                      <div className="mt-3 grid grid-cols-5 gap-2">
                        {Array.from({ length: chapter.topics }).map((_, index) => (
                           <div key={index} className="flex items-center gap-2">
                             <Checkbox
                               id={`${chapter.id}-topic-${index}`}
                               checked={index < chapter.completed}
                               onCheckedChange={(checked) =>
                                handleTopicToggle(subject.id, chapter.id, !!checked)
                               }
                             />
                             <label htmlFor={`${chapter.id}-topic-${index}`} className="text-sm text-muted-foreground">
                               Topic {index + 1}
                             </label>
                           </div>
                         ))}
                      </div>
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
};

export default SyllabusTracker;
