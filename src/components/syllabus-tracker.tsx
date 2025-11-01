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
      { id: 'p1', name: 'Physics and Measurement', completed: false },
      { id: 'p2_1', name: 'Motion in 1D', completed: false },
      { id: 'p2_2', name: 'Motion in 2D', completed: false },
      { id: 'p3', name: 'Laws of Motion', completed: false },
      { id: 'p4', name: 'Work, Energy, and Power', completed: false },
      { id: 'p5', name: 'Rotational Motion', completed: false },
      { id: 'p6', name: 'Gravitation', completed: false },
      { id: 'p7_1', name: 'Properties of Solids', completed: false },
      { id: 'p7_2', name: 'Properties of Liquids', completed: false },
      { id: 'p8', name: 'Thermodynamics', completed: false },
      { id: 'p9', name: 'Kinetic Theory of Gases', completed: false },
      { id: 'p10_1', name: 'Oscillations', completed: false },
      { id: 'p10_2', name: 'Waves', completed: false },
      { id: 'p11', name: 'Electrostatics', completed: false },
      { id: 'p12', name: 'Current Electricity', completed: false },
      { id: 'p13', name: 'Magnetic Effects of Current and Magnetism', completed: false },
      { id: 'p14', name: 'Electromagnetic Induction and Alternating Currents', completed: false },
      { id: 'p15', name: 'Electromagnetic Waves', completed: false },
      { id: 'p16', name: 'Optics', completed: false },
      { id: 'p17', name: 'Dual Nature of Matter and Radiation', completed: false },
      { id: 'p18', name: 'Atoms and Nuclei', completed: false },
      { id: 'p19', name: 'Electronic Devices', completed: false },
      { id: 'p20', name: 'Experimental Skills', completed: false },
    ],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: <TestTube className="h-5 w-5" />,
    chapters: [
        { id: 'c1', name: 'Some Basic Concepts in Chemistry', completed: false },
        { id: 'c2', name: 'Atomic Structure', completed: false },
        { id: 'c3', name: 'Chemical Bonding and Molecular Structure', completed: false },
        { id: 'c4', name: 'Chemical Thermodynamics', completed: false },
        { id: 'c5', name: 'Solutions', completed: false },
        { id: 'c6', name: 'Equilibrium', completed: false },
        { id: 'c7', name: 'Redox Reactions and Electrochemistry', completed: false },
        { id: 'c8', name: 'Chemical Kinetics', completed: false },
        { id: 'c9', name: 'Classification of Elements and Periodicity in Properties', completed: false },
        { id: 'c10', name: 'p-Block Elements', completed: false },
        { id: 'c11', name: 'd- and f-Block Elements', completed: false },
        { id: 'c12', name: 'Coordination Compounds', completed: false },
        { id: 'c13', name: 'Purification and Characterisation of Organic Compounds', completed: false },
        { id: 'c14', name: 'Some Basic Principles of Organic Chemistry', completed: false },
        { id: 'c15', name: 'Hydrocarbons', completed: false },
        { id: 'c16', name: 'Organic Compounds Containing Halogens', completed: false },
        { id: 'c17', name: 'Organic Compounds Containing Oxygen', completed: false },
        { id: 'c18', name: 'Organic Compounds Containing Nitrogen', completed: false },
        { id: 'c19', name: 'Biomolecules', completed: false },
        { id: 'c20', name: 'Principles Related to Practical Chemistry', completed: false },
    ],
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: <Target className="h-5 w-5" />,
    chapters: [
      { id: 'b1', name: 'Diversity in Living World', completed: false },
      { id: 'b2', name: 'Structural Organisation in Animals and Plants', completed: false },
      { id: 'b3', name: 'Cell Structure and Function', completed: false },
      { id: 'b4', name: 'Plant Physiology', completed: false },
      { id: 'b5', name: 'Human Physiology', completed: false },
      { id: 'b6', name: 'Reproduction', completed: false },
      { id: 'b7', name: 'Genetics and Evolution', completed: false },
      { id: 'b8', name: 'Biology and Human Welfare', completed: false },
      { id: 'b9', name: 'Biotechnology and Its Applications', completed: false },
      { id: 'b10', name: 'Ecology and Environment', completed: false },
    ],
  },
];

type Chapter = {
  id: string;
  name: string;
  completed: boolean;
};

type Subject = {
  id: string;
  name: string;
  icon: React.ReactNode;
  chapters: Chapter[];
};

const SyllabusTracker = () => {
  const [syllabus, setSyllabus] = useState(initialSyllabus);

  const handleChapterToggle = (subjectId: string, chapterId: string, isChecked: boolean) => {
    setSyllabus((prevSyllabus) =>
      prevSyllabus.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            chapters: subject.chapters.map((chapter) => {
              if (chapter.id === chapterId) {
                return { ...chapter, completed: isChecked };
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
    if (chapters.length === 0) return 0;
    const completedChapters = chapters.filter(chap => chap.completed).length;
    return (completedChapters / chapters.length) * 100;
  };

  const getOverallProgress = () => {
    const allChapters = syllabus.flatMap(s => s.chapters);
    if (allChapters.length === 0) return 0;
    const completedChapters = allChapters.filter(c => c.completed).length;
    return (completedChapters / allChapters.length) * 100;
  }

  const overallProgress = getOverallProgress();

  return (
    <Card className="w-full max-w-4xl bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-6 w-6" />
          Syllabus Tracker
        </CardTitle>
         <div className="pt-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-muted-foreground">Overall Progress</span>
            <span className="text-sm font-semibold">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
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
                <div className="space-y-3">
                  {subject.chapters.map((chapter) => (
                    <div key={chapter.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5 transition-colors">
                      <Checkbox
                        id={`${subject.id}-${chapter.id}`}
                        checked={chapter.completed}
                        onCheckedChange={(checked) =>
                          handleChapterToggle(subject.id, chapter.id, !!checked)
                        }
                      />
                      <label
                        htmlFor={`${subject.id}-${chapter.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {chapter.name}
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
};

export default SyllabusTracker;
