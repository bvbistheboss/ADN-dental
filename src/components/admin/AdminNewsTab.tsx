import React, { useState, useRef } from 'react';
import { useCatalog, compressImageFile } from '../../context/CatalogContext';
import { NewsArticle } from '../../types';
import { Plus, Trash2, Edit3, Newspaper, Calendar, Sparkles, X, Check } from 'lucide-react';

export const AdminNewsTab: React.FC = () => {
  const { news, addNews, updateNews, deleteNews } = useCatalog();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<NewsArticle>({
    id: '',
    title: '',
    category: 'Salon & Expo',
    date: new Date().toLocaleDateString('fr-FR'),
    summary: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
    author: 'ADN Dental Editorial',
  });
  const [toast, setToast] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      id: `news-${Date.now().toString().slice(-6)}`,
      title: '',
      category: 'Exposition & Nouveautés',
      date: new Date().toLocaleDateString('fr-FR'),
      summary: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
      author: 'ADN Dental Alger',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: NewsArticle) => {
    setEditingId(item.id);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 1200, 800, 0.85);
        setFormData((prev) => ({ ...prev, image: compressed }));
        showToast('Image optimisée chargée !');
      } catch {
        alert('Erreur de chargement d\'image.');
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Le titre est requis.');
      return;
    }

    if (editingId) {
      updateNews(editingId, formData);
      showToast('Article mis à jour !');
    } else {
      addNews(formData);
      showToast('Nouvel article publié !');
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
            Actualités & Annonces Officielles
          </h2>
          <p className="text-xs text-zinc-400">
            Gérez les articles d'expositions (SIAD, DentiExpo), lancements de machines et annonces ADN Dental.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#FF6600] hover:bg-[#ff771c] text-white px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#FF6600]/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Rédiger un Article</span>
        </button>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between group"
          >
            <div>
              <div className="aspect-video bg-black relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-black/80 text-[#FF6600] text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                  {item.category}
                </span>
                <span className="absolute top-3 right-3 bg-black/80 text-zinc-300 text-[10px] font-mono px-2.5 py-1 rounded-md">
                  {item.date}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-base font-black uppercase font-['Space_Grotesk'] text-white line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-zinc-800/80 flex items-center justify-between mt-4">
              <span className="text-[10px] text-zinc-500 font-mono">Par {item.author}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 bg-zinc-800 hover:bg-[#FF6600] text-zinc-200 hover:text-white rounded-xl text-xs"
                  title="Modifier"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Supprimer l'article "${item.title}" ?`)) {
                      deleteNews(item.id);
                      showToast('Article supprimé.');
                    }
                  }}
                  className="p-2 bg-red-500/15 hover:bg-red-500 text-red-400 hover:text-white rounded-xl text-xs"
                  title="Supprimer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create News Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[140] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 text-white relative shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-black uppercase font-['Space_Grotesk'] text-white">
                {editingId ? 'Modifier l\'Article' : 'Rédiger une Actualité ADN Dental'}
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
                <label className="text-[11px] font-bold uppercase text-zinc-300">Titre de l'article *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="ex. ADN Dental au SIAD Alger 2026 : Démonstration live DWX-53DC"
                  className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-zinc-300">Catégorie</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-zinc-300">Date d'affichage</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-zinc-300">Résumé court</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={2}
                  className="w-full bg-black border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#FF6600]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-zinc-300">Image de couverture</label>
                <div className="flex items-center gap-3">
                  <img
                    src={formData.image}
                    alt="cover"
                    className="w-16 h-12 object-cover rounded-lg border border-zinc-700"
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl text-xs font-bold"
                  >
                    Changer l'image
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
                </div>
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
                  Publier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
