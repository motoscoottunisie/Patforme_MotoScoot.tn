import React, { useEffect, useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Star, 
  ShieldCheck, 
  Share2, 
  Wrench,
  ChevronRight,
  MessageSquare,
  User,
  MoreVertical,
  X,
  Home,
  Navigation2,
  Building2,
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  Zap,
  Shield,
  Hammer,
  Facebook,
  Instagram,
  UserPlus,
  ThumbsUp,
  Tag,
  Gauge,
  Calendar
} from 'lucide-react';
import Header from './layout/Header';
import { mockGarages, mockListings } from '../data/mockData';
import { Garage, GarageReview } from '../types';
import AdBanner from './common/AdBanner';

// Custom TikTok Icon that swaps images based on hover state
const TikTokIcon = ({ className, size = 18 }: { className?: string; size?: number }) => (
  <div className={`relative ${className}`} style={{ width: size, height: size }}>
    <img 
      src="https://www.magma-studio.tn/portfolio2/moto/icons/tiktok-icon-normal.svg" 
      className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0" 
      alt="TikTok"
    />
    <img 
      src="https://www.magma-studio.tn/portfolio2/moto/icons/tiktok-icon_hover.svg" 
      className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100" 
      alt="TikTok Hover"
    />
  </div>
);

// Custom WhatsApp Icon
const WhatsAppIcon = ({ className, size = 18 }: { className?: string; size?: number }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    width={size} 
    height={size} 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.002 12.048a11.802 11.802 0 001.576 5.94L0 24l6.117-1.604a11.845 11.845 0 005.932 1.577h.005c6.637 0 12.045-5.411 12.048-12.049a11.815 11.815 0 00-3.535-8.416z"/>
  </svg>
);

interface GarageDetailsProps {
  garageId: number;
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  onBack?: () => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const GarageDetails: React.FC<GarageDetailsProps> = ({ 
  garageId, 
  onGoHome, 
  onNavigate, 
  onBack,
  isLoggedIn, 
  onTriggerLogin, 
  onLogout 
}) => {
  const [reviews, setReviews] = useState<GarageReview[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewContent, setNewReviewContent] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Find garage or fallback
  const garage = mockGarages.find(g => g.id === garageId) || mockGarages[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    setReviews(garage.reviewsList || []);
  }, [garageId, garage.reviewsList]);

  // Mock Services enrichis
  const services = garage.services || [
      { name: "Vidange + controle", price: "45 DT", icon: Wrench },
      { name: "Diagnostic Électronique", price: "60 DT", icon: Zap },
      { name: "Changement Pneumatiques", price: "15 DT", icon: Wrench },
      { name: "Changement chaine", price: "Sur devis", icon: Hammer },
      { name: "Révision Périodique", price: "120 DT", icon: ShieldCheck },
      { name: "Freinage (Plaquettes)", price: "35 DT", icon: Shield },
  ];

  // Pick 3 mock listings for the shop preview
  const shopPreview = mockListings.slice(0, 3);

  const handleOpenReviewModal = () => {
    if (!isLoggedIn) {
      onTriggerLogin?.();
      return;
    }
    setNewReviewRating(0);
    setNewReviewContent('');
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewRating === 0) return;

    const newReview: GarageReview = {
      id: Date.now(),
      author: "Utilisateur (Moi)", 
      rating: newReviewRating,
      date: "À l'instant",
      content: newReviewContent,
      helpfulCount: 0,
      isVerifiedOwner: true,
      avatar: "" 
    };

    setReviews([newReview, ...reviews]);
    setIsReviewModalOpen(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  // Logic for Open/Closed status at instant T
  const isCurrentlyOpen = true; // This can be calculated from garage.hours in a real scenario

  // Reusable Identity Card Content
  const IdentityCard = () => (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-8 md:p-10 flex flex-col">
        {/* Header: Logo & Name Side-by-Side */}
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-3 md:gap-4 flex-1">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gray-50 border-2 border-white shadow-inner flex items-center justify-center overflow-hidden ring-1 ring-gray-100 shrink-0">
                 {garage.id === 1 ? (
                    <img src="https://www.magma-studio.tn/portfolio2/moto/Logo/logo_Garageblayah.webp" className="w-full h-full object-contain" alt="Garage Blayah Logo" />
                 ) : (
                    <Building2 className="text-gray-300" size={32} />
                 )}
              </div>
              <h1 className="text-lg md:text-2xl font-black text-gray-900 leading-tight tracking-tight max-w-[140px] md:max-w-none">
                {garage.name}
              </h1>
           </div>
           <div className="text-right ml-2 shrink-0 pt-1 md:pt-0">
              <div className="flex text-warning-400 mb-1 justify-end">
                 {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(garage.rating) ? "fill-current" : "text-gray-200 fill-current"} />
                 ))}
              </div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{garage.rating} • {reviews.length} avis</p>
           </div>
        </div>

        {/* Info Section - Harmonized Icons and identical text style */}
        <div className="space-y-4 mb-10">
           <div className="flex items-center gap-4 text-gray-600 group">
              <div className="w-8 h-8 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary-100">
                 <MapPin size={16} />
              </div>
              <p className="text-sm font-bold text-gray-600 leading-tight">
                 {garage.address || garage.location}
              </p>
           </div>
           <div className="flex items-center gap-4 text-gray-600 group">
              <div className="w-8 h-8 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary-100">
                 <Clock size={16} />
              </div>
              <div className="flex flex-col">
                 <p className="text-sm font-bold text-gray-600 leading-tight">{garage.hours || "09:00 - 18:00"}</p>
                 <div className="flex items-center gap-1.5 mt-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${isCurrentlyOpen ? 'bg-success-500 animate-pulse' : 'bg-error-500'}`}></div>
                    <span className={`text-[8px] font-black uppercase tracking-wider ${isCurrentlyOpen ? 'text-success-600' : 'text-error-600'}`}>
                        {isCurrentlyOpen ? 'Ouvert' : 'Fermé'}
                    </span>
                 </div>
              </div>
           </div>
        </div>

        {/* Visit Shop Button - Transformed into a Menu Row (iOS/Facebook Style) */}
        <button 
          onClick={() => onNavigate?.('search', { search: garage.name })}
          className="w-full mb-10 group flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-2xl border border-gray-100/50 transition-all active:scale-[0.98] shadow-xs"
        >
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary-600 shadow-xs border border-gray-100 group-hover:scale-105 transition-transform">
                  <ShoppingBag size={20} />
               </div>
               <div className="text-left">
                  <span className="block text-sm font-black tracking-tight">Boutique du garage</span>
                  <span className="block text-[10px] font-bold text-gray-400 group-hover:text-primary-500 transition-colors">12 annonces disponibles</span>
               </div>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:text-primary-600 transition-colors" />
        </button>

        {/* Social Follow Section */}
        <div className="flex flex-col items-start gap-4 mb-8">
           <div className="flex items-center gap-2.5 ml-1">
              <UserPlus size={16} className="text-primary-500" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Nous suivre sur :</p>
           </div>
           <div className="flex items-center justify-start gap-4">
              <a href="https://facebook.com/votrepage" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#1877F2] hover:bg-blue-50 transition-all border border-gray-100 hover:border-blue-100 group">
                 <Facebook size={20} />
              </a>
              <a href="https://instagram.com/votrecompte" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#E4405F] hover:bg-pink-50 transition-all border border-gray-100 hover:border-pink-100 group">
                 <div className="flex items-center justify-center">
                   <Instagram size={20} />
                 </div>
              </a>
              <a href="https://tiktok.com/@votrecompte" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all border border-gray-100 hover:border-gray-200 group">
                 <TikTokIcon size={20} />
              </a>
              <a href={`https://wa.me/${garage.phone?.replace(/\s/g, '') || "21621719109"}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#25D366] hover:bg-green-50 transition-all border border-gray-100 border-green-100 group">
                 <WhatsAppIcon size={20} />
              </a>
           </div>
        </div>

        {/* Primary Action Buttons Footer */}
        <div className="pt-8 border-t border-gray-50 flex gap-4">
            <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(garage.address || garage.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-14 bg-[#1A73E8] hover:opacity-90 text-white font-black rounded-2xl flex items-center justify-center gap-3 text-[11px] uppercase tracking-widest transition-all active:scale-95"
            >
                <Navigation2 size={20} />
                <span>Maps</span>
            </a>
            <a 
                href={`tel:${garage.phone?.replace(/\s/g, '') || "+21671000000"}`}
                className="flex-1 h-14 bg-[#16A34A] hover:bg-[#15803D] text-white font-black rounded-2xl flex items-center justify-center gap-3 text-[11px] uppercase tracking-widest transition-all active:scale-95"
            >
                <Phone size={20} />
                <span>Appeler</span>
            </a>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24 lg:pb-12">
      <Header 
        variant="white" 
        onNavigate={onNavigate} 
        onGoHome={onGoHome} 
        isLoggedIn={isLoggedIn}
        onTriggerLogin={onTriggerLogin}
        onLogout={onLogout}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-6">
        
        {/* FIL D'ARIANE */}
        <nav className="flex items-center px-2 md:px-0 mb-6 overflow-x-auto no-scrollbar whitespace-nowrap text-[10px] md:text-xs font-black uppercase tracking-[0.1em] text-gray-400 gap-1.5">
           <button onClick={onGoHome} className="flex items-center gap-1 hover:text-primary-600 transition-colors">
              <Home size={14} className="mb-0.5" /> Accueil
           </button>
           <ChevronRight size={12} className="text-gray-200" />
           <button onClick={() => onNavigate?.('garages')} className="hover:text-primary-600 transition-colors">Garages</button>
           <ChevronRight size={12} className="text-gray-200" />
           <button onClick={() => onNavigate?.('garages', { location: garage.location })} className="hover:text-primary-600 transition-colors">
              {garage.location || "Tunisie"}
           </button>
           <ChevronRight size={12} className="text-gray-200" />
           <span className="text-gray-900 truncate max-w-[150px] md:max-w-xs">{garage.name}</span>
        </nav>

        {/* GARAGE TITLE WITH ICON-ONLY BADGE AND STATUS */}
        <div className="mb-6 px-2 md:px-0 animate-fade-in-up">
           <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight leading-none">
                 {garage.name}
              </h1>
              {garage.isVerified && (
                <ShieldCheck className="text-success-600" size={24} />
              )}
              {/* Instant status badge */}
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${isCurrentlyOpen ? 'bg-success-50 text-success-700 border-success-100' : 'bg-error-50 text-error-700 border-error-100'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isCurrentlyOpen ? 'bg-success-500 animate-pulse' : 'bg-error-500'}`}></div>
                <span>{isCurrentlyOpen ? 'Ouvert' : 'Fermé'}</span>
              </div>
           </div>
           <div className="flex items-center gap-2">
              <div className="flex text-warning-400">
                 {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(garage.rating) ? "fill-current" : "text-gray-200 fill-current"} />
                 ))}
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{garage.rating} / 5.0 • {reviews.length} avis</p>
           </div>
        </div>

        {/* 1. COVER PHOTO */}
        <div className="relative w-full h-[224px] md:h-[350px] lg:h-[392px] rounded-3xl overflow-hidden bg-gray-100 border border-gray-100 shadow-xs mb-8 animate-fade-in-up">
            <img 
              src={garage.image} 
              alt={garage.name} 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
            />
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT COLUMN: ALL CONTENT SECTIONS */}
            <div className="lg:col-span-2 flex flex-col gap-8 animate-fade-in-up">
                
                {/* 1.5 IDENTITY CARD (MOBILE ONLY) */}
                <div className="lg:hidden">
                    <IdentityCard />
                </div>

                {/* 2. L'EXPERTISE DU GARAGE */}
                <section className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xs transition-all hover:shadow-sm">
                    <div className="flex items-center gap-4 mb-3">
                      <h2 className="text-[17.5px] font-black text-gray-900 tracking-tight uppercase">L'expertise du garage</h2>
                    </div>
                    <div className="w-12 h-1 bg-primary-500 rounded-full mb-6"></div>
                    
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base font-medium">
                        {garage.description || "Réparation et Maintenance de Scooter, Maxiscooter et Moto. Spécialiste certifié Yamaha et Honda. Nous utilisons uniquement des pièces d'origine pour garantir la longévité de votre deux-roues."}
                    </p>
                </section>

                {/* 3. SERVICES CLÉS */}
                <section className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xs transition-all hover:shadow-sm">
                    <div className="flex items-center gap-5 mb-3">
                      <h2 className="text-[17.5px] font-black text-gray-900 tracking-tight uppercase">Services Clés</h2>
                    </div>
                    <div className="w-12 h-1 bg-primary-500 rounded-full mb-6"></div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                        {(garage.specialties && garage.specialties.length > 0 ? garage.specialties : ["Grosse Cylindrée", "Diagnostic", "Entretien", "Vidange", "Pneumatiques", "Kit Chaîne"]).map(tag => (
                            <div key={tag} className="flex items-center gap-3">
                                <CheckCircle2 className="text-success-500 shrink-0" size={18} />
                                <span className="text-sm font-bold text-gray-700">{tag}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. TARIFS DES PRESTATIONS */}
                <section className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xs transition-all hover:shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                       <div className="flex items-center gap-5">
                          <h2 className="text-[17.5px] font-black text-gray-900 uppercase tracking-tight">Tarifs des prestations</h2>
                       </div>
                       <span className="hidden md:block text-[9px] font-black text-gray-400 uppercase tracking-widest border border-gray-100 px-4 py-2 rounded-full bg-gray-50/50">*Tarifs indicatifs</span>
                    </div>
                    <div className="w-12 h-1 bg-primary-500 rounded-full mb-6"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                        {services.map((service, idx) => {
                            const truncatedName = service.name.length > 19 ? service.name.substring(0, 19) + "..." : service.name;
                            return (
                              <div key={idx} className="group py-5 border-b border-gray-100 hover:border-primary-200 transition-colors">
                                  <div className="flex items-center justify-between gap-3">
                                      <div className="flex items-center gap-3 min-w-0">
                                          <CheckCircle2 className="text-success-500 shrink-0" size={18} />
                                          <span className="font-bold text-gray-700 text-sm group-hover:text-gray-900 transition-colors truncate">
                                              {truncatedName}
                                          </span>
                                      </div>
                                      <div className="flex items-center gap-3 shrink-0">
                                          <span className="font-black text-primary-600 text-[11px] tracking-tight">{service.price}</span>
                                          <ChevronRight size={14} className="text-gray-200 group-hover:text-primary-400 transition-colors" />
                                      </div>
                                  </div>
                              </div>
                            );
                        })}
                    </div>

                    <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-gray-100">
                       <div className="flex items-center gap-4 text-gray-500">
                          <ShieldCheck size={24} className="text-success-500" />
                          <p className="text-xs font-medium max-w-xs">Garantie sur toutes les interventions effectuées dans notre atelier.</p>
                       </div>
                       <button 
                          onClick={() => window.open(`https://wa.me/${garage.phone?.replace(/\s/g, '') || "21621719109"}`, '_blank')}
                          className="w-full md:w-auto px-10 py-5 bg-[#25D366] text-white font-black rounded-[1.25rem] text-[11px] uppercase tracking-[0.1em] hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-3"
                       >
                          <WhatsAppIcon size={20} />
                          Rendez vous
                       </button>
                    </div>
                </section>

                {/* NEW BOUTIQUE CARD */}
                <section className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xs transition-all hover:shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                       <div className="flex items-center gap-5">
                          <h2 className="text-[17.5px] font-black text-gray-900 uppercase tracking-tight">Articles les plus consultés</h2>
                       </div>
                       <button 
                         onClick={() => onNavigate?.('search', { search: garage.name })}
                         className="hidden md:block text-[9px] font-black text-primary-600 uppercase tracking-widest border border-primary-100 px-4 py-2 rounded-full bg-primary-50 hover:bg-primary-100 transition-colors"
                       >
                          Visiter notre boutique
                       </button>
                    </div>
                    <div className="w-12 h-1 bg-primary-500 rounded-full mb-6"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        {shopPreview.map((item, index) => (
                           <div 
                              key={item.id} 
                              onClick={() => onNavigate?.('listing-details', { id: item.id })}
                              className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100/50 cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
                           >
                              <div className="aspect-[4/3] overflow-hidden relative bg-gray-200">
                                 <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                 <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm">
                                    <span className="text-[10px] font-black text-primary-600 tracking-tighter uppercase">{item.price}</span>
                                 </div>
                              </div>
                              <div className="p-4">
                                 <h4 className="text-xs font-black text-gray-900 truncate mb-2">{item.title}</h4>
                                 <div className="flex items-center justify-between text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                    <div className="flex items-center gap-1">
                                       <Calendar size={10} className="text-gray-300" />
                                       <span>{item.year || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                       <Gauge size={10} className="text-gray-300" />
                                       <span>{item.mileage || '0km'}</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                    </div>

                    {/* Version mobile uniquement : bouton orange "notre boutique" */}
                    <div className="mt-6 md:hidden">
                        <button 
                           onClick={() => onNavigate?.('search', { search: garage.name })}
                           className="w-full h-14 bg-primary-600 hover:bg-primary-700 text-white font-black rounded-2xl flex items-center justify-center gap-3 text-[11px] uppercase tracking-widest transition-all active:scale-95 shadow-md shadow-primary-600/10"
                        >
                           <ShoppingBag size={20} />
                           <span>Notre boutique</span>
                        </button>
                    </div>
                </section>

                {/* 5. AVIS CLIENTS (FULL LIST) */}
                <section className="flex flex-col gap-8 pb-12">
                    <div className="flex flex-col gap-3 mb-0">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center border border-primary-100">
                                <MessageSquare size={24} />
                            </div>
                            <h2 className="text-[17.5px] font-black text-gray-900 tracking-tight uppercase">Avis clients ({reviews.length})</h2>
                        </div>
                        <div className="w-12 h-1 bg-primary-500 rounded-full ml-1"></div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xs">
                      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                         <div className="flex flex-col items-center justify-center text-center">
                            <span className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-2">{garage.rating}</span>
                            <div className="flex gap-1 mb-2">
                               {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={20} className={i < Math.floor(garage.rating) ? "text-warning-400 fill-warning-400" : "text-gray-200 fill-gray-200"} />
                               ))}
                            </div>
                            <p className="text-gray-500 text-sm font-medium">{reviews.length} avis</p>
                         </div>
                         <div className="flex-1 w-full space-y-2">
                            {[5, 4, 3, 2, 1].map((stars) => {
                               const percentage = stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2;
                               return (
                                 <div key={stars} className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-gray-500 w-3">{stars}</span>
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                       <div className="h-full bg-warning-400 rounded-full" style={{ width: `${percentage}%` }}></div>
                                    </div>
                                 </div>
                               );
                            })}
                         </div>
                         <div className="flex flex-col items-center justify-center w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 md:pl-8">
                            <p className="text-gray-900 font-bold mb-3 text-center">Vous connaissez ce garage ?</p>
                            <button 
                              onClick={handleOpenReviewModal}
                              className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:border-primary-600 hover:text-primary-600 transition-colors shadow-none active:scale-95 w-full whitespace-nowrap"
                            >
                               Donner mon avis
                            </button>
                         </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                       {reviews.length > 0 ? reviews.map((review) => (
                         <div key={review.id} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xs hover:shadow-sm transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                               <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 overflow-hidden">
                                     {review.avatar ? (
                                        <img src={review.avatar} alt={review.author} className="w-full h-full object-cover" />
                                     ) : (
                                        <User size={20} />
                                     )}
                                  </div>
                                  <div>
                                     <h4 className="font-bold text-gray-900">{review.author}</h4>
                                     <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span>{review.date}</span>
                                        {review.isVerifiedOwner && (
                                           <span className="flex items-center gap-0.5 text-success-600 font-medium bg-success-50 px-1.5 py-0.5 rounded">
                                              <CheckCircle2 size={10} /> Client vérifié
                                           </span>
                                        )}
                                     </div>
                                  </div>
                               </div>
                               <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                  <MoreVertical size={18} />
                                </button>
                            </div>
                            <div className="flex items-center gap-1 mb-3">
                               {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={14} className={i < review.rating ? "text-warning-400 fill-warning-400" : "text-gray-200 fill-gray-200"} />
                               ))}
                            </div>
                            <p className="text-gray-700 leading-relaxed text-sm mb-4">{review.content}</p>
                            <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                               <button className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary-600 transition-colors">
                                  <ThumbsUp size={14} />
                                  Utile ({review.helpfulCount})
                               </button>
                            </div>
                         </div>
                       )) : (
                         <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100 shadow-xs">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Aucun avis pour le moment</h3>
                            <button onClick={handleOpenReviewModal} className="px-6 py-2.5 bg-primary-600 text-white font-bold rounded-xl mt-4 shadow-sm">Donner mon avis</button>
                         </div>
                       )}
                    </div>
                </section>
            </div>

            {/* RIGHT COLUMN: IDENTITY CARD (DESKTOP STICKY) + SIDEBAR ADS */}
            <div className="lg:col-span-1 flex flex-col gap-6 lg:sticky lg:top-28">
               
               {/* Identity Card (Desktop Version) */}
               <div className="hidden lg:block">
                  <IdentityCard />
               </div>

               <AdBanner zone="garage_sidebar" className="rounded-3xl border border-gray-100 overflow-hidden aspect-square shadow-xs" />
            </div>
        </div>

      </main>

      {/* REVIEW MODAL */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
           <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden">
              <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                 <h3 className="font-black text-lg text-gray-900">Rédiger un avis</h3>
                 <button onClick={() => setIsReviewModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                    <X size={24} />
                 </button>
              </div>
              <form onSubmit={handleSubmitReview} className="p-8 space-y-8">
                 <div className="flex flex-col items-center gap-3">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Votre note</span>
                    <div className="flex gap-2.5">
                       {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} type="button" onClick={() => setNewReviewRating(star)} className="transition-transform hover:scale-125 focus:outline-none">
                             <Star size={36} className={`${star <= newReviewRating ? 'text-warning-400 fill-warning-400' : 'text-gray-200 fill-gray-200'} transition-colors`} />
                          </button>
                       ))}
                    </div>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Votre expérience</label>
                    <textarea required rows={5} value={newReviewContent} onChange={(e) => setNewReviewContent(e.target.value)} placeholder="Détails du service, ponctualité, prix..." className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none text-sm resize-none focus:bg-white focus:border-primary-500 transition-all font-medium" />
                 </div>
                 <button type="submit" disabled={newReviewRating === 0 || !newReviewContent.trim()} className="w-full py-4 bg-primary-600 text-white font-black rounded-2xl shadow-xl shadow-primary-500/10 disabled:opacity-50 border-none transition-transform active:scale-95 text-xs uppercase tracking-widest">
                    Publier mon avis
                 </button>
              </form>
           </div>
        </div>
      )}

      {/* SUCCESS TOAST */}
      {showSuccessToast && (
         <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-8 py-4 rounded-[1.25rem] shadow-2xl flex items-center gap-4 z-[110] animate-fade-in-up border border-white/10">
            <CheckCircle2 className="text-success-400" size={24} />
            <span className="font-bold text-sm">Avis publié avec succès !</span>
         </div>
      )}
    </div>
  );
};

export default GarageDetails;