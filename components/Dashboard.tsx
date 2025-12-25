import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  List, 
  Settings, 
  LogOut, 
  Bell, 
  User, 
  Search,
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
  CheckCircle2,
  AlertCircle,
  Zap,
  Sparkles,
  CreditCard,
  Upload,
  X,
  Info,
  Clock,
  ArrowRight,
  Banknote,
  FileText,
  Check,
  Copy,
  TrendingDown
} from 'lucide-react';
import Header from './layout/Header';
import { mockListings } from '../data/mockData';

interface DashboardProps {
  initialTab?: 'overview' | 'listings' | 'settings';
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ initialTab = 'overview', onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'settings'>(initialTab);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- GLOBAL NOTIFICATION SYSTEM ---
  const [localNotification, setLocalNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setLocalNotification({ message, type });
    setTimeout(() => setLocalNotification(null), 3000);
  };

  // --- LISTINGS STATE ---
  const [listings, setListings] = useState(() => {
    return mockListings.slice(0, 3).map((l, i) => ({
      ...l,
      boostExpiry: i === 0 ? Date.now() + 18 * 60 * 60 * 1000 : null 
    }));
  });

  // --- EDIT PRICE STATE ---
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<any>(null);
  const [newPrice, setNewPrice] = useState("");

  // --- BOOST STATE ---
  const [isBoostModalOpen, setIsBoostModalOpen] = useState(false);
  const [boostModalTab, setBoostModalTab] = useState<'use' | 'buy'>('use');
  const [selectedAdForBoost, setSelectedAdForBoost] = useState<any>(null);
  const [boostCredits, setBoostCredits] = useState(5); 
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [boostStep, setBoostStep] = useState<'idle' | 'success'>('idle');
  const [selectedPack, setSelectedPack] = useState<string>('boost'); 
  const proofInputRef = useRef<HTMLInputElement>(null);

  // --- BOOST PACKS DATA (UPDATED) ---
  const boostPacks = [
    { id: 'start', name: 'Pack Start', credits: 10, price: '10 DT', unitPrice: '1,00 DT', discount: '0%', icon: Zap },
    { id: 'boost', name: 'Pack Boost', credits: 30, price: '25 DT', unitPrice: '0,83 DT', discount: '17%', icon: Sparkles, recommended: true },
    { id: 'nitro', name: 'Pack Nitro', credits: 75, price: '50 DT', unitPrice: '0,66 DT', discount: '34%', icon: Zap },
  ];

  // Profile State
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '22 123 456',
    location: 'Tunis',
    avatar: null as string | null,
    notifications: {
      email: true,
      sms: false,
      marketing: true
    }
  });

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const stats = [
    { label: 'Vues totales', value: '1,234', change: '+12%', icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Annonces actives', value: listings.length.toString(), change: '0%', icon: List, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Clics', value: '456', change: '+5%', icon: MousePointer, color: 'text-warning-600', bg: 'bg-warning-50' },
  ];

  // Handlers
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleNotification = (key: keyof typeof profileData.notifications) => {
    setProfileData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setProfileData(prev => ({ ...prev, avatar: imageUrl }));
    }
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
      if (onNavigate) {
          onNavigate('dashboard', { tab });
      } else {
          setActiveTab(tab);
      }
  };

  // --- LISTING ACTIONS ---
  const handleOpenPriceEdit = (listing: any) => {
    setEditingListing(listing);
    const numericPrice = listing.price.replace(/\D/g, '');
    setNewPrice(numericPrice);
    setIsPriceModalOpen(true);
  };

  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setNewPrice(val);
  };

  const handleUpdatePrice = () => {
    if (!newPrice) return;
    setListings(prev => prev.map(l => 
      l.id === editingListing.id 
      ? { ...l, price: `${parseInt(newPrice).toLocaleString()} TND` } 
      : l
    ));
    setIsPriceModalOpen(false);
    showNotification("Prix mis à jour avec succès");
  };

  const handleDeleteListing = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement cette annonce ? Cette action est irréversible.")) {
      setListings(prev => prev.filter(l => l.id !== id));
      showNotification("Annonce supprimée", "success");
    }
  };

  // --- BOOST HANDLERS ---
  const openBoostModal = (ad: any) => {
    setSelectedAdForBoost(ad);
    setBoostModalTab(boostCredits > 0 ? 'use' : 'buy');
    setBoostStep('idle');
    setIsBoostModalOpen(true);
  };

  const handleUseBoost = () => {
    if (boostCredits > 0 && selectedAdForBoost) {
      setIsUploading(true);
      setTimeout(() => {
        setBoostCredits(prev => prev - 1);
        setListings(prev => prev.map(l => 
          l.id === selectedAdForBoost.id 
          ? { ...l, boostExpiry: Date.now() + 24 * 60 * 60 * 1000 } 
          : l
        ));
        setBoostStep('success');
        setIsUploading(false);
      }, 1500);
    }
  };

  const handleBuyBoost = () => {
    if (!proofFile) return;
    setIsUploading(true);
    setTimeout(() => {
      setBoostStep('success');
      setIsUploading(false);
      setProofFile(null);
    }, 2000);
  };

  const getRemainingBoostTime = (expiry: number | null) => {
    if (!expiry) return null;
    const remaining = expiry - Date.now();
    if (remaining <= 0) return null;
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    return `${hours}h restant`;
  };

  const renderOverview = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <h4 className="text-2xl font-extrabold text-gray-900">{stat.value}</h4>
              <p className="text-xs text-gray-500 font-medium mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Performance des annonces</h3>
            <select className="bg-gray-50 border border-gray-200 text-xs font-bold text-gray-600 rounded-lg px-3 py-2 outline-none">
              <option>7 derniers jours</option>
              <option>30 derniers jours</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-4 pb-4 border-b border-gray-50">
             {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
               <div key={i} className="w-full bg-primary-50 rounded-t-lg relative group">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-primary-600 rounded-t-lg transition-all duration-500 group-hover:bg-primary-500"
                    style={{ height: `${h}%` }}
                  ></div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {h * 12} vues
                  </div>
               </div>
             ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-400 font-medium">
             <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-gradient-to-br from-[#E65100] to-[#DD2C14] rounded-3xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-2">Vendre plus vite ?</h3>
              <p className="text-primary-100 text-sm mb-6 leading-relaxed">Booster vos annonces pour obtenir jusqu'à 3x plus de vues.</p>
              <button 
                onClick={() => handleTabChange('listings')}
                className="w-full py-3 bg-white text-[#E65100] font-bold rounded-xl text-sm hover:bg-primary-50 transition-colors shadow-sm"
              >
                 Booster maintenant
              </button>
           </div>

           <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                 <TrendingUp size={16} className="text-success-500" />
                 Conseil du jour
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                 Ajouter au moins 5 photos augmente vos chances de vente de 40%.
              </p>
              <button className="text-primary-600 text-xs font-bold hover:underline">
                 Voir tous les conseils
              </button>
           </div>
        </div>
      </div>
    </div>
  );

  const renderListings = () => (
    <div className="space-y-6 animate-fade-in-up">
       <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Mes Annonces ({listings.length})</h2>
          <button 
            onClick={() => onNavigate?.('deposit')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E65100] to-[#DD2C14] text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-md active:scale-95"
          >
             <Plus size={16} />
             Nouvelle annonce
          </button>
       </div>

       <div className="space-y-4">
          {listings.length > 0 ? listings.map(listing => {
             const remaining = getRemainingBoostTime(listing.boostExpiry);
             const isBoosted = !!remaining;

             return (
               <div 
                 key={listing.id} 
                 className={`rounded-2xl p-4 border transition-all duration-300 flex flex-col md:flex-row gap-4 items-start md:items-center group ${isBoosted ? 'bg-primary-50/50 border-primary-200 shadow-glow-primary/5' : 'bg-white border-gray-100 shadow-sm'}`}
               >
                  <div className="relative w-full md:w-40 h-32 md:h-24 rounded-xl overflow-hidden flex-shrink-0">
                     <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                     <span className="absolute top-2 left-2 bg-success-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        En ligne
                     </span>
                  </div>
                  
                  <div className="flex-1 min-w-0 w-full">
                     <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-bold text-gray-900 truncate">{listing.title}</h3>
                        {isBoosted && (
                           <div className="flex items-center gap-1 bg-gradient-to-r from-[#E65100] to-[#DD2C14] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-tighter shadow-sm animate-pulse">
                              <Zap size={10} className="fill-current" />
                              Boost Actif
                           </div>
                        )}
                     </div>
                     <p className="text-[#E65100] font-bold text-sm mb-2">{listing.price}</p>
                     <div className="flex items-center gap-3 text-xs text-gray-500 overflow-x-auto no-scrollbar">
                        <span className="flex items-center gap-1 shrink-0"><Eye size={12} /> {isBoosted ? '312' : '124'} vues</span>
                        <span className="flex items-center gap-1 shrink-0"><CalendarIcon size={12} /> 2j</span>
                        {isBoosted && (
                           <span className="flex items-center gap-1.5 text-[#E65100] font-black uppercase text-[10px] tracking-tight shrink-0">
                              <Clock size={12} />
                              {remaining}
                           </span>
                        )}
                     </div>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto border-t md:border-t-0 border-gray-50 pt-4 md:pt-0">
                     <button 
                        onClick={() => handleOpenPriceEdit(listing)}
                        className="flex-1 md:flex-none p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-colors flex items-center justify-center gap-2" 
                        title="Modifier le prix"
                     >
                        <Edit size={16} />
                        <span className="md:hidden text-[10px] font-black uppercase">Modifier</span>
                     </button>
                     <button 
                        onClick={() => handleDeleteListing(listing.id)}
                        className="flex-1 md:flex-none p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors flex items-center justify-center gap-2" 
                        title="Supprimer l'annonce"
                     >
                        <Trash2 size={16} />
                        <span className="md:hidden text-[10px] font-black uppercase">Supprimer</span>
                     </button>
                     {!isBoosted && (
                        <button 
                         onClick={() => openBoostModal(listing)}
                         className="flex-1 md:flex-none px-4 py-2.5 bg-gradient-to-br from-[#E65100] to-[#DD2C14] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
                        >
                           <Zap size={14} className="fill-current" />
                           Booster
                        </button>
                     )}
                  </div>
               </div>
             );
          }) : (
            <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium mb-6">Vous n'avez pas encore d'annonces en ligne.</p>
                <button 
                  onClick={() => onNavigate?.('deposit')}
                  className="px-6 py-3 bg-gray-900 text-white font-black rounded-xl uppercase text-[10px] tracking-widest active:scale-95 transition-all"
                >
                    Déposer ma première annonce
                </button>
            </div>
          )}
       </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8 animate-fade-in-up max-w-4xl">
       {showSuccess && (
         <div className="fixed top-24 right-4 md:right-8 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-fade-in-up">
            <CheckCircle2 className="text-green-400" size={20} />
            <span className="font-bold">Modifications enregistrées avec succès !</span>
         </div>
       )}

       <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Paramètres du compte</h2>
          <button 
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#E65100] to-[#DD2C14] text-white rounded-xl font-bold shadow-md hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
             {isSaving ? (
                <>
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                   <span>Enregistrement...</span>
                </>
             ) : (
                <>
                   <Save size={18} />
                   <span>Enregistrer</span>
                </>
             )}
          </button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 text-center">
                <div className="relative inline-block mb-4 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                   <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner mx-auto">
                      {profileData.avatar ? (
                        <img src={profileData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-primary-300">
                           <User size={48} />
                        </div>
                      )}
                   </div>
                   <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                      <Camera className="text-white" size={24} />
                   </div>
                   <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{profileData.firstName} {profileData.lastName}</h3>
                <p className="text-gray-500 text-sm mb-4">Membre depuis Janvier 2024</p>
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-black uppercase border border-green-100">
                   <Shield size={12} /> Compte Vérifié
                </div>
             </div>

             <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <h4 className="font-bold text-gray-900 mb-4">Préférences de notification</h4>
                <div className="space-y-4">
                   <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-600">Email (Offres & Actus)</span>
                      <div className={`w-11 h-6 rounded-full p-1 transition-colors ${profileData.notifications.email ? 'bg-[#E65100]' : 'bg-gray-200'}`} onClick={() => handleToggleNotification('email')}>
                         <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${profileData.notifications.email ? 'translate-x-5' : ''}`}></div>
                      </div>
                   </label>
                   <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-600">SMS (Rdv & Ventes)</span>
                      <div className={`w-11 h-6 rounded-full p-1 transition-colors ${profileData.notifications.sms ? 'bg-[#E65100]' : 'bg-gray-200'}`} onClick={() => handleToggleNotification('sms')}>
                         <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${profileData.notifications.sms ? 'translate-x-5' : ''}`}></div>
                      </div>
                   </label>
                </div>
             </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
             <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
                <h4 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
                   <User size={20} className="text-[#E65100]" />
                   Informations Personnelles
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Prénom</label>
                      <input 
                        type="text" 
                        name="firstName" 
                        value={profileData.firstName} 
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#E65100] outline-none transition-all text-sm font-medium" 
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nom</label>
                      <input 
                        type="text" 
                        name="lastName" 
                        value={profileData.lastName} 
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#E65100] outline-none transition-all text-sm font-medium" 
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Ville</label>
                   <div className="relative">
                      <input 
                        type="text" 
                        name="location" 
                        value={profileData.location} 
                        onChange={handleProfileChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#E65100] outline-none transition-all text-sm font-medium" 
                      />
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   </div>
                </div>
             </div>

             <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
                <h4 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
                   <Lock size={20} className="text-[#E65100]" />
                   Coordonnées & Sécurité
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                      <div className="relative">
                         <input 
                           type="email" 
                           name="email" 
                           value={profileData.email} 
                           onChange={handleProfileChange}
                           className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#E65100] outline-none transition-all text-sm font-bold text-gray-900" 
                         />
                         <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Téléphone</label>
                      <div className="relative">
                         <input 
                           type="tel" 
                           name="phone" 
                           value={profileData.phone} 
                           onChange={handleProfileChange}
                           className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#E65100] outline-none transition-all text-sm font-bold text-gray-900" 
                         />
                         <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                   </div>
                </div>

                <div className="pt-6 border-t border-gray-50">
                   <button className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center gap-2 px-4 py-2 hover:bg-primary-50 rounded-lg transition-colors w-fit">
                      <Lock size={16} />
                      Changer le mot de passe
                   </button>
                </div>
             </div>

             <div className="bg-red-50 rounded-3xl border border-red-100 p-6 flex justify-between items-center">
                <div>
                   <h4 className="font-bold text-red-700">Zone de danger</h4>
                   <p className="text-xs text-red-500 mt-1">La suppression de votre compte est irréversible.</p>
                </div>
                <button className="px-4 py-2 bg-white border border-red-200 text-red-600 font-bold text-xs rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm">
                   Supprimer le compte
                </button>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <Header 
        variant="white" 
        onNavigate={onNavigate} 
        onGoHome={onGoHome} 
        isLoggedIn={isLoggedIn}
        onTriggerLogin={onTriggerLogin}
        onLogout={onLogout}
      />

      {/* Global Notification Toast */}
      {localNotification && (
         <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-white font-bold z-[150] animate-fade-in-up flex items-center gap-2 shadow-2xl ${localNotification.type === 'success' ? 'bg-gray-900' : 'bg-red-600'}`}>
            {localNotification.type === 'success' ? <CheckCircle2 size={18} className="text-green-400" /> : <AlertCircle size={18} />}
            {localNotification.message}
         </div>
      )}

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-8">
         <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-64 flex-shrink-0">
               <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sticky top-24">
                  <div className="flex items-center gap-3 p-3 mb-6 border-b border-gray-50 pb-6">
                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E65100] to-[#DD2C14] flex items-center justify-center text-white font-bold text-lg shadow-md overflow-hidden">
                        {profileData.avatar ? <img src={profileData.avatar} alt="Avatar" className="w-full h-full object-cover"/> : "JD"}
                     </div>
                     <div>
                        <h3 className="font-bold text-gray-900 text-sm">{profileData.firstName} {profileData.lastName}</h3>
                        <p className="text-xs text-gray-500 uppercase font-black tracking-widest text-[8px]">Particulier</p>
                     </div>
                  </div>

                  <nav className="space-y-1">
                     <button 
                       onClick={() => handleTabChange('overview')}
                       className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                     >
                        <LayoutDashboard size={20} />
                        Vue d'ensemble
                     </button>
                     <button 
                       onClick={() => handleTabChange('listings')}
                       className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'listings' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                     >
                        <List size={20} />
                        Mes annonces
                     </button>
                     <button 
                       onClick={() => handleTabChange('settings')}
                       className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                     >
                        <Settings size={20} />
                        Paramètres
                     </button>
                  </nav>

                  <div className="mt-6 pt-4 border-t border-gray-50">
                     <button 
                       onClick={onLogout}
                       className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                     >
                        <LogOut size={18} />
                        Déconnexion
                     </button>
                  </div>
               </div>
            </aside>

            <div className="flex-1 min-w-0">
               <h1 className="text-2xl font-extrabold text-gray-900 mb-6 hidden lg:block">
                  {activeTab === 'overview' && "Tableau de bord"}
                  {activeTab === 'listings' && "Gérer mes annonces"}
                  {activeTab === 'settings' && "Modifier mon profil"}
               </h1>

               {activeTab === 'overview' && renderOverview()}
               {activeTab === 'listings' && renderListings()}
               {activeTab === 'settings' && renderSettings()}
            </div>
         </div>
      </main>

      {/* --- PRICE EDIT MODAL --- */}
      {isPriceModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
           <div className="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl relative border border-gray-100 flex flex-col p-8">
              <div className="text-center mb-6">
                 <div className="w-16 h-16 bg-primary-50 text-[#E65100] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Banknote size={32} />
                 </div>
                 <h3 className="text-xl font-black text-gray-900">Modifier le prix</h3>
                 <p className="text-xs text-gray-500 mt-1 font-medium truncate">{editingListing?.title}</p>
              </div>

              <div className="space-y-4">
                 <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Nouveau montant (TND)</label>
                    <div className="relative">
                       <input 
                          type="text" 
                          inputMode="numeric"
                          value={newPrice}
                          onChange={handlePriceInputChange}
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-2xl font-black text-gray-900 focus:bg-white focus:border-[#E65100] transition-all outline-none"
                          placeholder="0"
                          autoFocus
                       />
                       <span className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-gray-300">TND</span>
                    </div>
                 </div>

                 <div className="flex gap-3 pt-4">
                    <button 
                       onClick={() => setIsPriceModalOpen(false)}
                       className="flex-1 py-4 text-gray-500 font-bold hover:bg-gray-50 rounded-2xl transition-all"
                    >
                       Annuler
                    </button>
                    <button 
                       onClick={handleUpdatePrice}
                       className="flex-1 py-4 bg-gray-900 text-white font-black rounded-2xl shadow-lg active:scale-95 transition-all"
                    >
                       Enregistrer
                    </button>
                 </div>
              </div>
              <button 
                 onClick={() => setIsPriceModalOpen(false)} 
                 className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900"
              >
                 <X size={20} />
              </button>
           </div>
        </div>
      )}

      {/* --- BOOST MODAL OPTIMISÉE --- */}
      {isBoostModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
           <div className="bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl relative border border-gray-100 flex flex-col max-h-[95vh] md:max-h-[90vh]">
              
              {/* Header Fixe */}
              <div className="px-6 md:px-8 pt-8 pb-4 bg-white z-20 flex justify-between items-center">
                 <h3 className="text-xl font-black text-gray-900 tracking-tight">Espace Visibilité</h3>
                 <button 
                    onClick={() => setIsBoostModalOpen(false)} 
                    className="p-2 text-gray-400 hover:text-gray-900 bg-gray-100 rounded-full transition-colors active:scale-90"
                 >
                    <X size={20} />
                 </button>
              </div>

              {/* Tabs Switcher */}
              <div className="px-6 md:px-8 mb-6">
                <div className="flex p-1.5 bg-gray-100 rounded-2xl border border-gray-200">
                    <button 
                        onClick={() => setBoostModalTab('use')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${boostModalTab === 'use' ? 'bg-white text-[#E65100] shadow-md border border-orange-100' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <Zap size={14} className={boostModalTab === 'use' ? "fill-current" : ""} />
                        Utiliser
                    </button>
                    <button 
                        onClick={() => setBoostModalTab('buy')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${boostModalTab === 'buy' ? 'bg-white text-primary-600 shadow-md border border-primary-100' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <CreditCard size={14} />
                        Recharger
                    </button>
                </div>
              </div>

              {/* Content Area - Scrollable */}
              <div className="px-6 md:px-8 pb-10 flex-1 overflow-y-auto no-scrollbar">
                 {boostStep === 'success' ? (
                    <div className="text-center py-12 animate-scale-in">
                        <div className="w-24 h-24 bg-success-50 text-success-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-success-100">
                            <CheckCircle2 size={56} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">
                            {boostModalTab === 'use' ? 'C\'est parti !' : 'Virement enregistré !'}
                        </h3>
                        <p className="text-gray-500 font-medium leading-relaxed max-w-xs mx-auto">
                            {boostModalTab === 'use' 
                             ? "Votre annonce remontera en tête de liste toutes les heures pendant 24H." 
                             : "Nos équipes valideront votre solde dès réception effective du virement (sous 24h max)."}
                        </p>
                        <button 
                          onClick={() => setIsBoostModalOpen(false)}
                          className="mt-10 w-full py-5 bg-gray-900 text-white font-black rounded-2xl uppercase text-xs tracking-[0.2em] active:scale-95 transition-all shadow-xl"
                        >
                            Fermer
                        </button>
                    </div>
                 ) : boostModalTab === 'use' ? (
                    <div className="space-y-8 animate-fade-in-up">
                       <div className="flex flex-col items-center py-6 bg-gradient-to-br from-gray-50 to-white rounded-[2rem] border border-gray-100 shadow-inner">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Votre Solde de visibilité</p>
                          <div className="flex items-center gap-4">
                             <div className="w-14 h-14 bg-gradient-to-br from-[#E65100] to-[#DD2C14] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                                <Zap size={32} className="fill-current" />
                             </div>
                             <div className="flex flex-col">
                                <span className="text-5xl font-black text-[#E65100] leading-none tracking-tighter">{boostCredits}</span>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Crédits disponibles</span>
                             </div>
                          </div>
                       </div>

                       <div className="space-y-4">
                          <h4 className="font-black text-gray-900 text-sm uppercase tracking-widest ml-1">Pourquoi booster ?</h4>
                          <div className="grid grid-cols-1 gap-3">
                             <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-success-600 shadow-sm"><TrendingUp size={16}/></div>
                                <span className="text-xs font-bold text-gray-600">3x plus de vues garanties</span>
                             </div>
                             <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-primary-600 shadow-sm"><Zap size={16}/></div>
                                <span className="text-xs font-bold text-gray-600">Remontée immédiate en tête de liste</span>
                             </div>
                          </div>
                       </div>

                       {boostCredits > 0 ? (
                          <div className="space-y-4">
                             <button 
                                onClick={handleUseBoost}
                                disabled={isUploading}
                                className="w-full py-5 bg-gradient-to-br from-[#E65100] to-[#DD2C14] hover:opacity-90 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-orange-500/20 uppercase text-xs tracking-[0.2em]"
                             >
                                {isUploading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : (
                                    <>Consommer 1 crédit <ArrowRight size={18} /></>
                                )}
                             </button>
                             <p className="text-[9px] text-center text-gray-400 font-bold uppercase tracking-widest">Durée de l'activation : 24 heures</p>
                          </div>
                       ) : (
                          <div className="text-center space-y-6">
                             <div className="p-5 bg-orange-50 text-orange-800 rounded-2xl border border-orange-100 flex items-start gap-4 text-left">
                                <Info size={24} className="shrink-0 mt-0.5 text-orange-600" />
                                <p className="text-xs font-bold leading-relaxed">Votre solde est épuisé. Rechargez votre compte pour continuer à faire décoller vos ventes.</p>
                             </div>
                             <button 
                                onClick={() => setBoostModalTab('buy')}
                                className="w-full py-5 border-2 border-primary-600 text-primary-600 font-black rounded-2xl uppercase text-xs tracking-widest hover:bg-primary-50 transition-all active:scale-95"
                             >
                                Recharger mon solde
                             </button>
                          </div>
                       )}
                    </div>
                 ) : (
                    <div className="space-y-8 animate-fade-in-up">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sélectionner un Pack</label>
                          <div className="grid grid-cols-1 gap-3">
                             {boostPacks.map(pack => (
                                <button 
                                    key={pack.id}
                                    onClick={() => setSelectedPack(pack.id)}
                                    className={`p-5 rounded-3xl flex items-center justify-between shadow-sm relative overflow-hidden border-2 transition-all group ${selectedPack === pack.id ? 'bg-primary-50 border-primary-500 scale-[1.02]' : 'bg-white border-gray-100 hover:border-primary-200'}`}
                                >
                                    <div className="flex items-center gap-4 relative z-10">
                                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border transition-colors ${selectedPack === pack.id ? 'bg-white text-primary-600 border-primary-100' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                                          <pack.icon size={24} className={selectedPack === pack.id ? "fill-current" : ""} />
                                       </div>
                                       <div className="text-left">
                                          <span className="block text-lg font-black text-gray-900 leading-tight">{pack.credits} Crédits</span>
                                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">{pack.unitPrice} / crédit</span>
                                       </div>
                                    </div>
                                    <div className="text-right relative z-10">
                                       <span className={`block text-2xl font-black tracking-tighter ${selectedPack === pack.id ? 'text-primary-600' : 'text-gray-900'}`}>{pack.price.split(' ')[0]}</span>
                                       <span className="text-[10px] font-black text-gray-400 uppercase">{pack.price.split(' ')[1]} TTC</span>
                                    </div>
                                </button>
                             ))}
                          </div>
                       </div>

                       <div className="bg-gray-900 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 blur-[80px] opacity-20"></div>
                          <div className="relative z-10 space-y-4">
                             <div className="flex items-center gap-3 text-primary-500">
                                <Banknote size={20} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Coordonnées de virement</span>
                             </div>
                             <div className="space-y-1 ml-1">
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Bénéficiaire : <span className="text-white">MOTOSCOOT TN</span></p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Banque : <span className="text-white">BANQUE ZITOUNA (TUNIS)</span></p>
                                <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group active:bg-white/10 transition-colors">
                                   <code className="text-[11px] md:text-sm font-mono font-bold tracking-wider text-primary-400">TN59 1234 5678 9012 3456 7890</code>
                                   <button 
                                      onClick={() => {
                                        navigator.clipboard.writeText("TN59 1234 5678 9012 3456 7890");
                                        showNotification("RIB copié !");
                                      }}
                                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all active:scale-90"
                                   >
                                      <Copy size={16} className="text-gray-400 group-hover:text-white" />
                                   </button>
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Preuve de virement</label>
                          <div 
                             onClick={() => proofInputRef.current?.click()}
                             className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${proofFile ? 'border-success-500 bg-success-50/50' : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-primary-300'}`}
                          >
                             {proofFile ? (
                                <div className="text-center animate-scale-in">
                                   <div className="w-14 h-14 bg-success-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg"><FileText size={28} /></div>
                                   <p className="text-xs font-black text-gray-900 truncate max-w-[200px]">{proofFile.name}</p>
                                   <span className="text-[9px] text-primary-600 font-black uppercase mt-1 block">Changer le fichier</span>
                                </div>
                             ) : (
                                <>
                                   <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-300 shadow-sm group-hover:scale-110 transition-transform"><Upload size={28} /></div>
                                   <div className="text-center">
                                      <p className="text-sm font-bold text-gray-700">Uploader le reçu</p>
                                      <p className="text-[10px] text-gray-400 font-medium">Capture d'écran ou photo du virement</p>
                                   </div>
                                </>
                             )}
                             <input 
                                type="file" 
                                ref={proofInputRef} 
                                className="hidden" 
                                accept="image/*,application/pdf"
                                onChange={(e) => e.target.files && setProofFile(e.target.files[0])}
                             />
                          </div>
                       </div>

                       <button 
                          onClick={handleBuyBoost}
                          disabled={!proofFile || isUploading}
                          className="w-full py-5 bg-gray-900 hover:bg-black text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-30 disabled:grayscale uppercase text-xs tracking-[0.2em] shadow-xl"
                       >
                          {isUploading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Envoyer ma preuve"}
                       </button>
                    </div>
                 )}
              </div>

              {boostStep === 'idle' && (
                <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center gap-3">
                   <Shield size={16} className="text-success-500 shrink-0" />
                   <p className="text-[9px] font-bold text-gray-400 uppercase leading-tight">Transactions sécurisées MotoScoot.tn. Nos équipes vérifient manuellement chaque virement bancaire.</p>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;