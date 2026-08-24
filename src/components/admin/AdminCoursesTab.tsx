import React, { useState, useRef } from 'react';
import { useCatalog, compressImageFile } from '../../context/CatalogContext';
import { Course } from '../../types';
import { Plus, Trash2, Edit3, GraduationCap, Calendar, MapPin, Sparkles, X, Check, Users } from 'lucide-react';

export const AdminCoursesTab: React.FC = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useCatalog();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Course>({
    id: '',
    title: '',
    date: '15-16 Octobre 2026',
    duration: '2 Jours (Intensif)',
    location: 'ADN Academy - Rouïba, Alger',
    instructor: 'Expert CAD/CAM International',
    description: '',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    spots: '12 Places Max (Hands-on)',
    price: 'Sur Inscription',
    topics: [
      'Stratégies d\'usinage Zircone & PEEK',
      'Optimisation des connecteurs et nids d\'abeille MillBox',
      'Maquillage et frittage rapide avec Zubler Vario Press',
    ],
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
      id: `course-${Date.now().toString().slice(-6)}`,
      title: '',
      date: 'Novembre 2026',
      duration: '2 Jours (16 Heures)',
      location: 'ADN Dental Training Center, Rouïba Alger',
      instructor: 'Formateur Certifié DGSHAPE / Zubler',
      description: 'Formation pratique certifiante pour prothésistes et dentistes.',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
      spots: '10 Places',
      price: 'Certificat Inclus',
      topics: [
        'Prise en main logicielle MillBox & VPanel',
        'Gestion des disques multicouches Zirconia',
        'Maintenance préventive de la broche',
      ],
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Course) => {
    setEditingId(c.id);
    setFormData({ ...c });
    setIsModalOpen(true);
  };

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 1200, 800, 0.85);
        setFormData((prev) => ({ ...prev, image: compressed }));
        showToast('Image du workshop chargée !');
      } catch {
        alert('Erreur image.');
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Le titre de la formation est requis.');
      return;
    }

    if (editingId) {
      updateCourse(editingId, formData);
      showToast('Formation mise à jour !');
    } else {
      addCourse(formData);
      showToast('Nouvelle session de formation créée !');
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
            Sessions ADN Dental Academy
          </h2>
          <p className="text-xs text-zinc-400">
            Formations pratiques CAD/CAM, Masterclasses Zircone et ateliers céramique.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#FF6600] hover:bg-[#ff771c] text-white px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#FF6600]/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Créer une Session</span>
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between group"
          >
            <div>
              <div className="aspect-[16/9] bg-black relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#FF6600] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                  {course.duration}
                </span>
                <span className="absolute top-3 right-3 bg-black/80 text-zinc-300 text-[10px] font-mono px-2.5 py-1 rounded-md">
                  {course.spots}
                </span>
              </div>

              <div className="p-5 sm:p-6 space-y-3">
                <h3 className="text-lg font-black uppercase font-['Space_Grotesk'] text-white">
                  {course.title}
                </h3>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#FF6600]" />
                    <span>{course.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF6600]" />
                    <span className="truncate">{course.location}</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {course.description}
                </p>

                {course.topics && course.topics.length > 0 && (
                  <div className="pt-2">
                    <div className="text-[10px] uppercase font-black text-zinc-500 mb-1.5">Programme Clé :</div>
                    <ul className="space-y-1 text-xs text-zinc-300">
                      {course.topics.slice(0, 3).map((t, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6600]" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 sm:p-6 pt-0 border-t border-zinc-800 flex items-center justify-between mt-4">
              <span className="text-xs font-bold text-emerald-400">{course.price || 'Sur Inscription'}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(course)}
                  className="p-2 bg-zinc-800 hover:bg-[#FF6600] text-zinc-200 hover:text-white rounded-xl text-xs font-bold"
                  title="Modifier"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Supprimer la session "${course.title}" ?`)) {
                      deleteCourse(course.id);
                      showToast('Formation supprimée.');
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[140] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 text-white relative shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-black uppercase font-['Space_Grotesk'] text-white">
                {editingId ? 'Modifier la Formation' : 'Créer une Session de Formation'}
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
                <label className="text-[11px] font-bold uppercase text-zinc-300">Intitulé du Masterclass *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="ex. Maîtrise Complète DGSHAPE 53DC & MillBox 2026"
                  className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-zinc-300">Dates</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-zinc-300">Durée</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-zinc-300">Lieu (Showroom/Lab)</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-zinc-300">Places / Capacité</label>
                  <input
                    type="text"
                    value={formData.spots}
                    onChange={(e) => setFormData({ ...formData, spots: e.target.value })}
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

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-zinc-300">Image</label>
                <div className="flex items-center gap-3">
                  <img src={formData.image} alt="cover" className="w-16 h-12 object-cover rounded-lg border border-zinc-700" />
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
