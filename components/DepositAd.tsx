import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  X,
  CheckCircle2,
  Home,
  Zap,
  Sparkles,
  FileText,
  Lightbulb,
  Heart,
  User,
  Phone,
  Info,
  Scissors,
  Maximize,
  Minimize,
  RefreshCw,
  Crop as CropIcon,
  Trash2,
  Search,
  Plus,
  Focus,
  Sun,
  CircleDollarSign,
  BarChart3,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import Header from './layout/Header';
import { brandsMoto, mockModels, equipmentOptions, accessoryTypes, conditions, mockTechSpecs, mockListings } from '../data/mockData';

// --- TYPES ---

interface DepositAdProps {
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

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

const ccList = [
  "49", "50", "80", "100", "110", "125", "150", "200", "250", "300", "350", "400", 
  "450", "500", "530", "560", "600", "636", "650", "660", "700", "750", "765", "800", "850", "890", "900", 
  "1000", "1050", "1100", "1200", "1250", "1290", "1300", "1400", "1500", "1600", "1700", "1800", "2000", "2300", "2500"
];

// --- CROP MODAL COMPONENT ---

interface CropModalProps {
  image: string;
  onClose: () => void;
  onSave: (croppedImage: string) => void;
}

const CropModal: React.FC<CropModalProps> = ({ image, onClose, onSave }) => {
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState<number>(4/3);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const applyCrop = () => {
    if (!canvasRef.current || !imgRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imgRef.current;

    if (!ctx || img.naturalWidth === 0) return;

    const targetWidth = 1200;
    const targetHeight = targetWidth / aspectRatio;
    
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    let sWidth, sHeight;

    if (imgRatio > aspectRatio) {
      sHeight = img.naturalHeight / zoom;
      sWidth = sHeight * aspectRatio;
    } else {
      sWidth = img.naturalWidth / zoom;
      sHeight = sWidth / aspectRatio;
    }

    const sX = (img.naturalWidth - sWidth) / 2;
    const sY = (img.naturalHeight - sHeight) / 2;

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, sX, sY, sWidth, sHeight, 0, 0, targetWidth, targetHeight);
    ctx.restore();

    onSave(canvas.toDataURL('image/jpeg', 0.92));
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in-up">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden flex flex-col border border-white/10 shadow-none">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
                <Scissors size={20} />
             </div>
             <div>
                <h3 className="font-black text-gray-900 text-lg">Optimiser la photo</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Recadrage & Zoom</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
        </div>

        <div className="p-8 space-y-8 flex-1 overflow-y-auto">
          <div className="relative w-full aspect-video bg-neutral-900 rounded-3xl overflow-hidden flex items-center justify-center border border-neutral-100">
             <img 
               ref={imgRef}
               src={image} 
               alt="Aperçu" 
               className="max-w-none transition-transform duration-75 ease-out"
               style={{ 
                 transform: `scale(${zoom})`,
                 objectFit: 'contain',
                 width: '100%',
                 height: '100%'
               }}
             />
             <div 
               className="absolute border-2 border-primary-500/50 shadow-[0_0_0_2000px_rgba(0,0,0,0.7)] pointer-events-none transition-all duration-300 flex items-center justify-center"
               style={{ 
                 aspectRatio: `${aspectRatio}`,
                 width: aspectRatio > 1 ? '85%' : '55%',
                 height: aspectRatio > 1 ? 'auto' : '85%'
               }}
             >
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary-600 text-[8px] font-black text-white uppercase rounded shadow-none">Zone exportée</div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">1. Format</label>
                <div className="flex gap-2">
                   {[
                     { label: 'Standard', ratio: 4/3, icon: '4:3', recommended: true },
                     { label: 'Carré', ratio: 1/1, icon: '1:1', recommended: false },
                     { label: 'Cinéma', ratio: 16/9, icon: '16:9', recommended: false }
                   ].map((r) => (
                     <button 
                       key={r.ratio}
                       onClick={() => setAspectRatio(r.ratio)}
                       className={`flex-1 py-3 rounded-xl border-2 font-bold text-xs transition-all flex flex-col items-center gap-1 relative ${aspectRatio === r.ratio ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-neutral-100 text-gray-500 hover:border-primary-200'}`}
                     >
                       {r.recommended && (
                         <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-success-500 text-white text-[7px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter border border-white whitespace-nowrap">Idéal</span>
                       )}
                       <span className="text-[10px] opacity-60 font-black">{r.icon}</span>
                       {r.label}
                     </button>
                   ))}
                </div>
             </div>

             <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">2. Zoom</label>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                   <Minimize size={16} className="text-gray-400" />
                   <input 
                     type="range" 
                     min="1" 
                     max="3" 
                     step="0.01" 
                     value={zoom} 
                     onChange={(e) => setZoom(parseFloat(e.target.value))}
                     className="flex-1 accent-primary-600 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer"
                   />
                   <Maximize size={16} className="text-gray-400" />
                </div>
             </div>
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex gap-4">
           <button onClick={onClose} className="flex-1 py-4 font-black text-xs text-gray-500 uppercase tracking-widest hover:bg-gray-100 rounded-2xl transition-colors">Annuler</button>
           <button 
             onClick={applyCrop}
             className="flex-1 py-4 bg-primary-600 hover:bg-primary-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-none active:scale-95 transition-all flex items-center justify-center gap-2"
           >
             <CheckCircle2 size={18} strokeWidth={3} /> Appliquer
           </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN DEPOSIT COMPONENT ---

const DepositAd: React.FC<DepositAdProps> = ({ onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [croppingIndex, setCroppingIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [modelSuggestions, setModelSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

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

  // --- CALCULATION LOGIC ---
  const marketEstimation = useMemo(() => {
    if (formData.category === 'Accessoires' || !formData.brand || !formData.category) return null;

    // RÈGLE : Minimum 3 annonces similaires pour estimer
    const similarCount = mockListings.filter(l => 
        l.type === formData.category && 
        l.title.toLowerCase().includes(formData.brand.toLowerCase())
    ).length;

    if (similarCount < 3) return null;

    let basePrice = formData.category === 'Scooter' ? 12000 : 25000;
    const currentYear = 2025;
    const yearVal = parseInt(formData.year) || currentYear;
    const age = currentYear - yearVal;
    const ageDepreciation = Math.pow(0.92, age);
    const km = parseInt(formData.mileage) || 0;
    const kmDepreciation = Math.max(0.7, 1 - (km / 200000));

    let estimated = basePrice * ageDepreciation * kmDepreciation;
    estimated += formData.equipment.length * 150;

    return Math.round(estimated / 100) * 100;
  }, [formData.year, formData.mileage, formData.category, formData.brand, formData.equipment.length]);

  const dealQuality = useMemo(() => {
    if (!formData.price || !marketEstimation) return null;
    const priceStr = formData.price.toString().replace(/\D/g, '');
    const priceNum = parseInt(priceStr);
    const ratio = priceNum / marketEstimation;

    if (ratio < 0.80) return { label: 'Prix bas', color: 'text-error-600', bg: 'bg-error-500', width: '15%', textColor: 'text-error-600' };
    if (ratio < 0.95) return { label: 'Super affaire', color: 'text-success-600', bg: 'bg-success-500', width: '35%', textColor: 'text-success-600' };
    if (ratio < 1.10) return { label: 'Prix de marché', color: 'text-primary-600', bg: 'bg-primary-500', width: '55%', textColor: 'text-primary-600' };
    return { label: 'Prix élevé', color: 'text-warning-600', bg: 'bg-warning-500', width: '90%', textColor: 'text-warning-600' };
  }, [formData.price, marketEstimation]);

  // --- HANDLERS ---
  const validateStep = () => {
    switch (step) {
      case 1: return !!formData.category;
      case 2: return formData.category === 'Accessoires' 
        ? !!formData.accessoryType && !!formData.brand && !!formData.model && !!formData.condition 
        : !!formData.brand && !!formData.model && !!formData.year && !!formData.cc && !!formData.condition;
      case 3: return formData.images.length > 0;
      case 4: return formData.price.toString().length > 0 && formData.description.trim().length > 5;
      default: return false;
    }
  };

  const isStepValid = validateStep();

  const handleNext = () => { 
    if (isStepValid && step < 4) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const handleBack = () => { 
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!isStepValid) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  const updateField = (field: keyof AdFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (field === 'model' && formData.brand) {
      const sourceData = [...mockTechSpecs.filter(s => s.brand === formData.brand).map(s => s.model), ...mockModels];
      const filtered = Array.from(new Set(sourceData)).filter(m => m.toLowerCase().includes(value.toLowerCase())).slice(0, 6);
      setModelSuggestions(filtered);
      setShowSuggestions(value.length > 0 && filtered.length > 0);
    }
  };

  const handleCategorySelect = (cat: Category) => {
    setFormData(prev => ({ ...prev, category: cat, brand: '', model: '', year: '', mileage: '', cc: '', accessoryType: '', condition: '', equipment: [], description: '' }));
    setStep(2);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file: File) => URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages].slice(0, 10) }));
    }
  };

  const injectTemplate = (phrase: string) => {
    const current = formData.description;
    let textToAdd = phrase
      .replace("(modèle moto)", formData.model || "(modèle)")
      .replace("(modèle)", formData.model || "(modèle)")
      .replace("(marque)", formData.brand || "(marque)")
      .replace("(article)", formData.accessoryType || "(article)")
      .replace("(état)", formData.condition || "(état)")
      .replace("(localisation)", formData.city || "(ville)");

    updateField('description', current ? current + "\n– " + textToAdd : "– " + textToAdd);
  };

  // --- RENDERERS ---

  const renderStep1 = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight">Choisir une catégorie</h2>
        <p className="text-gray-500 font-medium">Sélectionnez le type de bien à mettre en vente.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { id: 'Moto', label: 'Moto', icon: Bike, desc: 'Sportive, Trail, Roadster...' },
          { id: 'Scooter', label: 'Scooter', icon: Zap, desc: 'Urbain, Maxi, 50cc...' },
          { id: 'Accessoires', label: 'Accessoires', icon: ShoppingBag, desc: 'Casques, Gants, Vestes...' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleCategorySelect(item.id as Category)}
            className={`group p-8 rounded-[2rem] border-2 transition-all text-left flex flex-col gap-4 active:scale-[0.98] ${formData.category === item.id ? 'border-primary-600 bg-primary-50' : 'border-neutral-100 bg-white hover:border-primary-200'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${formData.category === item.id ? 'bg-primary-600 text-white' : 'bg-neutral-50 text-gray-400 group-hover:bg-primary-100 group-hover:text-primary-600'}`}>
              <item.icon size={28} />
            </div>
            <div>
              <span className={`block font-black text-xl ${formData.category === item.id ? 'text-primary-900' : 'text-gray-900'}`}>{item.label}</span>
              <span className="text-sm text-gray-500 font-medium leading-snug">{item.desc}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 border border-primary-100 shadow-none"><FileText size={24} /></div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Détails techniques</h2>
          <p className="text-sm text-gray-500 font-medium">Spécifications précises de votre bien.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formData.category === 'Accessoires' ? (
          <>
            <div className="col-span-full">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Type d'article</label>
              <div className="flex flex-wrap gap-2">
                {accessoryTypes.map(t => (
                  <button key={t} onClick={() => updateField('accessoryType', t)} className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${formData.accessoryType === t ? 'bg-primary-600 border-primary-600 text-white' : 'bg-white border-neutral-100 text-gray-600 hover:border-primary-200'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Marque</label>
              <input type="text" value={formData.brand} onChange={(e) => updateField('brand', e.target.value)} placeholder="Ex: Shark..." className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-primary-600 outline-none font-bold text-gray-900 shadow-none" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Modèle</label>
              <input type="text" value={formData.model} onChange={(e) => updateField('model', e.target.value)} placeholder="Ex: Spartan GT..." className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-primary-600 outline-none font-bold text-gray-900 shadow-none" />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Marque</label>
              <div className="relative">
                <select value={formData.brand} onChange={(e) => updateField('brand', e.target.value)} className="w-full appearance-none px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-primary-600 outline-none font-bold text-gray-900 cursor-pointer shadow-none">
                  <option value="" disabled>Choisir la marque</option>
                  {brandsMoto.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
            <div className="space-y-2 relative" ref={suggestionRef}>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Modèle</label>
              <div className="relative">
                <input type="text" value={formData.model} onChange={(e) => updateField('model', e.target.value)} placeholder="Tappez le modèle..." className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-primary-600 outline-none font-bold text-gray-900 shadow-none" />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              </div>
              {showSuggestions && (
                <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden animate-scale-in">
                   {modelSuggestions.map((m, idx) => (
                     <button key={idx} onClick={() => { updateField('model', m); setShowSuggestions(false); }} className="w-full px-5 py-3 text-left hover:bg-primary-50 text-sm font-bold text-gray-700">{m}</button>
                   ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Année</label>
              <div className="relative">
                <select value={formData.year} onChange={(e) => updateField('year', e.target.value)} className="w-full appearance-none px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-primary-600 outline-none font-bold text-gray-900 shadow-none">
                  <option value="" disabled>Année</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kilométrage</label>
              <div className="relative">
                <input type="number" value={formData.mileage} onChange={(e) => updateField('mileage', e.target.value)} placeholder="Ex: 12000" className="w-full px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-primary-600 outline-none font-bold text-gray-900 shadow-none" />
                <Gauge className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Cylindrée</label>
              <div className="relative">
                <select value={formData.cc} onChange={(e) => updateField('cc', e.target.value)} className="w-full appearance-none px-5 py-4 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-primary-600 outline-none font-bold text-gray-900 shadow-none">
                  <option value="" disabled>Choisir</option>
                  {ccList.map(cc => <option key={cc} value={cc}>{cc} cc</option>)}
                  <option value="Autre">Autre</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
          </>
        )}
        <div className="col-span-full space-y-2">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">État général</label>
          <div className="flex flex-wrap gap-2">
             {conditions.map(c => (
               <button key={c} onClick={() => updateField('condition', c as Condition)} className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${formData.condition === c ? 'bg-primary-600 border-primary-600 text-white' : 'bg-white border-neutral-100 text-gray-600 hover:border-primary-200'}`}>{c}</button>
             ))}
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-neutral-100 space-y-4">
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description de l'annonce</label>
        <textarea rows={6} value={formData.description} onChange={(e) => updateField('description', e.target.value)} className="w-full px-6 py-5 rounded-[2rem] bg-neutral-50 border border-neutral-200 focus:border-primary-600 focus:bg-white outline-none font-medium text-gray-700 transition-all resize-none shadow-none" placeholder="Décrivez l'historique, l'entretien..." />
        <div className="flex flex-wrap gap-2">
          {["Bonjour, je vends ma (modèle)", "État impeccable", "Visible sur (localisation)", "Entretien à jour"].map((p, i) => (
            <button key={i} onClick={() => injectTemplate(p)} className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-[11px] font-black text-gray-500 hover:border-primary-600 hover:text-primary-600 transition-all shadow-none">+ {p.split(' (')[0]}</button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-10 animate-fade-in-up">
      <div className="space-y-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight">Galerie Photos</h2>
          <p className="text-gray-500 font-medium">Optimisez vos chances de vente avec de belles photos (max 10).</p>
        </div>
        
        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" multiple />
        <button onClick={() => fileInputRef.current?.click()} className="w-full aspect-[4/1] rounded-[2rem] border-2 border-dashed border-neutral-200 bg-neutral-50 flex flex-col items-center justify-center gap-2 group hover:border-primary-400 hover:bg-primary-50/30 transition-all shadow-none">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-600 border border-neutral-100 group-hover:scale-110 transition-transform shadow-none"><Camera size={28} /></div>
            <span className="font-black text-gray-900">Ajouter des photos</span>
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Recommandé : 4:3 (Horizontal)</span>
        </button>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {formData.images.map((img, idx) => (
                <div key={idx} className="flex flex-col gap-3 animate-fade-in-up">
                    <div className="relative aspect-square rounded-2xl overflow-hidden border border-neutral-100 bg-gray-50 shadow-none">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        {idx === 0 && (
                            <span className="absolute bottom-2 left-2 bg-primary-600 text-white text-[8px] font-black px-2 py-1 rounded uppercase shadow-none">Principale</span>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setCroppingIndex(idx)} 
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-primary-600 hover:border-primary-100 transition-all active:scale-95 shadow-none"
                        >
                            <CropIcon size={14} />
                            <span className="text-[10px] font-black uppercase tracking-tighter">Éditer</span>
                        </button>
                        <button 
                            onClick={() => updateField('images', formData.images.filter((_, i) => i !== idx))} 
                            className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-100 transition-all active:scale-95 shadow-none"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight">Prix & Lieu</h2>
        <p className="text-gray-500 font-medium">Finalisez la mise en ligne de votre annonce.</p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-neutral-100 relative overflow-hidden group shadow-none">
           <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">Prix de vente souhaité</label>
           <div className="flex items-center gap-4 md:gap-6 border-b-2 border-neutral-50 focus-within:border-primary-600 transition-all duration-300 pb-4">
              <input 
                type="number" 
                value={formData.price} 
                onChange={(e) => updateField('price', e.target.value)} 
                placeholder="0" 
                className="flex-1 text-5xl md:text-7xl font-black text-gray-900 bg-transparent outline-none placeholder:text-neutral-50 tracking-tighter shadow-none" 
              />
              <span className="text-2xl md:text-4xl font-black text-gray-300 pt-4 md:pt-6 uppercase">DT</span>
           </div>
           
           <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-8 animate-fade-in-up">
              {dealQuality && (
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-center px-1"><span className={`text-[10px] font-black uppercase tracking-widest ${dealQuality.color}`}>{dealQuality.label}</span></div>
                  <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden"><div className={`h-full ${dealQuality.bg} transition-all duration-1000 ease-out rounded-full`} style={{ width: dealQuality.width }}></div></div>
                </div>
              )}
              
              {marketEstimation ? (
                <div className="flex items-center gap-4 py-3 px-6 bg-gray-50/50 rounded-2xl border border-gray-100/50 group transition-all hover:border-primary-100 shrink-0">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-primary-500 border border-gray-100 shadow-none"><CircleDollarSign size={20} /></div>
                  <div>
                    <div className="flex items-baseline gap-1.5 leading-none"><span className="text-lg font-black text-gray-900">{marketEstimation.toLocaleString()}</span><span className="text-[10px] font-black text-gray-400 uppercase">DT</span></div>
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">Prix du Marché</p>
                  </div>
                </div>
              ) : (
                formData.brand && formData.category !== 'Accessoires' && (
                  <div className="flex items-center gap-3 py-3 px-6 bg-gray-50/50 rounded-2xl border border-gray-100/50 shrink-0">
                     <BarChart3 size={20} className="text-gray-300" />
                     <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight leading-tight">Pas assez de données<br/>pour estimation</span>
                  </div>
                )
              )}
           </div>
        </div>

        <div className="space-y-3">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-4">Localisation de la vente</label>
          <div className="relative group">
             <select value={formData.city} onChange={(e) => updateField('city', e.target.value)} className="w-full appearance-none px-6 py-5 rounded-2xl bg-white border border-neutral-100 focus:border-primary-600 outline-none font-bold text-gray-900 transition-all cursor-pointer hover:border-primary-200 shadow-none">
               {["Tunis", "Sousse", "Sfax", "Bizerte", "Nabeul", "Zaghouan", "Monastir", "Hammamet"].map(city => <option key={city}>{city}</option>)}
             </select>
             <MapPin className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-primary-500 transition-colors pointer-events-none" size={20} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 font-sans pb-28 lg:pb-12 overflow-x-hidden">
      <Header variant="white" onNavigate={onNavigate} onGoHome={onGoHome} isLoggedIn={isLoggedIn} onTriggerLogin={onTriggerLogin} onLogout={onLogout} hideSellButton={true} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-neutral-200 overflow-hidden shadow-none">
               
               {/* PROGRESS HEADER */}
               <div className="px-8 md:px-10 pt-10 pb-4 bg-neutral-50 border-b border-neutral-100 shadow-none">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em]">Étape {step} / 4</span>
                    <span className="text-xl font-black text-gray-900">{Math.round((step / 4) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-full shadow-none">
                    <div className="h-full bg-primary-600 transition-all duration-700 ease-out rounded-full shadow-none" style={{ width: `${(step / 4) * 100}%` }}></div>
                  </div>
               </div>

               <div className="p-8 md:p-12 min-h-[400px]">
                  {step === 1 && renderStep1()}
                  {step === 2 && renderStep2()}
                  {step === 3 && renderStep3()}
                  {step === 4 && renderStep4()}
               </div>

               {/* DESKTOP NAVIGATION BAR */}
               <div className="hidden lg:flex justify-between items-center px-10 py-8 bg-neutral-50 border-t border-neutral-100 shadow-none">
                  <button onClick={handleBack} disabled={step === 1} className={`flex items-center gap-2 font-black text-sm transition-all shadow-none ${step === 1 ? 'text-gray-300' : 'text-gray-500 hover:text-gray-900 active:scale-95'}`}>
                    <ChevronLeft size={20} /> Retour
                  </button>
                  <button 
                    onClick={step === 4 ? (e) => handleSubmit(e) : handleNext} 
                    disabled={isSubmitting || !isStepValid} 
                    className={`px-10 py-4 bg-gray-900 text-white font-black rounded-2xl flex items-center gap-3 transition-all active:scale-95 shadow-none ${(!isStepValid || isSubmitting) ? 'opacity-20 cursor-not-allowed grayscale' : 'hover:bg-primary-600'}`}
                  >
                    {isSubmitting ? 'Publication...' : (step === 4 ? 'Publier l\'annonce' : 'Continuer')}
                    {!isSubmitting && <ChevronRight size={20} />}
                  </button>
               </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-neutral-200 flex gap-4 items-center shadow-none">
               <div className="w-10 h-10 bg-warning-50 rounded-xl flex items-center justify-center text-warning-600 flex-shrink-0 border border-warning-100 shadow-none"><Lightbulb size={20}/></div>
               <p className="text-xs text-gray-500 font-medium leading-relaxed"><strong>Conseil de pro :</strong> Les annonces avec plus de 5 photos et une description détaillée reçoivent 3x plus d'appels en moyenne.</p>
            </div>
          </div>

          {/* RIGHT PREVIEW SIDEBAR - SIMULATION CARTE REELLE */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28">
             <div className="space-y-6 animate-fade-in-up">
                
                {/* SIMULATION DE LA VRAIE CARTE */}
                <article className="group bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden flex flex-col cursor-default">
                    
                    {/* Image Section */}
                    <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                        {formData.images.length > 0 ? (
                            <img src={formData.images[0]} alt="" className="w-full h-full object-cover animate-scale-in" />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                                <Camera size={48} className="mb-2 opacity-20" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Pas de photo</span>
                            </div>
                        )}
                        
                        {/* Condition Badge (Simulé comme dans SearchResults) */}
                        <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-wider shadow-sm border border-gray-200 text-gray-800">
                                {formData.condition || 'ÉTAT'}
                            </span>
                        </div>

                        {/* Favorite Button (Simulé) */}
                        <div className="absolute top-3 right-3 p-2 backdrop-blur-md bg-white/70 rounded-full text-gray-400">
                            <Heart size={18} />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col p-6">
                        
                        {/* Title & Price Header */}
                        <div className="mb-4">
                            <div className="flex justify-between items-start gap-3">
                                <h3 className="text-lg font-extrabold text-gray-900 leading-tight line-clamp-2 flex-1">
                                    {(formData.category === 'Accessoires' 
                                      ? `${formData.accessoryType || 'Article'} ${formData.brand} ${formData.model}` 
                                      : `${formData.brand} ${formData.model}`).trim() || 'Aperçu du titre'}
                                </h3>
                                <span className="text-xl font-black text-primary-600 whitespace-nowrap pt-0.5 tracking-tighter">
                                    {formData.price ? `${parseInt(formData.price.toString().replace(/\D/g, '') || '0').toLocaleString()} DT` : 'PRIX'}
                                </span>
                            </div>
                            
                            {/* Location & Date Row */}
                            <div className="flex items-center text-xs text-gray-500 font-bold uppercase mt-2 tracking-wide">
                                <MapPin size={12} className="mr-1 text-gray-400" />
                                <span>{formData.city}</span>
                                <span className="mx-2 text-neutral-200">•</span>
                                <span>Aujourd'hui</span>
                            </div>
                        </div>

                        {/* Tech Specs Row (Simulé comme SearchResults) */}
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-black text-gray-400 uppercase tracking-widest my-2 pb-4 border-b border-neutral-50">
                           {formData.category === 'Accessoires' ? (
                               <div className="flex items-center gap-1.5">
                                 <Info size={14} className="text-gray-300" /> 
                                 <span>{formData.condition || '-'}</span>
                               </div>
                           ) : (
                               <>
                                   <div className="flex items-center gap-1.5">
                                      <Calendar size={14} className="text-gray-300" /> 
                                      <span>{formData.year || 'ANNÉE'}</span>
                                   </div>
                                   <div className="flex items-center gap-1.5">
                                      <Gauge size={14} className="text-gray-300" /> 
                                      <span>{formData.mileage || '0'} km</span>
                                   </div>
                                   <div className="flex items-center gap-1.5">
                                      <Zap size={14} className="text-gray-300" /> 
                                      <span>{formData.cc || '0'} cc</span>
                                   </div>
                               </>
                           )}
                        </div>

                        {/* Deal Rating (Simulé si prix présent) */}
                        {dealQuality && (
                          <div className="flex items-center gap-2 mb-4 mt-2">
                              <div className="flex items-center gap-0.5 w-16">
                                  <div className={`h-1 flex-1 rounded-full ${dealQuality.bg}`}></div>
                                  <div className={`h-1 flex-1 rounded-full bg-gray-100`}></div>
                                  <div className={`h-1 flex-1 rounded-full bg-gray-100`}></div>
                              </div>
                              <span className={`text-[10px] font-black uppercase tracking-tight ${dealQuality.textColor}`}>
                                {dealQuality.label}
                              </span>
                          </div>
                        )}
                        
                        {/* Seller Row */}
                        <div className="mt-2 flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-gray-500 font-bold border border-neutral-200">
                                <User size={16} />
                            </div>
                            <div className="flex flex-col">
                               <span className="text-xs font-bold text-gray-700 leading-none">Mon Profil</span>
                               <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mt-1">Vendeur Particulier</span>
                            </div>
                        </div>

                        {/* Call Button Simulator */}
                        <div className="mt-6">
                            <button className="w-full h-11 bg-primary-600 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-none flex items-center justify-center gap-2">
                                <Phone size={16} /> Appeler
                            </button>
                        </div>
                    </div>
                </article>

                <div className="bg-primary-600 p-6 rounded-[2rem] text-white border-none shadow-none flex gap-4 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-2xl rounded-full"></div>
                   <div className="bg-white/20 p-2 rounded-xl h-fit border border-white/20 shadow-none relative z-10"><Sparkles size={20}/></div>
                   <div className="relative z-10">
                      <p className="text-sm font-black mb-1 uppercase tracking-wider">Aperçu en direct</p>
                      <p className="text-xs text-primary-50 leading-relaxed font-medium">Voici comment votre annonce sera affichée dans les résultats de recherche.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY NAVIGATION */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 safe-area-bottom z-40 flex gap-3 shadow-none">
         {step > 1 && (
            <button onClick={handleBack} className="w-14 h-14 flex items-center justify-center rounded-2xl bg-neutral-100 text-gray-900 active:scale-90 shadow-none transition-all">
                <ChevronLeft size={24} />
            </button>
         )}
         <button 
           onClick={step === 4 ? handleSubmit : handleNext} 
           disabled={isSubmitting || !isStepValid} 
           className={`flex-1 h-14 bg-gray-900 text-white font-black rounded-2xl flex items-center justify-center gap-3 text-sm active:scale-[0.98] transition-all shadow-none ${(!isStepValid || isSubmitting) ? 'opacity-20 grayscale' : ''}`}
         >
           {isSubmitting ? 'Publication...' : (step === 4 ? 'Publier' : 'Continuer')}
           {!isSubmitting && step < 4 && <ChevronRight size={18} />}
         </button>
      </div>

      {croppingIndex !== null && (
        <CropModal 
          image={formData.images[croppingIndex]} 
          onClose={() => setCroppingIndex(null)} 
          onSave={(url) => { 
            const newImgs = [...formData.images]; 
            newImgs[croppingIndex] = url; 
            updateField('images', newImgs); 
            setCroppingIndex(null); 
          }} 
        />
      )}

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
           <div className="bg-white rounded-[3rem] w-full max-w-sm overflow-hidden border border-neutral-200 relative p-10 text-center animate-scale-in shadow-none">
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-green-50 text-green-500 mb-8 border border-green-100 shadow-none">
                 <CheckCircle2 size={56} strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Bravo !</h2>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed">Votre annonce est maintenant en ligne. Nos modérateurs vont effectuer une vérification rapide.</p>
              <button 
                onClick={() => onNavigate?.('home')} 
                className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl active:scale-95 flex items-center justify-center gap-3 shadow-none transition-transform"
              >
                Continuer <Home size={18}/>
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default DepositAd;