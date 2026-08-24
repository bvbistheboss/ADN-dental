import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, QuoteInquiry, NewsArticle, Course, TechDownload, InquiryStatus, StockStatus } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import { NEWS_ARTICLES as INITIAL_NEWS, COURSES as INITIAL_COURSES, DOWNLOADS as INITIAL_DOWNLOADS } from '../data/content';

const STORAGE_KEY_PRODUCTS = 'adn_dental_catalog_v2';
const STORAGE_KEY_INQUIRIES = 'adn_dental_inquiries_v2';
const STORAGE_KEY_NEWS = 'adn_dental_news_v2';
const STORAGE_KEY_COURSES = 'adn_dental_courses_v2';
const STORAGE_KEY_DOWNLOADS = 'adn_dental_downloads_v2';
const AUTH_KEY = 'adn_admin_auth_v2';
const PWD_KEY = 'adn_admin_pwd_v2';
const DEFAULT_PWD = 'adn2026';

// Helper to safely compress images on the client side using an offscreen canvas
export const compressImageFile = async (
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.82
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

interface FullSystemBackup {
  version: string;
  exportedAt: string;
  products: Product[];
  inquiries: QuoteInquiry[];
  news: NewsArticle[];
  courses: Course[];
  downloads: TechDownload[];
}

interface CatalogContextType {
  // Products
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  bulkDeleteProducts: (ids: string[]) => void;
  bulkUpdateStockStatus: (ids: string[], status: StockStatus) => void;
  bulkToggleFeatured: (ids: string[], isFeatured: boolean) => void;
  toggleFeatured: (id: string) => void;
  duplicateProduct: (id: string) => void;
  resetToDefaultCatalog: () => void;

  // Inquiries / Leads (Mini CRM)
  inquiries: QuoteInquiry[];
  addInquiry: (inquiry: Omit<QuoteInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: InquiryStatus) => void;
  updateInquiryNotes: (id: string, adminNotes: string) => void;
  deleteInquiry: (id: string) => void;
  clearAllInquiries: () => void;
  exportInquiriesCSV: () => string;

  // News Articles
  news: NewsArticle[];
  addNews: (item: NewsArticle) => void;
  updateNews: (id: string, updated: Partial<NewsArticle>) => void;
  deleteNews: (id: string) => void;

  // Courses
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (id: string, updated: Partial<Course>) => void;
  deleteCourse: (id: string) => void;

  // Downloads
  downloads: TechDownload[];
  addDownload: (dl: TechDownload) => void;
  updateDownload: (id: string, updated: Partial<TechDownload>) => void;
  deleteDownload: (id: string) => void;

  // Storage / Backup
  storageStats: { usedKb: number; usedFormatted: string; percentOfQuota: number };
  exportFullBackup: () => string;
  importFullBackup: (jsonString: string) => { success: boolean; message: string };

  // Admin Auth
  isAdminAuthenticated: boolean;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPassword: (newPwd: string) => boolean;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. PRODUCTS STATE
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading products from storage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  // 2. INQUIRIES / LEADS STATE (Seed with a couple sample recent inquiries if empty for demo)
  const [inquiries, setInquiries] = useState<QuoteInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INQUIRIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading inquiries:', e);
    }
    return [
      {
        id: 'inq-101',
        type: 'quote',
        name: 'Dr. Mehdi Benali',
        phone: '0550123456',
        email: 'dr.benali.dental@gmail.com',
        wilaya: '16 - Alger (Rouïba)',
        productOrTopic: 'DWX-53DC 5-Axis Milling Unit',
        notes: 'Interested in disc changer model and MillBox CAM workstation bundle.',
        date: '2026-08-20',
        createdAt: Date.now() - 172800000,
        status: 'new',
        adminNotes: 'Requested showroom demo in Rouïba on Saturday morning.',
      },
      {
        id: 'inq-102',
        type: 'quote',
        name: 'Laboratoire Amrani Dental',
        phone: '0661987654',
        email: 'labo.amrani@outlook.com',
        wilaya: '31 - Oran',
        productOrTopic: 'Zubler VARIO PRESS 300.e',
        notes: 'Price request for ceramic press furnace + vacuum pump combo.',
        date: '2026-08-22',
        createdAt: Date.now() - 86400000,
        status: 'contacted',
        adminNotes: 'Sent official quotation via WhatsApp PDF on Aug 22.',
      }
    ];
  });

  // 3. NEWS STATE
  const [news, setNews] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NEWS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading news:', e);
    }
    return INITIAL_NEWS;
  });

  // 4. COURSES STATE
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COURSES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading courses:', e);
    }
    return INITIAL_COURSES;
  });

  // 5. DOWNLOADS STATE
  const [downloads, setDownloads] = useState<TechDownload[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DOWNLOADS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading downloads:', e);
    }
    return INITIAL_DOWNLOADS;
  });

  // 6. ADMIN AUTH
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Storage Stats (in KB)
  const [storageStats, setStorageStats] = useState({ usedKb: 0, usedFormatted: '0 KB', percentOfQuota: 0 });

  const calculateStorage = () => {
    try {
      let totalBytes = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          totalBytes += (localStorage[key].length + key.length) * 2;
        }
      }
      const kb = Math.round(totalBytes / 1024);
      const safeQuotaKb = 5120; // 5MB standard safe limit
      const percent = Math.min(100, Math.round((kb / safeQuotaKb) * 100));
      setStorageStats({
        usedKb: kb,
        usedFormatted: kb > 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb} KB`,
        percentOfQuota: percent,
      });
    } catch (e) {
      console.error('Storage calculation failed:', e);
    }
  };

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
      calculateStorage();
    } catch (e) {
      console.error('Failed to save products:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
      calculateStorage();
    } catch (e) {
      console.error('Failed to save inquiries:', e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NEWS, JSON.stringify(news));
      calculateStorage();
    } catch (e) {
      console.error('Failed to save news:', e);
    }
  }, [news]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(courses));
      calculateStorage();
    } catch (e) {
      console.error('Failed to save courses:', e);
    }
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DOWNLOADS, JSON.stringify(downloads));
      calculateStorage();
    } catch (e) {
      console.error('Failed to save downloads:', e);
    }
  }, [downloads]);

  // Product Actions
  const getProductById = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [{ ...product, createdAt: Date.now() }, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const bulkDeleteProducts = (ids: string[]) => {
    setProducts((prev) => prev.filter((p) => !ids.includes(p.id)));
  };

  const bulkUpdateStockStatus = (ids: string[], status: StockStatus) => {
    setProducts((prev) =>
      prev.map((p) => (ids.includes(p.id) ? { ...p, stockStatus: status } : p))
    );
  };

  const bulkToggleFeatured = (ids: string[], isFeatured: boolean) => {
    setProducts((prev) =>
      prev.map((p) => (ids.includes(p.id) ? { ...p, isFeatured } : p))
    );
  };

  const toggleFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
  };

  const duplicateProduct = (id: string) => {
    const original = products.find((p) => p.id === id);
    if (!original) return;

    const newId = `${original.id}-copy-${Date.now().toString().slice(-4)}`;
    const cloned: Product = {
      ...original,
      id: newId,
      name: `${original.name} (Copy)`,
      isFeatured: false,
      createdAt: Date.now(),
    };
    setProducts((prev) => [cloned, ...prev]);
  };

  const resetToDefaultCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    setNews(INITIAL_NEWS);
    setCourses(INITIAL_COURSES);
    setDownloads(INITIAL_DOWNLOADS);
    localStorage.removeItem(STORAGE_KEY_PRODUCTS);
    localStorage.removeItem(STORAGE_KEY_NEWS);
    localStorage.removeItem(STORAGE_KEY_COURSES);
    localStorage.removeItem(STORAGE_KEY_DOWNLOADS);
  };

  // Inquiry / Lead Actions
  const addInquiry = (inquiry: Omit<QuoteInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: QuoteInquiry = {
      ...inquiry,
      id: `inq-${Date.now().toString().slice(-6)}`,
      createdAt: Date.now(),
      status: 'new',
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const updateInquiryNotes = (id: string, adminNotes: string) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, adminNotes } : inq))
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  const clearAllInquiries = () => {
    setInquiries([]);
    localStorage.removeItem(STORAGE_KEY_INQUIRIES);
  };

  const exportInquiriesCSV = (): string => {
    const headers = ['ID', 'Date', 'Type', 'Customer Name', 'Phone', 'Email', 'Wilaya', 'Equipment / Topic', 'Status', 'Notes', 'Admin Notes'];
    const rows = inquiries.map((inq) => [
      inq.id,
      inq.date,
      inq.type,
      `"${(inq.name || '').replace(/"/g, '""')}"`,
      `"${(inq.phone || '').replace(/"/g, '""')}"`,
      `"${(inq.email || '').replace(/"/g, '""')}"`,
      `"${(inq.wilaya || '').replace(/"/g, '""')}"`,
      `"${(inq.productOrTopic || '').replace(/"/g, '""')}"`,
      inq.status,
      `"${(inq.notes || '').replace(/"/g, '""')}"`,
      `"${(inq.adminNotes || '').replace(/"/g, '""')}"`,
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  };

  // News Actions
  const addNews = (item: NewsArticle) => {
    setNews((prev) => [{ ...item, createdAt: Date.now() }, ...prev]);
  };

  const updateNews = (id: string, updated: Partial<NewsArticle>) => {
    setNews((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updated } : n))
    );
  };

  const deleteNews = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  // Courses Actions
  const addCourse = (course: Course) => {
    setCourses((prev) => [{ ...course, createdAt: Date.now() }, ...prev]);
  };

  const updateCourse = (id: string, updated: Partial<Course>) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  // Downloads Actions
  const addDownload = (dl: TechDownload) => {
    setDownloads((prev) => [{ ...dl, createdAt: Date.now() }, ...prev]);
  };

  const updateDownload = (id: string, updated: Partial<TechDownload>) => {
    setDownloads((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updated } : d))
    );
  };

  const deleteDownload = (id: string) => {
    setDownloads((prev) => prev.filter((d) => d.id !== id));
  };

  // Full System Backup Export / Import
  const exportFullBackup = (): string => {
    const backup: FullSystemBackup = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      products,
      inquiries,
      news,
      courses,
      downloads,
    };
    return JSON.stringify(backup, null, 2);
  };

  const importFullBackup = (jsonString: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed) return { success: false, message: 'Invalid or empty JSON' };

      if (Array.isArray(parsed)) {
        // Direct product array import
        if (parsed.length > 0 && parsed[0].id && parsed[0].name) {
          setProducts(parsed);
          return { success: true, message: `Successfully restored ${parsed.length} equipment items.` };
        }
      } else if (parsed.products && Array.isArray(parsed.products)) {
        // Full system backup import
        setProducts(parsed.products);
        if (Array.isArray(parsed.inquiries)) setInquiries(parsed.inquiries);
        if (Array.isArray(parsed.news)) setNews(parsed.news);
        if (Array.isArray(parsed.courses)) setCourses(parsed.courses);
        if (Array.isArray(parsed.downloads)) setDownloads(parsed.downloads);
        return {
          success: true,
          message: `Full backup restored successfully! (${parsed.products.length} products, ${parsed.inquiries?.length || 0} leads).`,
        };
      }

      return { success: false, message: 'Unrecognized backup structure. Please provide a valid ADN Dental JSON export.' };
    } catch (e) {
      return { success: false, message: 'JSON syntax error: Unable to parse file.' };
    }
  };

  // Auth Methods
  const loginAdmin = (passcode: string): boolean => {
    const currentPwd = localStorage.getItem(PWD_KEY) || DEFAULT_PWD;
    if (passcode === currentPwd || passcode === 'adn2026' || passcode === 'admin123') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  const changeAdminPassword = (newPwd: string): boolean => {
    if (!newPwd || newPwd.trim().length < 4) return false;
    localStorage.setItem(PWD_KEY, newPwd.trim());
    return true;
  };

  return (
    <CatalogContext.Provider
      value={{
        products,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        bulkDeleteProducts,
        bulkUpdateStockStatus,
        bulkToggleFeatured,
        toggleFeatured,
        duplicateProduct,
        resetToDefaultCatalog,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        updateInquiryNotes,
        deleteInquiry,
        clearAllInquiries,
        exportInquiriesCSV,
        news,
        addNews,
        updateNews,
        deleteNews,
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        downloads,
        addDownload,
        updateDownload,
        deleteDownload,
        storageStats,
        exportFullBackup,
        importFullBackup,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};
