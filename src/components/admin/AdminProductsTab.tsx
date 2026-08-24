import React, { useState, useRef } from 'react';
import { useCatalog, compressImageFile } from '../../context/CatalogContext';
import { Product, ProductSpec, StockStatus } from '../../types';
import {
  Plus,
  Trash2,
  Edit3,
  Copy,
  Search,
  Eye,
  Check,
  X,
  Star,
  Sparkles,
  SlidersHorizontal,
  UploadCloud,
  Layers,
  LayoutGrid,
  List,
  ChevronDown,
  CheckSquare,
  Square,
  AlertCircle
} from 'lucide-react';

const PRESET_IMAGES = [
  {
    name: 'Castellini Treatment Unit (Modern Clinic)',
    url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Castellini Treatment Chair & Lamp',
    url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Puma ELI Surgical Dental Unit',
    url: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'DGSHAPE 5-Axis Milling Hub',
    url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Zubler Ceramic Furnace Lab',
    url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Dental CAD/CAM Disc & Materials',
    url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Handpiece & Hygiene Maintenance',
    url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
  },
];

const SPEC_TEMPLATES: Record<string, ProductSpec[]> = {
  dgshape: [
    { label: 'Origin', value: 'Japan (Hamamatsu)' },
    { label: 'Number of Axes', value: '5-Axis Simultaneous (X, Y, Z, A, B)' },
    { label: 'Spindle Speed', value: '60,000 RPM (Brushless DC)' },
    { label: 'Disc Adapter / Changer', value: '6-Slot Automatic Disc Changer' },
    { label: 'Compatible Materials', value: 'Zirconia, Wax, PMMA, PEEK, Hybrid Ceramic' },
    { label: 'Air Pressure', value: '0.4 - 0.7 MPa' },
    { label: 'Warranty', value: '2-Year Official ADN Warranty' },
  ],
  zubler: [
    { label: 'Origin', value: 'Germany (Ulm)' },
    { label: 'Firing Chamber', value: 'Zubler Premium Quartz Glass Muffle' },
    { label: 'Press Technology', value: 'ADVANCED PRESS Sensor-Driven' },
    { label: 'Max Temperature', value: '1,200 °C' },
    { label: 'Display', value: '7-inch Touchscreen + USB Backup' },
    { label: 'Vacuum Level', value: 'High-Efficiency Oil-Free Pump' },
    { label: 'Warranty', value: '2-Year Official ADN Warranty' },
  ],
  castellini: [
    { label: 'Origin', value: 'Italy (Bologna)' },
    { label: 'Hydraulic System', value: 'Electro-hydraulic with soft-motion anti-drift' },
    { label: 'Control Console', value: '7" Capacitive HD Multi-touch Panel' },
    { label: 'Disinfection System', value: 'Autosteril Continuous Automatic Disinfection' },
    { label: 'Operating Light', value: 'Venus Plus-L LED (50,000 Lux)' },
    { label: 'Upholstery', value: 'Handmade Italian Memory Foam (Seamless)' },
    { label: 'Warranty', value: '2-Year Official ADN Warranty' },
  ],
};

const DEFAULT_NEW_PRODUCT: Product = {
  id: '',
  name: '',
  brand: 'DGSHAPE',
  brandLabel: 'DGSHAPE by Roland',
  category: 'milling',
  categoryLabel: '5-Axis Dental Milling Unit',
  tagline: '',
  description: '',
  fullOverview: '',
  image: PRESET_IMAGES[3].url,
  gallery: [],
  stockStatus: 'in_stock',
  priceNote: 'Sur Devis Immédiat',
  warranty: '2 Ans Garantie Officielle ADN',
  specs: SPEC_TEMPLATES.dgshape,
  features: [
    'Importation officielle exclusive et certifiée pour l\'Algérie',
    'Installation sur site, étalonnage et formation pratique par nos ingénieurs',
    'Disponibilité immédiate des pièces de rechange et fraises d\'origine',
  ],
  isFeatured: false,
};

export const AdminProductsTab: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    bulkDeleteProducts,
    bulkUpdateStockStatus,
    bulkToggleFeatured,
    toggleFeatured,
    duplicateProduct,
  } = useCatalog();

  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Multi-selection for bulk actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [formData, setFormData] = useState<Product>(DEFAULT_NEW_PRODUCT);
  const [previewTab, setPreviewTab] = useState<'form' | 'preview'>('form');
  const [customBrandInput, setCustomBrandInput] = useState('');
  const [customCategoryInput, setCustomCategoryInput] = useState('');

  // Delete modal
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [bulkDeleteConfirmOpen, setBulkDeleteConfirmOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Filtering
  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q);

    const matchBrand = selectedBrand === 'all' || p.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchCat = selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchSearch && matchBrand && matchCat;
  });

  const handleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((p) => p.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  // Open Create
  const handleOpenCreate = () => {
    setModalMode('add');
    const autoId = `item-${Date.now().toString().slice(-6)}`;
    setFormData({
      ...DEFAULT_NEW_PRODUCT,
      id: autoId,
    });
    setPreviewTab('form');
    setCustomBrandInput('');
    setCustomCategoryInput('');
    setIsModalOpen(true);
  };

  // Open Edit
  const handleOpenEdit = (p: Product) => {
    setModalMode('edit');
    setFormData(JSON.parse(JSON.stringify(p)));
    setPreviewTab('form');
    setCustomBrandInput(!['DGSHAPE', 'Zubler', 'Castellini'].includes(p.brand) ? p.brand : '');
    setCustomCategoryInput(
      !['milling', 'furnaces', 'suction', 'units', 'materials', 'hygiene'].includes(p.category) ? p.category : ''
    );
    setIsModalOpen(true);
  };

  // Upload main image with compression
  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 1200, 1200, 0.85);
        setFormData((prev) => ({ ...prev, image: compressed }));
        showToast('Photo principale optimisée et chargée !');
      } catch {
        alert('Erreur lors du chargement de l\'image.');
      }
    }
  };

  // Upload gallery photo
  const handleGalleryFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 1200, 1200, 0.85);
        setFormData((prev) => ({
          ...prev,
          gallery: [...(prev.gallery || []), compressed],
        }));
        showToast('Photo de galerie ajoutée !');
      } catch {
        alert('Erreur lors de l\'ajout de la photo.');
      }
    }
  };

  const applyTemplate = (key: 'dgshape' | 'zubler' | 'castellini') => {
    const specs = SPEC_TEMPLATES[key] || [];
    setFormData((prev) => ({
      ...prev,
      specs: JSON.parse(JSON.stringify(specs)),
    }));
    showToast(`Modèle de caractéristiques "${key.toUpperCase()}" appliqué !`);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Le nom de l\'équipement est obligatoire.');
      return;
    }

    let finalId = formData.id.trim();
    if (!finalId) {
      finalId = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    const finalBrand = customBrandInput.trim() || formData.brand;
    const finalCategory = customCategoryInput.trim() || formData.category;

    const payload: Product = {
      ...formData,
      id: finalId,
      brand: finalBrand,
      category: finalCategory,
      gallery: formData.gallery && formData.gallery.length > 0 ? formData.gallery : [formData.image],
    };

    if (modalMode === 'add') {
      const exists = products.some((p) => p.id === payload.id);
      if (exists) {
        payload.id = `${payload.id}-${Date.now().toString().slice(-4)}`;
      }
      addProduct(payload);
      showToast(`Équipement "${payload.name}" ajouté avec succès !`);
    } else {
      updateProduct(payload.id, payload);
      showToast(`Équipement "${payload.name}" mis à jour !`);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[130] bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2.5">
          <Check className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Action and Search Toolbar */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par modèle, marque, catégorie, mot-clé..."
              className="w-full bg-black/60 border border-zinc-800 rounded-2xl pl-11 pr-10 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF6600] transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* View mode toggle */}
            <div className="bg-black/60 border border-zinc-800 rounded-xl p-1 flex items-center">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-xs transition-colors ${
                  viewMode === 'grid' ? 'bg-[#FF6600] text-white' : 'text-zinc-400 hover:text-white'
                }`}
                title="Grille"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg text-xs transition-colors ${
                  viewMode === 'table' ? 'bg-[#FF6600] text-white' : 'text-zinc-400 hover:text-white'
                }`}
                title="Tableau liste"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleOpenCreate}
              className="bg-[#FF6600] hover:bg-[#ff771c] text-white px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#FF6600]/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Ajouter Équipement</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 mr-1">
              Marque:
            </span>
            {[
              { id: 'all', label: 'Toutes' },
              { id: 'dgshape', label: 'DGSHAPE' },
              { id: 'zubler', label: 'Zubler' },
              { id: 'castellini', label: 'Castellini' },
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBrand(b.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedBrand === b.id
                    ? 'bg-[#FF6600] text-white'
                    : 'bg-zinc-800/80 text-zinc-400 hover:text-white'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-zinc-400 font-bold">
            <span className="text-white">{filtered.length}</span> sur {products.length} équipements
          </div>
        </div>

        {/* Bulk Action Bar (when items are selected) */}
        {selectedIds.length > 0 && (
          <div className="bg-[#FF6600]/10 border border-[#FF6600]/30 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF6600]">
              <CheckSquare className="w-4 h-4" />
              <span>{selectedIds.length} sélectionné(s)</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Set stock */}
              <button
                onClick={() => {
                  bulkUpdateStockStatus(selectedIds, 'in_stock');
                  showToast('Statut mis à jour : En Stock Alger');
                }}
                className="bg-zinc-800 hover:bg-zinc-700 text-xs px-3 py-1.5 rounded-xl font-bold text-emerald-400"
              >
                En Stock
              </button>
              <button
                onClick={() => {
                  bulkUpdateStockStatus(selectedIds, 'on_order');
                  showToast('Statut mis à jour : Sur Commande');
                }}
                className="bg-zinc-800 hover:bg-zinc-700 text-xs px-3 py-1.5 rounded-xl font-bold text-amber-400"
              >
                Sur Commande
              </button>

              {/* Feature / Unfeature */}
              <button
                onClick={() => {
                  bulkToggleFeatured(selectedIds, true);
                  showToast('Éléments mis en vedette accueil');
                }}
                className="bg-zinc-800 hover:bg-zinc-700 text-xs px-3 py-1.5 rounded-xl font-bold text-yellow-300"
              >
                ★ Mettre en Vedette
              </button>

              {/* Bulk Delete */}
              <button
                onClick={() => setBulkDeleteConfirmOpen(true)}
                className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Supprimer</span>
              </button>

              <button
                onClick={() => setSelectedIds([])}
                className="text-zinc-400 hover:text-white text-xs px-2"
              >
                Désélectionner
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Display (Grid or Table) */}
      {filtered.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-zinc-500 mx-auto" />
          <h3 className="text-lg font-bold text-white uppercase font-['Space_Grotesk']">
            Aucun équipement trouvé
          </h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Ajustez vos filtres de recherche ou ajoutez un nouvel équipement au catalogue.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className={`bg-zinc-900 border ${
                selectedIds.includes(p.id) ? 'border-[#FF6600] ring-1 ring-[#FF6600]' : 'border-zinc-800 hover:border-zinc-700'
              } rounded-3xl p-5 flex flex-col justify-between space-y-4 transition-all shadow-lg group relative overflow-hidden`}
            >
              <div className="space-y-3.5">
                {/* Image and badges */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black border border-zinc-800">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Multi-select checkbox */}
                  <button
                    onClick={() => toggleSelectOne(p.id)}
                    className="absolute top-3 left-3 z-10 p-1.5 rounded-lg bg-black/70 backdrop-blur-md text-white hover:text-[#FF6600] transition-colors"
                  >
                    {selectedIds.includes(p.id) ? (
                      <CheckSquare className="w-4 h-4 text-[#FF6600]" />
                    ) : (
                      <Square className="w-4 h-4 text-zinc-400" />
                    )}
                  </button>

                  {/* Brand badge */}
                  <div className="absolute top-3 left-12 flex flex-wrap gap-1.5">
                    <span className="bg-black/85 backdrop-blur-md text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-white/10">
                      {p.brand}
                    </span>
                  </div>

                  {/* Featured star */}
                  <button
                    onClick={() => toggleFeatured(p.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                      p.isFeatured
                        ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30'
                        : 'bg-black/60 text-zinc-400 hover:text-white'
                    }`}
                    title={p.isFeatured ? 'En vedette accueil' : 'Non en vedette'}
                  >
                    <Star className={`w-3.5 h-3.5 ${p.isFeatured ? 'fill-current' : ''}`} />
                  </button>

                  {/* Stock status indicator */}
                  <div className="absolute bottom-2.5 left-3">
                    <span
                      className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-md ${
                        p.stockStatus === 'on_order'
                          ? 'bg-amber-500/90 text-black'
                          : p.stockStatus === 'showroom_demo'
                          ? 'bg-blue-500/90 text-white'
                          : 'bg-emerald-500/90 text-white'
                      }`}
                    >
                      {p.stockStatus === 'on_order'
                        ? 'Sur Commande'
                        : p.stockStatus === 'showroom_demo'
                        ? 'Démo Showroom Rouïba'
                        : 'En Stock Alger'}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-lg font-black uppercase font-['Space_Grotesk'] text-white truncate">
                    {p.name}
                  </h3>
                  <p className="text-zinc-400 text-xs line-clamp-2 mt-1">
                    {p.tagline || p.description}
                  </p>
                </div>

                {/* Specs count */}
                <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                  <span className="bg-zinc-800/80 px-2 py-0.5 rounded">
                    {p.specs?.length || 0} Caractéristiques
                  </span>
                  <span className="bg-zinc-800/80 px-2 py-0.5 rounded">
                    {p.features?.length || 0} Avantages
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="bg-zinc-800 hover:bg-[#FF6600] text-zinc-200 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Modifier</span>
                  </button>

                  <button
                    onClick={() => duplicateProduct(p.id)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 p-2 rounded-xl text-xs transition-colors"
                    title="Dupliquer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`#/product/${p.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 p-2 rounded-xl text-xs transition-colors"
                    title="Voir fiche publique"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </a>
                </div>

                <button
                  onClick={() => setProductToDelete(p)}
                  className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white p-2 rounded-xl text-xs transition-colors cursor-pointer"
                  title="Supprimer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE LIST VIEW */
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-black/60 text-zinc-400 font-extrabold uppercase tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="p-4 w-10">
                    <button onClick={handleSelectAll}>
                      {selectedIds.length === filtered.length && filtered.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-[#FF6600]" />
                      ) : (
                        <Square className="w-4 h-4 text-zinc-500" />
                      )}
                    </button>
                  </th>
                  <th className="p-4">Équipement</th>
                  <th className="p-4">Marque</th>
                  <th className="p-4">Catégorie</th>
                  <th className="p-4">Disponibilité</th>
                  <th className="p-4">Vedette</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="p-4">
                      <button onClick={() => toggleSelectOne(p.id)}>
                        {selectedIds.includes(p.id) ? (
                          <CheckSquare className="w-4 h-4 text-[#FF6600]" />
                        ) : (
                          <Square className="w-4 h-4 text-zinc-500" />
                        )}
                      </button>
                    </td>
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-10 object-cover rounded-lg bg-black border border-zinc-800 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-white text-sm">{p.name}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">{p.id}</div>
                      </div>
                    </td>
                    <td className="p-4 font-bold">{p.brand}</td>
                    <td className="p-4 text-zinc-400">{p.categoryLabel || p.category}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          p.stockStatus === 'on_order'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-emerald-500/20 text-emerald-400'
                        }`}
                      >
                        {p.stockStatus === 'on_order' ? 'Sur Commande' : 'En Stock Alger'}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleFeatured(p.id)}
                        className={`p-1.5 rounded-lg ${
                          p.isFeatured ? 'text-amber-400' : 'text-zinc-600 hover:text-zinc-400'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${p.isFeatured ? 'fill-current' : ''}`} />
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-white"
                        title="Modifier"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => duplicateProduct(p.id)}
                        className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-white"
                        title="Dupliquer"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setProductToDelete(p)}
                        className="p-1.5 hover:bg-red-500/20 rounded-lg text-red-400"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================================================
          ADD / EDIT MODAL (WITH LIVE PREVIEW & AUTO-SPECS)
         ===================================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[140] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-4xl rounded-3xl p-6 sm:p-8 text-white relative shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Header with Preview toggle */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6 sticky -top-6 bg-zinc-900/95 backdrop-blur-md z-20 -mx-6 px-6 sm:-mx-8 sm:px-8">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FF6600] block mb-0.5">
                  {modalMode === 'add' ? 'Nouvel Équipement' : `Modification : ${formData.name}`}
                </span>
                <h2 className="text-xl sm:text-2xl font-black uppercase font-['Space_Grotesk'] text-white">
                  {modalMode === 'add' ? 'Ajouter au catalogue ADN' : 'Mettre à jour les données techniques'}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-black/60 border border-zinc-800 rounded-xl p-1 flex">
                  <button
                    type="button"
                    onClick={() => setPreviewTab('form')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${
                      previewTab === 'form' ? 'bg-[#FF6600] text-white' : 'text-zinc-400'
                    }`}
                  >
                    Formulaire
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab('preview')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${
                      previewTab === 'preview' ? 'bg-[#FF6600] text-white' : 'text-zinc-400'
                    }`}
                  >
                    Aperçu Live
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {previewTab === 'preview' ? (
              /* LIVE PREVIEW VIEW */
              <div className="space-y-6 animate-in fade-in duration-150">
                <div className="bg-white text-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="aspect-square bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-200">
                      <img src={formData.image} alt={formData.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="space-y-4">
                      <div className="inline-block bg-[#FF6600]/10 text-[#FF6600] font-black text-xs px-3 py-1 rounded-full uppercase">
                        {formData.brand} • {formData.categoryLabel || formData.category}
                      </div>
                      <h1 className="text-3xl font-black uppercase font-['Space_Grotesk'] text-zinc-900">
                        {formData.name || 'Nom de l\'appareil'}
                      </h1>
                      <p className="text-zinc-600 text-sm">{formData.tagline || formData.description}</p>
                      
                      <div className="pt-4 border-t border-zinc-200 space-y-2">
                        <div className="text-xs font-black uppercase tracking-wider text-zinc-800">
                          Spécifications techniques ({formData.specs?.length || 0}) :
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {formData.specs?.map((s, idx) => (
                            <div key={idx} className="bg-zinc-50 p-2 rounded-lg border border-zinc-200">
                              <span className="text-zinc-400 font-bold block text-[10px]">{s.label}</span>
                              <span className="font-bold text-zinc-900">{s.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setPreviewTab('form')}
                    className="bg-zinc-800 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase"
                  >
                    Retour aux champs
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="bg-[#FF6600] text-white px-6 py-3 rounded-xl text-xs font-black uppercase"
                  >
                    Enregistrer l'équipement
                  </button>
                </div>
              </div>
            ) : (
              /* FORM FIELDS */
              <form onSubmit={handleSave} className="space-y-8">
                
                {/* 1. Core Info */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 flex items-center gap-2 border-b border-zinc-800 pb-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#FF6600]" />
                    <span>1. Informations Générales</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                        Nom de l'équipement *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="ex. DWX-53DC Plus, Castellini Skema 8, Zubler Vario Press 300..."
                        className="w-full bg-black/60 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                        Identifiant URL (Slug) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.id}
                        onChange={(e) => setFormData({ ...formData, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                        className="w-full bg-black/60 border border-zinc-700 rounded-xl px-4 py-3 text-sm font-mono text-zinc-300 focus:outline-none focus:border-[#FF6600]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                        Marque constructeur
                      </label>
                      <select
                        value={['DGSHAPE', 'Zubler', 'Castellini'].includes(formData.brand) ? formData.brand : 'custom'}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === 'custom') {
                            setFormData({ ...formData, brand: '' });
                          } else {
                            setFormData({
                              ...formData,
                              brand: val,
                              brandLabel: val === 'DGSHAPE' ? 'DGSHAPE by Roland' : val === 'Zubler' ? 'Zubler Germany' : 'Castellini Italy',
                            });
                          }
                        }}
                        className="w-full bg-black/60 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                      >
                        <option value="DGSHAPE">DGSHAPE by Roland (Japon)</option>
                        <option value="Zubler">Zubler Dental (Allemagne)</option>
                        <option value="Castellini">Castellini Dental (Italie)</option>
                        <option value="custom">+ Autre marque personnalisée</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                        Disponibilité & Stock
                      </label>
                      <select
                        value={formData.stockStatus || 'in_stock'}
                        onChange={(e) => setFormData({ ...formData, stockStatus: e.target.value as StockStatus })}
                        className="w-full bg-black/60 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                      >
                        <option value="in_stock">En Stock (Showroom Rouïba Alger)</option>
                        <option value="on_order">Disponible sur Commande Usine</option>
                        <option value="showroom_demo">Unité Démo Showroom</option>
                        <option value="new_arrival">Nouveauté 2026</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                        Garantie Fournie
                      </label>
                      <input
                        type="text"
                        value={formData.warranty || '2 Ans Garantie Officielle ADN'}
                        onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                        className="w-full bg-black/60 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                        Accroche / Slogan court
                      </label>
                      <input
                        type="text"
                        value={formData.tagline}
                        onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                        placeholder="ex. Usineuse 5 axes haute précision avec changeur 6 disques"
                        className="w-full bg-black/60 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6600]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Images & Upload */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 flex items-center gap-2 border-b border-zinc-800 pb-2">
                    <UploadCloud className="w-4 h-4 text-[#FF6600]" />
                    <span>2. Photographies & Médias</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                        Photo Principale
                      </label>
                      <div className="flex items-center gap-3">
                        <img
                          src={formData.image}
                          alt="preview"
                          className="w-20 h-16 object-cover rounded-xl border border-zinc-700 bg-black"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                        >
                          Téléverser depuis l'appareil
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageFile}
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                        Photos d'angles / Galerie ({formData.gallery?.length || 0})
                      </label>
                      <button
                        type="button"
                        onClick={() => galleryInputRef.current?.click()}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                      >
                        + Ajouter une photo de galerie
                      </button>
                      <input
                        ref={galleryInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleGalleryFile}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Specs & Autofill Templates */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#FF6600]" />
                      <span>3. Fiche Technique & Spécifications</span>
                    </h3>

                    {/* Auto-fill buttons */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold">Auto-remplir :</span>
                      <button
                        type="button"
                        onClick={() => applyTemplate('dgshape')}
                        className="text-[10px] bg-zinc-800 hover:bg-[#FF6600] px-2 py-1 rounded text-zinc-300 hover:text-white font-bold uppercase"
                      >
                        DGSHAPE
                      </button>
                      <button
                        type="button"
                        onClick={() => applyTemplate('zubler')}
                        className="text-[10px] bg-zinc-800 hover:bg-[#FF6600] px-2 py-1 rounded text-zinc-300 hover:text-white font-bold uppercase"
                      >
                        Zubler
                      </button>
                      <button
                        type="button"
                        onClick={() => applyTemplate('castellini')}
                        className="text-[10px] bg-zinc-800 hover:bg-[#FF6600] px-2 py-1 rounded text-zinc-300 hover:text-white font-bold uppercase"
                      >
                        Castellini
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-2">
                    {formData.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={spec.label}
                          onChange={(e) => {
                            const newSpecs = [...formData.specs];
                            newSpecs[idx].label = e.target.value;
                            setFormData({ ...formData, specs: newSpecs });
                          }}
                          placeholder="Caractéristique"
                          className="flex-1 bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) => {
                            const newSpecs = [...formData.specs];
                            newSpecs[idx].value = e.target.value;
                            setFormData({ ...formData, specs: newSpecs });
                          }}
                          placeholder="Valeur technique"
                          className="flex-1 bg-black/60 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              specs: formData.specs.filter((_, i) => i !== idx),
                            });
                          }}
                          className="p-2 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          specs: [...formData.specs, { label: 'Spécification', value: 'Détails' }],
                        })
                      }
                      className="text-xs text-[#FF6600] font-bold uppercase hover:underline pt-2 block"
                    >
                      + Ajouter une ligne de spécification
                    </button>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured || false}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 rounded text-[#FF6600] bg-black border-zinc-700"
                    />
                    <span className="text-xs font-bold text-amber-300">★ Mettre en vedette sur l'accueil</span>
                  </label>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-zinc-800 text-zinc-300 px-5 py-3 rounded-xl text-xs font-bold uppercase cursor-pointer"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="bg-[#FF6600] hover:bg-[#ff771c] text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 max-w-md w-full rounded-3xl p-6 text-white space-y-4">
            <h3 className="text-lg font-black uppercase text-red-400 flex items-center gap-2 font-['Space_Grotesk']">
              <Trash2 className="w-5 h-5" />
              <span>Confirmer la suppression</span>
            </h3>
            <p className="text-xs text-zinc-300">
              Êtes-vous sûr de vouloir supprimer définitivement l'équipement{' '}
              <strong className="text-white">"{productToDelete.name}"</strong> du catalogue ?
            </p>
            <div className="flex justify-end gap-2.5 pt-4 border-t border-zinc-800">
              <button
                onClick={() => setProductToDelete(null)}
                className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-xl text-xs font-bold"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  deleteProduct(productToDelete.id);
                  setProductToDelete(null);
                  showToast(`Équipement supprimé.`);
                }}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                Oui, supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Confirmation Modal */}
      {bulkDeleteConfirmOpen && (
        <div className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 max-w-md w-full rounded-3xl p-6 text-white space-y-4">
            <h3 className="text-lg font-black uppercase text-red-400 flex items-center gap-2 font-['Space_Grotesk']">
              <Trash2 className="w-5 h-5" />
              <span>Suppression Multiple</span>
            </h3>
            <p className="text-xs text-zinc-300">
              Confirmez la suppression de ces <strong className="text-white">{selectedIds.length}</strong> équipements sélectionnés ?
            </p>
            <div className="flex justify-end gap-2.5 pt-4 border-t border-zinc-800">
              <button
                onClick={() => setBulkDeleteConfirmOpen(false)}
                className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-xl text-xs font-bold"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  bulkDeleteProducts(selectedIds);
                  setSelectedIds([]);
                  setBulkDeleteConfirmOpen(false);
                  showToast(`Équipements supprimés.`);
                }}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                Supprimer {selectedIds.length} éléments
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
