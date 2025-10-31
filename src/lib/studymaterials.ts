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
    lectureUrl: "https://www.youtube.com/watch?v=R4wP2c-AxwE",
  },
  'p_v': {
    lectureUrl: "https://www.youtube.com/watch?v=kdoJqNsoWac",
  },
  'p_cm': {
    lectureUrl: "https://www.youtube.com/watch?v=hX82J2d5CgY",
  },
  'p_rm': {
    lectureUrl: "https://www.youtube.com/watch?v=syOMYhI1ePA",
  },
  'p1': {
    lectureUrl: "https://www.youtube.com/watch?v=J1Z2p4csb-w",
  },
  'p2': {
    lectureUrl: "https://www.youtube.com/watch?v=-tlkepyF8aY",
  },
  'p3': {
    lectureUrl: "https://www.youtube.com/watch?v=YKLZpAjK-M8",
  },
  'p4': {
    lectureUrl: "https://www.youtube.com/watch?v=2cdRXbYeCqo",
  },
  'p5': {
    lectureUrl: "https://www.youtube.com/watch?v=Ce-1sfILTj8",
  },
  'p6': {
    lectureUrl: "https://www.youtube.com/watch?v=wG4uHKZkJRI",
  },
  'p7': {
    lectureUrl: "https://www.youtube.com/watch?v=eHIFpPdGuY0",
  },
  'p8': {
    lectureUrl: "https://www.youtube.com/watch?v=a2T84FeLIdY",
  },
  'p9': {
    lectureUrl: "https://www.youtube.com/watch?v=Ele4sqz0cUI",
  },
  'p10': {
    lectureUrl: "https://www.youtube.com/watch?v=CGS6eP-yZec",
  },
  'p11': {
    lectureUrl: "https://www.youtube.com/watch?v=A8W90UdFyHM",
  },
  'p12': {
    lectureUrl: "https://www.youtube.com/watch?v=A8W90UdFyHM",
  },
  'p13': {
    lectureUrl: "https://www.youtube.com/watch?v=wOIRp8B8I-U",
  },
  'p14': {
      lectureUrl: "https://www.youtube.com/watch?v=QOYEiy1AUTI",
  },
  'p15': {
    lectureUrl: 'https://www.youtube.com/watch?v=1K6gIeI8c1A',
  },
  'p16': {
    lectureUrl: 'https://www.youtube.com/watch?v=A-3y8gLz4n0',
  },
  'p17': {
    lectureUrl: 'https://www.youtube.com/watch?v=6LzuQeQpCjM',
  },
  'p18': {
    lectureUrl: 'https://www.youtube.com/watch?v=rJg36XF5S3w',
  },
  'p19': {
    lectureUrl: 'https://www.youtube.com/watch?v=kpx3h-QO02g',
  },
  'p20': {
    lectureUrl: 'https://www.youtube.com/watch?v=z2yXp4A9o-A',
  },
  'p21': {
    lectureUrl: 'https://www.youtube.com/watch?v=J3LgL5y2-L8',
  },
  'p22': {
    lectureUrl: 'https://www.youtube.com/watch?v=L2L2I-4lW4M',
  },
  'p23': {
    lectureUrl: 'https://www.youtube.com/watch?v=psoiHejT3jU',
  },
  'p24': {
    lectureUrl: 'https://www.youtube.com/watch?v=qf6aV3pWk8c',
  },
  'p25': {
    lectureUrl: 'https://www.youtube.com/watch?v=jW24cIt0Vgo',
  },
  'p26': {
    lectureUrl: 'https://www.youtube.com/watch?v=S4G39jRTW9M',
  },
  'p27': {
    lectureUrl: 'https://www.youtube.com/watch?v=wBHB5x9f4b0',
  },
  'p28': {
    lectureUrl: 'https://www.youtube.com/watch?v=9g2o9y-G75A',
  },

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