'use client';

import { useState, useEffect } from 'react';
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
      { id: 'p13_1', name: 'Magnetic Effects of Current', completed: false },
      { id: 'p13_2', name: 'Magnetism', completed: false },
      { id: 'p14_1', name: 'Electromagnetic Induction', completed: false },
      { id: 'p14_2', name: 'Alternating Current', completed: false },
      { id: 'p15', name: 'Electromagnetic Waves', completed: false },
      { id: 'p16', name: 'Optics', completed: false },
      { id: 'p17', name: 'Dual Nature of Matter and Radiation', completed: false },
      { id: 'p18_1', name: 'Atoms', completed: false },
      { id: 'p18_2', name: 'Nuclei', completed: false },
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
        { id: 'c20', 'name': 'Principles Related to Practical Chemistry', completed: false },
    ],
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: <Target className="h-5 w-5" />,
    chapters: [
        { id: 'b1-1', name: 'The Living World', completed: false },
        { id: 'b1-2', name: 'Biological Classification', completed: false },
        { id: 'b1-3', name: 'Plant Kingdom', completed: false },
        { id: 'b1-4', name: 'Animal Kingdom', completed: false },
        { id: 'b2-1', name: 'Morphology of Flowering Plants', completed: false },
        { id: 'b2-2', name: 'Anatomy of Flowering Plants', completed: false },
        { id: 'b2-3', name: 'Structural Organisation in Animals', completed: false },
        { id: 'b3-1', name: 'Cell: The Unit of Life', completed: false },
        { id: 'b3-2', name: 'Biomolecules', completed: false },
        { id: 'b3-3', name: 'Cell Cycle and Cell Division', completed: false },
        { id: 'b4-3', name: 'Photosynthesis in Higher Plants', completed: false },
        { id: 'b4-4', name: 'Respiration in Plants', completed: false },
        { id: 'b4-5', name: 'Plant Growth and Development', completed: false },
        { id: 'b5-2', name: 'Breathing and Exchange of Gases', completed: false },
        { id: 'b5-3', name: 'Body Fluids and Circulation', completed: false },
        { id: 'b5-4', name: 'Excretory Products and their Elimination', completed: false },
        { id: 'b5-5', name: 'Locomotion and Movement', completed: false },
        { id: 'b5-6', name: 'Neural Control and Coordination', completed: false },
        { id: 'b5-7', name: 'Chemical Coordination and Integration', completed: false },
        { id: 'b6-2', name: 'Sexual Reproduction in Flowering Plants', completed: false },
        { id: 'b6-3', name: 'Human Reproduction', completed: false },
        { id: 'b6-4', name: 'Reproductive Health', completed: false },
        { id: 'b7-1', name: 'Principles of Inheritance and Variation', completed: false },
        { id: 'b7-2', name: 'Molecular Basis of Inheritance', completed: false },
        { id: 'b7-3', name: 'Evolution', completed: false },
        { id: 'b8-1', name: 'Human Health and Disease', completed: false },
        { id: 'b8-2', name: 'Strategies for Enhancement in Food Production', completed: false },
        { id: 'b8-3', name: 'Microbes in Human Welfare', completed: false },
        { id: 'b9-1', name: 'Biotechnology: Principles and Processes', completed: false },
        { id: 'b9-2', name: 'Biotechnology and its Applications', completed: false },
        { id: 'b10-1', name: 'Organisms and Populations', completed: false },
        { id: 'b10-2', name: 'Ecosystem', completed: false },
        { id: 'b10-3', name: 'Biodiversity and its Conservation', completed: false },
        { id: 'b10-4', name: 'Environmental Issues', completed: false },
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
  const [syllabus, setSyllabus] = useState<Subject[]>(() => {
    // This function now only runs on the client.
    // We check for window to avoid server-side rendering errors.
    if (typeof window === 'undefined') {
      return initialSyllabus;
    }
    try {
      const savedSyllabus = window.localStorage.getItem('syllabusTrackerData');
      return savedSyllabus ? JSON.parse(savedSyllabus) : initialSyllabus;
    } catch (error) {
      console.error('Error reading syllabus from localStorage', error);
      return initialSyllabus;
    }
  });

  useEffect(() => {
    // This effect runs only on the client side whenever the syllabus state changes.
    if (typeof window !== 'undefined') {
        try {
            window.localStorage.setItem('syllabusTrackerData', JSON.stringify(syllabus));
        } catch (error) {
            console.error('Error saving syllabus to localStorage', error);
        }
    }
  }, [syllabus]);


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
