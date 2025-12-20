import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  List, 
  Settings, 
  LogOut, 
  User, 
  ChevronRight, 
  TrendingUp, 
  Eye, 
  MousePointer, 
  Calendar as CalendarIcon, 
  Edit, 
  Trash2, 
  Plus, 
  Camera, 
  Save, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  Shield, 
  ShieldCheck,
  CheckCircle2,
  Building2,
  Briefcase,
  BarChart3, 
  MessageSquare,
  Facebook,
  Instagram,
  Music2,
  Clock,
  Wrench,
  Navigation,
  Globe,
  Zap,
  AlertTriangle,
  X,
  ChevronDown,
  Check,
  Bell,
  Scissors,
  Maximize,
  Minimize,
  RefreshCw,
  CreditCard,
  Upload,
  Info,
  Calendar,
  Bike,
  Navigation2
} from 'lucide-react';
import Header from './layout/Header';
import { mockListings, specialtiesList } from '../data/mockData';

interface DashboardProProps {
  initialTab?: 'overview' | 'listings' | 'settings';
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

interface Service {
  id: string;
  name: string;
  price: string;
}

interface OpeningHour {
  id: string;
  day: string;
  hours: string;
}

const DashboardPro: React.FC<DashboardProProps> = ({ 
  initialTab = 'overview', 
  onGoHome, 
  onNavigate, 
  isLoggedIn, 
  onTriggerLogin, 
  onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'settings'>(initialTab);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const proofInputRef = useRef<HTMLInputElement>(null);

  // Renewal State
  const [isRenewalModalOpen, setIsRenewalModalOpen] = useState(false);
  const [renewalPeriod, setRenewalPeriod] = useState<6 | 12 | 24>(6);
  const [renewalProof, setRenewalProof] = useState<File | null>(null);
  const [isRenewalSubmitting, setIsRenewalSubmitting] = useState(false);
  const [showRenewalSuccess, setShowRenewalSuccess] = useState(false);

  // Crop State
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Boost Logic State
  const [lastBoostDate, setLastBoostDate] = useState<number | null>(null);
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [selectedAdForBoost, setSelectedAdForBoost] = useState<any>(null);
  const [boostConfirmationSuccess, setBoostConfirmationSuccess] = useState(false);

  // Pro Profile State
  const [profileData, setProfileData] = useState({
    shopName: 'Tunis Moto Shop',
    managerName: 'John Doe',
    specialties: ['Grosse Cylindrée', 'Réparation'],
    description: "Réparation et Maintenance de Scooter, Maxiscooter et Moto. Spécialiste certifié Yamaha et Honda. Nous utilisons uniquement des pièces d'origine pour garantir la longévité de votre deux-roues.",
    email: 'contact@tunismoto.tn',
    phone: '22 123 456',
    address: 'Les Berges du Lac 1, Tunis',
    mapsUrl: 'https://goo.gl/maps/example',
    logo: null as string | null,
    socialLinks: {
      facebook: 'https://facebook.com/tunismoto',
      instagram: 'https://instagram.com/tunismoto',
      tiktok: '@tunismoto'
    },
    services: [
      { id: '1', name: 'Vidange simple + Contrôle', price: '45 DT' },
      { id: '2', name: 'Diagnostic Valise', price: '60 DT' }
    ] as Service[],
    openingHours: [
      { id: '1', day: 'Lundi - Vendredi', hours: '08:00 - 18:00' },
      { id: '2', day: 'Samedi', hours: '08:00 - 14:00' }
    ] as OpeningHour[],
    notifications: {
      email: true,
      sms: true,
      marketing: false
    }
  });

  // Local state for dynamic inputs
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newHourDay, setNewHourDay] = useState('');
  const [newHourRange, setNewHourRange] = useState('');

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempImage(event.target?.result as string);
        setIsCropModalOpen(true);
        setZoom(1);
        setOffset({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const applyCrop = () => {
    if (!canvasRef.current || !tempImage) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();
    img.src = tempImage;
    img.onload = () => {
      canvas.width = 400;
      canvas.height = 400;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const size = Math.min(img.width, img.height);
      const drawWidth = img.width * (canvas.width / size) * zoom;
      const drawHeight = img.height * (canvas.height / size) * zoom;
      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2;
      ctx.drawImage(img, x, y, drawWidth, drawHeight);
      const croppedUrl = canvas.toDataURL('image/png');
      setProfileData(prev => ({ ...prev, logo: croppedUrl }));
      setIsCropModalOpen(false);
      setTempImage(null);
    };
  };

  const canBoost = () => {
    if (!lastBoostDate) return true;
    const now = Date.now();
    return now - lastBoostDate > 24 * 60 * 60 * 1000;
  };

  const getTimeUntilNextBoost = () => {
    if (!lastBoostDate) return "";
    const nextBoostTime = lastBoostDate + (24 * 60 * 60 * 1000);
    const diff = nextBoostTime - Date.now();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h et ${minutes}min`;
  };

  const handleBoostClick = (listing: any) => {
    setSelectedAdForBoost(listing);
    setShowBoostModal(true);
  };

  const confirmBoost = () => {
    setLastBoostDate(Date.now());
    setBoostConfirmationSuccess(true);
    setTimeout(() => {
      setBoostConfirmationSuccess(false);
      setShowBoostModal(false);
      setSelectedAdForBoost(null);
    }, 2500);
  };

  // Renewal Functions
  const getPackInfo = (period: number) => {
    switch(period) {
      case 24: return { name: 'Pack Domination', total: 269.900, monthly: 11.245 };
      case 12: return { name: 'Pack Croissance', total: 199.000, monthly: 16.583 };
      case 6: default: return { name: 'Pack Découverte', total: 119.900, monthly: 19.983 };
    }
  };

  const handleRenewalSubmit = () => {
    if (!renewalProof) return;
    setIsRenewalSubmitting(true);
    setTimeout(() => {
      setIsRenewalSubmitting(false);
      setShowRenewalSuccess(true);
      setTimeout(() => {
        setIsRenewalModalOpen(false);
        setShowRenewalSuccess(false);
        setRenewalProof(null);
      }, 3000);
    }, 2000);
  };

  const stats = [
    { label: 'Vues Boutique', value: '8,420', change: '+24%', icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Annonces Actives', value: '12', change: '+2', icon: List, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Demandes (Appels)', value: '89', change: '+12%', icon: Phone, color: 'text-success-600', bg: 'bg-success-50' },
    { label: 'Messages', value: '34', change: '+5%', icon: MessageSquare, color: 'text-warning-600', bg: 'bg-warning-50' },
  ];

  // Mock data for most visited scooters
  const topVisitedScooters = [
    { id: 1, name: "Yamaha TMAX 560 Tech MAX", views: 1250 },
    { id: 2, name: "Vespa GTS 300 Super Sport", views: 980 },
    { id: 3, name: "Honda X-ADV 750", views: 845 },
    { id: 4, name: "Piaggio Beverly 400", views: 620 },
    { id: 5, name: "SYM Symphony ST 200", views: 410 },
  ];

  // Mock data for top zones
  const topVisitedZones = [
    { id: 1, name: "Tunis", views: 4250 },
    { id: 2, name: "Sousse", views: 1840 },
    { id: 3, name: "Sfax", views: 1210 },
    { id: 4, name: "Ariana", views: 950 },
    { id: 5, name: "Nabeul", views: 620 },
  ];

  const myListings = mockListings.slice(0, 5);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSpecialty = (specialty: string) => {
    setProfileData(prev => {
      const exists = prev.specialties.includes(specialty);
      return { 
        ...prev, 
        specialties: exists ? prev.specialties.filter(s => s !== specialty) : [...prev.specialties, specialty] 
      };
    });
  };

  const handleSocialChange = (key: keyof typeof profileData.socialLinks, value: string) => {
    setProfileData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [key]: value }
    }));
  };

  const handleToggleNotification = (key: keyof typeof profileData.notifications) => {
    setProfileData(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: !prev.notifications[key] }
    }));
  };

  const addService = () => {
    if (newServiceName && newServicePrice) {
      const newService: Service = { id: Date.now().toString(), name: newServiceName, price: newServicePrice };
      setProfileData(prev => ({ ...prev, services: [...prev.services, newService] }));
      setNewServiceName(''); setNewServicePrice('');
    }
  };

  const removeService = (id: string) => {
    setProfileData(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }));
  };

  const addOpeningHour = () => {
    if (newHourDay && newHourRange) {
      const newHour: OpeningHour = { id: Date.now().toString(), day: newHourDay, hours: newHourRange };
      setProfileData(prev => ({ ...prev, openingHours: [...prev.openingHours, newHour] }));
      setNewHourDay(''); setNewHourRange('');
    }
  };

  const removeOpeningHour = (id: string) => {
    setProfileData(prev => ({ ...prev, openingHours: prev.openingHours.filter(h => h.id !== id) }));
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handleTabChange = (tab: 'overview' | 'listings' | 'settings') => {
    if (onNavigate) onNavigate('dashboard-pro', { tab });
    else setActiveTab(tab);
  };

  const renderOverview = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm flex flex-col justify-between h-36">
            <div className="flex justify-between items-start">
              <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <h4 className="text-2xl font-extrabold text-gray-900">{stat.value}</h4>
              <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           {/* Chart Card */}
           <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <BarChart3 size={20} className="text-primary-600" />
                  Trafic de la boutique
                </h3>
                <select className="bg-gray-50 border border-gray-200 text-xs font-bold text-gray-600 rounded-md px-3 py-2 outline-none">
                  <option>30 derniers jours</option>
                  <option>Cette année</option>
                </select>
              </div>
              <div className="h-64 flex items-end justify-between gap-2 px-4 pb-4 border-b border-gray-50">
                 {[30, 45, 60, 40, 85, 95, 75, 60, 80, 55, 90, 100].map((h, i) => (
                   <div key={i} className="w-full bg-primary-50 rounded-t-md relative group">
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-primary-600 rounded-t-md transition-all duration-500 group-hover:bg-primary-500"
                        style={{ height: `${h}%` }}
                      ></div>
                   </div>
                 ))}
              </div>
              <div className="flex justify-between mt-4 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                 <span>Jan</span><span>Fév</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Juin</span><span>Juil</span><span>Août</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Déc</span>
              </div>
           </div>

           {/* Stats Lists Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top Visited Scooters Section */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <Bike size={16} className="text-primary-600" />
                      Annonces les plus vues
                    </h3>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Top 5</span>
                  </div>
                  
                  <div className="divide-y divide-gray-50 border-t border-gray-50">
                    {topVisitedScooters.map((scoot, idx) => (
                        <div key={scoot.id} className="flex items-center justify-between py-1.5 px-1 hover:bg-gray-50 transition-colors group">
                          <div className="flex items-center gap-3 min-w-0">
                              <span className="text-[10px] font-black text-gray-300 w-4">{idx + 1}</span>
                              <span className="font-bold text-gray-800 text-[11px] truncate group-hover:text-primary-600 transition-colors">{scoot.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-400 font-black">
                              <Eye size={10} className="opacity-50" />
                              <span className="text-[10px] tabular-nums">{scoot.views.toLocaleString()}</span>
                          </div>
                        </div>
                    ))}
                  </div>
              </div>

              {/* Top Visited Zones Section */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <Navigation2 size={16} className="text-primary-600" />
                      Zones géographiques
                    </h3>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Top 5</span>
                  </div>
                  
                  <div className="divide-y divide-gray-50 border-t border-gray-50">
                    {topVisitedZones.map((zone, idx) => (
                        <div key={zone.id} className="flex items-center justify-between py-1.5 px-1 hover:bg-gray-50 transition-colors group">
                          <div className="flex items-center gap-3 min-w-0">
                              <span className="text-[10px] font-black text-gray-300 w-4">{idx + 1}</span>
                              <span className="font-bold text-gray-800 text-[11px] truncate group-hover:text-primary-600 transition-colors">{zone.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-400 font-black">
                              <User size={10} className="opacity-50" />
                              <span className="text-[10px] tabular-nums">{zone.views.toLocaleString()}</span>
                          </div>
                        </div>
                    ))}
                  </div>
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                 <ShieldCheck size={16} className="text-success-500" />
                 Conseil Business
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                 Les boutiques avec un logo et une adresse physique complète convertissent 2.5x plus.
              </p>
              <button onClick={() => handleTabChange('settings')} className="text-primary-600 text-xs font-bold hover:underline">
                 Compléter mon profil
              </button>
           </div>
        </div>
      </div>
    </div>
  );

  const renderListings = () => (
    <div className="space-y-6 animate-fade-in-up">
       <div className="flex justify-between items-center">
          <h2 className="text-xl font-extrabold text-gray-900">Gestion des annonces ({myListings.length})</h2>
          <button 
            onClick={() => onNavigate?.('deposit')}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-bold hover:bg-primary-700 transition-colors active:scale-95 shadow-md"
          >
             <Plus size={18} />
             Publier un véhicule
          </button>
       </div>

       <div className="space-y-4">
          {myListings.map(listing => (
             <div key={listing.id} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center group hover:border-primary-100 transition-colors">
                <div className="relative w-full md:w-40 h-32 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                   <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                   <div className="absolute top-2 left-2 flex gap-1">
                      <span className="bg-success-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase shadow-sm">Actif</span>
                   </div>
                </div>
                
                <div className="flex-1">
                   <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">{listing.title}</h3>
                   <p className="text-primary-600 font-black text-sm mb-2">{listing.price}</p>
                   <div className="flex items-center gap-4 text-xs text-gray-400 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><Eye size={14} className="text-gray-300" /> {Math.floor(Math.random() * 500) + 100}</span>
                      <span className="flex items-center gap-1.5"><Phone size={14} className="text-gray-300" /> {Math.floor(Math.random() * 20)} appels</span>
                   </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto border-t md:border-t-0 border-gray-50 pt-4 md:pt-0">
                   <button className="flex-1 md:flex-none p-2.5 rounded-lg border border-gray-200 text-gray-500 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-colors shadow-sm">
                      <Edit size={18} />
                   </button>
                   <button className="flex-1 md:flex-none p-2.5 rounded-lg border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors shadow-sm">
                      <Trash2 size={18} />
                   </button>
                   <button 
                    onClick={() => handleBoostClick(listing)}
                    className="flex-1 md:flex-none px-6 py-2.5 bg-gray-900 text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-md active:scale-95"
                   >
                      Booster
                   </button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8 animate-fade-in-up">
       {showSuccess && (
         <div className="fixed top-24 right-4 md:right-8 bg-gray-900 text-white px-6 py-4 rounded-lg flex items-center gap-3 z-50 animate-fade-in-up shadow-2xl">
            <CheckCircle2 className="text-green-400" size={20} />
            <span className="font-bold">Profil Boutique mis à jour !</span>
         </div>
       )}

       <div className="flex justify-between items-center">
          <h2 className="text-xl font-extrabold text-gray-900">Paramètres Boutique</h2>
          <button 
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-all active:scale-95 disabled:opacity-50 shadow-md"
          >
             {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save size={20} />}
             {isSaving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
       </div>

       <div className="space-y-8 max-w-4xl">
          {/* Section 1: Informations Générales - À Propos Harmonisé */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
             <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center border border-primary-100 shadow-sm">
                   <Building2 size={24} />
                </div>
                <div>
                   <h4 className="font-black text-gray-900 text-xl tracking-tight">À propos de l'Atelier</h4>
                   <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Informations publiques</p>
                </div>
             </div>

             <div className="space-y-10">
                {/* Top Row: Logo + Shop Name */}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                   {/* Logo Upload with Crop Trigger */}
                   <div className="w-full md:w-48 space-y-3">
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="relative group cursor-pointer w-full aspect-square rounded-2xl overflow-hidden border-4 border-gray-50 bg-gray-50 flex items-center justify-center shadow-inner ring-1 ring-gray-100 transition-all hover:ring-primary-200"
                      >
                        {profileData.logo ? (
                          <img src={profileData.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                        ) : (
                          <div className="flex flex-col items-center text-gray-200">
                            <Building2 size={48} />
                            <span className="text-[9px] font-black uppercase mt-2 opacity-50 tracking-tighter">Pas de logo</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                           <div className="flex flex-col items-center text-white">
                              <Camera size={24} />
                              <span className="text-[9px] font-black uppercase mt-1">Modifier</span>
                           </div>
                        </div>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoSelect} />
                      </div>
                      <div className="text-center">
                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">Logo Boutique</p>
                        <button onClick={() => fileInputRef.current?.click()} className="text-[10px] font-bold text-primary-600 hover:underline">Recadrer ou changer</button>
                      </div>
                   </div>

                   <div className="flex-1 w-full space-y-2 group">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-600">Nom de l'enseigne</label>
                      <input 
                        type="text" 
                        name="shopName" 
                        value={profileData.shopName} 
                        onChange={handleProfileChange} 
                        className="w-full px-6 py-4 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-600 focus:ring-4 focus:ring-primary-50 outline-none transition-all text-sm font-bold text-gray-900 shadow-xs" 
                        placeholder="Nom de votre garage..." 
                      />
                      <p className="text-[10px] text-gray-400 italic ml-1">Le nom tel qu'il apparaîtra sur votre fiche et vos annonces.</p>
                   </div>
                </div>

                {/* Full Width Sections */}
                <div className="space-y-10">
                   <div className="space-y-4">
                      <div className="flex items-center justify-between ml-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Domaines d'expertise</label>
                        <span className="text-[10px] font-black text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md uppercase">{profileData.specialties.length} sélectionnés</span>
                      </div>
                      <div className="flex flex-wrap gap-2.5 p-6 bg-gray-50 rounded-2xl border border-gray-100 w-full">
                        {specialtiesList.map(spec => {
                          const isSelected = profileData.specialties.includes(spec);
                          return (
                            <button
                              key={spec}
                              type="button"
                              onClick={() => toggleSpecialty(spec)}
                              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all border shadow-xs ${
                                isSelected 
                                ? 'bg-primary-600 border-primary-600 text-white scale-105 shadow-md' 
                                : 'bg-white border-gray-200 text-gray-500 hover:border-primary-300 hover:text-primary-600'
                              }`}
                            >
                              {isSelected ? <Check size={14} strokeWidth={3} /> : <Plus size={14} />}
                              {spec}
                            </button>
                          );
                        })}
                      </div>
                   </div>

                   <div className="space-y-2 group">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-primary-600">Présentation détaillée</label>
                      <textarea 
                        name="description" 
                        value={profileData.description} 
                        onChange={handleProfileChange} 
                        rows={6} 
                        className="w-full px-6 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-600 focus:ring-4 focus:ring-primary-50 outline-none transition-all text-sm font-medium text-gray-600 leading-relaxed resize-none shadow-xs" 
                        placeholder="Décrivez votre savoir-faire, marques spécialisées, services exclusifs..." 
                      />
                      <p className="text-[10px] text-gray-400 italic ml-1">Détaillez votre parcours, vos équipements et tout ce qui fait la force de votre atelier.</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Section 2: Prestations & Tarifs */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
             <h4 className="font-bold text-gray-900 text-lg mb-8 flex items-center gap-3">
                <Wrench size={24} className="text-primary-600" />
                Prestations & Tarifs
             </h4>
             
             <div className="space-y-4">
                {profileData.services.map(service => (
                   <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 group shadow-xs">
                      <div className="flex items-center gap-3">
                         <span className="font-bold text-gray-800">{service.name}</span>
                         <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-black uppercase">{service.price}</span>
                      </div>
                      <button onClick={() => removeService(service.id)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                         <Trash2 size={16} />
                      </button>
                   </div>
                ))}

                <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-gray-50">
                   <input type="text" value={newServiceName} onChange={(e) => setNewServiceName(e.target.value)} placeholder="Nom du service (ex: Vidange)" className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium shadow-xs" />
                   <input type="text" value={newServicePrice} onChange={(e) => setNewServicePrice(e.target.value)} placeholder="Prix (ex: 45 DT)" className="w-full md:w-32 px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium shadow-xs" />
                   <button onClick={addService} className="px-6 py-3 bg-gray-900 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md">
                      <Plus size={16} /> Ajouter
                   </button>
                </div>
             </div>
          </div>

          {/* Section 3: Contact & Localisation */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
             <h4 className="font-bold text-gray-900 text-lg mb-8 flex items-center gap-3">
                <MapPin size={24} className="text-primary-600" />
                Contact & Localisation
             </h4>

             <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Téléphone</label>
                      <div className="relative">
                         <input type="tel" name="phone" value={profileData.phone} onChange={handleProfileChange} className="w-full pl-12 pr-5 py-4 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-600 outline-none transition-all text-sm font-bold text-gray-900 shadow-xs" />
                         <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Pro</label>
                      <div className="relative">
                         <input type="email" name="email" value={profileData.email} onChange={handleProfileChange} className="w-full pl-12 pr-5 py-4 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-600 outline-none transition-all text-sm font-bold text-gray-900 shadow-xs" />
                         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      </div>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Adresse Physique</label>
                   <div className="relative">
                      <input type="text" name="address" value={profileData.address} onChange={handleProfileChange} className="w-full pl-12 pr-5 py-4 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-600 outline-none transition-all text-sm font-bold text-gray-900 shadow-xs" />
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Lien Google Maps</label>
                   <div className="relative">
                      <input type="text" name="mapsUrl" value={profileData.mapsUrl} onChange={handleProfileChange} className="w-full pl-12 pr-5 py-4 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary-600 outline-none transition-all text-sm font-bold text-gray-900 shadow-xs" placeholder="https://goo.gl/maps/..." />
                      <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                   </div>
                </div>
             </div>
          </div>

          {/* Section 4: Réseaux Sociaux */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
             <h4 className="font-bold text-gray-900 text-lg mb-8 flex items-center gap-3">
                <Globe size={24} className="text-primary-600" />
                Réseaux Sociaux
             </h4>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Facebook</label>
                   <div className="relative">
                      <input type="text" value={profileData.socialLinks.facebook} onChange={(e) => handleSocialChange('facebook', e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 outline-none text-sm font-bold shadow-xs" placeholder="facebook.com/..." />
                      <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={20} />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Instagram</label>
                   <div className="relative">
                      <input type="text" value={profileData.socialLinks.instagram} onChange={(e) => handleSocialChange('instagram', e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 outline-none text-sm font-bold shadow-xs" placeholder="@moncompte" />
                      <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-600" size={20} />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">TikTok</label>
                   <div className="relative">
                      <input type="text" value={profileData.socialLinks.tiktok} onChange={(e) => handleSocialChange('tiktok', e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 outline-none text-sm font-bold shadow-xs" placeholder="@moncompte" />
                      <Music2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900" size={20} />
                   </div>
                </div>
             </div>
          </div>

          {/* Section 5: Horaires d'ouverture */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
             <h4 className="font-bold text-gray-900 text-lg mb-8 flex items-center gap-3">
                <Clock size={24} className="text-primary-600" />
                Horaires d'ouverture
             </h4>

             <div className="space-y-4">
                {profileData.openingHours.map(hour => (
                   <div key={hour.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 group shadow-xs">
                      <div className="flex items-center gap-3">
                         <span className="font-bold text-gray-800">{hour.day}</span>
                         <span className="text-gray-500 font-medium">{hour.hours}</span>
                      </div>
                      <button onClick={() => removeOpeningHour(hour.id)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                         <Trash2 size={16} />
                      </button>
                   </div>
                ))}

                <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-gray-50">
                   <input type="text" value={newHourDay} onChange={(e) => setNewHourDay(e.target.value)} placeholder="Jours (ex: Dimanche)" className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium shadow-xs" />
                   <input type="text" value={newHourRange} onChange={(e) => setNewHourRange(e.target.value)} placeholder="Plage (ex: 08:00 - 12:00)" className="w-full md:w-48 px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium shadow-xs" />
                   <button onClick={addOpeningHour} className="px-6 py-3 bg-gray-900 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md">
                      <Plus size={16} /> Ajouter
                   </button>
                </div>
             </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
             <h4 className="font-bold text-gray-900 text-lg mb-8 flex items-center gap-3">
                <Lock size={24} className="text-primary-600" />
                Sécurité Compte
             </h4>
             <div className="pt-2">
                <button className="text-sm font-black text-primary-600 hover:text-primary-700 flex items-center gap-2 px-5 py-2.5 hover:bg-primary-50 rounded-lg transition-all w-fit uppercase tracking-widest">
                   <Lock size={18} />
                   Modifier le mot de passe
                </button>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f6f6fa] font-sans pb-12">
      <Header 
        variant="white" 
        onNavigate={onNavigate} 
        onGoHome={onGoHome} 
        isLoggedIn={isLoggedIn}
        onTriggerLogin={onTriggerLogin}
        onLogout={onLogout}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-20 md:pt-28 pb-8">
         <div className="flex flex-col lg:flex-row gap-8">
            
            <aside className="w-full lg:w-72 flex-shrink-0">
               <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24 shadow-sm space-y-6">
                  <div className="flex flex-col items-center p-4 border-b border-gray-50 pb-8">
                     <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-black text-3xl overflow-hidden mb-4 border-4 border-white shadow-md">
                        {profileData.logo ? <img src={profileData.logo} alt="Logo" className="w-full h-full object-contain bg-white p-1"/> : "TM"}
                     </div>
                     <h3 className="font-black text-gray-900 text-center text-lg leading-tight">{profileData.shopName}</h3>
                     <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-success-50 text-success-700 rounded-full text-[10px] font-black uppercase border border-success-100 shadow-xs">
                        <ShieldCheck size={12} /> Vérifié
                     </div>
                  </div>

                  <nav className="space-y-1.5">
                     <button 
                       onClick={() => handleTabChange('overview')}
                       className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                     >
                        <LayoutDashboard size={20} />
                        Performance
                     </button>
                     <button 
                       onClick={() => handleTabChange('listings')}
                       className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'listings' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                     >
                        <List size={20} />
                        Annonces
                     </button>
                     <button 
                       onClick={() => handleTabChange('settings')}
                       className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                     >
                        <Settings size={20} />
                        Paramètres
                     </button>
                  </nav>

                  {/* Subscription Status Section */}
                  <div className="pt-4 border-t border-gray-50">
                     <h4 className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <CreditCard size={12} /> Mon Abonnement
                     </h4>
                     <div className="px-4 py-3 bg-primary-50 border border-primary-100 rounded-xl mx-2 space-y-3">
                        <div>
                           <p className="text-xs font-bold text-primary-900">Pack Premium Pro</p>
                           <p className="text-[10px] text-primary-600 font-bold mt-1 uppercase">Expire le 15/10/2025</p>
                        </div>
                        <button 
                           onClick={() => setIsRenewalModalOpen(true)}
                           className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white text-[11px] font-black uppercase rounded-lg transition-all active:scale-95 shadow-sm"
                        >
                           Renouveler mon pack
                        </button>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-gray-50">
                     <button 
                       onClick={onLogout}
                       className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-black text-red-500 hover:bg-red-50 transition-colors uppercase tracking-widest"
                     >
                        <LogOut size={18} />
                        Déconnexion
                     </button>
                  </div>
               </div>
            </aside>

            <div className="flex-1 min-w-0">
               <h1 className="text-3xl font-black text-gray-900 mb-8 hidden lg:block tracking-tight">
                  {activeTab === 'overview' && "Performance Boutique"}
                  {activeTab === 'listings' && "Gestion des annonces"}
                  {activeTab === 'settings' && "Paramètres"}
               </h1>

               {activeTab === 'overview' && renderOverview()}
               {activeTab === 'listings' && renderListings()}
               {activeTab === 'settings' && renderSettings()}
            </div>
         </div>
      </main>

      {/* --- RENEWAL MODAL --- */}
      {isRenewalModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in-up">
           <div className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl relative border border-neutral-200">
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shadow-sm border border-primary-100">
                       <CreditCard size={20} />
                    </div>
                    <h3 className="font-black text-gray-900 text-lg">Renouveler mon Pack</h3>
                 </div>
                 <button 
                   onClick={() => { setIsRenewalModalOpen(false); setRenewalProof(null); }}
                   className="p-2.5 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
                 >
                    <X size={22} />
                 </button>
              </div>

              <div className="p-8 space-y-8">
                 {showRenewalSuccess ? (
                    <div className="py-12 text-center animate-scale-in">
                       <div className="w-20 h-20 bg-success-50 text-success-600 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 size={48} />
                       </div>
                       <h3 className="text-2xl font-black text-gray-900 mb-2">Demande envoyée !</h3>
                       <p className="text-gray-500 font-medium">Votre preuve de virement a été reçue. Nos services valideront votre abonnement sous 24h.</p>
                    </div>
                 ) : (
                    <>
                       {/* Period Selection */}
                       <div>
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Choisir votre pack</label>
                          <div className="grid grid-cols-3 gap-3">
                             {[6, 12, 24].map((m) => {
                                const info = getPackInfo(m);
                                return (
                                <button
                                   key={m}
                                   onClick={() => setRenewalPeriod(m as 6 | 12 | 24)}
                                   className={`py-4 px-2 rounded-2xl border-2 transition-all text-center flex flex-col items-center gap-1 ${renewalPeriod === m ? 'bg-primary-50 border-primary-600 shadow-md' : 'bg-white border-gray-100 hover:border-primary-200'}`}
                                >
                                   <span className={`text-[9px] font-black uppercase tracking-tighter ${renewalPeriod === m ? 'text-primary-600' : 'text-gray-400'}`}>{info.name.split(' ')[1]}</span>
                                   <span className={`text-xl font-black ${renewalPeriod === m ? 'text-primary-600' : 'text-gray-900'}`}>{m}</span>
                                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">mois</span>
                                </button>
                                )
                             })}
                          </div>
                       </div>

                       {/* Price Display */}
                       <div className="bg-gray-900 rounded-[2rem] p-8 text-center text-white relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 blur-[60px] opacity-20"></div>
                          <p className="text-[10px] font-black text-primary-500 uppercase tracking-[0.2em] mb-2">{getPackInfo(renewalPeriod).name}</p>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Total à payer</p>
                          <div className="flex items-baseline justify-center gap-2">
                             <span className="text-5xl font-black">{getPackInfo(renewalPeriod).total.toFixed(3)}</span>
                             <span className="text-xl font-bold text-primary-500">TND</span>
                          </div>
                          <p className="text-[10px] text-gray-500 mt-4 uppercase font-black tracking-widest flex items-center justify-center gap-2">
                             <Info size={12} /> Soit environ {getPackInfo(renewalPeriod).monthly.toFixed(3)} TND / mois TTC
                          </p>
                       </div>

                       {/* Proof Upload */}
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Copie du virement bancaire</label>
                          <div 
                             onClick={() => proofInputRef.current?.click()}
                             className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${renewalProof ? 'border-success-500 bg-success-50' : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-primary-300'}`}
                          >
                             {renewalProof ? (
                                <>
                                   <CheckCircle2 size={24} className="text-success-600" />
                                   <span className="text-xs font-bold text-success-700 truncate max-w-xs">{renewalProof.name}</span>
                                   <span className="text-[9px] text-success-500 uppercase font-black">Cliquer pour changer</span>
                                </>
                             ) : (
                                <>
                                   <Upload size={24} className="text-gray-400" />
                                   <span className="text-xs font-bold text-gray-600">Sélectionner ou déposer la preuve</span>
                                   <span className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Format JPG, PNG ou PDF</span>
                                </>
                             )}
                             <input 
                                type="file" 
                                ref={proofInputRef} 
                                className="hidden" 
                                onChange={(e) => setRenewalProof(e.target.files?.[0] || null)}
                                accept="image/*,application/pdf"
                             />
                          </div>
                       </div>

                       <div className="flex gap-4">
                          <button 
                            onClick={() => { setIsRenewalModalOpen(false); setRenewalProof(null); }}
                            className="flex-1 py-4 text-gray-500 font-black rounded-xl hover:bg-gray-50 transition-all uppercase tracking-widest text-xs"
                          >
                             Annuler
                          </button>
                          <button 
                            onClick={handleRenewalSubmit}
                            disabled={!renewalProof || isRenewalSubmitting}
                            className="flex-1 py-4 bg-primary-600 hover:bg-primary-700 text-white font-black rounded-xl shadow-xl shadow-primary-600/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale uppercase tracking-widest text-xs"
                          >
                             {isRenewalSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Valider le paiement"}
                          </button>
                       </div>
                    </>
                 )}
              </div>
           </div>
        </div>
      )}

      {/* --- CROP MODAL --- */}
      {isCropModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in-up">
           <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative border border-neutral-200">
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shadow-sm border border-primary-100">
                       <Scissors size={20} />
                    </div>
                    <h3 className="font-black text-gray-900 text-lg">Ajuster votre Logo</h3>
                 </div>
                 <button 
                   onClick={() => { setIsCropModalOpen(false); setTempImage(null); }}
                   className="p-2.5 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
                 >
                    <X size={22} />
                 </button>
              </div>

              <div className="p-8 space-y-8">
                 <div className="relative w-full aspect-square bg-gray-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    <div className="relative w-64 h-64 border-4 border-white/50 rounded-lg overflow-hidden shadow-[0_0_0_1000px_rgba(0,0,0,0.5)] z-20">
                       <img 
                         src={tempImage!} 
                         alt="Temp" 
                         className="max-w-none transition-transform duration-75"
                         style={{ 
                            transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                         }}
                       />
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
                       <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] text-white font-black uppercase tracking-widest border border-white/10">Aperçu du cadre</span>
                    </div>
                 </div>
                 <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2 text-gray-500"><Minimize size={18} /></div>
                       <input type="range" min="1" max="3" step="0.01" value={zoom} onChange={(e) => setZoom(parseFloat(e.target.value))} className="flex-1 mx-4 accent-primary-600 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer" />
                       <div className="flex items-center gap-2 text-gray-500"><Maximize size={18} /></div>
                    </div>
                    <div className="flex justify-center gap-3">
                       <button onClick={() => setZoom(1)} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2 transition-all active:scale-95"><RefreshCw size={14} /> Réinitialiser</button>
                    </div>
                 </div>
                 <canvas ref={canvasRef} className="hidden" />
                 <div className="flex gap-4">
                    <button onClick={() => { setIsCropModalOpen(false); setTempImage(null); }} className="flex-1 py-4 border-2 border-neutral-100 text-gray-500 font-black rounded-lg hover:bg-gray-50 transition-all active:scale-95">Annuler</button>
                    <button onClick={applyCrop} className="flex-1 py-4 bg-primary-600 hover:bg-primary-700 text-white font-black rounded-lg shadow-xl shadow-primary-600/20 flex items-center justify-center gap-2 transition-all active:scale-95">Valider le Logo <Check size={20} strokeWidth={3} /></button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* --- BOOST MODAL --- */}
      {showBoostModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
           <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative border border-neutral-200">
              <div className="p-8 text-center">
                 {boostConfirmationSuccess ? (
                    <div className="py-6 animate-scale-in">
                       <div className="w-20 h-20 bg-success-50 text-success-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={48} /></div>
                       <h3 className="text-2xl font-black text-gray-900 mb-2">Boost activé !</h3>
                       <p className="text-gray-500 font-medium">Votre annonce est maintenant en tête de liste pour les prochaines 24 heures.</p>
                    </div>
                 ) : (
                    <>
                       {canBoost() ? (
                          <div className="animate-fade-in-up">
                             <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><Zap size={40} className="fill-current" /></div>
                             <h3 className="text-2xl font-black text-gray-900 mb-2">Booster l'annonce ?</h3>
                             <p className="text-gray-500 font-medium mb-8 leading-relaxed">Le boost place votre annonce en <span className="text-primary-600 font-bold">tête des résultats</span> pendant 24h. <br /> <span className="text-xs italic mt-2 block text-gray-400">Vous avez droit à 1 boost gratuit par jour.</span></p>
                             {selectedAdForBoost && (
                                <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3 text-left mb-8 border border-gray-100">
                                   <img src={selectedAdForBoost.image} className="w-16 h-16 rounded-lg object-cover" alt="" />
                                   <div className="flex-1 overflow-hidden">
                                      <p className="font-bold text-gray-900 truncate">{selectedAdForBoost.title}</p>
                                      <p className="text-xs text-primary-600 font-black">{selectedAdForBoost.price}</p>
                                   </div>
                                </div>
                             )}
                             <div className="flex flex-col gap-3">
                                <button onClick={confirmBoost} className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"><Zap size={18} /> Activer mon boost quotidien</button>
                                <button onClick={() => setShowBoostModal(false)} className="w-full py-3 text-gray-500 font-bold hover:text-gray-900">Plus tard</button>
                             </div>
                          </div>
                       ) : (
                          <div className="animate-fade-in-up">
                             <div className="w-20 h-20 bg-warning-50 text-warning-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <div className="w-full h-full relative"><Clock size={40} className="absolute inset-0 m-auto" /></div>
                             </div>
                             <h3 className="text-2xl font-black text-gray-900 mb-2">Boost indisponible</h3>
                             <p className="text-gray-500 font-medium mb-8 leading-relaxed">Vous avez déjà utilisé votre boost quotidien. Revenez dans : <span className="block text-2xl font-black text-gray-900 mt-2">{getTimeUntilNextBoost()}</span></p>
                             <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex gap-3 text-left mb-8"><AlertTriangle className="text-blue-600 shrink-0" size={20} /><p className="text-xs text-blue-800 font-medium leading-relaxed">Passez au <span className="font-bold">Pack Premium Plus</span> pour débloquer des boosts illimités et augmenter vos ventes !</p></div>
                             <button onClick={() => setShowBoostModal(false)} className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all">J'ai compris</button>
                          </div>
                       )}
                    </>
                 )}
              </div>
              <button onClick={() => setShowBoostModal(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
           </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPro;