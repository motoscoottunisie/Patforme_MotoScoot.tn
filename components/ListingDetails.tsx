
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
  ExternalLink
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

const Accordion = ({ title, children, defaultOpen = false, icon: Icon }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left focus:outline-none group"
      >
        <div className="flex items-center gap-3">
           {Icon && <Icon size={20} className="text-primary-600" />}
           <span className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">{title}</span>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
      >
        {children}
      </div>
    </div>
  );
};

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
          <div className="lg:col-span-8 space-y-4 md:space-y-8">
            
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
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                     {listing.title}
                  </h1>
                  <span className="md:hidden text-2xl font-extrabold text-primary-600">
                     {listing.price}
                  </span>
               </div>

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

               {/* Deal Gauge */}
               {listing.dealRating && (
                  <div className="flex items-center gap-3 mb-6 bg-white border border-gray-100 p-3 rounded-xl shadow-sm md:inline-flex md:pr-6">
                     <div className="flex items-center gap-1 w-24">
                        {[1, 2, 3].map(level => (
                           <div 
                              key={level} 
                              className={`h-2 flex-1 rounded-full ${listing.dealRating! >= level ? dealInfo.color : 'bg-gray-200'}`}
                           ></div>
                        ))}
                     </div>
                     <span className={`text-sm font-bold ${dealInfo.textColor}`}>
                        {dealInfo.label}
                     </span>
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

            {/* --- ACCORDIONS CONTENT --- */}
            <div className="px-4 md:px-0 space-y-6">
                
                {/* Description - Renamed for Accessories */}
                <div className="bg-white md:rounded-2xl md:p-8 md:shadow-sm md:border border-gray-100">
                   <Accordion title={isAccessory ? "Description" : "Description du véhicule"} defaultOpen={true} icon={FileText}>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
                         {isAccessory 
                            ? `Je vends cet article : ${listing.title}.\n\nÉtat : ${listing.condition}.\n\nPour plus d'informations ou des photos supplémentaires, n'hésitez pas à me contacter.`
                            : `Bonjour, je vends ma ${listing.title} en excellent état.\n\nEntretien à jour, carnet d'entretien disponible. La révision a été faite récemment.\n\nVisible sur ${listing.location}. Prix légèrement négociable.`
                         }
                      </p>
                   </Accordion>
                </div>

                {/* Equipments - Vehicles Only */}
                {!isAccessory && (
                    <div className="bg-white md:rounded-2xl md:p-8 md:shadow-sm md:border border-gray-100">
                       <Accordion title="Équipements & Options" defaultOpen={true} icon={CheckCircle2}>
                          <div className="flex flex-wrap gap-2 pt-2">
                             {features.length > 0 ? features.map((feature, idx) => (
                                <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                                   {feature}
                                </span>
                             )) : (
                                <span className="text-gray-500 text-sm italic">Aucun équipement spécifié</span>
                             )}
                          </div>
                       </Accordion>
                    </div>
                )}

                {/* History - Vehicles Only */}
                {!isAccessory && (
                    <div className="bg-white md:rounded-2xl md:p-8 md:shadow-sm md:border border-gray-100">
                       <Accordion title="Historique & Administratif" defaultOpen={false} icon={Flag}>
                          <div className="space-y-4 pt-2">
                             <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-gray-600">Origine</span>
                                <span className="font-bold text-gray-900">Importée (France)</span>
                             </div>
                             <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-gray-600">Première main</span>
                                <span className="font-bold text-gray-900">Non (2ème main)</span>
                             </div>
                             <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-gray-600">Carte grise</span>
                                <span className="font-bold text-success-600 flex items-center gap-1"><CheckCircle2 size={14} /> À mon nom</span>
                             </div>
                             <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-gray-600">Certificat de non-gage</span>
                                <span className="font-bold text-success-600 flex items-center gap-1"><CheckCircle2 size={14} /> Disponible</span>
                             </div>
                          </div>
                       </Accordion>
                    </div>
                )}

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
                
                {/* Seller Card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                   <div className="mb-6">
                      <span className="text-gray-500 text-sm font-medium">Prix</span>
                      <div className="text-4xl font-extrabold text-primary-600">{listing.price}</div>
                   </div>

                   <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-xl font-bold">
                         {listing.seller.charAt(0)}
                      </div>
                      <div>
                         <h3 className="font-bold text-lg text-gray-900">{listing.seller}</h3>
                         <div className="flex items-center gap-2 text-sm">
                            <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded text-xs font-bold uppercase">{listing.sellerType}</span>
                            <span className="text-gray-400">•</span>
                            <div className="flex text-warning-400">
                               {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                            </div>
                         </div>
                         <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <MapPin size={12} /> {listing.location}
                         </div>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <a 
                        href="tel:+21625123456"
                        className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
                      >
                         <Phone size={18} />
                         Appeler le vendeur
                      </a>
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
         <a 
            href="tel:+21625123456"
            className="flex-1 h-12 bg-primary-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base active:scale-95 transition-transform shadow-lg"
         >
            <Phone size={18} />
            <span>Appeler</span>
         </a>
         <button className="flex-1 h-12 bg-[#25D366] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base active:scale-95 transition-transform shadow-lg">
            <MessageCircle size={18} />
            <span>WhatsApp</span>
         </button>
      </div>

    </div>
  );
};

export default ListingDetails;
