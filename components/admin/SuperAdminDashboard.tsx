
import React, { useState, useEffect, useRef } from 'react';
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
  LogOut,
  MapPin,
  TrendingUp,
  Tag,
  X,
  Image as ImageIcon,
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
  ShoppingBag,
  Zap,
  Megaphone,
  Calendar as CalendarIcon,
  Menu,
  HelpCircle,
  BarChart3,
  Percent,
  Package,
  Gauge,
  Lightbulb,
  AlignLeft,
  AlertCircle,
  Bold,
  Italic,
  List,
  Link,
  Type,
  MessageSquare,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { mockArticles, mockTips, mockGarages, popularModels, brandsMoto } from '../../data/mockData';
import { Article, Garage, Tip, GarageService, GarageReview } from '../../types';
import { useAds } from '../../context/AdsContext';

// --- TYPES ---
type ModalMode = 'create' | 'edit' | null;
type EntityType = 'garage' | 'article' | 'tip' | 'brand' | 'model' | 'accessory-category' | 'ad';
type VehicleType = 'Moto' | 'Scooter' | 'Accessoires';

interface AccessoryCategory {
  id: number;
  name: string;
  count: number;
}

interface SuperAdminDashboardProps {
  onGoHome?: () => void;
  onLogout?: () => void;
}

// --- HELPER COMPONENTS ---

const StatCard = ({ label, value, change, icon: Icon, color, bg }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group cursor-default">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${bg} ${color} group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={20} />
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

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onGoHome, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'news' | 'tips' | 'garages' | 'ads' | 'data-moto' | 'data-scooter' | 'data-accessories'>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  
  // Consume Contexts
  const { ads, addAd, updateAd, deleteAd } = useAds();

  // Data State
  const [garages, setGarages] = useState<Garage[]>(mockGarages);
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [tips, setTips] = useState<Tip[]>(mockTips);
  
  // Accessory Categories State
  const [accessoryCategories, setAccessoryCategories] = useState<AccessoryCategory[]>([
    { id: 1, name: 'Casque', count: 124 },
    { id: 2, name: 'Blouson / Veste', count: 85 },
    { id: 3, name: 'Gants', count: 92 },
    { id: 4, name: 'Bottes / Chaussures', count: 45 },
    { id: 5, name: 'Pantalon / Combinaison', count: 30 },
    { id: 6, name: 'Pièce Moteur', count: 210 },
    { id: 7, name: 'Échappement', count: 65 },
    { id: 8, name: 'Carénage', count: 78 },
    { id: 9, name: 'Éclairage / Électronique', count: 110 },
    { id: 10, name: 'Intercom', count: 25 },
    { id: 11, name: 'Antivol / Alarme', count: 40 },
    { id: 12, name: 'Autre', count: 150 },
  ]);

  const [brands, setBrands] = useState<{name: string, type: VehicleType}[]>([
    ...brandsMoto.map(b => ({ name: b, type: 'Moto' as VehicleType })),
    { name: 'Vespa', type: 'Scooter' }, { name: 'Piaggio', type: 'Scooter' },
    { name: 'Sym', type: 'Scooter' }, { name: 'Peugeot', type: 'Scooter' }, { name: 'Aprilia', type: 'Scooter' },
    { name: 'Shark', type: 'Accessoires' }, { name: 'Alpinestars', type: 'Accessoires' }
  ]);
  const [models, setModels] = useState<any[]>([
    ...popularModels.map(m => ({ ...m, type: 'Moto' as VehicleType })),
    { id: 99, name: 'GTS 300', brand: 'Vespa', type: 'Scooter', price: '22 000 DT', image: '' },
    { id: 100, name: 'TMAX 560', brand: 'Yamaha', type: 'Scooter', price: '54 000 DT', image: '' },
    { id: 101, name: 'Evo-GT', brand: 'Shark', type: 'Accessoires', price: '1 200 DT', image: '' }
  ]);

  // UI State
  const [dataSubTab, setDataSubTab] = useState<'brands' | 'models'>('brands'); // For Moto/Scooter sub-navigation
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [currentEntity, setCurrentEntity] = useState<EntityType>('garage');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery("");
    setDataSubTab('brands'); // Reset subtab when changing main tabs
  }, [activeTab]);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenModal = (entity: EntityType, mode: ModalMode, item: any = null) => {
    setCurrentEntity(entity);
    setModalMode(mode);
    
    if (mode === 'create') {
        // Pre-fill type based on current active tab
        let defaultType: VehicleType = 'Moto';
        if (activeTab === 'data-scooter') defaultType = 'Scooter';
        if (activeTab === 'data-accessories') defaultType = 'Accessoires';

        if (entity === 'accessory-category') {
            setSelectedItem({ name: '', count: 0 });
        } else if (entity === 'article') {
            setSelectedItem({ 
                title: '', category: 'Nouveautés', author: 'Admin', 
                summary: '', content: '', image: '', readTime: '5 min', 
                tags: [], isFeatured: false, date: new Date().toLocaleDateString()
            });
        } else if (entity === 'tip') {
            setSelectedItem({
                title: '', category: 'Entretien', difficulty: 'Débutant', author: 'Atelier',
                summary: '', content: '', image: '', readTime: '5 min', 
                tools: [], date: new Date().toLocaleDateString()
            });
        } else if (entity === 'garage') {
            setSelectedItem({
               name: '', address: '', description: '', isVerified: false, image: '', 
               phone: '', email: '', website: '', hours: 'Lundi-Samedi: 09h-18h', 
               specialties: [], services: [], reviewsList: []
            });
        } else if (entity === 'ad') {
            setSelectedItem({
                title: '', client: '', zone: 'news_top', location: 'Toute la Tunisie', 
                startDate: '', endDate: '', mediaType: 'Image', 
                mediaUrl: '', linkUrl: '', description: '', ctaText: '', isActive: true
            });
        } else {
            setSelectedItem({ type: defaultType });
        }
    } else {
        setSelectedItem(item);
    }
    
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
    } else if (currentEntity === 'model') {
       if (modalMode === 'create') setModels([...models, { ...formData, id: newId }]);
       else setModels(models.map(m => m.id === selectedItem.id ? { ...m, ...formData } : m));
    } else if (currentEntity === 'accessory-category') {
       if (modalMode === 'create') {
           setAccessoryCategories([...accessoryCategories, { id: newId, name: formData.name, count: 0 }]);
       } else {
           setAccessoryCategories(accessoryCategories.map(cat => cat.id === selectedItem.id ? { ...cat, name: formData.name } : cat));
       }
    } else if (currentEntity === 'ad') {
       if (modalMode === 'create') {
           addAd(formData);
       } else {
           updateAd(selectedItem.id, formData);
       }
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
      else if (entity === 'model') setModels(models.filter(m => m.id !== id));
      else if (entity === 'accessory-category') setAccessoryCategories(accessoryCategories.filter(c => c.id !== id));
      else if (entity === 'ad') deleteAd(id as number);
      showNotification("Élément supprimé", "success");
    }
  };

  // --- RENDER FUNCTIONS FOR VIEWS ---

  const renderOverview = () => (
    <div className="space-y-8 animate-fade-in-up">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Visiteurs Uniques" value="24.5k" change="+12%" icon={Users} color="text-primary-600" bg="bg-primary-50" />
        <StatCard label="Taux de Rebond" value="42%" change="-5%" icon={Activity} color="text-blue-600" bg="bg-blue-50" />
        <StatCard label="Temps Moyen" value="3m 45s" change="+8%" icon={Clock} color="text-orange-600" bg="bg-orange-50" />
        <StatCard label="Conversions" value="1.2k" change="+15%" icon={TrendingUp} color="text-green-600" bg="bg-green-50" />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-96">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-lg">Trafic du site</h3>
            <select className="bg-gray-50 border border-gray-200 text-xs font-bold text-gray-600 rounded-lg px-3 py-2 outline-none">
              <option>30 derniers jours</option>
              <option>7 derniers jours</option>
            </select>
          </div>
          <InteractiveAreaChart data={trafficData} />
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-gray-900 text-lg mb-6">Top Régions</h3>
          <div className="flex-1">
             <GeoBarChart data={geoData} />
          </div>
        </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-6">Démographie</h3>
            <DonutChart data={demographicData} />
         </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-6">Appareils</h3>
            <div className="space-y-4">
               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-white rounded-lg shadow-sm"><Smartphone size={20} className="text-gray-600"/></div>
                     <span className="font-bold text-gray-700">Mobile</span>
                  </div>
                  <div className="text-right">
                     <span className="block font-extrabold text-gray-900">65%</span>
                     <span className="text-xs text-green-600 font-bold">+5%</span>
                  </div>
               </div>
               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-white rounded-lg shadow-sm"><Monitor size={20} className="text-gray-600"/></div>
                     <span className="font-bold text-gray-700">Desktop</span>
                  </div>
                  <div className="text-right">
                     <span className="block font-extrabold text-gray-900">30%</span>
                     <span className="text-xs text-red-600 font-bold">-2%</span>
                  </div>
               </div>
               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-white rounded-lg shadow-sm"><Tablet size={20} className="text-gray-600"/></div>
                     <span className="font-bold text-gray-700">Tablette</span>
                  </div>
                  <div className="text-right">
                     <span className="block font-extrabold text-gray-900">5%</span>
                     <span className="text-xs text-gray-400 font-bold">0%</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const renderGarageView = () => {
    const filteredGarages = garages.filter(g => 
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        g.address?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const paginated = filteredGarages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm gap-4">
                <div className="relative flex-1 w-full md:w-auto">
                   <input 
                     type="text" 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     placeholder="Rechercher un garage..."
                     className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                   />
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
                <button onClick={() => handleOpenModal('garage', 'create')} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm active:scale-95 whitespace-nowrap">
                   <Plus size={16} /> Ajouter
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map(garage => (
                    <div key={garage.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                        <div className="relative h-40 bg-gray-100 overflow-hidden">
                            <img src={garage.image} alt={garage.name} className="w-full h-full object-cover" />
                            <div className="absolute top-3 right-3 flex gap-2">
                                <button onClick={() => handleOpenModal('garage', 'edit', garage)} className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-primary-600 shadow-sm"><Edit size={14}/></button>
                                <button onClick={() => handleDelete('garage', garage.id)} className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-red-600 shadow-sm"><Trash2 size={14}/></button>
                            </div>
                            {garage.isVerified && (
                                <div className="absolute bottom-3 left-3 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                    <CheckCircle2 size={10} /> VÉRIFIÉ
                                </div>
                            )}
                        </div>
                        <div className="p-5">
                            <h4 className="font-bold text-gray-900 mb-1">{garage.name}</h4>
                            <div className="flex items-center gap-1 mb-3 text-xs text-gray-500">
                                <MapPin size={12} /> <span className="truncate">{garage.address || garage.location}</span>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-1">
                                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                    <span className="font-bold text-gray-900 text-sm">{garage.rating}</span>
                                    <span className="text-gray-400 text-xs">({garage.reviewsCount})</span>
                                </div>
                                <span className="text-xs font-medium text-gray-500">{garage.specialty || (garage.specialties && garage.specialties[0])}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination totalItems={filteredGarages.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
    );
  };

  const renderNewsView = () => {
    const filteredArticles = articles.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const paginated = filteredArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 text-lg hidden md:block">Articles ({articles.length})</h3>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                       <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600" />
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                    <button onClick={() => handleOpenModal('article', 'create')} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm active:scale-95 whitespace-nowrap"><Plus size={16} /> Créer</button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <tr>
                            <th className="p-5">Article</th>
                            <th className="p-5 hidden md:table-cell">Catégorie</th>
                            <th className="p-5 hidden md:table-cell">Date</th>
                            <th className="p-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {paginated.map(article => (
                            <tr key={article.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="p-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0"><img src={article.image} alt="" className="w-full h-full object-cover" /></div>
                                        <div>
                                            <span className="font-bold text-sm text-gray-900 block line-clamp-1">{article.title}</span>
                                            <span className="text-xs text-gray-500">Par {article.author}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-5 hidden md:table-cell"><span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">{article.category}</span></td>
                                <td className="p-5 hidden md:table-cell"><span className="text-xs text-gray-500">{article.date}</span></td>
                                <td className="p-5 text-right space-x-2">
                                    <button onClick={() => handleOpenModal('article', 'edit', article)} className="p-2 text-gray-400 hover:text-primary-600 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow active:scale-95"><Edit size={14}/></button>
                                    <button onClick={() => handleDelete('article', article.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow active:scale-95"><Trash2 size={14}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination totalItems={filteredArticles.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
  };

  const renderTipsView = () => {
    const filteredTips = tips.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const paginated = filteredTips.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 text-lg hidden md:block">Conseils ({tips.length})</h3>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                       <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600" />
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                    <button onClick={() => handleOpenModal('tip', 'create')} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm active:scale-95 whitespace-nowrap"><Plus size={16} /> Créer</button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <tr>
                            <th className="p-5">Titre</th>
                            <th className="p-5 hidden md:table-cell">Difficulté</th>
                            <th className="p-5 hidden md:table-cell">Catégorie</th>
                            <th className="p-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {paginated.map(tip => (
                            <tr key={tip.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0"><img src={tip.image} alt="" className="w-full h-full object-cover" /></div>
                                        <span className="font-bold text-sm text-gray-900 block line-clamp-1">{tip.title}</span>
                                    </div>
                                </td>
                                <td className="p-5 hidden md:table-cell"><span className={`px-2 py-1 rounded text-xs font-bold ${tip.difficulty === 'Débutant' ? 'bg-green-50 text-green-700' : tip.difficulty === 'Expert' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}`}>{tip.difficulty}</span></td>
                                <td className="p-5 hidden md:table-cell"><span className="text-xs text-gray-500">{tip.category}</span></td>
                                <td className="p-5 text-right space-x-2">
                                    <button onClick={() => handleOpenModal('tip', 'edit', tip)} className="p-2 text-gray-400 hover:text-primary-600 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow active:scale-95"><Edit size={14}/></button>
                                    <button onClick={() => handleDelete('tip', tip.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow active:scale-95"><Trash2 size={14}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination totalItems={filteredTips.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
  };

  const renderVehicleDataView = (type: VehicleType) => {
    const filteredBrands = brands.filter(b => b.type === type && b.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredModels = models.filter(m => m.type === type && m.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Sub-Navigation */}
            <div className="flex gap-4 border-b border-gray-200 mb-6">
                <button onClick={() => setDataSubTab('brands')} className={`pb-3 text-sm font-bold border-b-2 transition-colors ${dataSubTab === 'brands' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Marques ({filteredBrands.length})</button>
                <button onClick={() => setDataSubTab('models')} className={`pb-3 text-sm font-bold border-b-2 transition-colors ${dataSubTab === 'models' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>Modèles ({filteredModels.length})</button>
            </div>

            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm gap-4">
                <div className="relative flex-1 w-full md:w-auto">
                   <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={dataSubTab === 'brands' ? "Rechercher une marque..." : "Rechercher un modèle..."} className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600" />
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
                <button onClick={() => handleOpenModal(dataSubTab === 'brands' ? 'brand' : 'model', 'create')} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm active:scale-95 whitespace-nowrap"><Plus size={16} /> Ajouter</button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <tr>
                            <th className="p-5">Nom</th>
                            {dataSubTab === 'models' && <th className="p-5">Marque</th>}
                            {dataSubTab === 'models' && <th className="p-5">Prix Indicatif</th>}
                            <th className="p-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {dataSubTab === 'brands' ? (
                            filteredBrands.map((brand, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-5 font-bold text-gray-900">{brand.name}</td>
                                    <td className="p-5 text-right space-x-2">
                                        <button onClick={() => handleDelete('brand', brand.name, brand.type)} className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow active:scale-95"><Trash2 size={14}/></button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            filteredModels.map((model) => (
                                <tr key={model.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-5 font-bold text-gray-900">{model.name}</td>
                                    <td className="p-5 text-sm text-gray-600">{model.brand}</td>
                                    <td className="p-5 text-sm text-gray-600">{model.price || '-'}</td>
                                    <td className="p-5 text-right space-x-2">
                                        <button onClick={() => handleOpenModal('model', 'edit', model)} className="p-2 text-gray-400 hover:text-primary-600 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow active:scale-95"><Edit size={14}/></button>
                                        <button onClick={() => handleDelete('model', model.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow active:scale-95"><Trash2 size={14}/></button>
                                    </td>
                                </tr>
                            ))
                        )}
                        {(dataSubTab === 'brands' ? filteredBrands : filteredModels).length === 0 && (
                            <tr><td colSpan={4} className="p-12 text-center text-gray-400 italic">Aucun résultat trouvé.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
  };

  const renderAccessoryCategoriesView = () => {
    const filteredCategories = accessoryCategories.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm gap-4">
                <div className="relative flex-1 w-full md:w-auto">
                   <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher une catégorie..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600" />
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
                <button onClick={() => handleOpenModal('accessory-category', 'create')} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm active:scale-95 whitespace-nowrap"><Plus size={16} /> Ajouter</button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <tr>
                            <th className="p-5">Nom Catégorie</th>
                            <th className="p-5">Nombre d'articles (Estimé)</th>
                            <th className="p-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredCategories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-5 font-bold text-gray-900">{cat.name}</td>
                                <td className="p-5 text-sm text-gray-600">{cat.count}</td>
                                <td className="p-5 text-right space-x-2">
                                    <button onClick={() => handleOpenModal('accessory-category', 'edit', cat)} className="p-2 text-gray-400 hover:text-primary-600 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow active:scale-95"><Edit size={14}/></button>
                                    <button onClick={() => handleDelete('accessory-category', cat.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow active:scale-95"><Trash2 size={14}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
  };

  const renderAdsView = () => {
    const filteredItems = ads.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.client.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const paginated = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm gap-4">
                <h3 className="font-bold text-gray-900 text-lg">Campagnes Publicitaires</h3>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                       <input 
                         type="text" 
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         placeholder="Rechercher une campagne..."
                         className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                       />
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                    <button onClick={() => handleOpenModal('ad', 'create')} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm active:scale-95 whitespace-nowrap">
                       <Plus size={16} /> Créer
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <tr>
                            <th className="p-5">Campagne</th>
                            <th className="p-5">Durée</th>
                            <th className="p-5">Zone & Statut</th>
                            <th className="p-5">Perf.</th>
                            <th className="p-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {paginated.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-5">
                                    <div>
                                        <span className="font-bold text-sm text-gray-900 block">{item.title}</span>
                                        <span className="text-xs text-gray-500">{item.client}</span>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="text-xs text-gray-600">
                                        <div className="flex items-center gap-1">Du {item.startDate}</div>
                                        <div className="flex items-center gap-1">Au {item.endDate}</div>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded w-fit">
                                            {item.zone === 'news_top' && 'Bannière Top (News/Conseils)'}
                                            {item.zone === 'search_feed' && 'In-Feed (Recherche)'}
                                            {item.zone === 'garage_sidebar' && 'Sidebar (Garages)'}
                                            {item.zone === 'listing_sidebar' && 'Sidebar (Détails)'}
                                        </span>
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase w-fit ${item.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${item.isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                            {item.isActive ? 'Actif' : 'Inactif'}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="text-xs space-y-1">
                                        <div className="flex justify-between gap-4"><span className="text-gray-500">Vues:</span> <span className="font-bold">{item.views.toLocaleString()}</span></div>
                                        <div className="flex justify-between gap-4"><span className="text-gray-500">Clics:</span> <span className="font-bold">{item.clicks.toLocaleString()}</span></div>
                                    </div>
                                </td>
                                <td className="p-5 text-right space-x-2">
                                    <button onClick={() => handleOpenModal('ad', 'edit', item)} className="p-2 text-gray-400 hover:text-primary-600 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow active:scale-95"><Edit size={14}/></button>
                                    <button onClick={() => handleDelete('ad', item.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow active:scale-95"><Trash2 size={14}/></button>
                                </td>
                            </tr>
                        ))}
                        {paginated.length === 0 && (
                            <tr><td colSpan={5} className="p-12 text-center text-gray-400 italic">Aucune campagne trouvée.</td></tr>
                        )}
                    </tbody>
                </table>
                <Pagination totalItems={filteredItems.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
  };

  const ModalForm = () => {
    // ... [STATE INITIALIZATION UNCHANGED, except for ad fields in setFormData]
    const [activeModalTab, setActiveModalTab] = useState<'profile' | 'contact' | 'services' | 'reviews'>('profile');
    const [formData, setFormData] = useState<any>(
      selectedItem || {
        // ... [GARAGE, ARTICLE, TIP, BRAND, MODEL, ACCESSORY DEFAULTS UNCHANGED] ...
        ...(currentEntity === 'garage' && { 
            name: '', address: '', description: '', isVerified: false, image: '', 
            phone: '', email: '', website: '', hours: 'Lundi-Samedi: 09h-18h', 
            specialties: [], services: [], reviewsList: [] 
        }),
        ...(currentEntity === 'article' && { title: '', category: 'Nouveautés', author: 'Admin', summary: '', content: '', image: '', readTime: '5 min', tags: [], isFeatured: false, date: new Date().toLocaleDateString() }),
        ...(currentEntity === 'tip' && { title: '', category: 'Entretien', difficulty: 'Débutant', author: 'Atelier', summary: '', content: '', image: '', readTime: '5 min', tools: [], date: new Date().toLocaleDateString() }),
        ...(currentEntity === 'brand' && { name: '', type: selectedItem?.type || 'Moto' }),
        ...(currentEntity === 'model' && { name: '', brand: '', price: '', image: '', type: selectedItem?.type || 'Moto' }),
        ...(currentEntity === 'accessory-category' && { name: '' }),
        
        // AD DEFAULTS
        ...(currentEntity === 'ad' && { 
            title: '', 
            client: '', 
            zone: 'news_top', 
            location: 'Toute la Tunisie', 
            startDate: '', 
            endDate: '', 
            mediaType: 'Image', 
            mediaUrl: '',
            linkUrl: '',
            description: '',
            ctaText: 'Voir plus',
            isActive: true 
        })
      }
    );
    const [tagInput, setTagInput] = useState(""); 
    
    // Service Input State
    const [newService, setNewService] = useState({ name: '', price: '' });

    const handleChange = (e: any) => {
      const { name, value, type, checked } = e.target;
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        // For Ad: update mediaUrl
        if (currentEntity === 'ad') {
            setFormData({ ...formData, mediaUrl: imageUrl });
        } else {
            setFormData({ ...formData, image: imageUrl });
        }
      }
    };

    // ... [HELPER FUNCTIONS: handleAddListType, handleRemoveListType, handleAddService, handleRemoveService] ...
    // Generic Tag/Tool Handler
    const handleAddListType = (field: string) => {
       if (tagInput.trim() !== "") {
          setFormData({ ...formData, [field]: [...(formData[field] || []), tagInput] });
          setTagInput("");
       }
    };

    const handleRemoveListType = (field: string, index: number) => {
        setFormData({ ...formData, [field]: formData[field].filter((_: any, i: number) => i !== index) });
    };

    // Service Handlers
    const handleAddService = () => {
        if (newService.name && newService.price) {
            setFormData({ 
                ...formData, 
                services: [...(formData.services || []), { ...newService }] 
            });
            setNewService({ name: '', price: '' });
        }
    };

    const handleRemoveService = (index: number) => {
        setFormData({
            ...formData,
            services: formData.services.filter((_: any, i: number) => i !== index)
        });
    };

    const isContentEntity = currentEntity === 'article' || currentEntity === 'tip';
    const isGarage = currentEntity === 'garage';

    // Rich Text Toolbar Component
    const RichTextToolbar = () => (
        <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200 rounded-t-xl mb-0">
            <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><Bold size={14}/></button>
            <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><Italic size={14}/></button>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><List size={14}/></button>
            <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><Link size={14}/></button>
            <div className="w-px h-4 bg-gray-300 mx-1"></div>
            <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600 flex items-center gap-1 text-xs font-bold"><Type size={14}/> H1</button>
            <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600 flex items-center gap-1 text-xs font-bold"><Type size={12}/> H2</button>
        </div>
    );

    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
        <div className={`bg-white rounded-3xl w-full ${isContentEntity || isGarage ? 'max-w-4xl' : 'max-w-2xl'} max-h-[90vh] overflow-hidden shadow-2xl flex flex-col`}>
          
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white z-10">
            <h3 className="text-xl font-extrabold text-gray-900 capitalize">{modalMode === 'create' ? 'Ajouter' : 'Modifier'} {currentEntity === 'model' ? 'Modèle' : currentEntity === 'accessory-category' ? 'Catégorie Accessoire' : currentEntity === 'article' ? 'Article' : currentEntity === 'tip' ? 'Conseil' : currentEntity}</h3>
            <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"><X size={20} className="text-gray-500" /></button>
          </div>
          
          {/* Garage Tabs */}
          {isGarage && (
              <div className="flex border-b border-gray-100 px-8 bg-gray-50/50 overflow-x-auto no-scrollbar">
                  {/* ... tabs implementation ... */}
                  <button onClick={() => setActiveModalTab('profile')} className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeModalTab === 'profile' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>Profil</button>
                  <button onClick={() => setActiveModalTab('contact')} className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeModalTab === 'contact' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>Contact & Horaires</button>
                  <button onClick={() => setActiveModalTab('services')} className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeModalTab === 'services' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>Prestations & Prix</button>
                  <button onClick={() => setActiveModalTab('reviews')} className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeModalTab === 'reviews' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>Avis ({formData.reviewsList?.length || 0})</button>
              </div>
          )}

          <div className="p-8 space-y-6 overflow-y-auto">
             
             {/* Common Image Uploader for most entities EXCEPT AD (Ad has special layout below) */}
             {(currentEntity !== 'brand' && currentEntity !== 'ad' && currentEntity !== 'accessory-category' && !isGarage) && (
                <div className="flex gap-6 items-start">
                   <div onClick={() => fileInputRef.current?.click()} className="w-32 h-24 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-primary-400 transition-colors overflow-hidden flex-shrink-0 relative group">
                      {formData.image ? <img src={formData.image} className="w-full h-full object-cover"/> : <ImageIcon className="text-gray-400"/>}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <Plus className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                      </div>
                      <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload}/>
                   </div>
                   <div className="flex-1 space-y-4">
                      <div>
                          <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Titre Principal</label>
                          <input type="text" name={isContentEntity ? 'title' : 'name'} value={formData.title || formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-primary-600 transition-all text-sm font-bold" placeholder="Titre..." />
                      </div>
                   </div>
                </div>
             )}
             
             {/* ... [GARAGE FORM SECTIONS REMAIN UNCHANGED] ... */}
             {isGarage && activeModalTab === 'profile' && (
                <div className="space-y-6 animate-fade-in-up">
                   <div className="flex gap-6 items-start">
                        <div onClick={() => fileInputRef.current?.click()} className="w-40 h-28 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-primary-400 transition-colors overflow-hidden flex-shrink-0 relative group">
                            {formData.image ? <img src={formData.image} className="w-full h-full object-cover"/> : <ImageIcon className="text-gray-400"/>}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <Plus className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                            </div>
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload}/>
                        </div>
                        <div className="flex-1">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Nom du Garage</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-primary-600 transition-all text-sm font-bold" placeholder="Nom..." />
                        </div>
                   </div>

                   <div>
                       <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Description</label>
                       <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm resize-none" placeholder="Description du garage..."></textarea>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                       <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                           <input type="checkbox" name="isVerified" checked={formData.isVerified} onChange={handleChange} className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                           <div>
                               <span className="block text-sm font-bold text-gray-900">Garage Vérifié</span>
                               <span className="text-xs text-gray-500">Badge bleu de confiance</span>
                           </div>
                       </label>
                       <div className="p-4 border border-gray-200 rounded-xl">
                           <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Statut Ouverture</label>
                           <select className="w-full bg-transparent outline-none text-sm font-medium text-gray-900">
                               <option value="open">Ouvert</option>
                               <option value="closed">Fermé temporairement</option>
                               <option value="busy">Surchargé</option>
                           </select>
                       </div>
                   </div>
                </div>
             )}
             {/* ... [GARAGE CONTACT, SERVICES, REVIEWS SECTIONS UNCHANGED] ... */}
             {isGarage && activeModalTab === 'contact' && (
                <div className="space-y-6 animate-fade-in-up">
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Téléphone</label>
                          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+216" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                      </div>
                      <div>
                          <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Email</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="contact@" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                      </div>
                   </div>
                   
                   <div>
                      <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Adresse Complète</label>
                      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Adresse..." className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Site Web</label>
                          <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="https://" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                      </div>
                      <div>
                          <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Horaires</label>
                          <input type="text" name="hours" value={formData.hours} onChange={handleChange} placeholder="Ex: 08h - 18h" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                      </div>
                   </div>
                </div>
             )}
             {isGarage && activeModalTab === 'services' && (
                <div className="space-y-6 animate-fade-in-up">
                    <div className="flex gap-2 items-end bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="flex-1">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Prestation</label>
                            <input type="text" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 outline-none text-sm" placeholder="Ex: Vidange" />
                        </div>
                        <div className="w-32">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Prix</label>
                            <input type="text" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 outline-none text-sm" placeholder="Ex: 45 DT" />
                        </div>
                        <button onClick={handleAddService} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">Ajouter</button>
                    </div>

                    <div className="space-y-2">
                        {formData.services?.map((service: GarageService, index: number) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                                <div>
                                    <span className="font-bold text-gray-900 text-sm block">{service.name}</span>
                                    <span className="text-primary-600 text-xs font-bold">{service.price}</span>
                                </div>
                                <button onClick={() => handleRemoveService(index)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                        {(!formData.services || formData.services.length === 0) && (
                            <p className="text-center text-gray-400 text-sm italic py-4">Aucune prestation ajoutée.</p>
                        )}
                    </div>
                </div>
             )}
             {isGarage && activeModalTab === 'reviews' && (
                <div className="space-y-4 animate-fade-in-up">
                    {formData.reviewsList?.map((review: GarageReview) => (
                        <div key={review.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-gray-900 text-sm">{review.author}</span>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={12} className={i < review.rating ? "text-warning-400 fill-warning-400" : "text-gray-300"} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 text-xs mb-3">{review.content}</p>
                            <div className="flex gap-2">
                                <input type="text" placeholder="Répondre..." className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg outline-none" />
                                <button className="px-3 py-1.5 bg-white border border-gray-200 text-primary-600 text-xs font-bold rounded-lg hover:bg-primary-50">Envoyer</button>
                            </div>
                        </div>
                    ))}
                    {(!formData.reviewsList || formData.reviewsList.length === 0) && (
                        <p className="text-center text-gray-400 text-sm italic py-4">Aucun avis client pour le moment.</p>
                    )}
                </div>
             )}
             
             {/* ... [CONTENT BLOG FORM SECTIONS UNCHANGED] ... */}
             {isContentEntity && (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Catégorie</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm cursor-pointer">
                                {currentEntity === 'article' ? (
                                    <>
                                        <option>Nouveautés</option>
                                        <option>Essais</option>
                                        <option>Tech</option>
                                        <option>Scooters</option>
                                        <option>Électrique</option>
                                    </>
                                ) : (
                                    <>
                                        <option>Entretien</option>
                                        <option>Sécurité</option>
                                        <option>Équipement</option>
                                        <option>Conduite</option>
                                        <option>Législation</option>
                                    </>
                                )}
                            </select>
                        </div>
                        {currentEntity === 'tip' && (
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Difficulté</label>
                                <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm cursor-pointer">
                                    <option>Débutant</option>
                                    <option>Intermédiaire</option>
                                    <option>Expert</option>
                                </select>
                            </div>
                        )}
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Auteur</label>
                            <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Temps de lecture</label>
                            <input type="text" name="readTime" value={formData.readTime} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Résumé (Aperçu)</label>
                        <textarea name="summary" value={formData.summary} onChange={handleChange} rows={2} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm resize-none" placeholder="Bref résumé visible dans la liste..."></textarea>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block flex justify-between">
                            <span>Contenu Complet (Format Riche)</span>
                        </label>
                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <RichTextToolbar />
                            <textarea 
                                name="content" 
                                value={formData.content} 
                                onChange={handleChange} 
                                rows={10} 
                                className="w-full px-4 py-3 bg-white outline-none text-sm font-mono text-gray-700 resize-y" 
                                placeholder="<p>Écrivez votre article ici...</p>"
                            ></textarea>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">{currentEntity === 'article' ? 'Tags' : 'Outils Requis'}</label>
                        <div className="flex gap-2 mb-2">
                            <input 
                                type="text" 
                                value={tagInput} 
                                onChange={(e) => setTagInput(e.target.value)} 
                                onKeyDown={(e) => e.key === 'Enter' && handleAddListType(currentEntity === 'article' ? 'tags' : 'tools')}
                                className="flex-1 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" 
                                placeholder="Ajouter et appuyer sur Entrée..." 
                            />
                            <button onClick={() => handleAddListType(currentEntity === 'article' ? 'tags' : 'tools')} className="px-4 py-2 bg-gray-900 text-white rounded-xl font-bold text-sm">Ajouter</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {(currentEntity === 'article' ? formData.tags : formData.tools)?.map((item: string, i: number) => (
                                <span key={i} className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-2">
                                    {item} 
                                    <X size={12} className="cursor-pointer hover:text-red-500" onClick={() => handleRemoveListType(currentEntity === 'article' ? 'tags' : 'tools', i)}/>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
             )}
             
             {/* ... [BRAND, ACCESSORY CATEGORY, MODEL FORMS UNCHANGED] ... */}
             {(currentEntity === 'brand') && (
                 <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Nom de la marque</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ex: Yamaha" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-primary-600 transition-all text-sm font-bold" />
                    </div>
                    {activeTab === 'data-moto' || activeTab === 'data-scooter' ? null : (
                        <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm">
                            <option value="Moto">Moto</option>
                            <option value="Scooter">Scooter</option>
                            <option value="Accessoires">Accessoires</option>
                        </select>
                    )}
                 </div>
             )}

             {(currentEntity === 'accessory-category') && (
                 <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Nom de la catégorie</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ex: Casque" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:border-primary-600 transition-all text-sm font-bold" />
                    </div>
                 </div>
             )}

             {(currentEntity === 'model') && (
                 <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Marque</label>
                            <select name="brand" value={formData.brand} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm">
                                <option value="" disabled>Choisir une marque</option>
                                {brands.filter(b => b.type === formData.type).map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Prix Indicatif</label>
                            <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Ex: 25 000 DT" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                        </div>
                    </div>
                 </div>
             )}

             {/* ADS FORM - UPDATED */}
             {currentEntity === 'ad' && (
                 <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Titre Campagne</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Titre interne" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm font-bold" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Client</label>
                            <input type="text" name="client" value={formData.client} onChange={handleChange} placeholder="Client" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Zone d'affichage</label>
                        <select name="zone" value={formData.zone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm">
                            <option value="news_top">Top Banner (Actualités & Conseils)</option>
                            <option value="search_feed">In-Feed (Résultats de recherche)</option>
                            <option value="garage_sidebar">Sidebar (Liste Garages)</option>
                            <option value="listing_sidebar">Sidebar (Détail Annonce)</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Début</label>
                            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Fin</label>
                            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">URL de l'image (ou Upload ci-dessus)</label>
                        <div className="flex gap-2">
                            <input type="text" name="mediaUrl" value={formData.mediaUrl} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                            <div onClick={() => fileInputRef.current?.click()} className="p-3 bg-gray-100 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-200">
                                <ImageIcon size={20} className="text-gray-500" />
                            </div>
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} />
                        </div>
                    </div>

                    {/* Specific fields for Native Ads */}
                    {(formData.zone === 'search_feed' || formData.zone === 'listing_sidebar' || formData.zone === 'garage_sidebar') && (
                        <>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Description (Pour format natif)</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows={2} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm resize-none"></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Texte Bouton</label>
                                    <input type="text" name="ctaText" value={formData.ctaText} onChange={handleChange} placeholder="Ex: Voir l'offre" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Lien destination</label>
                                    <input type="text" name="linkUrl" value={formData.linkUrl} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-sm" />
                                </div>
                            </div>
                        </>
                    )}
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

  // ... [SIDEBAR ITEM & RENDER RETURN UNCHANGED] ...
  const SidebarItem = ({ id, label, icon: Icon }: any) => (
      <button 
        onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === id ? 'bg-primary-50 text-primary-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
      >
        <Icon size={18} />
        {label}
      </button>
  );

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      
      {/* SIDEBAR - Fixed Left */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 lg:static flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
         {/* Logo Area */}
         <div className="h-16 flex items-center px-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-black text-lg">A</div>
                <span className="font-extrabold text-gray-900 text-lg tracking-tight">Admin<span className="text-primary-600">Panel</span></span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="ml-auto lg:hidden text-gray-500"><X size={20} /></button>
         </div>

         {/* Navigation */}
         <div className="flex-1 overflow-y-auto p-4 space-y-1">
            <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Principal</div>
            <SidebarItem id="overview" label="Vue d'ensemble" icon={LayoutDashboard} />
            
            <div className="px-4 py-2 mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Garage</div>
            <SidebarItem id="garages" label="Liste des garages" icon={Wrench} />
            
            <div className="px-4 py-2 mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Contenu (Blog)</div>
            <SidebarItem id="news" label="Actualités" icon={FileText} />
            <SidebarItem id="tips" label="Conseils" icon={Lightbulb} />
            
            <div className="px-4 py-2 mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Données</div>
            <SidebarItem id="data-moto" label="Moto" icon={Bike} />
            <SidebarItem id="data-scooter" label="Scooter" icon={Zap} />
            <SidebarItem id="data-accessories" label="Accessoires" icon={ShoppingBag} />
            
            <div className="px-4 py-2 mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Marketing</div>
            <SidebarItem id="ads" label="Publicité" icon={Megaphone} />
         </div>

         {/* Footer */}
         <div className="p-4 border-t border-gray-100">
            <button onClick={onGoHome} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-2">
                <Globe size={16} /> Voir le site
            </button>
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <LogOut size={16} /> Déconnexion
            </button>
         </div>
      </aside>

      {/* OVERLAY for Mobile Sidebar */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
         
         {/* ADMIN HEADER */}
         <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 flex-shrink-0">
            <div className="flex items-center gap-4 flex-1">
                <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                    <Menu size={20} />
                </button>
                
                {/* Global Search Bar */}
                <div className="relative max-w-md w-full hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Rechercher partout (Ctrl+K)" 
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 lg:gap-6">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <button className="hidden md:block p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
                    <HelpCircle size={20} />
                </button>
                
                {/* Profile Dropdown Trigger */}
                <div className="flex items-center gap-3 pl-3 md:pl-6 md:border-l border-gray-100 cursor-pointer group">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-gray-900 leading-none">Super Admin</p>
                        <p className="text-xs text-gray-500 mt-1">Administrateur</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-white flex items-center justify-center font-bold shadow-sm ring-2 ring-white group-hover:ring-gray-100 transition-all">
                        SA
                    </div>
                </div>
            </div>
         </header>

         {/* SCROLLABLE CONTENT */}
         <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
               <div className="mb-8">
                  <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
                      {activeTab === 'overview' && "Tableau de Bord"}
                      {activeTab === 'garages' && "Gestion des Garages"}
                      {activeTab === 'news' && "Gestion des Actualités"}
                      {activeTab === 'tips' && "Gestion des Conseils"}
                      {activeTab === 'data-moto' && "Gestion Moto"}
                      {activeTab === 'data-scooter' && "Gestion Scooter"}
                      {activeTab === 'data-accessories' && "Gestion des Accessoires"}
                      {activeTab === 'ads' && "Gestion Publicitaire"}
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">
                      {activeTab === 'overview' ? "Bienvenue sur votre espace d'administration." : "Gérez les données de la plateforme."}
                  </p>
               </div>

               {/* Render Content Based on Active Tab */}
               {activeTab === 'overview' && renderOverview()}
               {activeTab === 'garages' && renderGarageView()}
               {activeTab === 'news' && renderNewsView()}
               {activeTab === 'tips' && renderTipsView()}
               {activeTab === 'data-moto' && renderVehicleDataView('Moto')}
               {activeTab === 'data-scooter' && renderVehicleDataView('Scooter')}
               {activeTab === 'data-accessories' && renderAccessoryCategoriesView()}
               {activeTab === 'ads' && renderAdsView()}
            </div>
         </main>

      </div>

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
