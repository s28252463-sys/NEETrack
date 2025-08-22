import type { LucideIcon } from 'lucide-react';
import { Lightbulb, FlaskConical, Dna, Leaf, Bug } from 'lucide-react';

export type Topic = {
  id: string;
  name: string;
};

export type Subject = {
  id: string;
  name: string;
  icon: LucideIcon;
  topics?: Topic[];
  subjects?: Subject[]; // For nested subjects
};

const physicsTopics: Topic[] = [
    { id: 'p1', name: 'Physical World and Measurement' },
    { id: 'p2', name: 'Kinematics' },
    { id: 'p3', name: 'Laws of Motion' },
    { id: 'p4', name: 'Work, Energy, and Power' },
    { id: 'p5', name: 'Motion of System of Particles' },
    { id: 'p6', name: 'Gravitation' },
    { id: 'p7', name: 'Properties of Bulk Matter' },
    { id: 'p8', name: 'Thermodynamics' },
    { id: 'p9', name: 'Oscillations and Waves' },
    { id: 'p10', name: 'Electrostatics' },
    { id: 'p11', name: 'Current Electricity' },
    { id: 'p12', name: 'Magnetic Effects of Current' },
    { id: 'p13', name: 'Electromagnetic Induction' },
    { id: 'p14', name: 'Optics' },
    { id: 'p15', name: 'Dual Nature of Matter' },
    { id: 'p16', name: 'Atoms and Nuclei' },
    { id: 'p17', name: 'Electronic Devices' },
];

const chemistryTopics: Topic[] = [
    { id: 'c1', name: 'Some Basic Concepts of Chemistry' },
    { id: 'c2', name: 'Structure of Atom' },
    { id: 'c3', name: 'Classification of Elements' },
    { id: 'c4', name: 'Chemical Bonding' },
    { id: 'c5', name: 'States of Matter' },
    { id: 'c6', name: 'Thermodynamics' },
    { id: 'c7', name: 'Equilibrium' },
    { id: 'c8', name: 'Redox Reactions' },
    { id: 'c9', name: 'Hydrogen' },
    { id: 'c10', name: 's-Block Elements' },
    { id: 'c11', name: 'p-Block Elements (Group 13 & 14)' },
    { id: 'c12', name: 'Organic Chemistry: Basic Principles' },
    { id: 'c13', name: 'Hydrocarbons' },
    { id: 'c14', name: 'Solid State' },
    { id: 'c15', name: 'Solutions' },
    { id: 'c16', name: 'Electrochemistry' },
    { id: 'c17', name: 'Chemical Kinetics' },
    { id: 'c18', name: 'Surface Chemistry' },
    { id: 'c19', name: 'p-Block Elements (Group 15 to 18)' },
    { id: 'c20', name: 'd and f Block Elements' },
    { id: 'c21', name: 'Coordination Compounds' },
    { id: 'c22', name: 'Haloalkanes and Haloarenes' },
    { id: 'c23', name: 'Alcohols, Phenols and Ethers' },
    { id: 'c24', name: 'Aldehydes, Ketones and Carboxylic Acids' },
    { id: 'c25', name: 'Amines' },
    { id: 'c26', name: 'Biomolecules' },
    { id: 'c27', name: 'Polymers' },
    { id: 'c28', name: 'Chemistry in Everyday Life' },
];

const botanyTopics: Topic[] = [
    { id: 'b1', name: 'Diversity in Living World' },
    { id: 'b2', name: 'Plant Kingdom' },
    { id: 'b3', name: 'Morphology of Flowering Plants' },
    { id: 'b4', name: 'Anatomy of Flowering Plants' },
    { id: 'b5', name: 'Cell: The Unit of Life' },
    { id: 'b6', name: 'Cell Cycle and Cell Division' },
    { id: 'b7', name: 'Transport in Plants' },
    { id: 'b8', name: 'Mineral Nutrition' },
    { id: 'b9', name: 'Photosynthesis in Higher Plants' },
    { id: 'b10', name: 'Respiration in Plants' },
    { id: 'b11', name: 'Plant Growth and Development' },
    { id: 'b12', name: 'Sexual Reproduction in Flowering Plants' },
    { id: 'b13', name: 'Principles of Inheritance and Variation' },
    { id: 'b14', name: 'Molecular Basis of Inheritance' },
    { id: 'b15', name: 'Strategies for Enhancement in Food Production' },
    { id: 'b16', name: 'Microbes in Human Welfare' },
    { id: 'b17', name: 'Biotechnology: Principles and Processes' },
    { id: 'b18', name: 'Biotechnology and its Applications' },
    { id: 'b19', name: 'Organisms and Populations' },
    { id: 'b20', name: 'Ecosystem' },
    { id: 'b21', name: 'Biodiversity and Conservation' },
    { id: 'b22', name: 'Environmental Issues' },
];

const zoologyTopics: Topic[] = [
    { id: 'z1', name: 'Animal Kingdom' },
    { id: 'z2', name: 'Structural Organisation in Animals' },
    { id: 'z3', name: 'Biomolecules' },
    { id: 'z4', name: 'Digestion and Absorption' },
    { id: 'z5', name: 'Breathing and Exchange of Gases' },
    { id: 'z6', name: 'Body Fluids and Circulation' },
    { id: 'z7', name: 'Excretory Products and their Elimination' },
    { id: 'z8', name: 'Locomotion and Movement' },
    { id: 'z9', name: 'Neural Control and Coordination' },
    { id: 'z10', name: 'Chemical Coordination and Integration' },
    { id: 'z11', name: 'Human Reproduction' },
    { id: 'z12', name: 'Reproductive Health' },
    { id: 'z13', name: 'Human Health and Disease' },
    { id: 'z14', name: 'Evolution' },
];

export const syllabus: Subject[] = [
  {
    id: 'physics',
    name: 'Physics',
    icon: Lightbulb,
    topics: physicsTopics,
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: FlaskConical,
    topics: chemistryTopics,
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: Dna,
    subjects: [
      {
        id: 'botany',
        name: 'Botany',
        icon: Leaf,
        topics: botanyTopics,
      },
      {
        id: 'zoology',
        name: 'Zoology',
        icon: Bug,
        topics: zoologyTopics,
      },
    ],
  },
];

export const allTopics = syllabus.flatMap(subject => 
    subject.topics || subject.subjects?.flatMap(sub => sub.topics || []) || []
).flat();
