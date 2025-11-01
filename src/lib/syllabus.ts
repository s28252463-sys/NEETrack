export type Topic = {
  name: string;
  id: string;
};

export type Subject = {
  name: string;
  topics: Topic[];
};

export const syllabus: Subject[] = [
  {
    name: 'Physics',
    topics: [
      { name: 'Physical World and Measurement', id: 'phy-1' },
      { name: 'Kinematics', id: 'phy-2' },
      { name: 'Laws of Motion', id: 'phy-3' },
      { name: 'Work, Energy and Power', id: 'phy-4' },
      { name: 'Motion of System of Particles and Rigid Body', id: 'phy-5' },
      { name: 'Gravitation', id: 'phy-6' },
      { name: 'Properties of Bulk Matter', id: 'phy-7' },
      { name: 'Thermodynamics', id: 'phy-8' },
      { name: 'Behaviour of Perfect Gas and Kinetic Theory', id: 'phy-9' },
      { name: 'Oscillations and Waves', id: 'phy-10' },
      { name: 'Electrostatics', id: 'phy-11' },
      { name: 'Current Electricity', id: 'phy-12' },
      { name: 'Magnetic Effects of Current and Magnetism', id: 'phy-13' },
      { name: 'Electromagnetic Induction and Alternating Currents', id: 'phy-14' },
      { name: 'Electromagnetic Waves', id: 'phy-15' },
      { name: 'Optics', id: 'phy-16' },
      { name: 'Dual Nature of Matter and Radiation', id: 'phy-17' },
      { name: 'Atoms and Nuclei', id: 'phy-18' },
      { name: 'Electronic Devices', id: 'phy-19' },
    ],
  },
  {
    name: 'Chemistry',
    topics: [
        { name: 'Some Basic Concepts of Chemistry', id: 'chem-1' },
        { name: 'Structure of Atom', id: 'chem-2' },
        { name: 'Classification of Elements and Periodicity in Properties', id: 'chem-3' },
        { name: 'Chemical Bonding and Molecular Structure', id: 'chem-4' },
        { name: 'States of Matter: Gases and Liquids', id: 'chem-5' },
        { name: 'Thermodynamics', id: 'chem-6' },
        { name: 'Equilibrium', id: 'chem-7' },
        { name: 'Redox Reactions', id: 'chem-8' },
        { name: 'Hydrogen', id: 'chem-9' },
        { name: 's-Block Element (Alkali and Alkaline earth metals)', id: 'chem-10' },
        { name: 'Some p-Block Elements', id: 'chem-11' },
        { name: 'Organic Chemistry- Some Basic Principles and Techniques', id: 'chem-12' },
        { name: 'Hydrocarbons', id: 'chem-13' },
        { name: 'Environmental Chemistry', id: 'chem-14' },
        { name: 'Solid State', id: 'chem-15' },
        { name: 'Solutions', id: 'chem-16' },
        { name: 'Electrochemistry', id: 'chem-17' },
        { name: 'Chemical Kinetics', id: 'chem-18' },
        { name: 'Surface Chemistry', id: 'chem-19' },
        { name: 'General Principles and Processes of Isolation of Elements', id: 'chem-20' },
        { name: 'p- Block Elements', id: 'chem-21' },
        { name: 'd and f Block Elements', id: 'chem-22' },
        { name: 'Coordination Compounds', id: 'chem-23' },
        { name: 'Haloalkanes and Haloarenes', id: 'chem-24' },
        { name: 'Alcohols, Phenols and Ethers', id: 'chem-25' },
        { name: 'Aldehydes, Ketones and Carboxylic Acids', id: 'chem-26' },
        { name: 'Organic Compounds Containing Nitrogen', id: 'chem-27' },
        { name: 'Biomolecules', id: 'chem-28' },
        { name: 'Polymers', id: 'chem-29' },
        { name: 'Chemistry in Everyday Life', id: 'chem-30' },
    ],
  },
  {
    name: 'Biology',
    topics: [
        { name: 'Diversity in Living World', id: 'bio-1' },
        { name: 'Structural Organisation in Animals and Plants', id: 'bio-2' },
        { name: 'Cell Structure and Function', id: 'bio-3' },
        { name: 'Plant Physiology', id: 'bio-4' },
        { name: 'Human Physiology', id: 'bio-5' },
        { name: 'Reproduction', id: 'bio-6' },
        { name: 'Genetics and Evolution', id: 'bio-7' },
        { name: 'Biology and Human Welfare', id: 'bio-8' },
        { name: 'Biotechnology and Its Applications', id: 'bio-9' },
        { name: 'Ecology and environment', id: 'bio-10' },
    ],
  },
];

export const allTopics: Topic[] = syllabus.flatMap(subject => subject.topics);

    