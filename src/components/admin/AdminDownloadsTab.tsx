import React, { useState } from 'react';
import { useCatalog } from '../../context/CatalogContext';
import { TechDownload } from '../../types';
import { Plus, Trash2, Edit3, Download, Wrench, Sparkles, X, Check, FileText } from 'lucide-react';

export const AdminDownloadsTab: React.FC = () => {
  const { downloads, addDownload, updateDownload, deleteDownload } = useCatalog();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<TechDownload>({
    id: '',
    title: '',
    brand: 'DGSHAPE',
    category: 'driver',
    fileSize: '45 MB',
    version: 'v4.2.0',
    description: '',
    downloadUrl: '#',
  });

  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      id: `dl-${Date.now().toString().slice(-6)}`,
      title: '',
      brand: 'DGSHAPE',
      category: 'driver',
      fileSize: '25 MB',
      version: 'v2026.1',
      description: 'Pilote et interface de contrôle officielle pour Windows 11 / 10.',
      downloadUrl: '#',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dl: TechDownload) => {
    setEditingId(dl.id);
    setFormData({ ...dl });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Le nom du fichier / pilote est requis.');
      return;
    }

    if (editingId) {
      updateDownload(editingId, formData);
      showToast('Fiche de téléchargement mise à jour !');
    } else {
      addDownload(formData);
      showToast('Nouveau fichier ajouté au centre de téléchargement !');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-[130] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold uppercase flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header action */}
      <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div>
          <h2 className="text-xl font-black uppercase font-['Space_Grotesk'] text-white">
            Pilotes & Manuels Techniques
          </h2>
          <p className="text-xs text-zinc-400">
            Fichiers logiciels VPanel, profils CAM MillBox, manuels SAV Zubler et Castellini mis à disposition des clients.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#FF6600] hover:bg-[#ff771c] text-white px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#FF6600]/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Ajouter un Fichier</span>
        </button>
      </div>

      {/* Downloads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {downloads.map((dl) => (
          <div
            key={dl.id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex items-start justify-between gap-4 shadow-lg hover:border-zinc-700 transition-all"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#FF6600] tracking-wider">
                <span>{dl.brand}</span>
                <span>•</span>
                <span>{dl.category}</span>
                <span>•</span>
                <span className="text-zinc-400">{dl.fileSize}</span>
                <span>•</span>
                <span className="text-emerald-400">{dl.version}</span>
              </div>

              <h3 className="text-base font-black uppercase font-['Space_Grotesk'] text-white">
                {dl.title}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {dl.description}
              </p>
            </div>

            <div className="flex items-center gap-1 shrink-0 pt-1">
              <button
                onClick={() => handleOpenEdit(dl)}
                className="p-2 bg-zinc-800 hover:bg-[#FF6600] text-zinc-300 hover:text-white rounded-xl text-xs"
                title="Modifier"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Supprimer "${dl.title}" ?`)) {
                    deleteDownload(dl.id);
                    showToast('Fichier supprimé.');
                  }
                }}
                className="p-2 bg-red-500/15 hover:bg-red-500 text-red-400 hover:text-white rounded-xl text-xs"
                title="Supprimer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[140] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 text-white relative shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-lg font-black uppercase font-['Space_Grotesk'] text-white">
                {editingId ? 'Modifier Fichier' : 'Ajouter Téléchargement SAV'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-zinc-300">Titre du logiciel / Manuel *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="ex. DGSHAPE VPanel 2026 for DWX-53DC"
                  className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-zinc-300">Marque</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-zinc-300">Type</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  >
                    <option value="driver">Pilote Windows (Driver)</option>
                    <option value="manual">Manuel Utilisateur PDF</option>
                    <option value="brochure">Brochure Commerciale</option>
                    <option value="profile">Profil d'usinage MillBox</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-zinc-300">Taille Fichier</label>
                  <input
                    type="text"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    placeholder="ex. 48.5 MB"
                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-zinc-300">Version</label>
                  <input
                    type="text"
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    placeholder="ex. v4.2.1 (Build 2026)"
                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-zinc-300">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full bg-black border border-zinc-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-[#FF6600] text-white px-5 py-2 rounded-xl text-xs font-bold uppercase"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
