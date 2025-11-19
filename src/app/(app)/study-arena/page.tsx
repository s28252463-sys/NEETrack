'use client';

import { studyArenaData } from '@/lib/study-arena-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Link as LinkIcon, Atom, TestTube, Target } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Define categories to group the topics
const categories: { name: string, icon: ReactNode, topics: string[] }[] = [
  {
    name: 'Physics',
    icon: <Atom className="h-6 w-6 text-primary" />,
    topics: [
      'basic math',
      'vector',
      'motion in a straight line',
      'motion in a plane',
      'laws of motion',
      'Work, Energy and Power',
      'centre of mass and collision ',
      'Rotational Motion',
      'gravitation',
      'Mechanical Properties of Solids',
      'Mechanical Properties of Fluids',
      'Thermal Properties of Matter',
      'Kinetic Theory and thermodynamic ',
      'Oscillations',
      'wave',
      'Electric charge and field',
      'unit and measurement ',
      'Electrostatic potential and capacitance ',
      'current. electricity ',
      'moving charges and magnetism ',
      'Magnetism and matter',
      'Electro magnetic  induction ',
      'Alternative current ',
      'electro magnetic wave',
      'Ray optics and optical instrument ',
      'wave optics ',
      'Modern physics ',
      'Semiconductor electronics ',
    ],
  },
  {
    name: 'Chemistry',
    icon: <TestTube className="h-6 w-6 text-primary" />,
    topics: [
      'Mole concept ',
      'structure of atom ',
      'Thermodynamic part-1',
      'Thermodynamic part-2',
      'Redox reactions ',
      'periodic table ',
      'chemical bonding ',
      'chemical equilibrium ',
      'Ionic equilibrium ',
      'Iupac',
      'Isomerism ',
      'GOC',
      'Hydrocarbon ',
      'solution ',
      'Electrochemistry ',
      'chemical kinetics ',
      'coordination compounds ',
      'The d&f block elements ',
      'The p block elements ',
      'Haloalkane and Haloarene',
      'Alcohol,phenol,ether',
      'Aldehyde and keton and carboxylic acid ',
      'Amine and diazonium salt',
      'Biomolecules ',
      'Practical or ganic chemistry ',
    ],
  },
  {
    name: 'Biology',
    icon: <Target className="h-6 w-6 text-primary" />,
    topics: [
      'cell: the unit of life ',
      'cell cycle and cell division ',
      'The living world ',
      'Biological classification ',
      'plant kingdom ',
      'Morphology of flowering plants ',
      'Anatomy of flowering plants ',
      'plant growth and development ',
      'Microbes and human welfare ',
      'photosynthesis in higher plants ',
      'Respiration in plants ',
      'sexual reproduction in flowering plants ',
      'principle of inheritance and variations ',
      'organism and population ',
      'Ecosystem ',
      'Biodiversity and conservation ',
      'Body fluids and circulation ',
      'Breathing and exchange of gases ',
      'Excretory products and their elimination ',
      'Locomotion and movement ',
      'Neutral control and coordination ',
      'chemical coordination and integration ',
      'Biomolecules ',
      'Reproductive health ',
      'Human health and diseases ',
      'Biotechnology principle and process ',
      "Biotechnology and it's application ",
      'Evolution ',
      'Animal kingdom ',
      'strural organisation in animals ',
      'Human Reproduction ',
    ],
  },
];


export default function StudyArenaPage() {
  return (
    <div className="flex-1">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          Study Arena
        </h1>
        <p className="text-muted-foreground mt-2">
          Your central hub for video lectures and notes for every subject.
        </p>
      </header>

      <Accordion type="multiple" className="w-full space-y-4">
        {categories.map((category) => (
          <AccordionItem value={category.name} key={category.name} className="border rounded-lg bg-card/50 px-4">
            <AccordionTrigger className="hover:no-underline">
                <h2 className="text-2xl font-semibold flex items-center gap-3">
                    {category.icon}
                    {category.name}
                </h2>
            </AccordionTrigger>
            <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                    {studyArenaData
                        .filter(item => category.topics.includes(item.Subject))
                        .map((item, index) => (
                        <Card key={index} className="overflow-hidden bg-card/80">
                            <CardHeader>
                            <CardTitle className="text-lg capitalize">{item.Subject}</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <div className="aspect-video mb-4 rounded-md overflow-hidden">
                                <iframe
                                width="100%"
                                height="100%"
                                src={item.YouTube_URL}
                                title={`YouTube video player for ${item.Subject}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                ></iframe>
                            </div>
                            <Button asChild className="w-full">
                                <a href={item.Notes_Drive_Link} target="_blank" rel="noopener noreferrer">
                                <LinkIcon className="mr-2 h-4 w-4" />
                                View/Download Notes
                                </a>
                            </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
