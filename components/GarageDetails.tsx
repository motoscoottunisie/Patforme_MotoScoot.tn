
import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Phone, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Globe,
  Share2,
  Navigation,
  Mail,
  Wrench,
  Camera,
  ChevronRight,
  MessageSquare,
  Car,
  ThumbsUp,
  User,
  MoreVertical,
  Plus
} from 'lucide-react';
import Header from './layout/Header';
import { mockGarages } from '../data/mockData';
import { Garage } from '../types';

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
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'reviews'>('about');
  const [showPhone, setShowPhone] = useState(false);

  // Find garage or fallback
  const garage = mockGarages.find(g => g.id === garageId) || mockGarages[0];
  // Use specific garage reviews if available, otherwise empty array
  const reviews = garage.reviewsList || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [garageId]);

  // Mock Images for Gallery if not present in data
  const galleryImages = garage.images || [
    garage.image,
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&w=800&q=80"
  ];

  // Mock Services if not present
  const services = garage.services || [
      { name: "Vidange & Filtres", price: "À partir de 45 DT", icon: Wrench },
      { name: "Changement Pneumatiques", price: "15 DT / roue", icon: Car },
      { name: "Diagnostic Électronique", price: "60 DT", icon: Wrench },
      { name: "Kit Chaîne", price: "Sur devis", icon: Wrench },
  ];

  // Helper to determine if open (Mock logic)
  const isOpen = true; 

  const renderReviews = () => {
    return (
      <div className="space-y-8 animate-fade-in-up">
        {/* Rating Summary Board */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
             
             {/* Big Score */}
             <div className="flex flex-col items-center justify-center text-center">
                <span className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-2">{garage.rating}</span>
                <div className="flex gap-1 mb-2">
                   {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className={i < Math.floor(garage.rating) ? "text-warning-400 fill-warning-400" : "text-gray-200 fill-gray-200"} />
                   ))}
                </div>
                <p className="text-gray-500 text-sm font-medium">{garage.reviewsCount || 0} avis</p>
             </div>

             {/* Progress Bars */}
             <div className="flex-1 w-full space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                   // Mock calculation for demo purposes
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

             {/* CTA */}
             <div className="flex flex-col items-center justify-center w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 md:pl-8">
                <p className="text-gray-900 font-bold mb-3 text-center">Vous connaissez ce garage ?</p>
                <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:border-primary-600 hover:text-primary-600 transition-colors shadow-sm active:scale-95 w-full whitespace-nowrap">
                   Donner mon avis
                </button>
             </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
           {reviews.length > 0 ? reviews.map((review) => (
             <div key={review.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                         {review.avatar ? (
                            <img src={review.avatar} alt={review.author} className="w-full h-full rounded-full object-cover" />
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

                <p className="text-gray-700 leading-relaxed text-sm mb-4">
                   {review.content}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                   <button className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary-600 transition-colors">
                      <ThumbsUp size={14} />
                      Utile ({review.helpfulCount})
                   </button>
                </div>
             </div>
           )) : (
             <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                   <MessageSquare className="text-gray-300" size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Aucun avis pour le moment</h3>
                <p className="text-gray-500 mb-6">Soyez le premier à partager votre expérience avec ce garage.</p>
                <button className="px-6 py-2.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-md">
                   Rédiger un avis
                </button>
             </div>
           )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-24 lg:pb-12">
      
      <Header 
        variant="white" 
        onNavigate={onNavigate} 
        onGoHome={onGoHome} 
        isLoggedIn={isLoggedIn}
        onTriggerLogin={onTriggerLogin}
        onLogout={onLogout}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
           <button onClick={onBack} className="hover:text-primary-600 flex items-center gap-1 font-medium transition-colors">
              <ArrowLeft size={16} />
              Retour aux garages
           </button>
           <span className="text-gray-300">/</span>
           <span className="text-gray-900 font-semibold">{garage.name}</span>
        </div>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Left: Content */}
            <div className="lg:col-span-2">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                             <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                                {garage.name}
                             </h1>
                             {garage.isVerified && (
                                <span className="hidden md:flex items-center gap-1 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold uppercase border border-primary-100">
                                   <ShieldCheck size={14} /> Vérifié
                                </span>
                             )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <div className="flex text-warning-400">
                                   {[...Array(5)].map((_, i) => (
                                      <Star key={i} size={16} className={i < Math.floor(garage.rating) ? "fill-current" : "text-gray-200 fill-current"} />
                                   ))}
                                </div>
                                <span className="font-bold text-gray-900 ml-1">{garage.rating}</span>
                                <span className="text-gray-400">({garage.reviewsCount} avis)</span>
                            </div>
                            <span className="hidden md:inline text-gray-300">•</span>
                            <div className="flex items-center gap-1">
                                <MapPin size={16} />
                                <span className="truncate max-w-[200px]">{garage.address || garage.location}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Share Button (Desktop) */}
                    <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        <Share2 size={18} />
                    </button>
                </div>

                {/* Gallery Grid (Bento Style) */}
                <div className="grid grid-cols-4 grid-rows-2 gap-2 h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
                    <div className="col-span-2 row-span-2 relative group cursor-pointer">
                        <img src={galleryImages[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div className="col-span-1 row-span-1 relative group cursor-pointer">
                        <img src={galleryImages[1]} alt="Interior 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="col-span-1 row-span-1 relative group cursor-pointer">
                        <img src={galleryImages[2]} alt="Interior 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="col-span-2 row-span-1 relative group cursor-pointer">
                        <img src={galleryImages[3] || galleryImages[0]} alt="Interior 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white font-bold flex items-center gap-2 text-sm backdrop-blur-md px-3 py-1.5 rounded-full bg-white/20">
                                <Camera size={16} /> Voir toutes les photos
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tabs / Navigation */}
                <div className="flex border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar">
                    <button 
                        onClick={() => setActiveTab('about')}
                        className={`px-6 py-3 font-bold text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'about' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
                    >
                        À propos & Services
                    </button>
                    <button 
                        onClick={() => setActiveTab('reviews')}
                        className={`px-6 py-3 font-bold text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
                    >
                        Avis clients ({garage.reviewsCount})
                    </button>
                </div>

                {/* Content Area */}
                {activeTab === 'reviews' ? renderReviews() : (
                  <div className="space-y-10 animate-fade-in-up">
                      
                      {/* About Section */}
                      <section>
                          <h2 className="text-xl font-bold text-gray-900 mb-4">À propos de l'atelier</h2>
                          <p className="text-gray-600 leading-relaxed mb-6">
                              {garage.description || "Bienvenue dans notre atelier. Nous sommes spécialisés dans l'entretien et la réparation de tous types de deux-roues. Notre équipe de passionnés est à votre service pour garantir votre sécurité et les performances de votre machine."}
                          </p>
                          
                          {/* Specialties Tags */}
                          <div className="flex flex-wrap gap-2">
                             {garage.specialties?.map(tag => (
                                 <span key={tag} className="px-3 py-1.5 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-100">
                                     {tag}
                                 </span>
                             ))}
                          </div>
                      </section>

                      {/* Services Section */}
                      <section className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                          <div className="flex items-center justify-between mb-6">
                             <h2 className="text-xl font-bold text-gray-900">Prestations & Tarifs</h2>
                             <span className="text-xs text-gray-500">*Tarifs indicatifs</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {services.map((service, idx) => (
                                  <div key={idx} className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                      <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
                                              <Wrench size={18} />
                                          </div>
                                          <span className="font-bold text-gray-800 text-sm">{service.name}</span>
                                      </div>
                                      <span className="font-bold text-gray-900 text-sm">{service.price}</span>
                                  </div>
                              ))}
                          </div>
                          <div className="mt-6 text-center">
                              <button className="text-primary-600 font-bold text-sm hover:underline">
                                  Voir toutes les prestations
                              </button>
                          </div>
                      </section>
                  </div>
                )}

            </div>

            {/* Right: Sticky Sidebar */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                    
                    {/* Contact Card */}
                    <div className="bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
                        {/* Map Placeholder */}
                        <div className="relative h-40 bg-gray-200">
                            <img 
                              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80" 
                              alt="Map" 
                              className="w-full h-full object-cover opacity-60"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="bg-white text-gray-900 font-bold px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
                                    <Navigation size={14} /> Itinéraire
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Status */}
                            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-50">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-success-500' : 'bg-red-500'}`}></div>
                                    <span className={`text-sm font-bold ${isOpen ? 'text-success-600' : 'text-red-600'}`}>
                                        {isOpen ? 'Ouvert actuellement' : 'Fermé'}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-400">Ferme à 19:00</span>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <MapPin className="text-gray-400 mt-1 shrink-0" size={18} />
                                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                                        {garage.address || garage.location}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="text-gray-400 shrink-0" size={18} />
                                    <p className="text-sm text-gray-600 font-medium">
                                        {garage.hours || "09:00 - 18:00"}
                                    </p>
                                </div>
                                {garage.website && (
                                    <div className="flex items-center gap-3">
                                        <Globe className="text-gray-400 shrink-0" size={18} />
                                        <a 
                                          href={garage.website} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-sm text-primary-600 font-bold hover:underline"
                                        >
                                            Visiter le site web
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* CTAs */}
                            <div className="space-y-3">
                                <button 
                                  onClick={() => setShowPhone(!showPhone)}
                                  className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <Phone size={18} />
                                    {showPhone ? (garage.phone || "+216 71 000 000") : "Afficher le numéro"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Owner Badge */}
                    <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 border border-gray-100">
                        <CheckCircle2 className="text-success-600" size={20} />
                        <div>
                            <p className="text-xs font-bold text-gray-900 uppercase">Propriétaire vérifié</p>
                            <p className="text-xs text-gray-500">Les informations de ce garage sont à jour.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </main>
      
      {/* MOBILE FIXED BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-area-bottom z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex gap-3">
         <button className="flex-1 h-12 bg-primary-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base active:scale-95 transition-transform shadow-lg">
            <Phone size={18} />
            <span>Appeler</span>
         </button>
         <button className="flex-1 h-12 bg-gray-100 text-gray-900 font-bold rounded-xl flex items-center justify-center gap-2 text-base active:scale-95 transition-transform">
            <Navigation size={18} />
            <span>Y aller</span>
         </button>
      </div>

    </div>
  );
};

export default GarageDetails;
