import React, { useState, useRef } from 'react';
import { useCatalog } from '../../context/CatalogContext';
import {
  Download,
  Upload,
  HardDrive,
  KeyRound,
  RotateCcw,
  ShieldCheck,
  X,
  Check,
  AlertTriangle,
  FileCode2,
  Database
} from 'lucide-react';

interface AdminBackupSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminBackupSettingsModal: React.FC<AdminBackupSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    storageStats,
    exportFullBackup,
    importFullBackup,
    resetToDefaultCatalog,
    changeAdminPassword,
  } = useCatalog();

  const [activeSubTab, setActiveSubTab] = useState<'backup' | 'password' | 'reset'>('backup');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleExportJSON = () => {
    const jsonString = exportFullBackup();
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `adn_dental_full_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Fichier de sauvegarde complet exporté !');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const res = importFullBackup(text);
        if (res.success) {
          showToast(res.message);
        } else {
          alert(`Erreur d'import : ${res.message}`);
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePasteImport = () => {
    if (!jsonInput.trim()) {
      alert('Veuillez coller le JSON de sauvegarde.');
      return;
    }
    const res = importFullBackup(jsonInput);
    if (res.success) {
      showToast(res.message);
      setJsonInput('');
    } else {
      alert(`Erreur d'import : ${res.message}`);
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      alert('Le mot de passe doit contenir au moins 4 caractères.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    const success = changeAdminPassword(newPassword);
    if (success) {
      showToast('Mot de passe de sécurité mis à jour !');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      alert('Impossible de changer le mot de passe.');
    }
  };

  const handleFactoryReset = () => {
    if (
      confirm(
        'ATTENTION : Êtes-vous sûr de vouloir restaurer les paramètres d\'usine ? Cela réinitialisera tous les produits, news, cours et téléchargements par défaut.'
      )
    ) {
      resetToDefaultCatalog();
      showToast('Système réinitialisé aux valeurs d\'usine.');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 text-white relative shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-[160] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold uppercase flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{toast}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-[#FF6600]" />
            <h2 className="text-xl font-black uppercase font-['Space_Grotesk'] text-white">
              Sauvegardes & Paramètres Système
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Storage Health Gauge */}
        <div className="bg-black/60 border border-zinc-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-400 flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-[#FF6600]" />
              <span>Espace Mémoire Local Utilisé</span>
            </span>
            <span className="font-mono font-bold text-white">
              {storageStats.usedFormatted} ({storageStats.percentOfQuota}% du quota sécurisé)
            </span>
          </div>

          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                storageStats.percentOfQuota > 75 ? 'bg-red-500' : 'bg-[#FF6600]'
              }`}
              style={{ width: `${Math.max(2, storageStats.percentOfQuota)}%` }}
            />
          </div>
          <div className="text-[10px] text-zinc-500">
            Toutes les modifications du catalogue et leads sont stockées en mémoire locale protégée et persistante.
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex border-b border-zinc-800 gap-2">
          <button
            onClick={() => setActiveSubTab('backup')}
            className={`pb-3 px-3 text-xs font-bold uppercase transition-all ${
              activeSubTab === 'backup'
                ? 'text-[#FF6600] border-b-2 border-[#FF6600]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Sauvegarde JSON
          </button>
          <button
            onClick={() => setActiveSubTab('password')}
            className={`pb-3 px-3 text-xs font-bold uppercase transition-all ${
              activeSubTab === 'password'
                ? 'text-[#FF6600] border-b-2 border-[#FF6600]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Mot de passe Admin
          </button>
          <button
            onClick={() => setActiveSubTab('reset')}
            className={`pb-3 px-3 text-xs font-bold uppercase transition-all ${
              activeSubTab === 'reset'
                ? 'text-red-400 border-b-2 border-red-500'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Réinitialisation Usine
          </button>
        </div>

        {/* TAB 1: Backup & Restore */}
        {activeSubTab === 'backup' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Export */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black uppercase text-white flex items-center gap-1.5 mb-1">
                    <Download className="w-4 h-4 text-[#FF6600]" />
                    <span>Exporter Sauvegarde</span>
                  </h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Téléchargez un fichier .JSON complet contenant vos produits, leads clients, news et formations.
                  </p>
                </div>
                <button
                  onClick={handleExportJSON}
                  className="bg-[#FF6600] hover:bg-[#ff771c] text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger .JSON</span>
                </button>
              </div>

              {/* Import File */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black uppercase text-white flex items-center gap-1.5 mb-1">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Importer Fichier</span>
                  </h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Restaurez un fichier JSON de sauvegarde précédemment exporté.
                  </p>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Sélectionner Fichier</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </div>
            </div>

            {/* Paste JSON directly */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-zinc-400 flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5 text-[#FF6600]" />
                <span>Ou coller du code JSON directement :</span>
              </label>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Collez ici le contenu JSON complet..."
                rows={3}
                className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-xs font-mono text-zinc-300 focus:outline-none focus:border-[#FF6600]"
              />
              <div className="flex justify-end">
                <button
                  onClick={handlePasteImport}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase"
                >
                  Restaurer depuis le texte
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Change Password */}
        {activeSubTab === 'password' && (
          <form onSubmit={handlePasswordChange} className="space-y-4 animate-in fade-in duration-150">
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-1">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-[#FF6600]" />
                <span>Sécurité du Portail Staff</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Mot de passe par défaut : <span className="font-mono text-[#FF6600] font-bold">adn2026</span>
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-zinc-300">Nouveau Mot de Passe</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 4 caractères"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6600]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase text-zinc-300">Confirmer Nouveau Mot de Passe</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Répétez le mot de passe"
                className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6600]"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-[#FF6600] hover:bg-[#ff771c] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider"
              >
                Mettre à jour le mot de passe
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: Factory Reset */}
        {activeSubTab === 'reset' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-black text-sm uppercase">
                <AlertTriangle className="w-5 h-5" />
                <span>Zone Dangereuse : Réinitialisation Complète</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Cette opération remettra à zéro le catalogue officiel avec les produits initiaux (DWX-53DC, Zubler Vario Press, Castellini Puma ELI, etc.) et effacera les modifications personnalisées non sauvegardées.
              </p>
              <button
                onClick={handleFactoryReset}
                className="bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-red-900/30"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restaurer Valeurs d'Usine ADN Dental</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
