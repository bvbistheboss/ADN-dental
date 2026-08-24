import React, { useState } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { AdminProductsTab } from '../components/admin/AdminProductsTab';
import { AdminInquiriesTab } from '../components/admin/AdminInquiriesTab';
import { AdminNewsTab } from '../components/admin/AdminNewsTab';
import { AdminCoursesTab } from '../components/admin/AdminCoursesTab';
import { AdminDownloadsTab } from '../components/admin/AdminDownloadsTab';
import { AdminBackupSettingsModal } from '../components/admin/AdminBackupSettingsModal';
import {
  Lock,
  Unlock,
  ShieldCheck,
  Package,
  MessageSquare,
  Newspaper,
  GraduationCap,
  Download,
  Settings,
  LogOut,
  ExternalLink,
  Sparkles,
  KeyRound,
  ArrowRight
} from 'lucide-react';

type AdminTab = 'products' | 'inquiries' | 'news' | 'courses' | 'downloads';

export const AdminPage: React.FC = () => {
  const {
    products,
    inquiries,
    news,
    courses,
    downloads,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
  } = useCatalog();

  const [activeTab, setActiveTab] = useState<AdminTab>('products');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput.trim());
    if (success) {
      setAuthError(false);
      setPasswordInput('');
    } else {
      setAuthError(true);
    }
  };

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  // =========================================================================
  // LOGIN SCREEN
  // =========================================================================
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center p-4 sm:p-6 pt-24 pb-20">
        <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
          
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#FF6600]/15 border border-[#FF6600]/30 text-[#FF6600] flex items-center justify-center mx-auto shadow-lg shadow-[#FF6600]/10">
              <Lock className="w-7 h-7" />
            </div>
            
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6600] block mb-1">
                Espace Réservé • Staff ADN Dental
              </span>
              <h1 className="text-2xl sm:text-3xl font-black uppercase font-['Space_Grotesk'] text-white">
                Portail Administration
              </h1>
            </div>

            <p className="text-xs text-zinc-400">
              Accès réservé aux techniciens et responsables commerciaux pour la gestion des équipements et prospects.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                <span>Code d'Accès Sécurisé</span>
                <span className="text-zinc-500 font-normal lowercase">(défaut: adn2026)</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError(false);
                  }}
                  placeholder="Entrez le mot de passe..."
                  className="w-full bg-black border border-zinc-700 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6600] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF6600] hover:bg-[#ff771c] text-white p-2 rounded-xl transition-all cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {authError && (
              <div className="bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold p-3 rounded-xl text-center">
                Mot de passe incorrect. Veuillez réessayer.
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#FF6600] hover:bg-[#ff771c] text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-[#FF6600]/25 cursor-pointer"
            >
              Déverrouiller le Panneau
            </button>
          </form>

          <div className="text-center pt-2">
            <a
              href="#/"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              ← Retour au site public
            </a>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // AUTHENTICATED ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-24 pb-24 px-4 sm:px-8">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Top Bar Header */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                Portail Connecté • Session Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase font-['Space_Grotesk'] text-white">
              Gestion de la Plateforme ADN Dental
            </h1>
            <p className="text-xs text-zinc-400">
              Contrôle complet du catalogue de vente, devis clients, formations et documents techniques.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <a
              href="#/"
              target="_blank"
              rel="noreferrer"
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <span>Voir Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#FF6600]" />
            </a>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-[#FF6600]" />
              <span>Sauvegardes & MDP</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="bg-red-500/15 hover:bg-red-500 text-red-400 hover:text-white px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Verrouiller</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800">
          {[
            {
              id: 'products' as AdminTab,
              label: 'Équipements & Vente',
              icon: Package,
              count: products.length,
            },
            {
              id: 'inquiries' as AdminTab,
              label: 'Devis & CRM Leads',
              icon: MessageSquare,
              count: inquiries.length,
              badge: newInquiriesCount > 0 ? `${newInquiriesCount} Nouveaux` : undefined,
            },
            {
              id: 'news' as AdminTab,
              label: 'Actualités & Salons',
              icon: Newspaper,
              count: news.length,
            },
            {
              id: 'courses' as AdminTab,
              label: 'Formations Academy',
              icon: GraduationCap,
              count: courses.length,
            },
            {
              id: 'downloads' as AdminTab,
              label: 'Pilotes & SAV',
              icon: Download,
              count: downloads.length,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2.5 shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FF6600] text-white shadow-lg shadow-[#FF6600]/25'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-black/30 text-white' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {tab.count}
                </span>
                {tab.badge && (
                  <span className="bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div>
          {activeTab === 'products' && <AdminProductsTab />}
          {activeTab === 'inquiries' && <AdminInquiriesTab />}
          {activeTab === 'news' && <AdminNewsTab />}
          {activeTab === 'courses' && <AdminCoursesTab />}
          {activeTab === 'downloads' && <AdminDownloadsTab />}
        </div>

      </div>

      {/* Backup and Settings Modal */}
      <AdminBackupSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};
