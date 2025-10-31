export interface StudyMaterial {
  lectureUrl?: string;
  notesUrl?: string;
  questionBankUrl?: string;
  shortNoteUrl?: string;
  annotatedNcertUrl?: string;
}

export const studyMaterialsData: { [topicId: string]: StudyMaterial } = {
  // --- PHYSICS ---
  'p_bm': {},
  'p_v': {},
  'p_cm': {},
  'p_rm': {},
  'p1': {
    lectureUrl: "https://www.youtube.com/watch?v=J1Z2p4csb-w",
    notesUrl: "",
    questionBankUrl: "",
    shortNoteUrl: "",
    annotatedNcertUrl: ""
  },
  // Add more physics topics here...

  // --- CHEMISTRY ---
  'c1': {
    lectureUrl: "https://www.youtube.com/watch?v=your-video-id",
    notesUrl: "",
    questionBankUrl: "",
    shortNoteUrl: "",
    annotatedNcertUrl: ""
  },
  // Add more chemistry topics here...

  // --- BOTANY ---
  'b1': {
    lectureUrl: "https://www.youtube.com/watch?v=your-video-id",
    notesUrl: "",
    questionBankUrl: "",
    shortNoteUrl: "",
    annotatedNcertUrl: ""
  },
  // Add more botany topics here...

  // --- ZOOLOGY ---
  'z1': {
    lectureUrl: "https://www.youtube.com/watch?v=your-video-id",
    notesUrl: "",
    questionBankUrl: "",
    shortNoteUrl: "",
    annotatedNcertUrl: ""
  }
  // Add more zoology topics here...
};