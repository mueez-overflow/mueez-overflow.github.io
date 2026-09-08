/* ============================================================
   EDIT YOUR PORTFOLIO CONTENT HERE
   ------------------------------------------------------------
   Add/remove/reorder objects in these arrays. The page renders
   the lists automatically. "extras" and "details" may contain
   small HTML snippets (for example, an inline <a> link).
   ============================================================ */
const CONTENT = {
  "publications": [
    {
      "title": "SolarVQA: A Benchmark for Visual Question Answering in Photovoltaic Defect Inspection",
      "authors": "A. Mueez, S. Vyas",
      "venue": "NeurIPS · Submitted May 2026",
      "status": "Under Review",
      "paperUrl": null
    },
    {
      "title": "A Generative Approach for Improving Multi-Label Defect Classification in Photovoltaic Modules",
      "authors": "A. Mueez, Y. S. Rawat, S. Vyas",
      "venue": "Solar Energy",
      "status": "Published",
      "paperUrl": "https://www.sciencedirect.com/science/article/pii/S0038092X26006328"
    },
    {
      "title": "Bridging Foundation Models and ASTM Metallurgical Standards for Automated Grain Size Estimation from Microscopy Images",
      "authors": "A. Mueez, S. Vyas",
      "venue": "Computer Vision for Multimodal Microscopy Image Analysis (CVMI) Workshop, CVPR 2026",
      "status": "Published",
      "paperUrl": "https://openaccess.thecvf.com/content/CVPR2026W/CVMI/papers/Mueez_Bridging_Foundation_Models_and_ASTM_Metallurgical_Standards_for_Automated_Grain_CVPRW_2026_paper.pdf"
    },
    {
      "title": "Vision-Language Models for Analog Gauge Reading: An Empirical Study of Specialization, Transfer and Reliability",
      "authors": "A. Mueez, A. Baranwala, J. Chaj-Mejia, J. T. Voelker, G. Bhatia, S. Vyas",
      "venue": "Engineering Applications of Artificial Intelligence (EAAI) · Submitted March 2026",
      "status": "Under Review",
      "paperUrl": "https://arxiv.org/pdf/2608.17723"
    },
    {
      "title": "SynSpill: Improved Industrial Spill Detection with Synthetic Data",
      "authors": "A. Baranwal, A. Mueez, J. Voelker, G. Bhatia, S. Vyas",
      "venue": "Vision-based Industrial Inspection (VISION) Workshop, ICCV 2025",
      "status": "Published",
      "paperUrl": "https://openaccess.thecvf.com/content/ICCV2025W/VISION'25/papers/Baranwal_SynSpill_Improved_Industrial_Spill_Detection_With_Synthetic_Data_ICCVW_2025_paper.pdf"
    },
    {
      "title": "A Cost-Effective Framework to Predict the Ripeness of Any Fruit Based on Color Space",
      "authors": "A. Mueez",
      "venue": "IEEE Region 10 Symposium (TENSYMP), 2020",
      "status": "Published",
      "paperUrl": "https://ieeexplore.ieee.org/abstract/document/9231002"
    }
  ],
  "education": [
    {
      "date": "Present",
      "degree": "PhD in Computer Science",
      "institution": "University of Central Florida",
      "extras": [
        "Advisor: <a href=\"https://vyas-lab.github.io/\" rel=\"noopener noreferrer\" target=\"_blank\">Dr. Shruti Vyas <span aria-hidden=\"true\">↗</span></a>"
      ],
      "thesis": null
    },
    {
      "date": "May 2026",
      "degree": "MS in Computer Science",
      "institution": "University of Central Florida",
      "extras": [
        "CGPA: 3.9 / 4.0"
      ],
      "thesis": null
    },
    {
      "date": "Dec 2018",
      "degree": "BS in Computer Science & Engineering",
      "institution": "BRAC University",
      "extras": [
        "CGPA: 3.88 / 4.0"
      ],
      "thesis": null
    }
  ],
  "experience": [
    {
      "date": "Aug 2022 — Present",
      "role": "Graduate Research Assistant",
      "organization": "University of Central Florida",
      "details": [
        "Researching adaptation of deep learning and vision-language models for industrial applications",
        "Developing data-efficient training strategies to improve model robustness on limited data",
        "Advisor: Dr. Shruti Vyas"
      ]
    },
    {
      "date": "Dec 2024 — Sept 2025",
      "role": "Data Science Researcher",
      "organization": "Siemens Energy",
      "details": [
        "Improved production inspection setups by deploying optimized Qwen 2.5 VL models",
        "Addressed data gaps by designing an SDXL generative pipeline for domain-specific scenes"
      ]
    },
    {
      "date": "Aug 2023 — Apr 2024",
      "role": "Graduate Teaching Assistant",
      "organization": "University of Central Florida",
      "details": [
        "Courses: Computer Science I, Database Management Systems",
        "Assisted in teaching, grading and held office hours for student support"
      ]
    },
    {
      "date": "Feb 2022 — Jul 2022",
      "role": "Adjunct Lecturer",
      "organization": "Monash Pathways at Universal College Bangladesh",
      "details": [
        "Courses: Introduction to Computer Systems, Networks and Security, Computing for Engineers",
        "Coordinated with unit leaders to ensure consistency across course materials"
      ]
    },
    {
      "date": "Jun 2019 — Feb 2022",
      "role": "Lecturer (CSE Department)",
      "organization": "Southeast University",
      "details": [
        "Courses: Programming Language II (Java), Computer Architecture, Database Design, Digital Logic Design, Computer Fundamentals",
        "Built a <a class=\"inline-course-link\" href=\"https://sites.google.com/view/abdulmueez/classx\" rel=\"noopener noreferrer\" target=\"_blank\">digital course hub</a> to facilitate learning during the pandemic",
        "Supervised student research projects resulting in two articles published in SEUJCS"
      ]
    },
    {
      "date": "Apr 2019 — Jun 2019",
      "role": "Software Engineer (System Architecture)",
      "organization": "MagnusHub",
      "details": [
        "Overhauled system architecture and reduced server overhead with AsyncPG for the OTORide app",
        "Developed Python protocols for smart locks and smart scooters",
        "Built AsyncIO TCP server to manage device and API requests"
      ]
    },
    {
      "date": "Jan 2019 — Mar 2019",
      "role": "Software Engineering Intern (Mobile Apps R&D)",
      "organization": "BRAC IT Services",
      "details": [
        "Designed and implemented PostgreSQL database models using Django",
        "Developed RESTful APIs using Django Rest Framework",
        "Wrote unit tests and participated in integration testing"
      ]
    },
    {
      "date": "Jun 2017 — Aug 2018",
      "role": "Undergraduate Teaching Assistant",
      "organization": "BRAC University (CSE Department)",
      "details": [
        "Courses: Programming Language I & II, Discrete Mathematics",
        "Assisted students in labs and graded course assignments"
      ]
    }
  ],
  "projects": [
    {
      "title": "ClassX",
      "description": "A digital course hub developed during my time as a lecturer, featuring self-produced lecture videos, slides, notes and practice materials, designed to support remote learning during the COVID-19 pandemic.",
      "linkText": "Explore ClassX",
      "url": "https://mueez-overflow.github.io/classx/"
    }
  ]
};
