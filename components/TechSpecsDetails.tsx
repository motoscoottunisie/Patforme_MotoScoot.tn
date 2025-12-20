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
  
  // Find spec or fallback to first one
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

      <main className="max-w-5xl mx-auto px-6 pt-20 md:pt-28 pb-8">
        
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
                <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-primary-600 hover:border-primary-200 transition-all shadow-sm">
                    <Share2 size={18} />
                </button>
                <button 
                    onClick={() => onNavigate?.('search', { brand: spec.brand, model: spec.model })}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 transition-all shadow-md active:scale-95"
                >
                    <Bike size={18} />
                    Chercher en occasion
                </button>
            </div>
        </div>

        {/* Hero Section Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-auto bg-gray-100 overflow-hidden relative">
                    <img 
                      src={spec.image} 
                      alt={`${spec.brand} ${spec.model}`} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-6 left-6">
                        <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-black text-gray-900 shadow-sm border border-white/50">
                            {spec.year}
                        </span>
                    </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <span className="text-primary-600 font-black text-xs uppercase tracking-widest mb-2 block">{spec.brand}</span>
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-4">
                            {spec.model}
                        </h1>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg border border-gray-200">{spec.category}</span>
                            <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-lg border border-primary-100">Prix Neuf : {spec.priceNew}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-gray-50">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Zap size={16} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Puissance</span>
                            </div>
                            <p className="font-bold text-gray-900 text-sm">{spec.engine.power.split(' ')[0]} ch</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Activity size={16} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Cylindrée</span>
                            </div>
                            <p className="font-bold text-gray-900 text-sm">{spec.engine.cc}</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Gauge size={16} />
                                <span className="text-[10px] font-black uppercase tracking-widest">V-Max</span>
                            </div>
                            <p className="font-bold text-gray-900 text-sm">{spec.topSpeed || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Detailed Specs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Engine Section */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100">
                        <Zap size={20} />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Moteur</h3>
                </div>
                <div className="space-y-0">
                    <SpecRow label="Type" value={spec.engine.type} />
                    <SpecRow label="Cylindrée" value={spec.engine.cc} />
                    <SpecRow label="Puissance" value={spec.engine.power} />
                    <SpecRow label="Couple" value={spec.engine.torque} />
                    <SpecRow label="Refroidissement" value={spec.engine.cooling} />
                    <SpecRow label="Alimentation" value={spec.engine.fuelSystem} />
                    <SpecRow label="Transmission" value={spec.engine.transmission} />
                </div>
            </div>

            {/* Chassis & Braking Section */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                        <Settings size={20} />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Partie Cycle</h3>
                </div>
                <div className="space-y-0">
                    <SpecRow label="Cadre" value={spec.chassis.frame} />
                    <SpecRow label="Susp. Avant" value={spec.chassis.suspensionFront} />
                    <SpecRow label="Susp. Arrière" value={spec.chassis.suspensionRear} />
                    <SpecRow label="Frein Avant" value={spec.chassis.brakesFront} />
                    <SpecRow label="Frein Arrière" value={spec.chassis.brakesRear} />
                    <SpecRow label="Pneu Avant" value={spec.chassis.tireFront} />
                    <SpecRow label="Pneu Arrière" value={spec.chassis.tireRear} />
                </div>
            </div>

            {/* Dimensions Section */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center border border-green-100">
                        <Ruler size={20} />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Dimensions</h3>
                </div>
                <div className="space-y-0">
                    <SpecRow label="Poids" value={spec.dimensions.weight} />
                    <SpecRow label="Hauteur de selle" value={spec.dimensions.seatHeight} />
                    <SpecRow label="Réservoir" value={spec.dimensions.tank} />
                    <SpecRow label="Longueur" value={spec.dimensions.length} />
                    <SpecRow label="Empattement" value={spec.dimensions.wheelbase} />
                    <SpecRow label="Conso. Moyenne" value={spec.consumption || 'N/A'} />
                </div>
            </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 bg-gray-100/50 rounded-2xl p-6 border border-gray-200 flex gap-4 items-start">
            <Info className="text-gray-400 shrink-0 mt-0.5" size={20} />
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
                <strong>Information :</strong> Les données techniques sont fournies à titre indicatif par les constructeurs. MotoScoot.tn ne peut être tenu responsable d'éventuelles erreurs ou modifications de caractéristiques par le fabricant. Pour des informations définitives, veuillez consulter le concessionnaire officiel de la marque.
            </p>
        </div>

      </main>
    </div>
  );
};

// Fix for App.tsx line 31: Added missing default export
export default TechSpecsDetails;