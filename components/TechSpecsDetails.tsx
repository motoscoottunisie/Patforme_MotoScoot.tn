
import React, { useEffect } from 'react';
import { Home, ChevronRight, Settings, Ruler, Zap, Gauge, ArrowRight } from 'lucide-react';
import Header from './layout/Header';
import { mockTechSpecs } from '../data/mockData';

interface TechSpecsDetailsProps {
  specId: number;
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  onBack?: () => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const SpecItem: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="flex flex-col border-b border-gray-50 py-3 last:border-0 hover:bg-gray-50/50 transition-colors rounded-lg px-2 -mx-2">
      <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</span>
      <span className="text-gray-900 font-bold text-base">{value}</span>
  </div>
);

const TechSpecsDetails: React.FC<TechSpecsDetailsProps> = ({ specId, onGoHome, onNavigate, onBack, isLoggedIn, onTriggerLogin, onLogout }) => {
  
  const spec = mockTechSpecs.find(s => s.id === specId) || mockTechSpecs[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [specId]);

  const handleBack = () => {
      // Smart navigation: go back to the models list for this brand
      if (onNavigate) {
          onNavigate('tech-specs-models', { brand: spec.brand });
      } else if (onBack) {
          onBack();
      }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans pb-12">
      <Header 
        variant="white" 
        onNavigate={onNavigate} 
        onGoHome={onGoHome} 
        isLoggedIn={isLoggedIn}
        onTriggerLogin={onTriggerLogin}
        onLogout={onLogout}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap mb-6 no-scrollbar">
            <button onClick={onGoHome} className="flex items-center hover:text-primary-600 transition-colors">
              <Home className="w-4 h-4 mr-1" />
              <span>Accueil</span>
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300 flex-shrink-0" />
            <button onClick={() => onNavigate?.('tech-specs-brands')} className="hover:text-primary-600 transition-colors">
              Fiches Techniques
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300 flex-shrink-0" />
            <button onClick={() => onNavigate?.('tech-specs-models', { brand: spec.brand })} className="hover:text-primary-600 transition-colors">
              {spec.brand}
            </button>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300 flex-shrink-0" />
            <span className="font-semibold text-gray-900">{spec.model}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold uppercase tracking-wide border border-gray-200">
                            {spec.category}
                        </span>
                        <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-bold border border-primary-100">
                            {spec.year}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        {spec.brand} <span className="text-primary-600">{spec.model}</span>
                    </h1>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                        <div>
                            <span className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Cylindrée</span>
                            <span className="text-xl md:text-2xl font-extrabold text-gray-900">{spec.engine.cc}</span>
                        </div>
                        <div>
                            <span className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Puissance</span>
                            <span className="text-xl md:text-2xl font-extrabold text-gray-900">{spec.engine.power.split(' ')[0]} <span className="text-sm font-bold text-gray-500">ch</span></span>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <span className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Prix neuf</span>
                            <span className="text-xl md:text-2xl font-extrabold text-primary-600">{spec.priceNew}</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <button 
                            onClick={() => onNavigate?.('search', { brand: spec.brand, model: spec.model })} 
                            className="px-8 py-3.5 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 transition-all active:scale-95 flex items-center gap-2 group w-full md:w-auto justify-center"
                        >
                            Trouver en occasion <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
                <div className="bg-gray-50 relative h-64 lg:h-auto min-h-[300px] order-1 lg:order-2">
                    <img src={spec.image} alt={spec.model} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden"></div>
                </div>
            </div>
        </div>

        {/* Unified Specs Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left: Main Specs */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    
                    {/* Section 1: Engine */}
                    <div className="p-6 md:p-8">
                        <h3 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                                <Zap size={20} />
                            </div>
                            Moteur & Transmission
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                            {Object.entries(spec.engine).map(([key, value]) => (
                                <SpecItem 
                                    key={key} 
                                    label={key.replace(/([A-Z])/g, ' $1').trim().replace('fuel System', 'Alimentation').replace('cooling', 'Refroidissement').replace('transmission', 'Boîte de vitesses').replace('power', 'Puissance').replace('torque', 'Couple').replace('type', 'Type Moteur').replace('cc', 'Cylindrée')} 
                                    value={value} 
                                />
                            ))}
                        </div>
                    </div>

                    <hr className="border-gray-100 mx-8" />

                    {/* Section 2: Performance */}
                    <div className="p-6 md:p-8">
                        <h3 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Gauge size={20} />
                            </div>
                            Performances & Conso
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                            <SpecItem label="Vitesse Max" value={spec.topSpeed || "N/C"} />
                            <SpecItem label="Consommation" value={spec.consumption || "N/C"} />
                        </div>
                    </div>

                    <hr className="border-gray-100 mx-8" />

                    {/* Section 3: Chassis */}
                    <div className="p-6 md:p-8">
                        <h3 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                                <Settings size={20} />
                            </div>
                            Partie Cycle
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                            {Object.entries(spec.chassis).map(([key, value]) => (
                                <SpecItem 
                                    key={key} 
                                    label={key.replace(/([A-Z])/g, ' $1').trim().replace('frame', 'Cadre').replace('suspension Front', 'Suspension Avant').replace('suspension Rear', 'Suspension Arrière').replace('brakes Front', 'Frein Avant').replace('brakes Rear', 'Frein Arrière').replace('tire Front', 'Pneu Avant').replace('tire Rear', 'Pneu Arrière')} 
                                    value={value} 
                                />
                            ))}
                        </div>
                    </div>

                    <hr className="border-gray-100 mx-8" />

                    {/* Section 4: Dimensions */}
                    <div className="p-6 md:p-8">
                        <h3 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                                <Ruler size={20} />
                            </div>
                            Dimensions & Poids
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                            {Object.entries(spec.dimensions).map(([key, value]) => (
                                <SpecItem 
                                    key={key} 
                                    label={key.replace(/([A-Z])/g, ' $1').trim().replace('weight', 'Poids').replace('seat Height', 'Hauteur de selle').replace('tank', 'Réservoir').replace('length', 'Longueur').replace('wheelbase', 'Empattement')} 
                                    value={value} 
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Right: Gallery / Sidebar */}
            <div className="lg:col-span-1 space-y-6">
                
                {/* Gallery Widget */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sticky top-24">
                    <h3 className="font-bold text-gray-900 mb-4 text-lg">Galerie Photos</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {spec.gallery?.map((img, idx) => (
                            <div key={idx} className={`rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border border-gray-100 ${idx === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
                                <img src={img} alt={`${spec.model} view ${idx}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    {(!spec.gallery || spec.gallery.length === 0) && (
                        <p className="text-gray-400 text-sm italic text-center py-4">Aucune photo supplémentaire disponible.</p>
                    )}
                </div>

                {/* Alert Widget */}
                <div className="bg-gradient-to-br from-primary-50 to-white rounded-3xl border border-primary-100 p-6 shadow-sm">
                    <h3 className="font-bold text-primary-900 mb-2 text-lg">Envie de ce modèle ?</h3>
                    <p className="text-sm text-primary-700/80 mb-6 leading-relaxed">
                        Créez une alerte pour être notifié instantanément dès qu'une annonce correspondante est publiée sur MotoScoot.tn.
                    </p>
                    <button className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                        Créer une alerte
                    </button>
                </div>
            </div>

        </div>

      </main>
    </div>
  );
};

export default TechSpecsDetails;
