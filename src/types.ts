export type Language = 'en' | 'fr' | 'ar';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: 'DGSHAPE' | 'Zubler';
  brandLabel: string;
  category: 'milling' | 'furnaces' | 'suction' | 'materials';
  categoryLabel: string;
  tagline: string;
  description: string;
  fullOverview: string;
  image: string;
  gallery?: string[];
  specs: ProductSpec[];
  features: string[];
  isFeatured?: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  image: string;
  author?: string;
}

export interface Course {
  id: string;
  title: string;
  date: string;
  duration: string;
  location: string;
  instructor: string;
  category: string;
  summary: string;
  description: string;
  topics: string[];
  image: string;
  spotsLeft: number;
}

export interface TechDownload {
  id: string;
  title: string;
  category: 'Software' | 'Driver' | 'Manual' | 'Firmware';
  brand: 'DGSHAPE' | 'Zubler';
  fileSize: string;
  version: string;
  description: string;
}

export interface FAQItem {
  question: { en: string; fr: string; ar: string };
  answer: { en: string; fr: string; ar: string };
}
