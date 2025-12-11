
import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Calendar, 
  Gauge, 
  Info, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight, 
  Flag,
  Clock,
  CircleDollarSign,
  Camera,
  X,
  ChevronDown,
  ChevronUp,
  FileText,
  ArrowUpRight,
  Fuel,
  ExternalLink,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { Listing } from '../types';
import Header from './layout/Header';
import { mockListings } from '../data/mockData';
import { useFavorites } from '../context/FavoritesContext';

interface ListingDetailsProps {
  listingId: number;
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  onBack?: () => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

// --- SUB-COMPONENTS ---

const SimilarListingCard: React.FC<{ listing: Listing, onClick: () => void, className?: string }> = ({ listing, onClick, className = "" }) => (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group flex-shrink-0 ${className}`}
    >
        <div className="relative h-40 overflow-hidden">
            <img src={listing.image} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" alt={listing.title} />
            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded">
                {listing.price}
            </div>
        </div>
        <div className="p-3">
            <h4 className="font-bold text-gray-900 truncate mb-1">{listing.title}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-500">
                {listing.type === 'Accessoires' ? (
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-bold uppercase text-gray-600">
                        {listing.condition}
                    </span>
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Similar Listings Slider State
  const [currentSimIndex, setCurrentSimIndex] = useState(0);
  const [simItemsToShow, setSimItemsToShow] = useState(3);
  const [isSimPaused, setIsSimPaused] = useState(false);

  const { isFavorite, toggleFavorite } = useFavorites();

  // Find listing or use fallback
  const listing = mockListings.find(l => l.id === listingId) || mockListings[0];
  
  // Filter similar listings by Type
  const similarListings = mockListings
    .filter(l => l.id !== listing.id && l.type === listing.type);
  
  const favorited = isFavorite('listing', listing.id);
  const isAccessory = listing.type === 'Accessoires';

  // Mock Images
  const allImages = [
    listing.image,
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1558981806-ec527fa84f3d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1558980394-0a06c46e60e7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80"
  ];

  // Use real equipment data if available, fallback for demo
  const features = listing.equipment || ["Aucune option spécifiée"];

  // Helper to get deal label and color (Matches SearchResults logic)
  const getDealInfo = (rating?: number) => {
      switch (rating) {
          case 3: return { label: 'Super affaire', color: 'bg-success-500', textColor: 'text-success-600', bgColor: 'bg-success-50' };
          case 2: return { label: 'Bonne affaire', color: 'bg-primary-500', textColor: 'text-primary-600', bgColor: 'bg-primary-50' };
          case 1: 
          default: return { label: 'Prix du marché', color: 'bg-gray-400', textColor: 'text-gray-500', bgColor: 'bg-gray-50' };
      }
  };

  const dealInfo = getDealInfo(listing.dealRating);

  // Handle scroll for mobile gallery counter
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const width = scrollContainerRef.current.offsetWidth;
      const index = Math.round(scrollPosition / width);
      setActiveImageIndex(index);
    }
  };

  // Gallery Navigation for Desktop Slider
  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentSimIndex(0); // Reset slider when listing changes
    setIsPhoneRevealed(false); // Reset phone reveal
  }, [listingId]);

  // Similar Listings Slider Logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setSimItemsToShow(1);
      else if (window.innerWidth < 1024) setSimItemsToShow(2);
      else setSimItemsToShow(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isSimPaused || similarListings.length <= simItemsToShow) return;
    
    const interval = setInterval(() => {
        setCurrentSimIndex(prev => {
            const max = Math.ceil(similarListings.length - simItemsToShow);
            return prev >= max ? 0 : prev + 1;
        });
    }, 3500); // 3.5s auto scroll
    return () => clearInterval(interval);
  }, [isSimPaused, similarListings.length, simItemsToShow]);

  const nextSim = () => {
      const max = Math.ceil(similarListings.length - simItemsToShow);
      setCurrentSimIndex(prev => (prev >= max ? 0 : prev + 1));
  };
  const prevSim = () => {
      const max = Math.ceil(similarListings.length - simItemsToShow);
      setCurrentSimIndex(prev => (prev <= 0 ? max : prev - 1));
  };

  const handlePhoneClick = () => {
      setIsPhoneRevealed(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24 md:pb-12">
      
      <Header 
        variant="white" 
        onNavigate={onNavigate} 
        onGoHome={onGoHome} 
        isLoggedIn={isLoggedIn}
        onTriggerLogin={onTriggerLogin}
        onLogout={onLogout}
      />

      <main className="max-w-7xl mx-auto px-0 md:px-6 py-0 md:py-8">
        
        {/* Breadcrumb (Desktop) */}
        <div className="hidden md:flex items-center gap-2 mb-6 text-sm text-gray-500">
           <button onClick={onBack} className="hover:text-primary-600 flex items-center gap-1 font-medium transition-colors">
              <ChevronLeft size={16} />
              Retour
           </button>
           <span className="text-gray-300">/</span>
           <span className="hover:text-gray-900 cursor-pointer">{listing.sellerType === 'Pro' ? 'Professionnel' : 'Particulier'}</span>
           <span className="text-gray-300">/</span>
           <span className="text-gray-900 font-semibold">{listing.title}</span>
        </div>

        {/* Mobile Header Overlay */}
        <div className="md:hidden absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center pointer-events-none safe-area-top">
           <button 
             onClick={onBack}
             className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 shadow-sm pointer-events-auto active:scale-95 transition-transform"
           >
              <ChevronLeft size={24} />
           </button>
           <div className="flex gap-3 pointer-events-auto">
              <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 shadow-sm active:scale-95 transition-transform">
                 <Share2 size={20} />
              </button>
              <button 
                onClick={() => toggleFavorite('listing', listing.id)}
                className={`w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform ${favorited ? 'text-red-500' : 'text-gray-900 hover:text-red-500'}`}
              >
                 <Heart size={20} fill={favorited ? "currentColor" : "none"} />
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Main Content (8 cols) */}
          {/* Changed from space-y to flex gap to fix alignment issue caused by hidden elements receiving top margin */}
          <div className="lg:col-span-8 flex flex-col gap-4 md:gap-8">
            
            {/* --- GALLERY SECTION --- */}
            
            {/* MOBILE: Snap Scroll Gallery */}
            <div className="md:hidden relative h-[45vh] bg-gray-900">
               <div 
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="flex overflow-x-auto snap-x snap-mandatory h-full no-scrollbar"
               >
                  {allImages.map((img, idx) => (
                     <div key={idx} className="flex-shrink-0 w-full h-full snap-center relative">
                        <img src={img} className="w-full h-full object-cover" alt={`Vue ${idx + 1}`} />
                     </div>
                  ))}
               </div>
               <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Camera size={12} />
                  {activeImageIndex + 1} / {allImages.length}
               </div>
            </div>

            {/* DESKTOP: Standard Slider with Thumbnails */}
            <div className="hidden md:block space-y-4">
                <div className="relative h-[500px] w-full bg-gray-100 rounded-2xl overflow-hidden group">
                    <img src={allImages[activeImageIndex]} alt="Main View" className="w-full h-full object-cover" />
                    
                    {/* Navigation Arrows */}
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0">
                        <ChevronLeft size={24} className="text-gray-900" />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0">
                        <ChevronRight size={24} className="text-gray-900" />
                    </button>
                </div>
                {/* Thumbnails */}
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {allImages.map((img, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${idx === activeImageIndex ? 'border-primary-600 ring-2 ring-primary-600/20' : 'border-transparent opacity-70 hover:opacity-100'}`}
                        >
                            <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            {/* --- HEADER INFO SECTION --- */}
            <div className="px-4 md:px-0">
               {/* Mobile Layout: Flex Row for Title + Price, then Gauge below */}
               <div className="flex justify-between items-start md:block mb-2 md:mb-4 gap-4">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight md:mb-0 flex-1">
                     {listing.title}
                  </h1>
                  
                  {/* Mobile Price - Next to Title */}
                  <span className="md:hidden text-xl font-extrabold text-primary-600 whitespace-nowrap pt-1">
                     {listing.price}
                  </span>
               </div>

               {/* Mobile Deal Gauge - Under Title/Price */}
               {listing.dealRating && (
                  <div className="md:hidden mb-4">
                      <div className="inline-flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                         <div className="flex gap-0.5">
                            {[1, 2, 3].map(level => (
                               <div key={level} className={`w-4 h-1.5 rounded-full ${listing.dealRating! >= level ? dealInfo.color : 'bg-gray-200'}`}></div>
                            ))}
                         </div>
                         <span className={`text-xs font-bold uppercase tracking-wide ${dealInfo.textColor}`}>{dealInfo.label}</span>
                      </div>
                  </div>
               )}

               {/* Mobile Quick Specs Grid (Visible without scroll) */}
               {isAccessory ? (
                 <div className="md:hidden mb-6 bg-gray-50 p-4 rounded-xl flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-sm border border-gray-100">
                        <CheckCircle2 size={24} />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">État général</span>
                       <span className="text-lg font-bold text-gray-900">{listing.condition}</span>
                    </div>
                 </div>
               ) : (
                 <div className="md:hidden grid grid-cols-2 gap-3 mb-6 bg-gray-50 p-4 rounded-xl">
                    <div className="flex flex-col">
                       <span className="text-xs text-gray-500 font-medium">Année</span>
                       <span className="text-sm font-bold text-gray-900">{listing.year}</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-xs text-gray-500 font-medium">Kilométrage</span>
                       <span className="text-sm font-bold text-gray-900">{listing.mileage}</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-xs text-gray-500 font-medium">Cylindrée</span>
                       <span className="text-sm font-bold text-gray-900">{listing.cc}</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-xs text-gray-500 font-medium">Boîte</span>
                       <span className="text-sm font-bold text-gray-900">Manuelle</span>
                    </div>
                 </div>
               )}

               {/* Desktop Specs Grid */}
               {isAccessory ? (
                  <div className="hidden md:grid grid-cols-4 gap-4 mb-8">
                     <div className="bg-white border border-gray-100 p-4 rounded-xl flex items-center gap-3 shadow-sm">
                        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                           <CheckCircle2 size={20} />
                        </div>
                        <div>
                           <p className="text-xs text-gray-500 font-medium">État général</p>
                           <p className="font-bold text-gray-900">{listing.condition}</p>
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className="hidden md:grid grid-cols-4 gap-4 mb-8">
                      {[
                         { label: 'Année', value: listing.year, icon: Calendar },
                         { label: 'Kilométrage', value: listing.mileage, icon: Gauge },
                         { label: 'Cylindrée', value: listing.cc, icon: Info },
                         { label: 'Boîte', value: 'Manuelle', icon: Fuel },
                      ].map((item, idx) => (
                         <div key={idx} className="bg-white border border-gray-100 p-4 rounded-xl flex items-center gap-3 shadow-sm">
                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                               <item.icon size={20} />
                            </div>
                            <div>
                               <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                               <p className="font-bold text-gray-900">{item.value}</p>
                            </div>
                         </div>
                      ))}
                  </div>
               )}
            </div>

            {/* --- COMBINED DETAILS CARD --- */}
            <div className="px-4 md:px-0">
                <div className="bg-white md:rounded-2xl md:p-8 p-6 rounded-xl shadow-sm border border-gray-100 space-y-8">
                    
                    {/* Description Section */}
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                            <FileText size={20} className="text-primary-600" />
                            {isAccessory ? "Description" : "Description du véhicule"}
                        </h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
                            {isAccessory 
                            ? `Je vends cet article : ${listing.title}.\nÉtat : ${listing.condition}.\nPour plus d'informations ou des photos supplémentaires, n'hésitez pas à me contacter.`
                            : `Bonjour, je vends ma ${listing.title} en excellent état.\nEntretien à jour, carnet d'entretien disponible. La révision a été faite récemment.\nVisible sur ${listing.location}. Prix légèrement négociable.`
                            }
                        </p>
                    </div>

                    {!isAccessory && (
                        <>
                            <hr className="border-gray-100" />

                            {/* Equipment Section */}
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                                    <CheckCircle2 size={20} className="text-primary-600" />
                                    Équipements & Options
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {features.length > 0 ? features.map((feature, idx) => (
                                    <span key={idx} className="bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200">
                                        {feature}
                                    </span>
                                    )) : (
                                    <span className="text-gray-500 text-sm italic">Aucun équipement spécifié</span>
                                    )}
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Specs / Administrative (Formerly Historique) */}
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600 text-sm">Origine</span>
                                        <span className="font-bold text-gray-900 text-sm">Importée</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600 text-sm">Première main</span>
                                        <span className="font-bold text-gray-900 text-sm">Non (2ème main)</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600 text-sm">Carte grise</span>
                                        <span className="font-bold text-success-600 text-sm flex items-center gap-1">
                                            <CheckCircle2 size={14} /> À mon nom
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600 text-sm">Certificat de non-gage</span>
                                        <span className="font-bold text-success-600 text-sm flex items-center gap-1">
                                            <CheckCircle2 size={14} /> Disponible
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* --- SIMILAR LISTINGS SLIDER --- */}
            {similarListings.length > 0 && (
                <div className="px-4 md:px-0 py-8">
                   <div className="flex justify-between items-end mb-4">
                        <h3 className="text-xl font-bold text-gray-900">Annonces similaires</h3>
                        
                        {/* Desktop Controls */}
                        <div className="hidden md:flex gap-2">
                            <button onClick={prevSim} className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                                <ChevronLeft size={18} />
                            </button>
                            <button onClick={nextSim} className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                   </div>
                   
                   <div 
                     className="overflow-hidden relative group" 
                     onMouseEnter={() => setIsSimPaused(true)} 
                     onMouseLeave={() => setIsSimPaused(false)}
                   >
                        <div 
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentSimIndex * (100 / simItemsToShow)}%)` }}
                        >
                            {similarListings.map(l => (
                                <div key={l.id} style={{ width: `${100 / simItemsToShow}%` }} className="flex-shrink-0 px-2">
                                    <SimilarListingCard 
                                      listing={l} 
                                      onClick={() => onNavigate?.('listing-details', { id: l.id })} 
                                      className="w-full h-full border-gray-200" 
                                    />
                                </div>
                            ))}
                        </div>
                   </div>
                </div>
            )}

          </div>

          {/* RIGHT COLUMN: Sticky Sidebar (4 cols) */}
          <div className="hidden lg:block lg:col-span-4">
             <div className="sticky top-24 space-y-6">
                
                {/* ENHANCED SELLER CARD */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-6 overflow-hidden relative">
                   {/* Decorative top border removed */}

                   {/* Price Section */}
                   <div className="mb-6 pb-6 border-b border-gray-100">
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1 block">Prix demandé</span>
                      <div className="flex items-baseline gap-2">
                         <div className="text-4xl font-extrabold text-primary-600 tracking-tight">{listing.price}</div>
                      </div>
                      
                      {/* Deal Rating Badge (Desktop) */}
                      {listing.dealRating && (
                          <div className="flex items-center gap-2 mt-3 bg-gray-50 px-3 py-1.5 rounded-lg w-fit border border-gray-100">
                             <div className="flex gap-1">
                                {[1, 2, 3].map(level => (
                                   <div key={level} className={`w-4 h-1.5 rounded-full ${listing.dealRating! >= level ? dealInfo.color : 'bg-gray-200'}`}></div>
                                ))}
                             </div>
                             <span className={`text-xs font-bold uppercase tracking-wide ${dealInfo.textColor}`}>{dealInfo.label}</span>
                          </div>
                      )}
                   </div>

                   {/* Seller Info - NO RATINGS */}
                   <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                         <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-xl font-bold border-2 border-white shadow-sm">
                            {listing.seller.charAt(0)}
                         </div>
                         <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 border-2 border-white rounded-full" title="En ligne"></div>
                      </div>
                      <div>
                         <h3 className="font-bold text-gray-900 text-lg leading-tight">{listing.seller}</h3>
                         <div className="flex items-center gap-2 text-sm mt-0.5">
                            <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">{listing.sellerType}</span>
                         </div>
                         <p className="text-xs text-gray-400 mt-1">Membre depuis 2023</p>
                      </div>
                   </div>

                   {/* CTAs */}
                   <div className="space-y-3">
                      {isPhoneRevealed ? (
                          <a 
                            href="tel:+21625123456"
                            className="w-full py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all active:scale-95 animate-fade-in-up"
                          >
                             <Phone size={20} className="fill-current" />
                             <span className="text-lg">25 123 456</span>
                          </a>
                      ) : (
                          <button 
                            onClick={handlePhoneClick}
                            className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 group"
                          >
                             <Phone size={20} className="group-hover:rotate-12 transition-transform" />
                             Afficher le numéro
                          </button>
                      )}
                   </div>

                   {/* Safety Disclaimer */}
                   <div className="mt-6 pt-4 border-t border-gray-100 flex gap-2 items-start opacity-70 hover:opacity-100 transition-opacity">
                      <Shield size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-[10px] text-gray-500 leading-tight">
                         <strong>Conseil sécurité :</strong> Ne versez jamais d'acompte avant d'avoir vu le véhicule.
                      </p>
                   </div>
                </div>

                {/* Advertisement Card */}
                <div className="bg-gray-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-md">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 blur-[50px] opacity-30 rounded-full"></div>
                   <div className="relative z-10">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 block">Publicité</span>
                      <h4 className="font-bold text-lg mb-2">Assurez cette moto en 2 min</h4>
                      <p className="text-sm text-gray-400 mb-4">Comparateur gratuit, jusqu'à -40% sur votre assurance.</p>
                      <button className="w-full py-3 bg-white text-gray-900 font-bold rounded-lg text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                         Faire un devis <ExternalLink size={14} />
                      </button>
                   </div>
                </div>

             </div>
          </div>

        </div>
      </main>

      {/* MOBILE STICKY FOOTER */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-area-bottom z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex gap-3">
         {isPhoneRevealed ? (
             <a 
                href="tel:+21625123456"
                className="flex-1 h-12 bg-gray-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base active:scale-95 transition-transform shadow-lg animate-fade-in-up"
             >
                <Phone size={18} className="fill-current" />
                <span>25 123 456</span>
             </a>
         ) : (
             <button 
                onClick={handlePhoneClick}
                className="flex-1 h-12 bg-primary-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base active:scale-95 transition-transform shadow-lg"
             >
                <Phone size={18} />
                <span>Appeler</span>
             </button>
         )}
         <button className="flex-1 h-12 bg-[#25D366] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base active:scale-95 transition-transform shadow-lg">
            <MessageCircle size={18} />
            <span>WhatsApp</span>
         </button>
      </div>

    </div>
  );
};

export default ListingDetails;
