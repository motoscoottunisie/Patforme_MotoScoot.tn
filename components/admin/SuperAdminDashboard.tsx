
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Wrench, 
  Database, 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  LogOut,
  MapPin,
  TrendingUp,
  Tag,
  X,
  Save,
  AlertCircle,
  Image as ImageIcon,
  UploadCloud,
  Link as LinkIcon,
  Phone,
  Globe,
  Mail,
  Clock,
  Star,
  Bike,
  Layers,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Bell
} from 'lucide-react';
import { mockArticles, mockTips, mockGarages, popularModels, brandsMoto } from '../../data/mockData';
import { Article, Garage, Tip } from '../../types';

// --- TYPES ---
type ModalMode = 'create' | 'edit' | null;
type EntityType = 'garage' | 'article' | 'tip' | 'brand' | 'model';
type VehicleType = 'Moto' | 'Scooter' | 'Accessoires';

// --- SUB-COMPONENTS ---

const StatCard = ({ label, value, change, icon: Icon, color, bg }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
        <Icon size={64} />
    </div>
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`p-3 rounded-xl ${bg} ${color}`}>
        <Icon size={22} />
      </div>
      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${change.startsWith('+') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
        {change}
      </span>
    </div>
    <div className="relative z-10">
        <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
        <p className="text-sm text-gray-500 font-bold mt-1">{label}</p>
    </div>
  </div>
);

const SimpleLineChart = ({ data, color = "#E6580B" }: { data: number[], color?: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((val - min) / (max - min)) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full h-48 relative mt-4">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon
          fill="url(#gradient)"
          points={`0,100 ${points} 100,100`}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* Tooltip hint lines (static for demo) */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px border-l border-dashed border-gray-300"></div>
    </div>
  );
};

// --- MAIN COMPONENT ---

interface SuperAdminDashboardProps {
  onGoHome: () => void;
  onLogout: () => void;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onGoHome, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'garages' | 'metadata'>('overview');
  
  // --- LOCAL STATE ---
  const [garages, setGarages] = useState<Garage[]>(mockGarages);
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [tips, setTips] = useState<Tip[]>(mockTips);
  
  // Brands & Models State
  const [brands, setBrands] = useState<{name: string, type: VehicleType}[]>([
    ...brandsMoto.map(b => ({ name: b, type: 'Moto' as VehicleType })),
    { name: 'Vespa', type: 'Scooter' },
    { name: 'Piaggio', type: 'Scooter' },
    { name: 'Sym', type: 'Scooter' },
    { name: 'Shark', type: 'Accessoires' },
    { name: 'Alpinestars', type: 'Accessoires' },
    { name: 'Bering', type: 'Accessoires' },
    { name: 'LS2', type: 'Accessoires' }
  ]);

  const [models, setModels] = useState<any[]>([
    ...popularModels.map(m => ({ ...m, type: 'Moto' as VehicleType })),
    { id: 99, name: 'GTS 300', brand: 'Vespa', type: 'Scooter', price: '22 000 DT', image: '' },
    { id: 100, name: 'Evo-GT', brand: 'Shark', type: 'Accessoires', price: '1 200 DT', image: '' }
  ]);
  
  // UI States
  const [contentTab, setContentTab] = useState<'news' | 'tips'>('news');
  const [metadataType, setMetadataType] = useState<VehicleType>('Moto');
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'pending'>('all');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [currentEntity, setCurrentEntity] = useState<EntityType>('garage');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Notification
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Reset pagination when tab or filters change
  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery("");
    setStatusFilter('all');
  }, [activeTab, contentTab, metadataType]);

  // --- CRUD HANDLERS ---

  const handleOpenModal = (entity: EntityType, mode: ModalMode, item: any = null) => {
    setCurrentEntity(entity);
    setModalMode(mode);
    // Default values for creating items in Metadata view based on current tab
    if (mode === 'create' && (entity === 'brand' || entity === 'model')) {
        setSelectedItem({ type: metadataType });
    } else {
        setSelectedItem(item);
    }
    setIsModalOpen(true);
  };

  const handleSave = (formData: any) => {
    if (currentEntity === 'garage') {
      if (modalMode === 'create') {
        const newGarage = { ...formData, id: Date.now(), rating: 0, reviewsCount: 0 };
        setGarages([newGarage, ...garages]);
        showNotification("Garage ajouté avec succès");
      } else {
        setGarages(garages.map(g => g.id === selectedItem.id ? { ...g, ...formData } : g));
        showNotification("Garage modifié avec succès");
      }
    } 
    else if (currentEntity === 'article') {
      if (modalMode === 'create') {
        const newArticle = { ...formData, id: Date.now(), date: new Date().toLocaleDateString() };
        setArticles([newArticle, ...articles]);
        showNotification("Article publié");
      } else {
        setArticles(articles.map(a => a.id === selectedItem.id ? { ...a, ...formData } : a));
        showNotification("Article mis à jour");
      }
    }
    else if (currentEntity === 'tip') {
      if (modalMode === 'create') {
        const newTip = { ...formData, id: Date.now(), date: new Date().toLocaleDateString() };
        setTips([newTip, ...tips]);
        showNotification("Conseil ajouté");
      } else {
        setTips(tips.map(t => t.id === selectedItem.id ? { ...t, ...formData } : t));
        showNotification("Conseil mis à jour");
      }
    }
    else if (currentEntity === 'brand') {
       if (modalMode === 'create') {
          if (!brands.some(b => b.name === formData.name && b.type === formData.type)) {
             setBrands([...brands, { name: formData.name, type: formData.type }]);
             showNotification(`Marque ${formData.type} ajoutée`);
          } else {
             showNotification("Cette marque existe déjà", "error");
             return; 
          }
       }
    }
    else if (currentEntity === 'model') {
        if (modalMode === 'create') {
            const newModel = { ...formData, id: Date.now() };
            setModels([...models, newModel]);
            showNotification("Modèle ajouté");
        } else {
            setModels(models.map(m => m.id === selectedItem.id ? { ...m, ...formData } : m));
            showNotification("Modèle mis à jour");
        }
    }
    setIsModalOpen(false);
  };

  const handleDelete = (entity: EntityType, id: number | string, extraParam?: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.")) {
      if (entity === 'garage') setGarages(garages.filter(g => g.id !== id));
      else if (entity === 'article') setArticles(articles.filter(a => a.id !== id));
      else if (entity === 'tip') setTips(tips.filter(t => t.id !== id));
      else if (entity === 'brand') setBrands(brands.filter(b => !(b.name === id && b.type === extraParam)));
      else if (entity === 'model') setModels(models.filter(m => m.id !== id));
      
      showNotification("Élément supprimé", "success");
    }
  };

  // --- REUSABLE PAGINATION COMPONENT ---
  const Pagination = ({ totalItems }: { totalItems: number }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
         <span className="text-xs text-gray-500 font-medium">
            Affichage {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} sur {totalItems}
         </span>
         <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
               <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1">
               {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-gray-900 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                     {i + 1}
                  </button>
               ))}
            </div>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
               <ChevronRight size={16} />
            </button>
         </div>
      </div>
    );
  };

  // --- VIEWS ---

  const AnalyticsView = () => (
    <div className="space-y-8 animate-fade-in-up">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Visiteurs Uniques" value="45,200" change="+12%" icon={Users} color="text-blue-600" bg="bg-blue-50" />
        <StatCard label="Garages Partenaires" value={garages.length.toString()} change="+2" icon={Wrench} color="text-orange-600" bg="bg-orange-50" />
        <StatCard label="Contenus Publiés" value={(articles.length + tips.length).toString()} change="+5" icon={FileText} color="text-purple-600" bg="bg-purple-50" />
        <StatCard label="Taux de Rebond" value="32%" change="-2%" icon={TrendingUp} color="text-green-600" bg="bg-green-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Traffic Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="font-bold text-gray-900 text-xl">Trafic Global</h3>
               <p className="text-sm text-gray-500 mt-1">Aperçu des performances sur 30 jours</p>
            </div>
            <select className="bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 rounded-xl px-4 py-2.5 outline-none cursor-pointer hover:bg-gray-100 transition-colors">
              <option>30 derniers jours</option>
              <option>Cette année</option>
            </select>
          </div>
          <SimpleLineChart data={[10, 25, 20, 35, 30, 45, 40, 60, 55, 75, 70, 90]} />
          <div className="flex justify-between mt-6 text-xs font-bold text-gray-400">
            <span>1 Jan</span><span>10 Jan</span><span>20 Jan</span><span>30 Jan</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="font-bold text-gray-900 text-xl mb-6">Activité Récente</h3>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
             {[1,2,3,4,5].map((i) => (
                <div key={i} className="flex gap-4 items-start group">
                   <div className="w-2 h-2 mt-2 rounded-full bg-primary-600 ring-4 ring-primary-50 group-hover:ring-primary-100 transition-all"></div>
                   <div>
                      <p className="text-sm font-medium text-gray-900">Nouveau garage inscrit</p>
                      <p className="text-xs text-gray-500 mt-0.5">Garage Moto Expert • Tunis</p>
                      <span className="text-[10px] text-gray-400 block mt-1">Il y a {i} heures</span>
                   </div>
                </div>
             ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
             Voir tout l'historique
          </button>
        </div>
      </div>
    </div>
  );

  const GarageManagerView = () => {
    const filteredGarages = useMemo(() => {
        return garages.filter(g => 
            (statusFilter === 'all' || (statusFilter === 'verified' && g.isVerified) || (statusFilter === 'pending' && !g.isVerified)) &&
            (g.name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [garages, statusFilter, searchQuery]);

    const paginatedGarages = filteredGarages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
      <div className="space-y-6 animate-fade-in-up">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 w-full md:w-auto">
             <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Wrench className="text-primary-600" size={20} /> Garages
             </h2>
             <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
             <div className="flex gap-2 bg-gray-50 p-1 rounded-lg">
                <button onClick={() => setStatusFilter('all')} className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${statusFilter === 'all' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Tous</button>
                <button onClick={() => setStatusFilter('verified')} className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${statusFilter === 'verified' ? 'bg-white shadow text-green-600' : 'text-gray-500 hover:text-gray-900'}`}>Vérifiés</button>
                <button onClick={() => setStatusFilter('pending')} className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${statusFilter === 'pending' ? 'bg-white shadow text-orange-600' : 'text-gray-500 hover:text-gray-900'}`}>En attente</button>
             </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Rechercher..." 
                 className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white focus:border-primary-500 outline-none transition-all" 
               />
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
             </div>
             <button 
               onClick={() => handleOpenModal('garage', 'create')}
               className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-sm active:scale-95 whitespace-nowrap"
             >
               <Plus size={16} /> <span className="hidden sm:inline">Ajouter</span>
             </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="p-5">Garage</th>
                  <th className="p-5">Contact</th>
                  <th className="p-5">Spécialités</th>
                  <th className="p-5">Statut</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedGarages.map((garage) => (
                  <tr key={garage.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm flex-shrink-0">
                           <img src={garage.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div>
                           <span className="font-bold text-gray-900 text-sm block mb-0.5">{garage.name}</span>
                           <div className="flex items-center gap-1 text-xs text-gray-500">
                              <span className="font-medium text-warning-600 flex items-center gap-0.5">★ {garage.rating}</span>
                              <span>• {garage.reviewsCount} avis</span>
                           </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-600 space-y-1">
                       <div className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-gray-400" />
                          <span className="truncate max-w-[150px]">{garage.address?.split(',')[1] || 'Tunis'}</span>
                       </div>
                    </td>
                    <td className="p-5">
                       <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {garage.specialties?.slice(0,2).map((s, i) => (
                             <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded border border-gray-200">{s}</span>
                          ))}
                       </div>
                    </td>
                    <td className="p-5">
                      {garage.isVerified ? (
                        <span className="inline-flex items-center gap-1.5 text-success-700 bg-success-50 px-2.5 py-1 rounded-md text-xs font-bold border border-success-100">
                          <CheckCircle2 size={12} /> Vérifié
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md text-xs font-bold border border-gray-200">
                          <Clock size={12} /> En attente
                        </span>
                      )}
                    </td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenModal('garage', 'edit', garage)}
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Modifier"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete('garage', garage.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-auto">
             <Pagination totalItems={filteredGarages.length} />
          </div>
        </div>
      </div>
    );
  };

  const ContentManagerView = () => {
    const dataList = contentTab === 'news' ? articles : tips;
    const paginatedData = dataList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
      <div className="space-y-6 animate-fade-in-up">
        {/* Header & Tabs */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
              <button 
                 onClick={() => setContentTab('news')}
                 className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${contentTab === 'news' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                 Actualités ({articles.length})
              </button>
              <button 
                 onClick={() => setContentTab('tips')}
                 className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${contentTab === 'tips' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                 Conseils ({tips.length})
              </button>
           </div>
           <button 
              onClick={() => handleOpenModal(contentTab === 'news' ? 'article' : 'tip', 'create')}
              className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-sm active:scale-95"
           >
              <Plus size={16} /> Créer {contentTab === 'news' ? 'un article' : 'un conseil'}
           </button>
        </div>
  
        {/* Content List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="p-5">Titre</th>
                  <th className="p-5">Catégorie</th>
                  <th className="p-5">Auteur</th>
                  <th className="p-5">Date</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedData.map((item: any) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="p-5">
                      <div className="flex items-start gap-4">
                         <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                            <img src={item.image} className="w-full h-full object-cover" alt="" />
                         </div>
                         <div>
                            <div className="font-bold text-gray-900 text-sm line-clamp-2 max-w-xs leading-snug pt-1">{item.title}</div>
                            {item.isFeatured && (
                               <span className="inline-flex items-center gap-1 text-[10px] font-bold text-warning-600 bg-warning-50 px-1.5 py-0.5 rounded mt-1">
                                  <Star size={10} className="fill-current" /> À la une
                               </span>
                            )}
                         </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-bold border border-gray-200">{item.category}</span>
                    </td>
                    <td className="p-5 text-sm text-gray-600 font-medium">{item.author}</td>
                    <td className="p-5 text-sm text-gray-500">{item.date}</td>
                    <td className="p-5">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenModal(contentTab === 'news' ? 'article' : 'tip', 'edit', item)}
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(contentTab === 'news' ? 'article' : 'tip', item.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-auto">
             <Pagination totalItems={dataList.length} />
          </div>
        </div>
      </div>
    );
  };

  const MetadataView = () => {
    const filteredBrands = useMemo(() => brands.filter(b => b.type === metadataType), [brands, metadataType]);
    const filteredModels = useMemo(() => models.filter(m => m.type === metadataType), [models, metadataType]);

    return (
      <div className="space-y-6 animate-fade-in-up">
        {/* Type Tabs */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
            {['Moto', 'Scooter', 'Accessoires'].map((type) => (
                <button 
                   key={type}
                   onClick={() => setMetadataType(type as VehicleType)}
                   className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${metadataType === type ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                   {type === 'Moto' && <Bike size={16} />}
                   {type === 'Scooter' && <Bike size={16} className="scale-x-[-1]" />}
                   {type === 'Accessoires' && <Layers size={16} />}
                   {type}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brands Management */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full max-h-[600px]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl sticky top-0 z-10">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Tag size={18} className="text-primary-600" /> 
                {metadataType === 'Accessoires' ? 'Types / Marques' : 'Marques'} ({filteredBrands.length})
              </h3>
              <button 
                 onClick={() => handleOpenModal('brand', 'create', { type: metadataType })}
                 className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 hover:border-primary-600 hover:text-primary-600 rounded-lg transition-all shadow-sm active:scale-95 text-xs font-bold"
              >
                <Plus size={14} /> Ajouter
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
               <div className="flex flex-wrap gap-2">
                 {filteredBrands.map((brand, i) => (
                   <div key={i} className="group flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 shadow-sm hover:border-primary-200 hover:bg-primary-50 transition-all cursor-default">
                     {brand.name}
                     <button 
                       onClick={() => handleDelete('brand', brand.name, brand.type)}
                       className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                       <XCircle size={14} />
                     </button>
                   </div>
                 ))}
                 {filteredBrands.length === 0 && (
                    <p className="text-sm text-gray-400 italic w-full text-center py-4">Aucune marque configurée.</p>
                 )}
               </div>
            </div>
          </div>

          {/* Models Management (CRUD) */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full max-h-[600px]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-2xl sticky top-0 z-10">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Database size={18} className="text-blue-600" /> Modèles ({filteredModels.length})
              </h3>
              <button 
                 onClick={() => handleOpenModal('model', 'create', { type: metadataType })}
                 className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white hover:bg-gray-800 rounded-lg transition-all shadow-sm active:scale-95 text-xs font-bold"
              >
                <Plus size={14} /> Ajouter
              </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
              {filteredModels.map((model) => (
                <div key={model.id} className="group flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                        {model.image ? (
                          <img src={model.image} className="w-full h-full object-cover" alt={model.name} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400"><Bike size={16} /></div>
                        )}
                     </div>
                     <div>
                       <span className="font-bold text-gray-900 text-sm block">{model.name}</span>
                       <span className="text-xs text-gray-500 font-medium">{model.brand}</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded hidden sm:inline-block">
                         {model.price}
                      </span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                              onClick={() => handleOpenModal('model', 'edit', model)}
                              className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-white rounded-md transition-colors"
                          >
                              <Edit size={14} />
                          </button>
                          <button 
                              onClick={() => handleDelete('model', model.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-white rounded-md transition-colors"
                          >
                              <Trash2 size={14} />
                          </button>
                      </div>
                  </div>
                </div>
              ))}
              {filteredModels.length === 0 && (
                 <p className="text-sm text-gray-400 italic w-full text-center py-8">Aucun modèle configuré.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- MODAL FORM ---
  const ModalForm = () => {
    // Initial form state based on currentItem or empty defaults
    const [formData, setFormData] = useState<any>(
      selectedItem || {
        // Defaults
        ...(currentEntity === 'garage' && { 
          name: '', address: '', description: '', isVerified: false, image: '', phone: '', email: '', website: '', hours: 'Lundi-Samedi: 09h-18h', specialties: [], services: []
        }),
        ...(currentEntity === 'article' && { 
          title: '', category: 'Nouveautés', author: 'Admin', summary: '', content: '', image: '', readTime: '5 min', tags: [], isFeatured: false 
        }),
        ...(currentEntity === 'tip' && { 
          title: '', category: 'Entretien', difficulty: 'Débutant', author: 'Atelier', summary: '', content: '', image: '', readTime: '5 min', tools: [] 
        }),
        ...(currentEntity === 'brand' && { name: '', type: metadataType }),
        ...(currentEntity === 'model' && { name: '', brand: '', price: '', image: '', type: metadataType })
      }
    );

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [tagInput, setTagInput] = useState(""); 
    const [serviceInput, setServiceInput] = useState<{name: string, price: string}>({ name: "", price: "" });

    const handleChange = (e: any) => {
      const { name, value, type, checked } = e.target;
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setFormData({ ...formData, image: imageUrl });
      }
    };

    const handleTagAdd = (fieldName: string) => {
      if (tagInput.trim() && !formData[fieldName]?.includes(tagInput.trim())) {
        setFormData({ ...formData, [fieldName]: [...(formData[fieldName] || []), tagInput.trim()] });
        setTagInput("");
      }
    };

    const handleTagRemove = (fieldName: string, index: number) => {
      setFormData({ ...formData, [fieldName]: formData[fieldName].filter((_: any, i: number) => i !== index) });
    };

    const addService = () => {
      if (serviceInput.name.trim() && serviceInput.price.trim()) {
        setFormData({ ...formData, services: [...(formData.services || []), serviceInput] });
        setServiceInput({ name: "", price: "" });
      }
    };

    const removeService = (index: number) => {
      setFormData({ ...formData, services: formData.services.filter((_: any, i: number) => i !== index) });
    };

    const availableBrands = brands.filter(b => b.type === formData.type);

    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
        <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
            <h3 className="text-xl font-extrabold text-gray-900">
              {modalMode === 'create' ? 'Ajouter' : 'Modifier'} {currentEntity}
            </h3>
            <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Form Body */}
          <div className="p-8 space-y-6">
            
            {/* Entity Specific Fields */}
            {currentEntity === 'garage' && (
              <div className="space-y-6">
                 {/* Image Upload */}
                 <div className="flex gap-4">
                    <div onClick={() => fileInputRef.current?.click()} className="w-24 h-24 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-100 overflow-hidden">
                       {formData.image ? <img src={formData.image} className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-400" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </div>
                    <div className="flex-1 space-y-2">
                       <label className="text-sm font-bold text-gray-700">Nom du garage</label>
                       <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 outline-none focus:border-primary-500" placeholder="Nom..." />
                    </div>
                 </div>
                 {/* Details */}
                 <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 outline-none focus:border-primary-500" placeholder="Adresse" />
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 outline-none focus:border-primary-500" placeholder="Téléphone" />
                 </div>
                 {/* Specialties Input */}
                 <div>
                     <div className="flex gap-2 mb-2">
                        <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleTagAdd('specialties')} className="flex-1 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200" placeholder="Spécialité (ex: BMW)..." />
                        <button onClick={() => handleTagAdd('specialties')} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold">Ajouter</button>
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {formData.specialties?.map((tag: string, idx: number) => (
                           <span key={idx} className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs font-bold border border-primary-100 flex items-center gap-1">{tag} <X size={10} className="cursor-pointer" onClick={() => handleTagRemove('specialties', idx)} /></span>
                        ))}
                     </div>
                 </div>
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="isVerified" checked={formData.isVerified} onChange={handleChange} className="w-4 h-4 text-primary-600 rounded" />
                    <span className="text-sm font-bold text-gray-700">Garage Vérifié</span>
                 </label>
              </div>
            )}

            {(currentEntity === 'article' || currentEntity === 'tip') && (
               <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="col-span-2 space-y-2">
                        <label className="text-sm font-bold text-gray-700">Titre</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Catégorie</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                           <option>Nouveautés</option><option>Essais</option><option>Entretien</option><option>Tech</option>
                        </select>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-700">Contenu (HTML)</label>
                     <textarea name="content" value={formData.content} onChange={handleChange} rows={6} className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 resize-none font-mono text-sm" placeholder="<p>Contenu...</p>"></textarea>
                  </div>
               </div>
            )}

            {currentEntity === 'brand' && (
               <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 font-bold text-sm text-gray-700">Type: {formData.type}</div>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary-500" placeholder="Nom de la marque" autoFocus />
               </div>
            )}

            {currentEntity === 'model' && (
               <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 font-bold text-sm text-gray-700">Type: {formData.type}</div>
                  <select name="brand" value={formData.brand} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none">
                     <option value="" disabled>Choisir la marque</option>
                     {availableBrands.map((b, i) => <option key={i} value={b.name}>{b.name}</option>)}
                  </select>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none" placeholder="Nom du modèle" />
               </div>
            )}

          </div>

          {/* Footer Actions */}
          <div className="px-8 py-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-3xl sticky bottom-0">
             <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors">Annuler</button>
             <button onClick={() => handleSave(formData)} className="px-8 py-3 bg-primary-600 text-white font-bold rounded-xl shadow-lg hover:bg-primary-700 transition-all active:scale-95 flex items-center gap-2">
               <Save size={18} /> Enregistrer
             </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-72 bg-[#111827] text-white hidden lg:flex flex-col flex-shrink-0 h-screen sticky top-0 border-r border-gray-800">
        <div className="p-8 border-b border-gray-800">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onGoHome}>
             <div className="bg-primary-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-primary-900/50 group-hover:scale-105 transition-transform">
                 <span className="font-black text-white text-xl">M</span>
             </div>
             <div>
                <span className="font-extrabold text-xl tracking-tight block leading-none">MotoScoot</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Admin Panel</span>
             </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
           <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
              <LayoutDashboard size={20} /> Vue d'ensemble
           </button>
           
           <div className="pt-6 pb-2 px-4 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">Gestion</div>
           
           <button onClick={() => setActiveTab('content')} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'content' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
              <FileText size={20} /> Blog & Conseils
           </button>
           <button onClick={() => setActiveTab('garages')} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'garages' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
              <Wrench size={20} /> Annuaire Garages
           </button>
           <button onClick={() => setActiveTab('metadata')} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'metadata' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
              <Database size={20} /> Marques & Modèles
           </button>
        </nav>

        <div className="p-6 border-t border-gray-800">
           <button onClick={onLogout} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-colors">
              <LogOut size={20} /> Déconnexion
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
         {/* Top Header Mobile */}
         <div className="lg:hidden bg-[#111827] text-white p-4 flex justify-between items-center sticky top-0 z-20">
            <span className="font-extrabold text-lg">MotoScoot Admin</span>
            <button onClick={onLogout}><LogOut size={20} /></button>
         </div>

         {/* Dashboard Header */}
         <header className="bg-white border-b border-gray-100 py-4 px-8 flex justify-between items-center sticky top-0 z-10">
            <h1 className="text-2xl font-extrabold text-gray-900">
                {activeTab === 'overview' && "Tableau de Bord"}
                {activeTab === 'content' && "Gestion du Contenu"}
                {activeTab === 'garages' && "Gestion des Garages"}
                {activeTab === 'metadata' && "Données de Référence"}
            </h1>
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="w-px h-8 bg-gray-100"></div>
                <div className="flex items-center gap-3">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-gray-900 leading-none">Admin</p>
                        <p className="text-xs text-gray-500 mt-1">Super Utilisateur</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">A</div>
                </div>
            </div>
         </header>

         {/* Scrollable Content */}
         <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            <div className="max-w-7xl mx-auto">
                {activeTab === 'overview' && <AnalyticsView />}
                {activeTab === 'garages' && <GarageManagerView />}
                {activeTab === 'content' && <ContentManagerView />}
                {activeTab === 'metadata' && <MetadataView />}
            </div>
         </div>
      </main>

      {/* MODAL */}
      {isModalOpen && <ModalForm />}

      {/* TOAST NOTIFICATION */}
      {notification && (
        <div className={`fixed bottom-6 right-6 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 text-white font-bold animate-fade-in-up z-[100] ${notification.type === 'success' ? 'bg-gray-900' : 'bg-red-600'}`}>
           {notification.type === 'success' ? <CheckCircle2 size={20} className="text-green-400" /> : <AlertCircle size={20} />}
           {notification.message}
        </div>
      )}

    </div>
  );
};

export default SuperAdminDashboard;
