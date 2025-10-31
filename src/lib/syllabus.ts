
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
    { id: 'p_bm', name: 'Basic Math' },
    { id: 'p_v', name: 'Vectors' },
    { id: 'p_cm', name: 'Circular Motion' },
    { id: 'p_rm', name: 'Rotational Motion' },
    { id: 'p1', name: 'Physical World, Units and Measurements' },
    { id: 'p2', name: 'Motion in a Straight Line' },
    { id: 'p3', name: 'Motion in a Plane' },
    { id: 'p4', name: 'Laws of Motion' },
    { id: 'p5', name: 'Work, Energy and Power' },
    { id: 'p6', name: 'System of Particles and Rotational Motion' },
    { id: 'p7', name: 'Gravitation' },
    { id: 'p8', name: 'Mechanical Properties of Solids' },
    { id: 'p9', name: 'Mechanical Properties of Fluids' },
    { id: 'p10', name: 'Thermal Properties of Matter' },
    { id: 'p11', name: 'Thermodynamics' },
    { id: 'p12', name: 'Kinetic Theory' },
    { id: 'p13', name: 'Oscillations' },
    { id: 'p14', name: 'Waves' },
    { id: 'p15', name: 'Electric Charges and Fields' },
    { id: 'p16', name: 'Electrostatic Potential and Capacitance' },
    { id: 'p17', name: 'Current Electricity' },
    { id: 'p18', name: 'Moving Charges and Magnetism' },
    { id: 'p19', name: 'Magnetism and Matter' },
    { id: 'p20', name: 'Electromagnetic Induction' },
    { id: 'p21', name: 'Alternating Current' },
    { id: 'p22', name: 'Electromagnetic Waves' },
    { id: 'p23', name: 'Ray Optics and Optical Instruments' },
    { id: 'p24', name: 'Wave Optics' },
    { id: 'p25', name: 'Dual Nature of Radiation and Matter' },
    { id: 'p26', name: 'Atoms' },
    { id: 'p27', name: 'Nuclei' },
    { id: 'p28', name: 'Semiconductor Electronics: Materials, Devices and Simple Circuits' },
];

const chemistryTopics: Topic[] = [
    { id: 'c1', name: 'Some Basic Concepts of Chemistry' },
    { id: 'c2', name: 'Structure of Atom' },
    { id: 'c3', name: 'Classification of Elements and Periodicity in Properties' },
    { id: 'c4', name: 'Chemical Bonding and Molecular Structure' },
    { id: 'c6', name: 'Thermodynamics' },
    { id: 'c7', name: 'Equilibrium' },
    { id: 'c8', name: 'Redox Reactions' },
    { id: 'c10', name: 's-Block Elements (Alkali and Alkaline earth metals)' },
    { id: 'c11', name: 'Some p-Block Elements (Group 13 & 14)' },
    { id: 'c12', name: 'Organic Chemistry- Some Basic Principles and Techniques' },
    { id: 'c13', name: 'Hydrocarbons' },
    { id: 'c16', name: 'Solutions' },
    { id: 'c17', name: 'Electrochemistry' },
    { id: 'c18', name: 'Chemical Kinetics' },
    { id: 'c19', name: 'Surface Chemistry' },
    { id: 'c20', name: 'General Principles and Processes of Isolation of Elements' },
    { id: 'c21', name: 'p-Block Elements (Group 15 to 18)' },
    { id: 'c22', name: 'd and f Block Elements' },
    { id: 'c23', name: 'Coordination Compounds' },
    { id: 'c24', name: 'Haloalkanes and Haloarenes' },
    { id: 'c25', name: 'Alcohols, Phenols and Ethers' },
    { id: 'c26', name: 'Aldehydes, Ketones and Carboxylic Acids' },
    { id: 'c27', name: 'Organic Compounds Containing Nitrogen (Amines)' },
    { id: 'c28', name: 'Biomolecules' },
];

const botanyTopics: Topic[] = [
    { id: 'b1', name: 'The Living World' },
    { id: 'b2', name: 'Biological Classification' },
    { id: 'b3', name: 'Plant Kingdom' },
    { id: 'b4', name: 'Morphology of Flowering Plants' },
    { id: 'b5', name: 'Anatomy of Flowering Plants' },
    { id: 'b6', name: 'Structural Organisation in Animals - Tissues' },
    { id: 'b7', name: 'Cell: The Unit of Life' },
    { id: 'b8', name: 'Biomolecules (as related to plants)' },
    { id: 'b9', name: 'Cell Cycle and Cell Division' },
    { id: 'b12', name: 'Photosynthesis in Higher Plants' },
    { id: 'b13', name: 'Respiration in Plants' },
    { id: 'b14', name: 'Plant Growth and Development' },
    { id: 'b15', name: 'Sexual Reproduction in Flowering Plants' },
    { id: 'b16', name: 'Principles of Inheritance and Variation' },
    { id: 'b17', name: 'Molecular Basis of Inheritance' },
    { id: 'b18', name: 'Strategies for Enhancement in Food Production (Plant Breeding)' },
    { id: 'b19', name: 'Microbes in Human Welfare (as related to plants)' },
    { id: 'b20', name: 'Biotechnology: Principles and Processes' },
    { id: 'b21', name: 'Biotechnology and its Applications (in Agriculture)' },
    { id: 'b22', name: 'Organisms and Populations' },
    { id: 'b23', name: 'Ecosystem' },
    { id: 'b24', name: 'Biodiversity and Conservation' },
    { id: 'b25', name: 'Environmental Issues' },
];

const zoologyTopics: Topic[] = [
    { id: 'z1', name: 'Animal Kingdom' },
    { id: 'z2', name: 'Structural Organisation in Animals (Animal Tissues, Cockroach)' },
    { id: 'z3', name: 'Biomolecules (as related to animals)' },
    { id: 'z4', name: 'Digestion and Absorption' },
    { id: 'z5', name: 'Breathing and Exchange of Gases' },
    { id: 'z6', name: 'Body Fluids and Circulation' },
    { id: 'z7', name: 'Excretory Products and their Elimination' },
    { id: 'z8', name: 'Locomotion and Movement' },
    { id: 'z9', name: 'Neural Control and Coordination' },
    { id: 'z10', name: 'Chemical Coordination and Integration' },
    { id: 'z11', name: 'Human Reproduction' },
    { id: 'z12', name: 'Reproductive Health' },
    { id: 'z13', name: 'Human Health and Diseases' },
    { id: 'z14', name: 'Evolution' },
    { id: 'z15', name: 'Strategies for Enhancement in Food Production (Animal Husbandry)' },
    { id: 'z16', name: 'Microbes in Human Welfare (as related to animals)' },
    { id: 'z17', name: 'Biotechnology and its Applications (in Medicine)' },
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
