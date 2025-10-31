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
    lectureUrl: "https://www.youtube.com/watch?v=hbga-xhCB4E",
  },
  'p_v': {
    lectureUrl: "https://www.youtube.com/watch?v=Q4X2r-o0a_A",
  },
  'p_cm': {
    lectureUrl: "https://www.youtube.com/watch?v=9nJqQdD-0jA",
  },
  'p_rm': {
    lectureUrl: "https://www.youtube.com/watch?v=4fIuT5b9q9s",
  },
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
