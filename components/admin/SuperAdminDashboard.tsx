
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
  Bell,
  Eye,
  MousePointer2,
  Smartphone,
  Tablet,
  Monitor,
  Activity,
  UserPlus,
  ShoppingBag,
  Zap,
  Megaphone,
  Calendar as CalendarIcon,
  PlayCircle
} from 'lucide-react';
import Header from '../layout/Header';
import { mockArticles, mockTips, mockGarages, popularModels, brandsMoto, governoratesList } from '../../data/mockData';
import { Article, Garage, Tip } from '../../types';

// --- TYPES ---
type ModalMode = 'create' | 'edit' | null;
type EntityType = 'garage' | 'article' | 'tip' | 'brand' | 'model' | 'accessory' | 'ad';
type VehicleType = 'Moto' | 'Scooter' | 'Accessoires';

interface AdCampaign {
  id: number;
  title: string;
  client: string;
  zone: 'Header' | 'Sidebar' | 'In-Feed' | 'Popup' | 'Footer';
  location: string; // Geo targeting
  startDate: string;
  endDate: string;
  mediaType: 'Image' | 'Script';
  mediaUrl: string;
  isActive: boolean;
  views: number;
  clicks: number;
}

interface SuperAdminDashboardProps {
  onGoHome?: () => void;
  onLogout?: () => void;
}

// --- HELPER COMPONENTS ---

const StatCard = ({ label, value, change, icon: Icon, color, bg }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group cursor-default">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${bg} ${color} group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={22} />
      </div>
      {change && (
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${change.startsWith('+') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {change}
        </span>
      )}
    </div>
    <div>
      <h4 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h4>
      <p className="text-sm text-gray-500 font-bold mt-1">{label}</p>
    </div>
  </div>
);

const InteractiveAreaChart = ({ data }: { data: { day: number, visits: number, unique: number }[] }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const width = 100;
  const height = 40;
  const maxVal = Math.max(...data.map(d => d.visits)) * 1.1;

  const getPoints = (key: 'visits' | 'unique') => {
    return data.map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (d[key] / maxVal) * height;
      return `${x},${y}`;
    }).join(' ');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const index = Math.min(Math.max(Math.round(percentage * (data.length - 1)), 0), data.length - 1);
    setHoverIndex(index);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-64 relative cursor-crosshair group" 
      onMouseMove={handleMouseMove} 
      onMouseLeave={() => setHoverIndex(null)}
    >
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="gradVisits" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#E6580B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#E6580B" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gradUnique" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map(i => (
           <line key={i} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="#F3F4F6" strokeWidth="0.2" />
        ))}

        <polygon points={`0,${height} ${getPoints('visits')} ${width},${height}`} fill="url(#gradVisits)" />
        <polyline points={getPoints('visits')} fill="none" stroke="#E6580B" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />

        <polygon points={`0,${height} ${getPoints('unique')} ${width},${height}`} fill="url(#gradUnique)" />
        <polyline points={getPoints('unique')} fill="none" stroke="#3B82F6" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />

        {hoverIndex !== null && (
           <line 
              x1={(hoverIndex / (data.length - 1)) * width} 
              y1="0" 
              x2={(hoverIndex / (data.length - 1)) * width} 
              y2={height} 
              stroke="#9CA3AF" 
              strokeWidth="0.2" 
              strokeDasharray="1 1"
           />
        )}
      </svg>

      {hoverIndex !== null && (
        <div 
           className="absolute bg-gray-900/90 backdrop-blur-md text-white p-3 rounded-xl shadow-xl z-10 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 transition-all duration-75 border border-white/10"
           style={{ left: `${(hoverIndex / (data.length - 1)) * 100}%`, top: '0%' }}
        >
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Jour {data[hoverIndex].day}</p>
           <div className="space-y-1">
              <div className="flex items-center justify-between gap-4 text-xs">
                 <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(230,88,11,0.6)]"></div>
                    <span className="text-gray-300">Visites</span>
                 </div>
                 <span className="font-bold text-white">{data[hoverIndex].visits}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-xs">
                 <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                    <span className="text-gray-300">Uniques</span>
                 </div>
                 <span className="font-bold text-white">{data[hoverIndex].unique}</span>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const DonutChart = ({ data }: { data: typeof demographicData }) => {
   const total = data.reduce((acc, curr) => acc + curr.value, 0);
   let cumulativePercent = 0;

   const getCoordinatesForPercent = (percent: number) => {
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return [x, y];
   };

   return (
      <div className="flex items-center gap-6 h-full">
         <div className="relative w-32 h-32 flex-shrink-0">
            <svg viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }} className="w-full h-full">
               {data.map((slice, i) => {
                  const start = cumulativePercent;
                  const end = cumulativePercent + (slice.value / total);
                  cumulativePercent = end;

                  const [startX, startY] = getCoordinatesForPercent(start);
                  const [endX, endY] = getCoordinatesForPercent(end);
                  const largeArcFlag = slice.value / total > 0.5 ? 1 : 0;

                  return (
                     <path
                        key={i}
                        d={`M 0 0 L ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                        fill={slice.color}
                        stroke="white"
                        strokeWidth="0.05"
                     />
                  );
               })}
               <circle cx="0" cy="0" r="0.7" fill="white" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
               <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total</span>
               <span className="text-lg font-black text-gray-900">100%</span>
            </div>
         </div>
         <div className="space-y-3 flex-1">
            {data.map((slice, i) => (
               <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                     <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: slice.color }}></div>
                     <span className="text-gray-600 font-medium">{slice.label}</span>
                  </div>
                  <span className="font-bold text-gray-900">{slice.value}%</span>
               </div>
            ))}
         </div>
      </div>
   );
};

const GeoBarChart = ({ data }: { data: typeof geoData }) => {
   const max = Math.max(...data.map(d => d.value));

   return (
      <div className="space-y-5 h-full flex flex-col justify-center">
         {data.map((item, i) => (
            <div key={i} className="group cursor-default">
               <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-3">
                     <span className="text-xs font-bold text-gray-300 w-4">#{i + 1}</span>
                     <span className="font-bold text-gray-700 text-sm">{item.label}</span>
                  </div>
                  <span className="text-gray-900 font-extrabold text-sm">{item.value.toLocaleString()}</span>
               </div>
               <div className="w-full bg-gray-50 rounded-full h-2 overflow-hidden border border-gray-100">
                  <div 
                     className="h-full bg-gradient-to-r from-primary-600 to-primary-500 rounded-full group-hover:from-primary-500 group-hover:to-primary-400 transition-all duration-700 ease-out" 
                     style={{ width: `${(item.value / max) * 100}%` }}
                  ></div>
               </div>
            </div>
         ))}
      </div>
   );
};

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }: any) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-3xl">
         <span className="text-xs text-gray-500 font-medium">Page {currentPage} sur {totalPages}</span>
         <div className="flex gap-2">
            <button 
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
               <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
               <ChevronRight size={16} />
            </button>
         </div>
      </div>
    );
};

// --- CHART DATA ---
const trafficData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  visits: Math.floor(Math.random() * 800) + 400,
  unique: Math.floor(Math.random() * 500) + 200,
}));

const geoData = [
  { label: 'Tunis', value: 4500 },
  { label: 'Sousse', value: 2100 },
  { label: 'Sfax', value: 1800 },
  { label: 'Nabeul', value: 1200 },
  { label: 'Bizerte', value: 900 },
];

const demographicData = [
  { label: '18-24 ans', value: 15, color: '#FCD34D' }, 
  { label: '25-34 ans', value: 45, color: '#E6580B' }, 
  { label: '35-44 ans', value: 25, color: '#3B82F6' }, 
  { label: '45+ ans', value: 15, color: '#9CA3AF' },
];

const mockAds: AdCampaign[] = [
    { id: 1, title: 'Promo Hiver Yamaha', client: 'Yamaha Tunisie', zone: 'Header', location: 'Toute la Tunisie', startDate: '2025-01-01', endDate: '2025-02-01', mediaType: 'Image', mediaUrl: '', isActive: true, views: 12500, clicks: 450 },
    { id: 2, title: 'Assurance Moto', client: 'Comar', zone: 'Sidebar', location: 'Tunis', startDate: '2025-01-15', endDate: '2025-03-15', mediaType: 'Image', mediaUrl: '', isActive: true, views: 8200, clicks: 120 },
];

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onGoHome, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'garages' | 'ads' | 'brands' | 'models' | 'accessories'>('overview');
  
  // Data State
  const [garages, setGarages] = useState<Garage[]>(mockGarages);
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [tips, setTips] = useState<Tip[]>(mockTips);
  const [ads, setAds] = useState<AdCampaign[]>(mockAds);
  const [brands, setBrands] = useState<{name: string, type: VehicleType}[]>([
    ...brandsMoto.map(b => ({ name: b, type: 'Moto' as VehicleType })),
    { name: 'Vespa', type: 'Scooter' }, { name: 'Piaggio', type: 'Scooter' },
    { name: 'Sym', type: 'Scooter' }, { name: 'Shark', type: 'Accessoires' }, { name: 'Alpinestars', type: 'Accessoires' }
  ]);
  const [models, setModels] = useState<any[]>([
    ...popularModels.map(m => ({ ...m, type: 'Moto' as VehicleType })),
    { id: 99, name: 'GTS 300', brand: 'Vespa', type: 'Scooter', price: '22 000 DT', image: '' },
    { id: 100, name: 'Evo-GT', brand: 'Shark', type: 'Accessoires', price: '1 200 DT', image: '' }
  ]);

  // UI State
  const [contentTab, setContentTab] = useState<'news' | 'tips'>('news');
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [brandFilter, setBrandFilter] = useState<VehicleType | 'All'>('All');
  const [modelFilter, setModelFilter] = useState<'Moto' | 'Scooter'>('Moto');
  const itemsPerPage = 6;
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [currentEntity, setCurrentEntity] = useState<EntityType>('garage');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States for sub-form management
  const [tagInput, setTagInput] = useState(""); 
  const [serviceInput, setServiceInput] = useState<{name: string, price: string}>({ name: "", price: "" });

  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery("");
  }, [activeTab, contentTab, brandFilter, modelFilter]);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenModal = (entity: EntityType, mode: ModalMode, item: any = null) => {
    setCurrentEntity(entity);
    setModalMode(mode);
    
    // Set default Type for new items based on current context
    if (mode === 'create') {
        let defaultType: VehicleType = 'Moto';
        if (entity === 'model') defaultType = modelFilter; // Use current model filter
        if (entity === 'accessory') defaultType = 'Accessoires'; 
        
        setSelectedItem({ type: defaultType });
    } else {
        setSelectedItem(item);
    }
    
    setTagInput("");
    setServiceInput({ name: "", price: "" });
    setIsModalOpen(true);
  };

  const handleSave = (formData: any) => {
    const newId = Date.now();
    
    if (currentEntity === 'garage') {
      if (modalMode === 'create') setGarages([{ ...formData, id: newId, rating: 0, reviewsCount: 0 }, ...garages]);
      else setGarages(garages.map(g => g.id === selectedItem.id ? { ...g, ...formData } : g));
    } else if (currentEntity === 'article') {
      if (modalMode === 'create') setArticles([{ ...formData, id: newId, date: new Date().toLocaleDateString() }, ...articles]);
      else setArticles(articles.map(a => a.id === selectedItem.id ? { ...a, ...formData } : a));
    } else if (currentEntity === 'tip') {
      if (modalMode === 'create') setTips([{ ...formData, id: newId, date: new Date().toLocaleDateString() }, ...tips]);
      else setTips(tips.map(t => t.id === selectedItem.id ? { ...t, ...formData } : t));
    } else if (currentEntity === 'brand') {
       if (modalMode === 'create' && !brands.some(b => b.name === formData.name && b.type === formData.type)) {
          setBrands([...brands, { name: formData.name, type: formData.type }]);
       }
    } else if (currentEntity === 'model' || currentEntity === 'accessory') {
       if (modalMode === 'create') setModels([...models, { ...formData, id: newId }]);
       else setModels(models.map(m => m.id === selectedItem.id ? { ...m, ...formData } : m));
    } else if (currentEntity === 'ad') {
       if (modalMode === 'create') setAds([{ ...formData, id: newId, views: 0, clicks: 0 }, ...ads]);
       else setAds(ads.map(a => a.id === selectedItem.id ? { ...a, ...formData } : a));
    }
    
    showNotification(`${modalMode === 'create' ? 'Ajout' : 'Modification'} effectué avec succès`);
    setIsModalOpen(false);
  };

  const handleDelete = (entity: EntityType, id: number | string, extraParam?: string) => {
    if (window.confirm("Confirmer la suppression ?")) {
      if (entity === 'garage') setGarages(garages.filter(g => g.id !== id));
      else if (entity === 'article') setArticles(articles.filter(a => a.id !== id));
      else if (entity === 'tip') setTips(tips.filter(t => t.id !== id));
      else if (entity === 'brand') setBrands(brands.filter(b => !(b.name === id && b.type === extraParam)));
      else if (entity === 'model' || entity === 'accessory') setModels(models.filter(m => m.id !== id));
      else if (entity === 'ad') setAds(ads.filter(a => a.id !== id));
      showNotification("Élément supprimé", "success");
    }
  };

  // --- RENDER FUNCTIONS ---

  const renderOverview = () => (
    <div className="space-y-8 animate-fade-in-up">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Visiteurs Uniques (30j)" value="45.2K" change="+12.5%" icon={Users} color="text-primary-600" bg="bg-primary-50"/>
        <StatCard label="Pages Vues" value="128K" change="+8.2%" icon={Eye} color="text-blue-600" bg="bg-blue-50"/>
        <StatCard label="Nouvelles Annonces" value="854" change="+24%" icon={Plus} color="text-green-600" bg="bg-green-50"/>
        <StatCard label="Taux de Rebond" value="42%" change="-2.1%" icon={Activity} color="text-purple-600" bg="bg-purple-50"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Chart */}
         <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-gray-900 text-lg">Trafic du site</h3>
               <select className="bg-gray-50 border border-gray-200 text-xs font-bold text-gray-600 rounded-lg px-3 py-2 outline-none">
                  <option>30 derniers jours</option>
                  <option>7 derniers jours</option>
                  <option>12 derniers mois</option>
               </select>
            </div>
            <InteractiveAreaChart data={trafficData} />
         </div>

         {/* Device Stats */}
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
            <h3 className="font-bold text-gray-900 text-lg mb-6">Appareils</h3>
            <div className="space-y-6 flex-1 flex flex-col justify-center">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-gray-100 rounded-lg text-gray-600"><Smartphone size={20}/></div>
                     <span className="font-bold text-gray-700 text-sm">Mobile</span>
                  </div>
                  <div className="text-right">
                     <span className="block font-extrabold text-gray-900">65%</span>
                     <span className="text-xs text-green-600 font-bold">+12%</span>
                  </div>
               </div>
               <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden"><div className="bg-primary-600 h-full rounded-full" style={{width: '65%'}}></div></div>

               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-gray-100 rounded-lg text-gray-600"><Monitor size={20}/></div>
                     <span className="font-bold text-gray-700 text-sm">Desktop</span>
                  </div>
                  <div className="text-right">
                     <span className="block font-extrabold text-gray-900">30%</span>
                     <span className="text-xs text-red-600 font-bold">-5%</span>
                  </div>
               </div>
               <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden"><div className="bg-blue-600 h-full rounded-full" style={{width: '30%'}}></div></div>

               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-gray-100 rounded-lg text-gray-600"><Tablet size={20}/></div>
                     <span className="font-bold text-gray-700 text-sm">Tablette</span>
                  </div>
                  <div className="text-right">
                     <span className="block font-extrabold text-gray-900">5%</span>
                     <span className="text-xs text-gray-400 font-bold">=</span>
                  </div>
               </div>
               <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden"><div className="bg-purple-600 h-full rounded-full" style={{width: '5%'}}></div></div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Demographics */}
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-6">Démographie</h3>
            <DonutChart data={demographicData} />
         </div>

         {/* Geo Distribution */}
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-6">Géolocalisation (Top 5)</h3>
            <GeoBarChart data={geoData} />
         </div>

         {/* Active Users Live */}
         <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl border border-gray-800 shadow-lg text-white flex flex-col">
            <div className="flex justify-between items-start mb-8">
               <div>
                  <h3 className="font-bold text-lg mb-1">Utilisateurs Actifs</h3>
                  <p className="text-gray-400 text-xs">En temps réel</p>
               </div>
               <div className="relative">
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
               </div>
            </div>
            
            <div className="text-center my-auto">
               <span className="text-6xl font-black tracking-tighter block mb-2">124</span>
               <span className="text-sm font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full">+14 depuis 5 min</span>
            </div>

            <div className="mt-8 space-y-3">
               <div className="flex justify-between text-xs font-medium text-gray-400 border-b border-gray-700 pb-2">
                  <span>Page</span>
                  <span>Utilisateurs</span>
               </div>
               {[{p: '/home', c: 45}, {p: '/search', c: 32}, {p: '/listing/123', c: 18}].map((u, i) => (
                  <div key={i} className="flex justify-between text-sm font-bold">
                     <span className="text-gray-300">{u.p}</span>
                     <span>{u.c}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );

  const renderBrandsView = () => {
    const filteredBrands = brands.filter(b => brandFilter === 'All' ? true : b.type === brandFilter);
    const searchedBrands = filteredBrands.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const paginated = searchedBrands.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-3xl border border-gray-100 shadow-sm gap-4">
               <div className="flex gap-2 p-1 bg-gray-50 rounded-xl overflow-x-auto w-full md:w-auto">
                  {['All', 'Moto', 'Scooter', 'Accessoires'].map((type) => (
                      <button key={type} onClick={() => setBrandFilter(type as any)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${brandFilter === type ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
                         {type === 'All' ? 'Toutes' : type}
                      </button>
                  ))}
               </div>
               
               <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                       <input type="text" placeholder="Rechercher une marque..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 transition-all" />
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                    <button onClick={() => handleOpenModal('brand', 'create')} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm active:scale-95 whitespace-nowrap">
                        <Plus size={16} /> Ajouter
                    </button>
               </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                   <thead className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase">
                      <tr>
                          <th className="p-5">Marque</th>
                          <th className="p-5">Catégorie</th>
                          <th className="p-5 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                      {paginated.map((b, i) => (
                         <tr key={i} className="hover:bg-gray-50 transition-colors group">
                            <td className="p-5">
                               <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 font-bold border border-gray-200">
                                       {b.name.charAt(0)}
                                   </div>
                                   <span className="font-bold text-sm text-gray-900">{b.name}</span>
                               </div>
                            </td>
                            <td className="p-5">
                                <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${b.type === 'Accessoires' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                    {b.type}
                                </span>
                            </td>
                            <td className="p-5 text-right space-x-2">
                               <button onClick={() => handleDelete('brand', b.name, b.type)} className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow active:scale-95"><Trash2 size={14}/></button>
                            </td>
                         </tr>
                      ))}
                      {paginated.length === 0 && (
                          <tr><td colSpan={3} className="p-8 text-center text-gray-400 italic">Aucune marque trouvée.</td></tr>
                      )}
                   </tbody>
                </table>
                <Pagination totalItems={searchedBrands.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
  };

  const renderModelsView = () => {
    // Filter models to exclude accessories (which have their own view) and filter by vehicle type
    const filteredModels = models.filter(m => m.type !== 'Accessoires' && m.type === modelFilter);
    const searchedModels = filteredModels.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    const paginated = searchedModels.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-3xl border border-gray-100 shadow-sm gap-4">
                <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                   <button onClick={() => setModelFilter('Moto')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${modelFilter === 'Moto' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Motos</button>
                   <button onClick={() => setModelFilter('Scooter')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${modelFilter === 'Scooter' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Scooters</button>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                       <input type="text" placeholder="Rechercher un modèle..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 transition-all" />
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                    <button onClick={() => handleOpenModal('model', 'create')} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm active:scale-95 whitespace-nowrap">
                       <Plus size={16} /> Ajouter
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                   <thead className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase">
                      <tr>
                          <th className="p-5">Modèle</th>
                          <th className="p-5">Marque</th>
                          <th className="p-5">Prix Indicatif</th>
                          <th className="p-5 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                      {paginated.map(m => (
                         <tr key={m.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="p-5 flex items-center gap-4">
                               <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                   <img src={m.image} className="w-full h-full object-cover" alt={m.name} />
                               </div>
                               <span className="font-bold text-sm text-gray-900">{m.name}</span>
                            </td>
                            <td className="p-5 text-sm font-medium text-gray-600">{m.brand}</td>
                            <td className="p-5 text-sm text-gray-600">{m.price}</td>
                            <td className="p-5 text-right space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button onClick={() => handleOpenModal('model', 'edit', m)} className="p-2 text-gray-400 hover:text-primary-600 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow"><Edit size={14}/></button>
                               <button onClick={() => handleDelete('model', m.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow"><Trash2 size={14}/></button>
                            </td>
                         </tr>
                      ))}
                      {paginated.length === 0 && (
                          <tr><td colSpan={4} className="p-8 text-center text-gray-400 italic">Aucun modèle trouvé.</td></tr>
                      )}
                   </tbody>
                </table>
                <Pagination totalItems={searchedModels.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
  };

  const renderAccessoriesView = () => {
    const accessories = models.filter(m => m.type === 'Accessoires');
    const searchedAccess = accessories.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.brand.toLowerCase().includes(searchQuery.toLowerCase()));
    const paginated = searchedAccess.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <ShoppingBag size={20} className="text-primary-600"/> Catalogue Accessoires
                </h3>
                
                <div className="flex items-center gap-3">
                    <div className="relative w-64">
                       <input type="text" placeholder="Rechercher..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 transition-all" />
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                    <button onClick={() => handleOpenModal('accessory', 'create')} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm active:scale-95 whitespace-nowrap">
                       <Plus size={16} /> Ajouter
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                   <thead className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase">
                      <tr>
                          <th className="p-5">Produit</th>
                          <th className="p-5">Marque</th>
                          <th className="p-5">Prix</th>
                          <th className="p-5 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                      {paginated.map(item => (
                         <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="p-5 flex items-center gap-4">
                               <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                   <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                               </div>
                               <span className="font-bold text-sm text-gray-900">{item.name}</span>
                            </td>
                            <td className="p-5 text-sm font-medium text-gray-600">{item.brand}</td>
                            <td className="p-5 text-sm font-bold text-gray-900">{item.price}</td>
                            <td className="p-5 text-right space-x-2">
                               <button onClick={() => handleOpenModal('accessory', 'edit', item)} className="p-2 text-gray-400 hover:text-primary-600 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow active:scale-95"><Edit size={14}/></button>
                               <button onClick={() => handleDelete('accessory', item.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow active:scale-95"><Trash2 size={14}/></button>
                            </td>
                         </tr>
                      ))}
                      {paginated.length === 0 && (
                          <tr><td colSpan={4} className="p-8 text-center text-gray-400 italic">Aucun accessoire trouvé.</td></tr>
                      )}
                   </tbody>
                </table>
                <Pagination totalItems={searchedAccess.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
  };

  const renderGarageView = () => {
    const filtered = garages.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
      <div className="space-y-6 animate-fade-in-up">
         <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
            <div className="relative w-64">
               <input type="text" placeholder="Rechercher..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 transition-all" />
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <button onClick={() => handleOpenModal('garage', 'create')} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm active:scale-95">
               <Plus size={16} /> Ajouter
            </button>
         </div>

         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
               <thead className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase">
                  <tr><th className="p-5">Garage</th><th className="p-5">Localisation</th><th className="p-5">Statut</th><th className="p-5 text-right">Actions</th></tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {paginated.map(g => (
                     <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-5 flex items-center gap-3">
                           <img src={g.image} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                           <span className="font-bold text-sm text-gray-900">{g.name}</span>
                        </td>
                        <td className="p-5 text-sm text-gray-600">{g.address?.split(',')[1] || g.location}</td>
                        <td className="p-5">
                           {g.isVerified ? <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-bold border border-green-100">Vérifié</span> : <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold">En attente</span>}
                        </td>
                        <td className="p-5 text-right space-x-2">
                           <button onClick={() => handleOpenModal('garage', 'edit', g)} className="p-2 text-gray-400 hover:text-primary-600 transition-colors"><Edit size={16}/></button>
                           <button onClick={() => handleDelete('garage', g.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            <Pagination totalItems={filtered.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
         </div>
      </div>
    );
  };

  const renderContentView = () => {
    const list = contentTab === 'news' ? articles : tips;
    const paginated = list.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
      <div className="space-y-6 animate-fade-in-up">
         <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center">
            <div className="flex gap-2 p-1 bg-gray-50 rounded-xl">
               <button onClick={() => {setContentTab('news'); setCurrentPage(1)}} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${contentTab === 'news' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Actualités</button>
               <button onClick={() => {setContentTab('tips'); setCurrentPage(1)}} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${contentTab === 'tips' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Conseils</button>
            </div>
            <button onClick={() => handleOpenModal(contentTab === 'news' ? 'article' : 'tip', 'create')} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm active:scale-95">
               <Plus size={16} /> Créer
            </button>
         </div>

         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
               <thead className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase">
                  <tr><th className="p-5">Titre</th><th className="p-5">Catégorie</th><th className="p-5">Auteur</th><th className="p-5 text-right">Actions</th></tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {paginated.map((item: any) => (
                     <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-5">
                           <div className="flex items-center gap-3">
                              <img src={item.image} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                              <span className="font-bold text-sm text-gray-900 line-clamp-1">{item.title}</span>
                           </div>
                        </td>
                        <td className="p-5"><span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold">{item.category}</span></td>
                        <td className="p-5 text-sm text-gray-600">{item.author}</td>
                        <td className="p-5 text-right space-x-2">
                           <button onClick={() => handleOpenModal(contentTab === 'news' ? 'article' : 'tip', 'edit', item)} className="p-2 text-gray-400 hover:text-primary-600 transition-colors"><Edit size={16}/></button>
                           <button onClick={() => handleDelete(contentTab === 'news' ? 'article' : 'tip', item.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            <Pagination totalItems={list.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
         </div>
      </div>
    );
  };

  const renderAdsView = () => {
     return (
        <div className="space-y-6 animate-fade-in-up">
           <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                 <Megaphone className="text-purple-600" size={20} /> Campagnes Publicitaires
              </h2>
              <button onClick={() => handleOpenModal('ad', 'create')} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm active:scale-95">
                 <Plus size={16} /> Créer une campagne
              </button>
           </div>
           
           {ads.length === 0 ? (
               <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
                  <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Megaphone size={32} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Aucune campagne active</h3>
                  <p className="text-gray-500 text-sm">Commencez par créer une nouvelle campagne publicitaire pour monétiser la plateforme.</p>
               </div>
           ) : (
               <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <table className="w-full text-left">
                     <thead className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase">
                        <tr>
                           <th className="p-5">Campagne</th>
                           <th className="p-5">Client</th>
                           <th className="p-5">Zone</th>
                           <th className="p-5">Stats</th>
                           <th className="p-5">Statut</th>
                           <th className="p-5 text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {ads.map(ad => (
                           <tr key={ad.id} className="hover:bg-gray-50 transition-colors">
                              <td className="p-5">
                                 <span className="font-bold text-sm text-gray-900 block">{ad.title}</span>
                                 <span className="text-xs text-gray-500">{ad.startDate} - {ad.endDate}</span>
                              </td>
                              <td className="p-5 text-sm text-gray-600">{ad.client}</td>
                              <td className="p-5">
                                 <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-bold">{ad.zone}</span>
                              </td>
                              <td className="p-5">
                                 <div className="text-xs font-medium">
                                    <div className="flex items-center gap-1 text-gray-900"><Eye size={12}/> {ad.views.toLocaleString()}</div>
                                    <div className="flex items-center gap-1 text-gray-500"><MousePointer2 size={12}/> {ad.clicks.toLocaleString()}</div>
                                 </div>
                              </td>
                              <td className="p-5">
                                 {ad.isActive ? (
                                    <span className="flex items-center gap-1 text-green-600 text-xs font-bold"><CheckCircle2 size={12}/> Actif</span>
                                 ) : (
                                    <span className="flex items-center gap-1 text-gray-400 text-xs font-bold"><XCircle size={12}/> Inactif</span>
                                 )}
                              </td>
                              <td className="p-5 text-right space-x-2">
                                 <button onClick={() => handleOpenModal('ad', 'edit', ad)} className="p-2 text-gray-400 hover:text-primary-600 transition-colors"><Edit size={16}/></button>
                                 <button onClick={() => handleDelete('ad', ad.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
           )}
        </div>
     );
  };

  const ModalForm = () => {
    const [formData, setFormData] = useState<any>(
      selectedItem || {
        ...(currentEntity === 'garage' && { name: '', address: '', description: '', isVerified: false, image: '', phone: '', email: '', website: '', hours: 'Lundi-Samedi: 09h-18h', specialties: [], services: [] }),
        ...(currentEntity === 'article' && { title: '', category: 'Nouveautés', author: 'Admin', summary: '', content: '', image: '', readTime: '5 min', tags: [], isFeatured: false }),
        ...(currentEntity === 'tip' && { title: '', category: 'Entretien', difficulty: 'Débutant', author: 'Atelier', summary: '', content: '', image: '', readTime: '5 min', tools: [] }),
        ...(currentEntity === 'brand' && { name: '', type: 'Moto' }),
        ...(currentEntity === 'model' && { name: '', brand: '', price: '', image: '', type: 'Moto' }),
        ...(currentEntity === 'accessory' && { name: '', brand: '', price: '', image: '', type: 'Accessoires' }),
        ...(currentEntity === 'ad' && { title: '', client: '', zone: 'Header', location: 'Toute la Tunisie', startDate: '', endDate: '', mediaType: 'Image', isActive: true })
      }
    );

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

    // Filter brands based on the type of model we are creating
    const availableBrands = brands.filter(b => b.type === formData.type);

    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
        <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
            <h3 className="text-xl font-extrabold text-gray-900 capitalize">{modalMode === 'create' ? 'Ajouter' : 'Modifier'} {currentEntity === 'ad' ? 'Publicité' : currentEntity}</h3>
            <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"><X size={20} className="text-gray-500" /></button>
          </div>
          <div className="p-8 space-y-6">
             
             {(currentEntity !== 'brand' && currentEntity !== 'ad') && (
                <div className="flex gap-6 items-center">
                   <div onClick={() => fileInputRef.current?.click()} className="w-24 h-24 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-primary-400 transition-colors overflow-hidden flex-shrink-0">
                      {formData.image ? <img src={formData.image} className="w-full h-full object-cover"/> : <ImageIcon className="text-gray-400"/>}
                      <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload}/>
                   </div>
                   <div className="flex-1 space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Nom / Titre</label>
                      <input type="text" name={currentEntity === 'article' || currentEntity === 'tip' ? 'title' : 'name'} value={formData.title || formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-primary-600 transition-all text-sm font-bold" />
                   </div>
                </div>
             )}
             
             {currentEntity === 'garage' && (
                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Adresse complète" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Téléphone" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                   </div>
                   <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm resize-none" placeholder="Description du garage..."></textarea>
                   
                   <div>
                       <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Spécialités</label>
                       <div className="flex gap-2 mb-2">
                          <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} className="flex-1 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm" placeholder="Ajouter une spécialité..." onKeyPress={(e) => e.key === 'Enter' && handleTagAdd('specialties')} />
                          <button onClick={() => handleTagAdd('specialties')} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold">Ajouter</button>
                       </div>
                       <div className="flex flex-wrap gap-2">
                          {formData.specialties?.map((t: string, i: number) => (
                             <span key={i} className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-bold flex items-center gap-1">{t} <X size={10} className="cursor-pointer" onClick={() => handleTagRemove('specialties', i)}/></span>
                          ))}
                       </div>
                   </div>

                   <div>
                       <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Services</label>
                       <div className="flex gap-2 mb-2">
                          <input type="text" value={serviceInput.name} onChange={(e) => setServiceInput({...serviceInput, name: e.target.value})} className="flex-1 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm" placeholder="Nom du service" />
                          <input type="text" value={serviceInput.price} onChange={(e) => setServiceInput({...serviceInput, price: e.target.value})} className="w-24 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm" placeholder="Prix" />
                          <button onClick={addService} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold"><Plus size={14}/></button>
                       </div>
                       <div className="space-y-2">
                          {formData.services?.map((s: any, i: number) => (
                             <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg text-sm border border-gray-100">
                                <span>{s.name}</span>
                                <div className="flex items-center gap-2"><span className="font-bold">{s.price}</span> <X size={14} className="cursor-pointer text-red-400" onClick={() => removeService(i)}/></div>
                             </div>
                          ))}
                       </div>
                   </div>

                   <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <input type="checkbox" name="isVerified" checked={formData.isVerified} onChange={handleChange} className="w-5 h-5 text-primary-600 rounded" /> Garage Vérifié (Badge)
                   </label>
                </div>
             )}

             {(currentEntity === 'article' || currentEntity === 'tip') && (
                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm">
                         <option>Nouveautés</option><option>Essais</option><option>Entretien</option>
                      </select>
                      <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Auteur" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                   </div>
                   <textarea name="summary" value={formData.summary} onChange={handleChange} rows={2} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm resize-none" placeholder="Résumé court..."></textarea>
                   <textarea name="content" value={formData.content} onChange={handleChange} rows={6} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm font-mono" placeholder="Contenu HTML..."></textarea>
                   
                   <div>
                       <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Tags</label>
                       <div className="flex gap-2 mb-2">
                          <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} className="flex-1 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm" placeholder="Ajouter un tag..." onKeyPress={(e) => e.key === 'Enter' && handleTagAdd(currentEntity === 'article' ? 'tags' : 'tools')} />
                          <button onClick={() => handleTagAdd(currentEntity === 'article' ? 'tags' : 'tools')} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold">Ajouter</button>
                       </div>
                       <div className="flex flex-wrap gap-2">
                          {(currentEntity === 'article' ? formData.tags : formData.tools)?.map((t: string, i: number) => (
                             <span key={i} className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-bold flex items-center gap-1">{t} <X size={10} className="cursor-pointer" onClick={() => handleTagRemove(currentEntity === 'article' ? 'tags' : 'tools', i)}/></span>
                          ))}
                       </div>
                   </div>
                </div>
             )}

             {currentEntity === 'brand' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nom de la marque" className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 outline-none text-sm font-bold" />
                        <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary-500">
                            <option value="Moto">Moto</option>
                            <option value="Scooter">Scooter</option>
                            <option value="Accessoires">Accessoires</option>
                        </select>
                    </div>
                </div>
             )}
             
             {(currentEntity === 'model' || currentEntity === 'accessory') && (
               <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 font-bold text-sm text-gray-700 flex justify-between items-center">
                      <span>Type: {formData.type}</span>
                      {currentEntity === 'model' && (
                          <div className="flex gap-2">
                              <button onClick={() => setFormData({...formData, type: 'Moto'})} className={`px-2 py-1 rounded text-xs border ${formData.type === 'Moto' ? 'bg-black text-white border-black' : 'bg-white border-gray-200'}`}>Moto</button>
                              <button onClick={() => setFormData({...formData, type: 'Scooter'})} className={`px-2 py-1 rounded text-xs border ${formData.type === 'Scooter' ? 'bg-black text-white border-black' : 'bg-white border-gray-200'}`}>Scooter</button>
                          </div>
                      )}
                  </div>
                  <select name="brand" value={formData.brand} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary-500">
                     <option value="" disabled>Choisir la marque</option>
                     {availableBrands.map((b, i) => <option key={i} value={b.name}>{b.name}</option>)}
                  </select>
                  <div className="grid grid-cols-2 gap-4">
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary-500" placeholder={currentEntity === 'model' ? "Nom du modèle" : "Nom de l'accessoire"} />
                      <input type="text" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary-500" placeholder="Prix indicatif (ex: 25 000 DT)" />
                  </div>
               </div>
            )}

            {currentEntity === 'ad' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Titre de la campagne" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm font-bold" />
                        <input type="text" name="client" value={formData.client} onChange={handleChange} placeholder="Client / Annonceur" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Zone d'affichage</label>
                            <select name="zone" value={formData.zone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm">
                                <option>Header</option>
                                <option>Sidebar</option>
                                <option>In-Feed</option>
                                <option>Popup</option>
                                <option>Footer</option>
                            </select>
                         </div>
                         <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Zone Géographique</label>
                            <select name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm">
                                <option>Toute la Tunisie</option>
                                {governoratesList.map(g => <option key={g}>{g}</option>)}
                            </select>
                         </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Date de début</label>
                            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                         </div>
                         <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Date de fin</label>
                            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                         </div>
                    </div>
                    
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Type de média</label>
                        <div className="flex gap-4 mb-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="mediaType" value="Image" checked={formData.mediaType === 'Image'} onChange={handleChange} />
                                <span className="text-sm">Image / Bannière</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="mediaType" value="Script" checked={formData.mediaType === 'Script'} onChange={handleChange} />
                                <span className="text-sm">Script HTML / Embed</span>
                            </label>
                        </div>

                        {formData.mediaType === 'Image' ? (
                            <div className="flex gap-4 items-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div onClick={() => fileInputRef.current?.click()} className="w-20 h-20 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary-400 transition-colors overflow-hidden">
                                    {formData.image ? <img src={formData.image} className="w-full h-full object-cover"/> : <ImageIcon className="text-gray-400"/>}
                                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload}/>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 mb-2">Formats: JPG, PNG, GIF. Max 2Mo.</p>
                                    <input type="text" name="mediaUrl" value={formData.mediaUrl} onChange={handleChange} placeholder="Lien de redirection (URL)" className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 outline-none text-sm" />
                                </div>
                            </div>
                        ) : (
                            <textarea name="mediaUrl" value={formData.mediaUrl} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm font-mono" placeholder="Collez votre code script ici (Google Ads, etc.)"></textarea>
                        )}
                    </div>

                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-5 h-5 text-primary-600 rounded" /> Activer la campagne
                   </label>
                </div>
             )}

          </div>
          <div className="px-8 py-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-3xl">
             <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors">Annuler</button>
             <button onClick={() => handleSave(formData)} className="px-8 py-2.5 bg-primary-600 text-white font-bold rounded-xl shadow-lg hover:bg-primary-700 transition-all active:scale-95">Enregistrer</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <Header 
        variant="white" 
        onGoHome={onGoHome} 
        onLogout={onLogout}
        isLoggedIn={true}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
         <div className="flex flex-col lg:flex-row gap-8">
            
            <aside className="w-full lg:w-64 flex-shrink-0">
               <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sticky top-24">
                  <div className="flex items-center gap-3 p-3 mb-6 border-b border-gray-50 pb-6">
                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        A
                     </div>
                     <div>
                        <h3 className="font-bold text-gray-900 text-sm">Super Admin</h3>
                        <p className="text-xs text-gray-500">Administrateur</p>
                     </div>
                  </div>

                  <nav className="space-y-1">
                     <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <LayoutDashboard size={18} /> Vue d'ensemble
                     </button>
                     <button onClick={() => setActiveTab('garages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'garages' ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <Wrench size={18} /> Garages
                     </button>
                     <button onClick={() => setActiveTab('content')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'content' ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <FileText size={18} /> Contenu (Blog)
                     </button>
                     
                     <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Données</div>
                     
                     <button onClick={() => setActiveTab('brands')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'brands' ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <Tag size={18} /> Marques
                     </button>
                     <button onClick={() => setActiveTab('models')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'models' ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <Database size={18} /> Modèles
                     </button>
                     <button onClick={() => setActiveTab('accessories')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'accessories' ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <ShoppingBag size={18} /> Accessoires
                     </button>

                     <button onClick={() => setActiveTab('ads')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'ads' ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <Megaphone size={18} /> Publicité
                     </button>
                  </nav>

                  <div className="mt-6 pt-4 border-t border-gray-50">
                     <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors">
                        <LogOut size={18} /> Déconnexion
                     </button>
                  </div>
               </div>
            </aside>

            <div className="flex-1 min-w-0">
               <h1 className="text-2xl font-extrabold text-gray-900 mb-6 hidden lg:block">
                  {activeTab === 'overview' && "Tableau de Bord"}
                  {activeTab === 'garages' && "Gestion des Garages"}
                  {activeTab === 'content' && "Gestion du Contenu"}
                  {activeTab === 'brands' && "Gestion des Marques"}
                  {activeTab === 'models' && "Gestion des Modèles"}
                  {activeTab === 'accessories' && "Gestion des Accessoires"}
                  {activeTab === 'ads' && "Gestion Publicitaire"}
               </h1>

               {activeTab === 'overview' && renderOverview()}
               {activeTab === 'garages' && renderGarageView()}
               {activeTab === 'content' && renderContentView()}
               {activeTab === 'brands' && renderBrandsView()}
               {activeTab === 'models' && renderModelsView()}
               {activeTab === 'accessories' && renderAccessoriesView()}
               {activeTab === 'ads' && renderAdsView()}
            </div>

         </div>
      </main>

      {isModalOpen && <ModalForm />}

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
