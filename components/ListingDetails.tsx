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
  Camera,
  FileText,
  Shield,
  User,
  ArrowRight
} from 'lucide-react';
import { Listing } from '../types';
import Header from './layout/Header';
import { mockListings } from '../data/mockData';
import { useFavorites } from '../context/FavoritesContext';
import AdBanner from './common/AdBanner';

interface ListingDetailsProps {
  listingId: number;
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  onBack?: () => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const SimilarListingCard: React.FC<{ listing: Listing, onClick: () => void, className?: string }> = ({ listing, onClick, className = "" }) => (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-none hover:border-primary-100 transition-all duration-300 cursor-pointer group flex-shrink-0 ${className}`}
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
  const { isFavorite, toggleFavorite } = useFavorites();

  const listing = mockListings.find(l => l.id === listingId) || mockListings[0];
  const similarListings = mockListings.filter(l => l.id !== listing.id && l.type === listing.type);
  const favorited = isFavorite('listing', listing.id);
  const isAccessory = listing.type === 'Accessoires';

  const allImages = [
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
  }, [listingId]);

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

      <main className="max-w-7xl mx-auto px-0 md:px-8 pt-28 md:pt-28">
        
        {/* Breadcrumb (Desktop) */}
        <nav className="hidden md:flex items-center gap-2 mb-8 text-xs font-black uppercase tracking-widest text-gray-400">
           <button onClick={onBack} className="hover:text-primary-600 flex items-center gap-1 transition-colors">
              <ChevronLeft size={14} /> Retour
           </button>
           <span className="text-gray-200">/</span>
           <span>{listing.title}</span>
        </nav>

        {/* MOBILE: TITRE */}
        <div className="md:hidden px-5 mb-6 animate-fade-in-up">
           <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-widest rounded-md border border-primary-100">{listing.type}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Réf: #00{listing.id}</span>
           </div>
           <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
              {listing.title}
           </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: CONTENT */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            
            {/* Gallery Section */}
            <div className="relative group px-4 md:px-0">
                <div className="md:hidden relative h-[45vh] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-none">
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
                   <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button onClick={() => toggleFavorite('listing', listing.id)} className={`p-3 rounded-full backdrop-blur-md transition-all active:scale-90 ${favorited ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-500'}`}>
                         <Heart size={20} fill={favorited ? "currentColor" : "none"} />
                      </button>
                      <button className="p-3 bg-white/80 backdrop-blur-md rounded-full text-gray-500">
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
                   <div className="aspect-[16/9] relative">
                      <img src={allImages[activeImageIndex]} className="w-full h-full object-cover" alt="" />
                      <div className="absolute bottom-6 right-6 flex gap-2">
                        <button onClick={() => setActiveImageIndex(prev => (prev - 1 + allImages.length) % allImages.length)} className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-colors"><ChevronLeft size={20}/></button>
                        <button onClick={() => setActiveImageIndex(prev => (prev + 1) % allImages.length)} className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-colors"><ChevronRight size={20}/></button>
                      </div>
                   </div>
                   <div className="p-4 flex gap-3 overflow-x-auto no-scrollbar bg-gray-50/50">
                      {allImages.map((img, i) => (
                        <button key={i} onClick={() => setActiveImageIndex(i)} className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${i === activeImageIndex ? 'border-primary-600' : 'border-transparent opacity-60'}`}><img src={img} className="w-full h-full object-cover" /></button>
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

                  {/* Le prix et le badge sur la même ligne en mobile */}
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
                      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col gap-1">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Année</span>
                         <span className="text-xl font-black text-gray-900">{listing.year}</span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col gap-1">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kilométrage</span>
                         <span className="text-xl font-black text-gray-900">{listing.mileage}</span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col gap-1">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cylindrée</span>
                         <span className="text-xl font-black text-gray-900">{listing.cc}</span>
                      </div>
                      <div className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col gap-1">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">État</span>
                         <span className="text-xl font-black text-gray-900">{listing.condition}</span>
                      </div>
                    </>
                  ) : (
                    <div className="col-span-full bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between">
                       <span className="text-sm font-black text-gray-400 uppercase tracking-widest">État général</span>
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
                      {isAccessory 
                      ? `Je vends cet article : ${listing.title}.\nÉtat : ${listing.condition}.\nPour plus d'informations ou des photos supplémentaires, n'hésitez pas à me contacter.`
                      : `Bonjour, je vends ma ${listing.title} en excellent état.\nEntretien à jour, carnet d'entretien disponible. La révision a été faite récemment.\nVisible sur ${listing.location}. Prix légèrement négociable.`
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

            {/* Similar Items */}
            <div className="px-5 md:px-0 py-8">
               <h3 className="text-xl font-black text-gray-900 mb-6 tracking-tight">Annonces similaires</h3>
               <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                  {similarListings.map(l => (
                    <SimilarListingCard key={l.id} listing={l} onClick={() => onNavigate?.('listing-details', { id: l.id })} className="w-64" />
                  ))}
               </div>
            </div>
          </div>

          {/* RIGHT: SIDEBAR (Desktop & Tablet) - Affiné et harmonisé */}
          <div className="hidden lg:block lg:col-span-4">
             <div className="sticky top-32 space-y-6">
                
                {/* CARTE VENDEUR COMPACTE */}
                <div className="bg-white rounded-[2rem] p-7 border border-gray-100 shadow-sm space-y-6 animate-fade-in-up">
                   
                   {/* Prix Header - Réduit */}
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

                   {/* Section Vendeur - Redimensionnée */}
                   <div className="flex items-center gap-4">
                      <div className="relative">
                         <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-black text-2xl border border-gray-50 shadow-inner">
                           {listing.seller.charAt(0)}
                         </div>
                         {/* Statut En Ligne - Plus petit */}
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

                   {/* Boutons d'action - Tailles réduites */}
                   <div className="space-y-3 pt-1">
                      {isPhoneRevealed ? (
                        <a href={`tel:${listing.id}`} className="w-full h-14 bg-gray-900 text-white rounded-xl font-black text-base flex items-center justify-center gap-3 animate-fade-in-up active:scale-95 transition-all shadow-md">
                           <Phone size={20} fill="currentColor" /> 25 123 456
                        </a>
                      ) : (
                        <button onClick={() => setIsPhoneRevealed(true)} className="w-full h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-black text-base flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-primary-600/10">
                           <Phone size={20} /> Afficher le numéro
                        </button>
                      )}
                      
                      <div className="grid grid-cols-2 gap-3">
                         <button className="h-12 bg-white border border-gray-100 rounded-xl font-black text-gray-700 text-xs hover:bg-gray-50 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm">
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

                   {/* Footer Sécurité - Très discret */}
                   <div className="pt-4 border-t border-gray-100 flex gap-3 items-start">
                      <Shield size={16} className="text-gray-300 shrink-0 mt-0.5" />
                      <p className="text-[10px] font-bold text-gray-400 leading-normal">
                        <strong className="text-gray-500 font-black">Conseil sécurité :</strong> Ne versez jamais d'acompte avant d'avoir vu le véhicule.
                      </p>
                   </div>
                </div>
                
                <AdBanner zone="listing_sidebar" variant="native" className="border border-gray-100 shadow-none" />
             </div>
          </div>
        </div>
      </main>

      {/* MOBILE STICKY FOOTER */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 p-4 safe-area-bottom z-40 flex items-center gap-3">
         <button 
            onClick={() => toggleFavorite('listing', listing.id)}
            className={`w-1/2 h-14 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 border font-black uppercase text-[10px] tracking-widest ${favorited ? 'bg-red-50 border-red-100 text-red-500' : 'bg-gray-50 border-gray-100 text-gray-400'}`}
         >
            <Heart size={18} fill={favorited ? "currentColor" : "none"} />
            <span>{favorited ? 'Enregistré' : 'Favoris'}</span>
         </button>
         
         <div className="w-1/2">
            {isPhoneRevealed ? (
                <a 
                    href={`tel:${listing.id}`}
                    className="w-full h-14 bg-gray-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 active:scale-95 transition-all animate-fade-in-up"
                >
                    <Phone size={18} fill="currentColor" />
                    <span className="text-base tabular-nums tracking-tighter">25 123 456</span>
                </a>
            ) : (
                <button 
                    onClick={() => setIsPhoneRevealed(true)}
                    className="w-full h-14 bg-primary-600 text-white rounded-2xl font-black flex items-center justify-center gap-3 active:scale-95 transition-all shadow-none"
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