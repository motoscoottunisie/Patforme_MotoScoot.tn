import React, { useState, useEffect, useRef } from 'react';
import { 
  Bike, 
  Camera, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown,
  MapPin, 
  Gauge,
  Calendar,
  ShoppingBag,
  ArrowRight,
  X,
  CheckCircle2,
  Home,
  Zap,
  Sparkles,
  FileText,
  Lightbulb,
  Heart,
  User,
  ShieldCheck,
  Phone,
  Info
} from 'lucide-react';
import Header from './layout/Header';
import { brandsMoto, mockModels, equipmentOptions, accessoryTypes, conditions } from '../data/mockData';

interface DepositAdProps {
  onGoHome?: () => void;
  onNavigate?: (view: string) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

// --- TYPES ---

type Category = 'Moto' | 'Scooter' | 'Accessoires' | '';
type Condition = 'Neuf' | 'État neuf' | 'Excellent' | 'Très bon' | 'Bon' | 'Correct' | 'À réparer' | 'Pour pièces' | '';

interface AdFormData {
  category: Category;
  accessoryType: string;
  brand: string;
  model: string;
  year: string;
  mileage: string;
  cc: string;
  condition: Condition;
  price: string;
  city: string;
  description: string;
  images: string[];
  equipment: string[];
}

const years = Array.from({ length: 2026 - 1980 + 1 }, (_, i) => (2026 - i).toString());

// Liste exhaustive des cylindrées
const ccList = [
  "49", "50", "80", "100", "110", "125", "150", "200", "250", "300", "350", "400", 
  "450", "500", "530", "560", "600", "636", "650", "660", "700", "750", "765", "800", "850", "890", "900", 
  "1000", "1050", "1100", "1200", "1250", "1290", "1300", "1400", "1500", "1600", "1700", "1800", "2000", "2300", "2500"
];

const DepositAd: React.FC<DepositAdProps> = ({ onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<AdFormData>({
    category: '',
    accessoryType: '',
    brand: '',
    model: '',
    year: '',
    mileage: '',
    cc: '',
    condition: '', 
    price: '',
    city: 'Tunis',
    description: '',
    images: [],
    equipment: []
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const updateField = (field: keyof AdFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategorySelect = (cat: Category) => {
    setFormData(prev => ({
        ...prev,
        category: cat,
        brand: '',
        model: '',
        year: '',
        mileage: '',
        cc: '',
        accessoryType: '',
        condition: '', 
        equipment: [],
        description: ''
    }));
    handleNext();
  };

  const handleEquipmentToggle = (item: string) => {
    setFormData(prev => {
      const exists = prev.equipment.includes(item);
      return {
        ...prev,
        equipment: exists ? prev.equipment.filter(e => e !== item) : [...prev.equipment, item]
      };
    });
  };

  const handleNext = () => { if (step < 4) setStep(step + 1); };
  const handleBack = () => { if (step > 1) setStep(step - 1); };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file: File) => URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    }
  };

  const injectTemplate = (phrase: string) => {
    const current = formData.description;
    const modelStr = formData.model || "(modèle)";
    const brandStr = formData.brand || "(marque)";
    const typeStr = formData.accessoryType || "(article)";
    const conditionStr = formData.condition || "(état)";
    const locationStr = formData.city || "(ville)";
    
    let textToAdd = phrase
      .replace("(modèle moto)", modelStr)
      .replace("(modèle)", modelStr)
      .replace("(marque)", brandStr)
      .replace("(article)", typeStr)
      .replace("(état)", conditionStr)
      .replace("(localisation)", locationStr);

    updateField('description', current ? current + "\n– " + textToAdd : "– " + textToAdd);
  };

  const validateStep = () => {
    switch (step) {
      case 1: return !!formData.category;
      case 2: return formData.category === 'Accessoires' 
        ? !!formData.accessoryType && !!formData.brand && !!formData.model && !!formData.condition 
        : !!formData.brand && !!formData.model && !!formData.year && !!formData.cc && !!formData.condition;
      case 3: return formData.images.length > 0;
      case 4: return !!formData.price && !!formData.description;
      default: return false;
    }
  };

  const isStepValid = validateStep();
  const isAccessory = formData.category === 'Accessoires';

  // --- RENDERING UTILS ---

  const getBadgeStyle = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'bg-success-100/70 text-success-700 border-success-200/50'; 
      case 'Très bon': return 'bg-primary-100/70 text-primary-700 border-primary-200/50'; 
      case 'Bon': return 'bg-warning-100/70 text-warning-700 border-warning-200/50';
      default: return 'bg-gray-100/70 text-gray-800 border-gray-200/50';
    }
  };

  const renderStep1 = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Choisir une catégorie</h2>
        <p className="text-gray-500 font-medium">Sélectionnez le type de bien que vous mettez en vente.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { id: 'Moto', label: 'Moto', icon: Bike, desc: 'Sportive, Roadster, Trail...' },
          { id: 'Scooter', label: 'Scooter', icon: Zap, desc: 'Urbain, Maxi-scooter...' },
          { id: 'Accessoires', label: 'Accessoires', icon: ShoppingBag, desc: 'Casques, Vestes, Gants...' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleCategorySelect(item.id as Category)}
            className={`group relative p-6 rounded-3xl border-2 transition-all text-left flex flex-col gap-4 active:scale-[0.98] 
              ${formData.category === item.id 
                ? 'border-primary-600 bg-primary-50' 
                : 'border-neutral-100 bg-white hover:border-primary-200'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors
              ${formData.category === item.id ? 'bg-primary-600 text-white' : 'bg-neutral-50 text-gray-400 group-hover:bg-primary-100 group-hover:text-primary-600'}`}>
              <item.icon size={28} />
            </div>
            <div>
              <span className={`block font-black text-xl ${formData.category === item.id ? 'text-primary-900' : 'text-gray-900'}`}>{item.label}</span>
              <span className="text-sm text-gray-500 font-medium">{item.desc}</span>
            </div>
            {formData.category === item.id && (
              <div className="absolute top-4 right-4 text-primary-600"><CheckCircle2 size={24} /></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 border border-primary-100">
           <FileText size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900">Détails techniques</h2>
          <p className="text-sm text-gray-500 font-medium">Précisez les caractéristiques de votre bien.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isAccessory ? (
          <>
            <div className="col-span-full">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Type d'article</label>
              <div className="flex flex-wrap gap-2">
                {accessoryTypes.map(type => (
                  <button key={type} onClick={() => updateField('accessoryType', type)} className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${formData.accessoryType === type ? 'bg-primary-600 border-primary-600 text-white' : 'bg-white border-neutral-100 text-gray-600 hover:border-primary-200'}`}>{type}</button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Marque</label>
              <input type="text" value={formData.brand} onChange={(e) => updateField('brand', e.target.value)} placeholder="Ex: Shark, Alpinestars..." className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-primary-600 focus:bg-white outline-none font-bold text-gray-900 transition-all placeholder:text-gray-300" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Modèle</label>
              <input type="text" value={formData.model} onChange={(e) => updateField('model', e.target.value)} placeholder="Ex: Spartan GT, Tech-7..." className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-primary-600 focus:bg-white outline-none font-bold text-gray-900 transition-all placeholder:text-gray-300" />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Marque</label>
              <div className="relative">
                <select value={formData.brand} onChange={(e) => updateField('brand', e.target.value)} className="w-full appearance-none px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-primary-600 focus:bg-white outline-none font-bold text-gray-900 transition-all cursor-pointer">
                  <option value="" disabled>Choisir la marque</option>
                  {brandsMoto.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Modèle</label>
              <input type="text" value={formData.model} onChange={(e) => updateField('model', e.target.value)} placeholder="Ex: MT-07..." className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-primary-600 focus:bg-white outline-none font-bold text-gray-900 transition-all placeholder:text-gray-300" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Année</label>
              <div className="relative">
                <select value={formData.year} onChange={(e) => updateField('year', e.target.value)} className="w-full appearance-none px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-primary-600 focus:bg-white outline-none font-bold text-gray-900 transition-all cursor-pointer">
                  <option value="" disabled>Année</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Kilométrage (km)</label>
              <div className="relative">
                <input type="number" value={formData.mileage} onChange={(e) => updateField('mileage', e.target.value)} placeholder="Ex: 12000" className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-primary-600 focus:bg-white outline-none font-bold text-gray-900 transition-all placeholder:text-gray-300" />
                <Gauge className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              </div>
            </div>
            {/* Nouveau champ Cylindrée */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Cylindrée (cc)</label>
              <div className="relative">
                <select value={formData.cc} onChange={(e) => updateField('cc', e.target.value)} className="w-full appearance-none px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-primary-600 focus:bg-white outline-none font-bold text-gray-900 transition-all cursor-pointer">
                  <option value="" disabled>Choisir la cylindrée</option>
                  {ccList.map(cc => (
                    <option key={cc} value={cc}>{cc} cc</option>
                  ))}
                  <option value="Autre">Plus de 2500 cc / Autre</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
          </>
        )}
        
        <div className="col-span-full space-y-2">
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">État général</label>
          <div className="flex flex-wrap gap-2">
             {conditions.map(cond => (
               <button key={cond} onClick={() => updateField('condition', cond as Condition)} className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${formData.condition === cond ? 'bg-primary-600 border-primary-600 text-white' : 'bg-white border-neutral-100 text-gray-600 hover:border-primary-200'}`}>{cond}</button>
             ))}
          </div>
        </div>
      </div>

      {!isAccessory && (
        <div className="pt-6 border-t border-neutral-100">
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Options & Équipements</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {equipmentOptions.slice(0, 12).map((item) => {
              const checked = formData.equipment.includes(item);
              return (
                <button key={item} onClick={() => handleEquipmentToggle(item)} className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${checked ? 'bg-primary-50 border-primary-600 text-primary-900' : 'bg-white border-neutral-100 text-gray-500'}`}>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 transition-colors ${checked ? 'bg-primary-600 border-primary-600 text-white' : 'border-neutral-200 bg-white'}`}>
                    {checked && <Check size={14} strokeWidth={4} />}
                  </div>
                  <span className="text-xs font-bold truncate">{item}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* DESCRIPTION SECTION - Vide par défaut */}
      <div className="pt-8 border-t border-neutral-100 space-y-4">
        <div className="flex justify-between items-end">
           <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Description</label>
              <p className="text-xs text-gray-500 mt-1 font-medium italic">Complétez la description de votre annonce...</p>
           </div>
           <div className="text-[10px] font-black text-gray-400 uppercase">{formData.description.length} / 2000</div>
        </div>
        
        <div className="relative">
          <textarea 
            rows={8}
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            className="w-full px-5 py-4 rounded-3xl bg-neutral-50 border border-neutral-200 focus:border-primary-600 focus:bg-white outline-none font-medium text-gray-700 transition-all resize-none"
            placeholder={isAccessory ? "Taille, matière, homologation, état précis..." : "Historique, entretien récent, points forts..."}
          />
          
          <div className="mt-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Sparkles size={12} className="text-primary-500" />
              Rédiger plus vite :
            </p>
            <div className="flex flex-wrap gap-2">
              {(isAccessory ? [
                "Bonjour, je vends mon article : (article) (marque) (modèle)",
                "État : (état)",
                "Produit original / authentique",
                "Très peu utilisé, comme neuf",
                "Visible sur (localisation)",
                "Prix ferme"
              ] : [
                "Bonjour, je vends ma moto (modèle moto)",
                "État du véhicule : (état)",
                "Entretien à jour",
                "Carnet d’entretien disponible",
                "Visible sur (localisation)",
                "Prix légèrement négociable"
              ]).map((phrase, i) => (
                <button 
                  key={i} 
                  onClick={() => injectTemplate(phrase)}
                  className="px-3 py-1.5 bg-white border border-neutral-200 rounded-full text-[11px] font-bold text-gray-600 hover:border-primary-600 hover:text-primary-600 transition-all active:scale-95"
                >
                  + {phrase.split(":")[0].replace(" (modèle moto)", "").replace(" (article) (marque) (modèle)", "")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Galerie Photos</h2>
        <p className="text-gray-500 font-medium">Une belle photo vend 5x plus vite.</p>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" multiple />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <button onClick={() => fileInputRef.current?.click()} className="col-span-full aspect-[3/1] rounded-3xl border-2 border-dashed border-neutral-200 bg-neutral-50 flex flex-col items-center justify-center gap-3 group hover:border-primary-400 hover:bg-primary-50/30 transition-all">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-neutral-100 group-hover:scale-110 transition-transform text-primary-600">
               <Camera size={28} />
            </div>
            <span className="font-black text-gray-900">Ajouter des photos</span>
         </button>

         {formData.images.map((img, idx) => (
            <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-neutral-100 group">
               <img src={img} alt="" className="w-full h-full object-cover" />
               <button onClick={() => updateField('images', formData.images.filter((_, i) => i !== idx))} className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors">
                  <X size={14} />
               </button>
               {idx === 0 && <span className="absolute bottom-2 left-2 bg-primary-600 text-white text-[9px] font-black px-2 py-1 rounded-md uppercase">Principale</span>}
            </div>
         ))}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Prix & Lieu</h2>
        <p className="text-gray-500 font-medium">Dernière étape avant la mise en ligne.</p>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-neutral-200">
           <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Prix demandé</label>
           <div className="flex items-center gap-4">
              <input type="number" value={formData.price} onChange={(e) => updateField('price', e.target.value)} placeholder="0" className="flex-1 text-5xl font-black text-gray-900 bg-transparent outline-none placeholder:text-neutral-100" />
              <span className="text-3xl font-black text-primary-600">DT</span>
           </div>
           {formData.price && Number(formData.price) > 0 && (
             <div className="mt-4 flex items-center gap-2 text-green-600 font-black text-xs uppercase bg-green-50 w-fit px-3 py-1.5 rounded-full border border-green-100">
               <CheckCircle2 size={14} /> Prix valide
             </div>
           )}
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Ville de vente</label>
          <div className="relative">
             <select value={formData.city} onChange={(e) => updateField('city', e.target.value)} className="w-full appearance-none px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-primary-600 focus:bg-white outline-none font-bold text-gray-900 transition-all cursor-pointer">
               {["Tunis", "Sousse", "Sfax", "Bizerte", "Nabeul", "Zaghouan"].map(city => <option key={city}>{city}</option>)}
             </select>
             <MapPin className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 font-sans pb-28 lg:pb-12">
      <Header variant="white" onNavigate={onNavigate} onGoHome={onGoHome} isLoggedIn={isLoggedIn} onTriggerLogin={onTriggerLogin} onLogout={onLogout} hideSellButton={true} />

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: FORM WIZARD */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-neutral-200 overflow-hidden">
               
               {/* PROGRESS HEADER */}
               <div className="px-8 md:px-10 pt-10 pb-4 bg-neutral-50 border-b border-neutral-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em]">Étape {step} / 4</span>
                    <span className="text-xl font-black text-gray-900">{Math.round((step / 4) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-full">
                    <div className="h-full bg-primary-600 transition-all duration-700 ease-out rounded-full" style={{ width: `${(step / 4) * 100}%` }}></div>
                  </div>
               </div>

               <div className="p-8 md:p-12">
                  {step === 1 && renderStep1()}
                  {step === 2 && renderStep2()}
                  {step === 3 && renderStep3()}
                  {step === 4 && renderStep4()}
               </div>

               {/* DESKTOP NAV */}
               <div className="hidden lg:flex justify-between items-center px-10 py-8 bg-neutral-50 border-t border-neutral-100">
                  <button onClick={handleBack} disabled={step === 1} className={`flex items-center gap-2 font-black text-sm transition-all ${step === 1 ? 'text-gray-300' : 'text-gray-500 hover:text-gray-900 active:scale-95'}`}>
                    <ChevronLeft size={20} /> Retour
                  </button>
                  <button onClick={step === 4 ? handleSubmit : handleNext} disabled={isSubmitting || !isStepValid} className={`px-10 py-4 bg-gray-900 text-white font-black rounded-2xl flex items-center gap-3 transition-all active:scale-95 ${(!isStepValid || isSubmitting) ? 'opacity-30 cursor-not-allowed grayscale' : 'hover:bg-primary-600'}`}>
                    {isSubmitting ? 'Publication...' : (step === 4 ? 'Publier l\'annonce' : 'Étape suivante')}
                    {!isSubmitting && <ChevronRight size={20} />}
                  </button>
               </div>
            </div>

            {/* TIPS BAR */}
            <div className="bg-white p-5 rounded-3xl border border-neutral-200 flex gap-4 items-center">
               <div className="w-10 h-10 bg-warning-50 rounded-xl flex items-center justify-center text-warning-600 flex-shrink-0 border border-warning-100"><Lightbulb size={20}/></div>
               <p className="text-xs text-gray-500 font-medium leading-relaxed"><strong>Conseil :</strong> Les annonces avec une description détaillée reçoivent 3x plus d'appels en moyenne.</p>
            </div>
          </div>

          {/* RIGHT: PREVIEW (MATCHING SEARCHRESULTS MOBILE CARD) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28">
             <div className="space-y-6">
                
                {/* PREVIEW CARD - Identique à SearchResults.tsx (Mode mobile) */}
                <article className="group bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden flex flex-col cursor-default">
                    {/* Image Section */}
                    <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                        {formData.images.length > 0 ? (
                            <img 
                                src={formData.images[0]} 
                                alt="Aperçu" 
                                className="w-full h-full object-cover animate-scale-in" 
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                                <Camera size={48} className="mb-2 opacity-20" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Pas de photo</span>
                            </div>
                        )}
                        
                        {/* Condition Badge */}
                        <div className="absolute top-3 left-3">
                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm border ${getBadgeStyle(formData.condition || 'Correct')} backdrop-blur-md bg-opacity-70`}>
                                {formData.condition || 'État'}
                            </span>
                        </div>
                        
                        {/* Fake Favorite Button */}
                        <button className="absolute top-3 right-3 p-2 backdrop-blur-md bg-white/70 rounded-full text-gray-400">
                            <Heart size={18} />
                        </button>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col p-5">
                        <div className="mb-1">
                            <div className="flex justify-between items-start gap-2">
                                <h3 className="text-lg font-extrabold text-gray-900 leading-tight line-clamp-2 flex-1">
                                    {isAccessory 
                                        ? (`${formData.accessoryType || 'Article'} ${formData.brand} ${formData.model}`.trim() || 'Titre de l\'annonce') 
                                        : (formData.brand ? `${formData.brand} ${formData.model}` : 'Titre de l\'annonce')}
                                </h3>
                                <span className="text-lg font-bold text-primary-600 whitespace-nowrap pt-0.5">
                                    {formData.price ? `${formData.price} DT` : 'Prix'}
                                </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 font-medium mt-1">
                                <MapPin size={14} className="mr-1 text-gray-400" />
                                <span className="truncate max-w-[150px]">{formData.city}</span>
                                <span className="mx-2 text-gray-300">•</span>
                                <span>Aujourd'hui</span>
                            </div>
                        </div>

                        {/* Specifics Row */}
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm font-semibold text-gray-700 my-2">
                            {isAccessory ? (
                                <div className="flex items-center gap-1.5">
                                    <Info size={16} className="text-gray-400" /> 
                                    <span>{formData.condition || 'État'}</span>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={16} className="text-gray-400" /> 
                                        <span>{formData.year || 'Année'}</span>
                                    </div>
                                    <span className="text-gray-300">•</span>
                                    <div className="flex items-center gap-1.5">
                                        <Gauge size={16} className="text-gray-400" /> 
                                        <span>{formData.mileage ? `${formData.mileage} km` : 'Km'}</span>
                                    </div>
                                    <span className="text-gray-300">•</span>
                                    <div className="flex items-center gap-1.5">
                                        <Info size={16} className="text-gray-400" /> 
                                        <span>{formData.cc ? `${formData.cc} cc` : 'Cyl.'}</span>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Seller Info */}
                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold flex-shrink-0">
                                <User size={14} />
                            </div>
                            <div className="overflow-hidden flex items-center gap-2">
                                <span className="text-sm font-bold text-gray-700 truncate">Vendeur</span>
                                <span className="text-xs text-gray-400">• Particulier</span>
                            </div>
                        </div>
                    </div>

                    {/* Appeler Button (Mocked) */}
                    <div className="px-5 pb-5">
                        <button className="w-full h-12 bg-primary-600 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all">
                            <Phone size={18} />
                            Appeler
                        </button>
                    </div>
                </article>

                {/* Express Badge */}
                <div className="bg-primary-600 p-6 rounded-[2rem] text-white border border-primary-700 flex gap-4">
                   <div className="bg-white/20 p-2 rounded-xl h-fit border border-white/20"><Sparkles size={20}/></div>
                   <div>
                      <p className="text-sm font-black mb-1 uppercase tracking-wider">Aperçu en temps réel</p>
                      <p className="text-xs text-primary-50 leading-relaxed font-medium">Voici à quoi ressemblera votre annonce dans les résultats de recherche sur mobile.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* MOBILE NAV BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 safe-area-bottom z-40 flex gap-3">
         {step > 1 && <button onClick={handleBack} className="w-14 h-14 flex items-center justify-center rounded-2xl bg-neutral-100 text-gray-900 active:scale-90 transition-transform"><ChevronLeft size={24} /></button>}
         <button onClick={step === 4 ? handleSubmit : handleNext} disabled={isSubmitting || !isStepValid} className={`flex-1 h-14 bg-gray-900 text-white font-black rounded-2xl flex items-center justify-center gap-3 text-sm active:scale-[0.98] transition-all ${(!isStepValid || isSubmitting) ? 'opacity-30 grayscale' : ''}`}>
           {isSubmitting ? 'En cours...' : (step === 4 ? 'Publier' : 'Continuer')}
           {!isSubmitting && step < 4 && <ChevronRight size={18} />}
         </button>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
           <div className="bg-white rounded-[3rem] w-full max-w-sm overflow-hidden border border-neutral-200 relative p-10 text-center animate-scale-in">
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-green-50 text-green-500 mb-8 border border-green-100">
                 <CheckCircle2 size={56} strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-3">Génial !</h2>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed">Votre annonce est prête. Nos modérateurs vont y jeter un œil rapide !</p>
              <button onClick={() => onNavigate?.('home')} className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl active:scale-95 transition-transform flex items-center justify-center gap-3">
                 Continuer <Home size={18}/>
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default DepositAd;