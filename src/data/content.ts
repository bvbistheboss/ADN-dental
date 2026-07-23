import { NewsArticle, Course, TechDownload, FAQItem } from '../types';

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-opening-soon',
    title: 'Ouverture prochainement',
    date: '2026',
    category: 'Annonce',
    summary: 'Nous aurons le plaisir de vous accueillir très bientôt dans notre nouveau showroom et centre de service à Rouïba, Alger.',
    content: 'Nous sommes ravis d\'annoncer l\'ouverture prochaine de nos nouveaux locaux à Rouïba, Alger. ADN Dental se prépare à vous offrir une expérience d\'exception avec le meilleur des équipements dentaires CAD/CAM DGSHAPE et Zubler. Restez connectés pour la date d\'inauguration officielle !',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    author: 'ADN Dental'
  }
];

export const COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Digital 5-Axis Milling Masterclass',
    date: 'August 12 - 14, 2026',
    duration: '3 Days (Full Time)',
    location: 'ADN Training Hub, Algiers',
    instructor: 'Eng. Karim Benali (DGSHAPE Certified)',
    category: 'CAD/CAM Milling',
    summary: 'Master 5-axis tool path strategy, 98.5mm disc nesting in MillBox, and maintenance of DWX-53DC and DWX-52D Plus.',
    description: 'This practical course takes technicians through advanced CAM nesting, C-clamp positioning, custom margin lines, and calibration routines to eliminate milling remakes.',
    topics: [
      '5-Axis tool path strategies for translucent zirconia',
      'MillBox & VPanel calibration and tool wear management',
      'Preventive spindle and filter maintenance',
      'Milling full arches, abutments, and screw-retained bridges'
    ],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 4
  },
  {
    id: 'course-2',
    title: 'Ceramic Pressing & Firing Excellence',
    date: 'September 05 - 06, 2026',
    duration: '2 Days',
    location: 'ADN Training Hub, Algiers',
    instructor: 'Master Ceramist Yacine Amrani',
    category: 'Ceramics & Furnaces',
    summary: 'Hands-on pressing techniques with Zubler VARIO PRESS 300.e and advanced stain/glaze firings on V60 i-Plus.',
    description: 'Learn how Zubler\'s ADVANCED PRESS technology prevents reaction layers on lithium disilicate, and master customized firing curves for multi-layered zirconia.',
    topics: [
      'ADVANCED PRESS ring prep & investment ratio',
      'Eliminating reaction layers and marginal chipping',
      'Creating realistic translucency with stains & glazes',
      'Vacuum maintenance & muffle temperature calibration'
    ],
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80',
    spotsLeft: 6
  }
];

export const DOWNLOADS: TechDownload[] = [
  {
    id: 'dl-1',
    title: 'DGSHAPE VPanel Operation Software v3.4',
    category: 'Software',
    brand: 'DGSHAPE',
    fileSize: '142 MB',
    version: 'v3.4.1',
    description: 'Control software for DWX-53DC, DWX-52D Plus, DWX-52DCi and DWX-42W milling machines.'
  },
  {
    id: 'dl-2',
    title: 'MillBox CAM Config Profile for DWX Series',
    category: 'Driver',
    brand: 'DGSHAPE',
    fileSize: '48 MB',
    version: '2026.1',
    description: 'Optimized post-processors and bur configurations for DGSHAPE 5-axis mills.'
  },
  {
    id: 'dl-3',
    title: 'Zubler VARIO PRESS 300.e User Manual & Firing Tables',
    category: 'Manual',
    brand: 'Zubler',
    fileSize: '12 MB',
    version: 'v2.8 PDF',
    description: 'Complete user manual, electrical schematics, and ceramic manufacturer firing charts.'
  },
  {
    id: 'dl-4',
    title: 'Z1 ECO & Z1 CAM Suction Firmware Update',
    category: 'Firmware',
    brand: 'Zubler',
    fileSize: '8.5 MB',
    version: 'v1.12',
    description: 'Firmware update for automatic 24V signal sync and motor speed curve optimizations.'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: {
      en: 'What warranty is provided with DGSHAPE and Zubler equipment?',
      fr: 'Quelle est la garantie fournie avec les équipements DGSHAPE et Zubler ?',
      ar: 'ما هي فترة الضمان المقدمة مع معدات DGSHAPE و Zubler؟'
    },
    answer: {
      en: 'All new DGSHAPE milling machines and Zubler furnaces imported by ADN Dental come with a comprehensive 2-year manufacturer warranty, including local on-site technical support and original replacement parts in Algeria.',
      fr: 'Toutes les usineuses DGSHAPE et les fours Zubler importés par ADN Dental bénéficient d\'une garantie constructeur de 2 ans, incluant le support technique sur site et les pièces d\'origine en Algérie.',
      ar: 'جميع أجهزة الخراطة من DGSHAPE وأفران Zubler المستوردة من ADN Dental تأتي بضمان شامل لمدة سنتين، يشمل الصيانة الميدانية وقطع الغيار الأصلية في الجزائر.'
    }
  },
  {
    question: {
      en: 'How quickly can an ADN Dental technician service my machine in case of a breakdown?',
      fr: 'À quelle vitesse un technicien ADN Dental peut-il intervenir en cas de panne ?',
      ar: 'ما هي سرعة استجابة تقني ADN Dental في حالة حدوث عطل؟'
    },
    answer: {
      en: 'We guarantee a 24-hour response time across all 69 wilayas. For critical software or calibration issues, our certified engineers provide immediate remote assistance via VPanel and TeamViewer.',
      fr: 'Nous garantissons un délai de réponse de 24 heures à travers les 69 wilayas. Pour les problèmes de logiciel ou calibrage, nous proposons une assistance à distance immédiate.',
      ar: 'نضمن وقت استجابة خلال 24 ساعة عبر جميع الولايات الـ 69. بالنسبة للمشاكل البرمجية، يقدم مهندسونا المعتمدون الدعم الفوري عن بُعد.'
    }
  },
  {
    question: {
      en: 'Are original burs, filters, and spare parts available in stock?',
      fr: 'Les fraises d\'origine, filtres et pièces de rechange sont-ils disponibles en stock ?',
      ar: 'هل تتوفر الأدوات الأصلية والفلاتر وقطع الغيار في المخزن؟'
    },
    answer: {
      en: 'Yes, our central warehouse in Algiers maintains a permanent inventory of original Roland/DGSHAPE diamond and carbide burs, Zubler quartz muffles, HEPA filter bags, and replacement spindles for immediate dispatch.',
      fr: 'Oui, notre entrepôt central à Alger maintient un stock permanent de fraises d\'origine Roland/DGSHAPE, muffles Zubler, sacs filtres HEPA et broches de rechange pour expédition immédiate.',
      ar: 'نعم، يضمن مستودعنا المركزي بالجزائر العاصمة توفر الأدوات الأصلية، أكياس الفلاتر، وأفران السيراميك والتسليم الفوري لجميع الولايات.'
    }
  }
];
