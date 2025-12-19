import React, { useEffect } from 'react';
import { 
  Home, 
  ChevronLeft, 
  Zap, 
  Gauge, 
  ArrowRight, 
  Ruler, 
  Settings, 
  Share2, 
  Info,
  Fuel,
  Activity,
  ShieldCheck,
  Bike
} from 'lucide-react';
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

const SpecRow: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0 group">
    <span className="text-gray-500 text-sm font-medium transition-colors group-hover:text-gray-900">{label}</span>
    <span className="text-gray-900 font-bold text-sm text-right">{value}</span>
  </div>
);

const TechSpecsDetails: React.FC<TechSpecsDetailsProps> = ({ specId, onGoHome, onNavigate, onBack, isLoggedIn, onTriggerLogin, onLogout }) => {
  
  const spec = mockTechSpecs.find(s => s.id === specId) || mockTechSpecs[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [specId]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      <Header 
        variant="white" 
        onNavigate={onNavigate} 
        onGoHome={onGoHome} 
        isLoggedIn={isLoggedIn}
        onTriggerLogin={onTriggerLogin}
        onLogout={onLogout}
      />

      <main className="max-w-5xl mx-auto px-6 py-8">
        
        {/* Navigation & Header Meta */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <button 
              onClick={() => onNavigate?.('tech-specs-models', { brand: spec.brand })}
              className="flex items-center gap-2 text-primary-600 font-bold text-sm hover:text-primary-700 transition-colors group"
            >
                <div className="p-1.5 bg-primary-50 rounded-lg group-hover:bg-primary-100 transition-colors">
                  <ChevronLeft size={18} />
                </div>
                Retour aux modèles {spec.brand}
            </button>
            <div className="flex items-center gap-3">
                <button className="p-2.5 bg-white border border-gray-200 text-gray-500 hover:text-primary-600 rounded-xl transition-all active:scale-95" title="Partager">
                    <Share2 size={18} />
                </button>
                <div className="h-8 w-px bg-gray-200 mx-1"></div>
                <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-xl text-[11px] font-black uppercase tracking-wider">{spec.category}</span>
                <span className="px-3 py-1.5 bg-primary-600 text-white rounded-xl text-[11px] font-black uppercase tracking-wider">{spec.year}</span>
            </div>
        </div>

        {/* Title Area */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-none mb-4">
              {spec.brand} <span className="text-primary-600">{spec.model}</span>
          </h1>
          <p className="text-gray-500 text-lg font-medium max-w-2xl">
            Découvrez la fiche technique complète, les performances et les caractéristiques détaillées de la {spec.brand} {spec.model} version {spec.year}.
          </p>
        </div>

        {/* Hero Gallery Container */}
        <div className="bg-white rounded-[2rem] p-4 md:p-6 border border-gray-200 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 blur-[100px] rounded-full opacity-50 -z-10"></div>
            <div className="aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                <img 
                  src={spec.image} 
                  alt={spec.model} 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
                />
            </div>
        </div>

        {/* Key Features Grid - Removed shadows, kept borders */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white p-6 rounded-3xl border border-gray-200 flex flex-col items-center text-center group hover:border-primary-200 transition-all">
                <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                    <Zap size={24} />
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Cylindrée</span>
                <span className="text-xl font-extrabold text-gray-900">{spec.engine.cc}</span>
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-gray-200 flex flex-col items-center text-center group hover:border-blue-200 transition-all">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                    <Activity size={24} />
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Puissance</span>
                <span className="text-xl font-extrabold text-gray-900">{spec.engine.power.split(' ')[0]} ch</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 flex flex-col items-center text-center group hover:border-gray-300 transition-all">
                <div className="w-12 h-12 bg-gray-50 text-gray-600 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                    <Ruler size={24} />
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Poids (Plein)</span>
                <span className="text-xl font-extrabold text-gray-900">{spec.dimensions.weight.split(' ')[0]} kg</span>
            </div>

            <div className="bg-primary-600 p-6 rounded-3xl flex flex-col items-center text-center group hover:bg-primary-700 transition-all border border-primary-700">
                <div className="w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
                    <Info size={24} />
                </div>
                <span className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Prix Neuf</span>
                <span className="text-xl font-extrabold text-white">{spec.priceNew.split(' ')[0]} DT</span>
            </div>
        </div>

        {/* Detailed Specs Section - Removed shadows */}
        <div className="space-y-10">
            
            {/* Engine */}
            <section className="bg-white rounded-[2rem] border border-gray-200 overflow-hidden animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className="px-8 py-6 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
                    <div className="w-2 h-6 bg-primary-600 rounded-full"></div>
                    <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                        <Settings size={20} className="text-primary-600" />
                        Moteur & Performance
                    </h3>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                    <div className="space-y-0">
                      <SpecRow label="Type de moteur" value={spec.engine.type} />
                      <SpecRow label="Cylindrée" value={spec.engine.cc} />
                      <SpecRow label="Puissance Max" value={spec.engine.power} />
                      <SpecRow label="Couple Max" value={spec.engine.torque} />
                    </div>
                    <div className="space-y-0">
                      <SpecRow label="Alimentation" value={spec.engine.fuelSystem} />
                      <SpecRow label="Refroidissement" value={spec.engine.cooling} />
                      <SpecRow label="Transmission" value={spec.engine.transmission} />
                      <SpecRow label="Consommation" value={spec.consumption || "4.2 L/100km"} />
                    </div>
                </div>
            </section>

            {/* Chassis */}
            <section className="bg-white rounded-[2rem] border border-gray-200 overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="px-8 py-6 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
                    <div className="w-2 h-6 bg-gray-900 rounded-full"></div>
                    <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                        <ShieldCheck size={20} className="text-gray-900" />
                        Partie Cycle & Freinage
                    </h3>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                    <div className="space-y-0">
                      <SpecRow label="Cadre" value={spec.chassis.frame} />
                      <SpecRow label="Suspension AV" value={spec.chassis.suspensionFront} />
                      <SpecRow label="Suspension AR" value={spec.chassis.suspensionRear} />
                    </div>
                    <div className="space-y-0">
                      <SpecRow label="Freins AV" value={spec.chassis.brakesFront} />
                      <SpecRow label="Freins AR" value={spec.chassis.brakesRear} />
                      <SpecRow label="Pneus (AV/AR)" value={`${spec.chassis.tireFront.split(' ')[0]} / ${spec.chassis.tireRear.split(' ')[0]}`} />
                    </div>
                </div>
            </section>

            {/* Dimensions */}
            <section className="bg-white rounded-[2rem] border border-gray-200 overflow-hidden animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <div className="px-8 py-6 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
                    <div className="w-2 h-6 bg-gray-400 rounded-full"></div>
                    <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                        <Gauge size={20} className="text-gray-400" />
                        Dimensions & Capacités
                    </h3>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                    <div className="space-y-0">
                      <SpecRow label="Poids à vide" value={spec.dimensions.weight} />
                      <SpecRow label="Hauteur de selle" value={spec.dimensions.seatHeight} />
                      <SpecRow label="Réservoir" value={spec.dimensions.tank} />
                    </div>
                    <div className="space-y-0">
                      <SpecRow label="Longueur" value={spec.dimensions.length} />
                      <SpecRow label="Empattement" value={spec.dimensions.wheelbase} />
                      <SpecRow label="Vitesse de pointe" value={spec.topSpeed || "N/C"} />
                    </div>
                </div>
            </section>

        </div>

        {/* Final CTA Area - Removed shadow-2xl */}
        <div className="mt-20 bg-neutral-900 rounded-[2.5rem] p-10 md:p-16 text-center text-white relative overflow-hidden border border-neutral-800">
            {/* Background Ornaments */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary-600/30 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-8 border border-white/10 backdrop-blur-sm">
                  <Bike size={32} className="text-primary-500" />
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Prêt à passer à l'action ?</h2>
              <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto font-medium">
                  Ne vous contentez pas de lire la fiche technique. Trouvez dès maintenant les meilleures offres d'occasion pour la <span className="text-white font-bold">{spec.brand} {spec.model}</span> en Tunisie.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                      onClick={() => onNavigate?.('search', { brand: spec.brand, model: spec.model })}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-500 transition-all active:scale-95 text-lg"
                  >
                      Voir les annonces
                      <ArrowRight size={22} />
                  </button>
                  <button 
                      onClick={onBack}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-all active:scale-95 border border-white/10 text-lg"
                  >
                      Autres modèles
                  </button>
              </div>
            </div>
        </div>

      </main>
    </div>
  );
};

export default TechSpecsDetails;