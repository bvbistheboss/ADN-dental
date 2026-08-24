export type Language = 'en' | 'fr' | 'ar';

export type StockStatus = 'in_stock' | 'on_order' | 'showroom_demo' | 'new_arrival';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: 'DGSHAPE' | 'Zubler' | 'Castellini' | string;
  brandLabel: string;
  category: 'milling' | 'furnaces' | 'suction' | 'units' | 'materials' | 'hygiene' | string;
  categoryLabel: string;
  tagline: string;
  description: string;
  fullOverview: string;
  image: string;
  gallery?: string[];
  specs: ProductSpec[];
  features: string[];
  isFeatured?: boolean;
  stockStatus?: StockStatus;
  priceNote?: string;
  brochureUrl?: string;
  videoUrl?: string;
  warranty?: string;
  createdAt?: number;
}

export type InquiryStatus = 'new' | 'contacted' | 'quoted' | 'won' | 'archived';
export type InquiryType = 'quote' | 'contact' | 'support_ticket' | 'course_enroll';

export interface QuoteInquiry {
  id: string;
  type: InquiryType;
  name: string;
  phone: string;
  email?: string;
  wilaya?: string;
  productOrTopic: string;
  notes?: string;
  date: string;
  createdAt: number;
  status: InquiryStatus;
  adminNotes?: string;
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
  createdAt?: number;
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
  createdAt?: number;
}

export interface TechDownload {
  id: string;
  title: string;
  category: 'Software' | 'Driver' | 'Manual' | 'Firmware' | string;
  brand: 'DGSHAPE' | 'Zubler' | 'Castellini' | string;
  fileSize: string;
  version: string;
  description: string;
  downloadUrl?: string;
  createdAt?: number;
}

export interface FAQItem {
  question: { en: string; fr: string; ar: string };
  answer: { en: string; fr: string; ar: string };
}

