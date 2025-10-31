export interface StudyMaterial {
  lectureUrl?: string;
  notesUrl?: string;
  questionBankUrl?: string;
  shortNoteUrl?: string;
  annotatedNcertUrl?: string;
}

export const studyMaterialsData: { [topicId: string]: StudyMaterial } = {
  // --- PHYSICS ---
  'p_bm': {
    lectureUrl: "https://www.youtube.com/embed/WDjcpSCI-uU",
  },
  'p_v': {
    lectureUrl: "",
  },
  'p_cm': {
    lectureUrl: "",
  },
  'p_rm': {
    lectureUrl: "",
  },
  'p1': {
    lectureUrl: "",
  },
  'p2': {
    lectureUrl: "",
  },
  'p3': {
    lectureUrl: "",
  },
  'p4': {
    lectureUrl: "",
  },
  'p5': {
    lectureUrl: "",
  },
  'p6': {
    lectureUrl: "",
  },
  'p7': {
    lectureUrl: "",
  },
  'p8': {
    lectureUrl: "",
  },
  'p9': {
    lectureUrl: "",
  },
  'p10': {
    lectureUrl: "",
  },
  'p11': {
    lectureUrl: "",
  },
  'p12': {
    lectureUrl: "",
  },
  'p13': {
    lectureUrl: "",
  },
  'p14': {
      lectureUrl: "",
  },
  'p15': {
    lectureUrl: '',
  },
  'p16': {
    lectureUrl: '',
  },
  'p17': {
    lectureUrl: '',
  },
  'p18': {
    lectureUrl: '',
  },
  'p19': {
    lectureUrl: '',
  },
  'p20': {
    lectureUrl: '',
  },
  'p21': {
    lectureUrl: '',
  },
  'p22': {
    lectureUrl: '',
  },
  'p23': {
    lectureUrl: '',
  },
  'p24': {
    lectureUrl: '',
  },
  'p25': {
    lectureUrl: '',
  },
  'p26': {
    lectureUrl: '',
  },
  'p27': {
    lectureUrl: '',
  },
  'p28': {
    lectureUrl: '',
  },

  // --- CHEMISTRY ---
  'c1': {
    lectureUrl: "",
    notesUrl: "",
    questionBankUrl: "",
    shortNoteUrl: "",
    annotatedNcertUrl: ""
  },
  // Add more chemistry topics here...

  // --- BOTANY ---
  'b1': {
    lectureUrl: "",
    notesUrl: "",
    questionBankUrl: "",
    shortNoteUrl: "",
    annotatedNcertUrl: ""
  },
  // Add more botany topics here...

  // --- ZOOLOGY ---
  'z1': {
    lectureUrl: "",
    notesUrl: "",
    questionBankUrl: "",
    shortNoteUrl: "",
    annotatedNcertUrl: ""
  }
  // Add more zoology topics here...
};
