import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Calendar, 
  Gauge, 
  Info, 
  CheckCircle2, 
  Phone, 
  ChevronLeft, 
  ChevronRight, 
  FileText,
  Shield,
  User,
  Zap,
  X,
  Copy,
  Bike,
  Home,
  Maximize2,
  ArrowLeft
} from 'lucide-react';
import { Listing } from '../types';
import Header from './layout/Header';
import { mockListings } from '../data/mockData';
import { useFavorites } from '../context/FavoritesContext';
import AdBanner from './common/AdBanner';

// --- CUSTOM BRAND ICONS ---

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

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

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12.525.02c1.31-.032 2.617-.019 3.91-.01 1.3.01 1.3.01 1.3 1.31a6.45 6.45 0 004.28 5.62 1.32 1.32 0 01-1.31 1.3 6.45 6.45 0 01-4.28-1.5 1.32 1.32 0 01-.67-1.15c-.01-1.3.01-2.6.01-3.9 0-.66-.33-.99-.99-.99a3.83 3.83 0 00-3.83 3.83v7.71c.01 3.2-2.58 5.8-5.78 5.8s-5.8-2.6-5.8-5.8c0-3.1 2.41-5.63 5.48-5.78a1.32 1.32 0 011.3 1.31c0 1.3-.01 2.61-.01 3.91a1.32 1.32 0 01-1.3 1.31c-.96 0-1.74.77-1.74 1.74s.77 1.74 1.74 1.74 1.74-.77 1.74-1.74V1.31c.01-1.3.01-1.3 1.3-1.3z"/>
  </svg>
);

// --- SHARE MODAL COMPONENT (OPTIMISÉ MOBILE) ---
interface ShareModalProps {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ listing, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const shareUrl = window.location.href;
  const shareText = `Regarde cette annonce sur MotoScoot.tn : ${listing.title} à ${listing.price}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnFB = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnWA = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/70 backdrop-blur-md animate-fade-in-up">
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl relative border border-gray-100 flex flex-col z-10 max-h-[90vh]">
        {/* Handle bar on mobile */}
        <div className="md:hidden flex justify-center pt-4 pb-2">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
        </div>

        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 bg-gray-100 rounded-full transition-colors z-10 hidden md:block">
          <X size={20} />
        </button>

        <div className="px-6 pb-10 pt-4 md:p-8 flex-1 overflow-y-auto no-scrollbar">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-1 tracking-tight">Partager l'annonce</h3>
            <p className="text-gray-400 text-xs font-medium">Faites briller cette pépite auprès de vos amis</p>
          </div>
          
          {/* Preview Card - Scaled for Mobile */}
          <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 mb-6 overflow-hidden shadow-xl shadow-gray-200/50 group animate-fade-in-up">
             <div className="px-3 py-2 bg-gray-50 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-1.5">
                   <div className="w-4 h-4 bg-primary-600 rounded flex items-center justify-center">
                      <Bike size={10} className="text-white" />
                   </div>
                   <span className="text-[8px] font-black text-gray-900 uppercase tracking-widest">MotoScoot.tn</span>
                </div>
                <span className="text-[8px] font-bold text-gray-400 uppercase">Vérifié</span>
             </div>

             <div className="relative aspect-[2/1] md:aspect-[1.91/1] overflow-hidden bg-gray-100">
                <img src={listing.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-2 left-2">
                   <span className="px-2 py-1 bg-primary-600 text-white rounded-lg text-sm md:text-lg font-black shadow-lg">
                      {listing.price}
                   </span>
                </div>
             </div>

             <div className="p-4 md:p-5">
                <h4 className="font-extrabold text-gray-900 text-base md:text-lg leading-tight mb-2 line-clamp-1">{listing.title}</h4>
                
                <div className="flex items-center gap-3 mb-2 pb-2 border-b border-gray-50">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                       <MapPin size={12} className="text-primary-500" />
                       {listing.location}
                    </div>
                    {listing.type !== 'Accessoires' && (
                       <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-[9px] font-black text-gray-400 uppercase">
                             <Calendar size={10} /> {listing.year}
                          </div>
                          <div className="flex items-center gap-1 text-[9px] font-black text-gray-400 uppercase">
                             <Gauge size={10} /> {listing.mileage}
                          </div>
                       </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                   <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[8px] font-black text-gray-400">
                      {listing.seller.charAt(0)}
                   </div>
                   <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest truncate">Posté par {listing.seller}</span>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
            <button onClick={shareOnFB} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gray-50 text-[#1877F2] flex items-center justify-center group-hover:bg-[#1877F2] group-hover:text-white transition-all shadow-sm active:scale-90 group-hover:shadow-blue-500/20 border border-gray-100">
                <FacebookIcon className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter group-hover:text-[#1877F2] transition-colors">Facebook</span>
            </button>
            <button onClick={shareOnWA} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gray-50 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-all shadow-sm active:scale-90 group-hover:shadow-green-500/20 border border-gray-100">
                <WhatsAppIcon className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter group-hover:text-[#25D366] transition-colors">WhatsApp</span>
            </button>
            <button onClick={handleCopy} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gray-50 text-gray-900 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm active:scale-90 group-hover:shadow-black/20 border border-gray-100">
                <TikTokIcon className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter group-hover:text-black transition-colors">TikTok</span>
            </button>
          </div>

          <div className="space-y-2">
             <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Lien de l'annonce</label>
             <div className="relative group">
                <input 
                  type="text" 
                  readOnly 
                  value={shareUrl}
                  className="w-full pl-4 pr-12 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-[10px] md:text-xs font-bold text-gray-500 outline-none focus:bg-white focus:border-primary-500 transition-all truncate"
                />
                <button onClick={handleCopy} className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white border border-gray-100 text-primary-600 hover:text-white hover:bg-primary-600 rounded-lg transition-all shadow-sm active:scale-90">
                  {copied ? <CheckCircle2 size={16} className="text-success-500" /> : <Copy size={16} />}
                </button>
             </div>
             {copied && <p className="text-[9px] text-success-600 font-bold text-center animate-fade-in-up">Copié avec succès !</p>}
          </div>

          {/* Mobile Footer Spacing (safe-area) */}
          <div className="h-4 md:hidden"></div>
        </div>
      </div>
    </div>
  );
};

const SimilarListingCard: React.FC<{ listing: Listing, onClick: () => void, className?: string }> = ({ listing, onClick, className = "" }) => (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer group flex-shrink-0 ${className}`}
      style={{ width: '256px' }}
    >
        <div className="relative h-40 overflow-hidden">
            <img src={listing.image} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" alt={listing.title} />
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-black px-2 py-1 rounded-lg">
                {listing.price}
            </div>
        </div>
        <div className="p-4">
            <h4 className="font-bold text-gray-900 truncate mb-1 tracking-tight">{listing.title}</h4>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                {listing.type === 'Accessoires' ? (
                    <span>{listing.condition}</span>
                ) : (
                    <>
                        <span>{listing.year}</span>
                        <span>•</span>
                        <span>{listing.mileage}</span>
                    </>
                )}
            </div>
        </div>
    </div>
);

// --- COMPONENT INTERFACE ---
interface ListingDetailsProps {
  listingId: number;
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  onBack?: () => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({ 
  listingId, 
  onGoHome, 
  onNavigate, 
  onBack,
  isLoggedIn, 
  onTriggerLogin, 
  onLogout 
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  const listing = mockListings.find(l => l.id === listingId) || mockListings[0];
  const similarListings = mockListings.filter(l => l.id !== listing.id && l.type === listing.type);
  const favorited = isFavorite('listing', listing.id);
  const isAccessory = listing.type === 'Accessoires';

  // Utiliser la galerie de l'annonce si elle existe
  const allImages = listing.images && listing.images.length > 0 
    ? listing.images 
    : [
        listing.image,
        "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1558981806-ec527fa84f3d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1558980394-0a06c46e60e7?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80"
      ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const index = Math.round(scrollContainerRef.current.scrollLeft / scrollContainerRef.current.offsetWidth);
      setActiveImageIndex(index);
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const navigateLightbox = (dir: 'next' | 'prev', e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (dir === 'next') {
      setLightboxIndex((prev) => (prev + 1) % allImages.length);
    } else {
      setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  const getDealInfo = (rating?: number) => {
      switch (rating) {
          case 3: return { label: 'SUPER AFFAIRE', color: 'bg-success-500', textColor: 'text-success-600', bgColor: 'bg-success-50' };
          case 2: return { label: 'BONNE AFFAIRE', color: 'bg-primary-500', textColor: 'text-primary-600', bgColor: 'bg-primary-50' };
          default: return { label: 'PRIX DU MARCHÉ', color: 'bg-gray-300', textColor: 'text-gray-400', bgColor: 'bg-gray-50' };
      }
  };

  const dealInfo = getDealInfo(listing.dealRating);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsPhoneRevealed(false);
    setActiveImageIndex(0); // Reset index when listing changes
  }, [listingId]);

  // Handle Keyboard for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-32 md:pb-12">
      <Header 
        variant="white" 
        onNavigate={onNavigate} 
        onGoHome={onGoHome} 
        isLoggedIn={isLoggedIn}
        onTriggerLogin={onTriggerLogin}
        onLogout={onLogout}
      />

      <ShareModal listing={listing} isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />

      {/* --- LIGHTBOX PLEIN ÉCRAN --- */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-fade-in-up"
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-[210] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
          >
            <X size={28} />
          </button>

          <div className="absolute top-6 left-6 z-[210] px-4 py-2 bg-white/10 rounded-xl border border-white/10 text-white font-black text-sm tracking-widest uppercase">
             {lightboxIndex + 1} / {allImages.length}
          </div>

          <button 
            onClick={(e) => navigateLightbox('prev', e)}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[210] p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all active:scale-90"
          >
            <ChevronLeft size={32} strokeWidth={3} />
          </button>

          <div className="w-full h-full flex items-center justify-center p-4 md:p-12" onClick={(e) => e.stopPropagation()}>
            <img 
              src={allImages[lightboxIndex]} 
              alt="" 
              className="max-w-full max-h-full object-contain animate-scale-in"
            />
          </div>

          <button 
            onClick={(e) => navigateLightbox('next', e)}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[210] p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all active:scale-90"
          >
            <ChevronRight size={32} strokeWidth={3} />
          </button>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-0 md:px-8 pt-28 md:pt-28">
        
        {/* FIL D'ARIANE ENRICHI (SEO & NAVIGATION) */}
        <nav className="flex items-center px-5 md:px-0 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap text-[10px] md:text-xs font-black uppercase tracking-[0.1em] text-gray-400 gap-1.5">
           <button onClick={onGoHome} className="flex items-center gap-1 hover:text-primary-600 transition-colors">
              <Home size={14} className="mb-0.5" />
              Accueil
           </button>
           <ChevronRight size={12} className="text-gray-200" />
           <button onClick={() => onNavigate?.('search', { type: listing.type })} className="hover:text-primary-600 transition-colors">
              {listing.type}
           </button>
           <ChevronRight size={12} className="text-gray-200" />
           <button onClick={() => onNavigate?.('search', { location: listing.location })} className="hover:text-primary-600 transition-colors">
              {listing.location}
           </button>
           <ChevronRight size={12} className="text-gray-200" />
           <span className="text-gray-900 truncate max-w-[150px] md:max-w-xs">{listing.title}</span>
        </nav>

        {/* MOBILE: TITRE */}
        <div className="md:hidden px-5 mb-6 animate-fade-in-up">
           <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
              {listing.title}
           </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: CONTENT */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            
            {/* Gallery Section */}
            <div className="relative group px-4 md:px-0">
                <div 
                  className="md:hidden relative h-[45vh] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-none cursor-pointer"
                  onClick={() => openLightbox(activeImageIndex)}
                >
                   <div 
                      ref={scrollContainerRef}
                      onScroll={handleScroll}
                      className="flex overflow-x-auto snap-x snap-mandatory h-full no-scrollbar"
                   >
                      {allImages.map((img, idx) => (
                         <div key={idx} className="flex-shrink-0 w-full h-full snap-center">
                            <img src={img} className="w-full h-full object-cover" alt="" />
                         </div>
                      ))}
                   </div>
                   <div className="absolute top-4 right-4 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => toggleFavorite('listing', listing.id)} className={`p-3 rounded-full backdrop-blur-md transition-all active:scale-90 ${favorited ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-500'}`}>
                         <Heart size={20} fill={favorited ? "currentColor" : "none"} />
                      </button>
                      <button onClick={() => setIsShareModalOpen(true)} className="p-3 bg-white/80 backdrop-blur-md rounded-full text-gray-500 active:scale-90 transition-all">
                         <Share2 size={20} />
                      </button>
                   </div>
                   <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 bg-black/10 backdrop-blur-md rounded-full">
                      {allImages.map((_, i) => (
                        <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === activeImageIndex ? 'w-4 bg-white' : 'w-1 bg-white/40'}`} />
                      ))}
                   </div>
                </div>

                {/* Desktop Slider */}
                <div className="hidden md:block rounded-3xl overflow-hidden border border-gray-100 bg-white">
                   <div className="aspect-[16/9] relative cursor-pointer" onClick={() => openLightbox(activeImageIndex)}>
                      <img src={allImages[activeImageIndex]} className="w-full h-full object-cover" alt="" />
                      
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors flex items-center justify-center group/view">
                          <div className="bg-white/20 backdrop-blur-md border border-white/20 p-4 rounded-full text-white opacity-0 group-hover/view:opacity-100 transition-opacity scale-90 group-hover/view:scale-100">
                             <Maximize2 size={24} />
                          </div>
                      </div>

                      <div className="absolute bottom-6 right-6 flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setActiveImageIndex(prev => (prev - 1 + allImages.length) % allImages.length)} className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-colors"><ChevronLeft size={20}/></button>
                        <button onClick={() => setActiveImageIndex(prev => (prev + 1) % allImages.length)} className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-colors"><ChevronRight size={20}/></button>
                      </div>
                   </div>
                   <div className="p-4 flex gap-3 overflow-x-auto no-scrollbar bg-gray-50/50">
                      {allImages.map((img, i) => (
                        <button key={i} onClick={() => setActiveImageIndex(i)} className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${i === activeImageIndex ? 'border-primary-600' : 'border-transparent opacity-60 hover:opacity-100'}`}><img src={img} className="w-full h-full object-cover" /></button>
                      ))}
                   </div>
                </div>
            </div>

            {/* Core Info Section */}
            <div className="px-5 md:px-0 space-y-6">
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="hidden md:block space-y-2">
                     <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-widest rounded-md border border-primary-100">{listing.type}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Réf: #00{listing.id}</span>
                     </div>
                     <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">
                        {listing.title}
                     </h1>
                  </div>

                  <div className="lg:hidden flex flex-row items-center justify-between gap-2">
                     <span className="text-3xl md:text-5xl font-black text-primary-600 tracking-tighter leading-none">{listing.price}</span>
                     {listing.dealRating && (
                        <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-gray-100 w-fit shrink-0">
                           <div className="flex gap-1">
                              {[1, 2, 3].map(lvl => (
                                <div key={lvl} className={`h-1 w-4 rounded-full ${listing.dealRating! >= lvl ? dealInfo.color : 'bg-gray-100'}`} />
                              ))}
                           </div>
                           <span className={`text-[10px] font-black uppercase tracking-widest ${dealInfo.textColor}`}>{dealInfo.label}</span>
                        </div>
                     )}
                  </div>

                  <div className="md:hidden flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest pt-1">
                    <div className="flex items-center gap-1.5"><MapPin size={14} className="text-primary-500" /> {listing.location}</div>
                    <div className="flex items-center gap-1.5"><Calendar size={14} /> Aujourd'hui</div>
                  </div>
               </div>

               {/* Stats Grid */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {!isAccessory ? (
                    <>
                      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col gap-2">
                         <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-primary-500" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Année</span>
                         </div>
                         <span className="text-xl font-black text-gray-900">{listing.year}</span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col gap-2">
                         <div className="flex items-center gap-2">
                            <Gauge size={14} className="text-primary-500" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">KM</span>
                         </div>
                         <span className="text-xl font-black text-gray-900">{listing.mileage}</span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col gap-2">
                         <div className="flex items-center gap-2">
                            <Zap size={14} className="text-primary-500" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CC</span>
                         </div>
                         <span className="text-xl font-black text-gray-900">{listing.cc}</span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col gap-2">
                         <div className="flex items-center gap-2">
                            <Info size={14} className="text-primary-500" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">État</span>
                         </div>
                         <span className="text-xl font-black text-gray-900 truncate">{listing.condition}</span>
                      </div>
                    </>
                  ) : (
                    <div className="col-span-full bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <Info size={18} className="text-primary-500" />
                          <span className="text-sm font-black text-gray-400 uppercase tracking-widest">État général</span>
                       </div>
                       <span className="text-xl font-black text-gray-900">{listing.condition}</span>
                    </div>
                  )}
               </div>

               {/* Description */}
               <div className="bg-white rounded-3xl p-8 border border-gray-100 space-y-8">
                  <div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                       <FileText size={14} className="text-primary-600" /> Description
                    </h3>
                    <p className="text-gray-600 font-medium leading-relaxed whitespace-pre-line">
                      {listing.description || (isAccessory 
                      ? `Je vends cet article : ${listing.title}.\nÉtat : ${listing.condition}.\nPour plus d'informations ou des photos supplémentaires, n'hésitez pas à me contacter.`
                      : `Bonjour, je vends ma ${listing.title} en excellent état.\nEntretien à jour, carnet d'entretien disponible. La révision a été faite récemment.\nVisible sur ${listing.location}. Prix légèrement négociable.`)
                      }
                    </p>
                  </div>
                  
                  {!isAccessory && (
                    <>
                      <hr className="border-gray-50" />
                      <div>
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                           <CheckCircle2 size={14} className="text-primary-600" /> Équipements
                        </h3>
                        <div className="flex flex-wrap gap-2">
                           {(listing.equipment || []).map((eq, i) => (
                             <span key={i} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-700 tracking-tight">{eq}</span>
                           ))}
                        </div>
                      </div>
                    </>
                  )}
               </div>
            </div>

            {/* MOBILE AD PLACEHOLDER */}
            <div className="md:hidden px-5 mb-4 animate-fade-in-up">
               <AdBanner zone="search_feed" variant="native" className="shadow-sm border border-[#f9f7f7] rounded-[0.75rem]" />
            </div>

            {/* Similar Items */}
            <div className="px-5 md:px-0 py-8">
               <h3 className="text-xl font-black text-gray-900 mb-6 tracking-tight">Annonces similaires</h3>
               <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                  {similarListings.map(l => (
                    <SimilarListingCard key={l.id} listing={l} onClick={() => onNavigate?.('listing-details', { id: l.id })} />
                  ))}
               </div>
            </div>
          </div>

          {/* RIGHT: SIDEBAR (Desktop & Tablet) */}
          <div className="hidden lg:block lg:col-span-4">
             <div className="sticky top-32 space-y-6">
                
                {/* CARTE VENDEUR COMPACTE */}
                <div className="bg-white rounded-[2rem] p-7 border border-gray-100 shadow-sm space-y-6 animate-fade-in-up">
                   
                   <div className="space-y-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">PRIX DEMANDÉ</p>
                      <h2 className="text-4xl font-black text-primary-600 tracking-tight leading-none">
                         {listing.price}
                      </h2>
                      
                      {listing.dealRating && (
                         <div className="inline-flex items-center gap-2.5 bg-success-50 px-3.5 py-1.5 rounded-lg border border-success-100/50">
                            <div className="flex gap-1">
                               {[1, 2, 3].map(lvl => (
                                 <div key={lvl} className={`h-1 w-4 rounded-full ${listing.dealRating! >= lvl ? 'bg-success-500' : 'bg-gray-200'}`} />
                               ))}
                            </div>
                            <span className="text-[10px] font-black text-success-600 uppercase tracking-wider">{dealInfo.label}</span>
                         </div>
                      )}
                   </div>

                   <hr className="border-gray-100" />

                   <div className="flex items-center gap-4">
                      <div className="relative">
                         <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-black text-2xl border border-gray-50 shadow-inner">
                           {listing.seller.charAt(0)}
                         </div>
                         <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-success-500 border-[3px] border-white rounded-full"></div>
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-black text-gray-900 text-lg tracking-tight leading-tight">{listing.seller}</h4>
                        <div className="inline-block px-2 py-0.5 bg-primary-50 text-primary-600 text-[9px] font-black uppercase tracking-widest rounded-md border border-primary-100">
                           {listing.sellerType}
                        </div>
                        <p className="text-[10px] font-bold text-gray-400">Membre depuis 2023</p>
                      </div>
                   </div>

                   <div className="space-y-3 pt-1">
                      {isPhoneRevealed ? (
                        <a href={`tel:${listing.id}`} className="w-full h-14 bg-[#E6580B] text-white rounded-xl font-black text-base flex items-center justify-center gap-3 animate-fade-in-up active:scale-95 transition-all shadow-md">
                           <Phone size={20} fill="currentColor" /> 25 123 456
                        </a>
                      ) : (
                        <button onClick={() => setIsPhoneRevealed(true)} className="w-full h-14 bg-[#E6580B] hover:opacity-90 text-white rounded-xl font-black text-base flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-primary-600/10">
                           <Phone size={20} /> Afficher le numéro
                        </button>
                      )}
                      
                      <div className="grid grid-cols-2 gap-3">
                         <button onClick={() => setIsShareModalOpen(true)} className="h-12 bg-white border border-gray-100 rounded-xl font-black text-gray-700 text-xs hover:bg-gray-50 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm">
                            <Share2 size={16} className="text-gray-400" /> Partager
                         </button>
                         <button 
                           onClick={() => toggleFavorite('listing', listing.id)} 
                           className={`h-12 rounded-xl border transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm font-black text-xs ${favorited ? 'bg-red-50 border-red-100 text-red-500' : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50'}`}
                         >
                            <Heart size={16} fill={favorited ? "currentColor" : "none"} className={favorited ? "text-red-500" : "text-gray-400"} /> 
                            {favorited ? 'Sauvegardé' : 'Sauvegarder'}
                         </button>
                      </div>
                   </div>

                   <div className="pt-4 border-t border-gray-100 flex gap-3 items-start">
                      <Shield size={16} className="text-gray-300 shrink-0 mt-0.5" />
                      <p className="text-[10px] font-bold text-gray-400 leading-normal">
                        <strong className="text-gray-500 font-black">Conseil sécurité :</strong> Ne versez jamais d'acompte avant d'avoir vu le véhicule.
                      </p>
                   </div>
                </div>
                
                <AdBanner zone="listing_sidebar" className="rounded-2xl border border-gray-100 shadow-none overflow-hidden aspect-square" />
             </div>
          </div>
        </div>
      </main>

      {/* MOBILE STICKY FOOTER */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 p-4 safe-area-bottom z-40 flex items-center gap-3">
         <a 
            href={`https://wa.me/21621719109`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-1/2 h-14 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 bg-[#25D366] text-white hover:bg-[#128C7E] active:bg-[#128C7E] font-black uppercase text-[10px] tracking-widest"
         >
            <WhatsAppIcon size={20} />
            <span>Message</span>
         </a>
         
         <div className="w-1/2">
            {isPhoneRevealed ? (
                <a 
                    href={`tel:${listing.id}`}
                    className="w-full h-14 bg-[#E6580B] text-white rounded-2xl font-black flex items-center justify-center gap-3 active:scale-95 transition-all animate-fade-in-up"
                >
                    <Phone size={18} fill="currentColor" />
                    <span className="text-base tabular-nums tracking-tighter">25 123 456</span>
                </a>
            ) : (
                <button 
                    onClick={() => setIsPhoneRevealed(true)}
                    className="w-full h-14 bg-[#E6580B] text-white rounded-2xl font-black flex items-center justify-center gap-3 active:scale-95 transition-all shadow-none"
                >
                    <Phone size={18} />
                    <span className="uppercase tracking-widest text-[10px]">Appeler</span>
                </button>
            )}
         </div>
      </div>

    </div>
  );
};

export default ListingDetails;