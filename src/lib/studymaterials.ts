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
    lectureUrl: "https://www.youtube.com/live/WDjcpSCI-uU?si=zOEj0_J46INhWIK8",
  },
  'p_v': {
    lectureUrl: "https://www.youtube.com/live/46CaYBwEp_k?si=0XCz-pNLAZXA76AW",
  },
  'p_cm': {
    lectureUrl: "https://youtu.be/60rRCpUY898?si=tabG_8nb6ME6USnw",
  },
  'p_rm': {
    lectureUrl: "https://www.youtube.com/live/ec1CLG1jU0I?si=iFMqjBh12r6zp2Ny",
  },
  'p1': {
    lectureUrl: "https://www.youtube.com/watch?v=J1Z2p4csb-w",
    notesUrl: "",
    questionBankUrl: "",
    shortNoteUrl: "",
    annotatedNcertUrl: ""
  },
  'p2': {
    lectureUrl: "https://youtu.be/-tlkepyF8aY?si=007TR24e2BtCoSAL",
  },
  'p3': {
    lectureUrl: "https://www.youtube.com/live/YKLZpAjK-M8?si=jaGK6wpUqh7Brr_u",
  },
  'p4': {
    lectureUrl: "https://www.youtube.com/live/2cdRXbYeCqo?si=RGf58hh5uRjQVSG4",
  },
  'p5': {
    lectureUrl: "https://www.youtube.com/live/Ce-1sfILTj8?si=AasUFcLLYHKXXngq",
  },
  'p6': {
    lectureUrl: "https://www.youtube.com/live/wG4uHKZkJRI?si=_dBk2u9_Sg2in2CM",
  },
  'p7': {
    lectureUrl: "https://www.youtube.com/live/eHIFpPdGuY0?si=A8SPcSlddLxZNGzG",
  },
  'p8': {
    lectureUrl: "https://www.youtube.com/live/a2T84FeLIdY?si=Y_h0BVyt8zSJ6dqS",
  },
  'p9': {
    lectureUrl: "https://www.youtube.com/live/Ele4sqz0cUI?si=DIxoisLD3urs8nGg",
  },
  'p10': {
    lectureUrl: "https://www.youtube.com/live/CGS6eP-yZec?si=0Y40RsLR1UxBEnzU",
  },
  'p11': {
    lectureUrl: "https://www.youtube.com/live/A8W90UdFyHM?si=QAlz8iTbWY8znZhZ",
  },
  'p12': {
    lectureUrl: "https://www.youtube.com/live/A8W90UdFyHM?si=QAlz8iTbWY8znZhZ",
  },
  'p13': {
    lectureUrl: "https://www.youtube.com/live/wOIRp8B8I-U?si=13_OoouxclHcrqjo",
  },
  'p14': {
      lectureUrl: "https://www.youtube.com/live/QOYEiy1AUTI?si=46O3bQ318hQ6QcUr",
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
