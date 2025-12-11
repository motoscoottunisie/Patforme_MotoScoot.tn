
import React, { useState, useEffect, useRef } from 'react';
import { 
  Bike, 
  Package, 
  Camera, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown,
  Info, 
  MapPin, 
  Tag,
  Gauge,
  Calendar,
  Layers,
  ShoppingBag,
  ArrowRight,
  UploadCloud,
  X,
  CheckCircle2,
  Eye,
  Home,
  CheckSquare,
  Square
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
  accessoryType: string; // Only if category === Accessoires
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

// Generate years from 2026 down to 1980
const years = Array.from({ length: 2026 - 1980 + 1 }, (_, i) => (2026 - i).toString());

// Standard displacements
const ccList = [
  "49", "50", "80", "100", "110", "125", "150", "200", "250", "300", "350", "400", 
  "450", "500", "530", "560", "600", "650", "700", "750", "800", "850", "900", 
  "1000", "1100", "1200", "1250", "1300", "1400", "1500", "1600", "1800", "2300"
];

const DepositAd: React.FC<DepositAdProps> = ({ onGoHome, onNavigate, isLoggedIn, onTriggerLogin, onLogout }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Model Prediction State
  const [showModelSuggestions, setShowModelSuggestions] = useState(false);
  const [filteredModels, setFilteredModels] = useState<string[]>([]);

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

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const updateField = (field: keyof AdFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategorySelect = (cat: Category) => {
    // Reset specific fields when category changes
    setFormData(prev => ({
        ...prev,
        category: cat,
        // Reset vehicle fields if switching to Accessories
        brand: cat === 'Accessoires' ? '' : prev.brand,
        model: cat === 'Accessoires' ? '' : prev.model,
        year: cat === 'Accessoires' ? '' : prev.year,
        mileage: cat === 'Accessoires' ? '' : prev.mileage,
        cc: cat === 'Accessoires' ? '' : prev.cc,
        // Reset accessory fields if switching to Vehicle
        accessoryType: cat !== 'Accessoires' ? '' : prev.accessoryType,
        // Condition might be shared but safer to reset if logic differs
        condition: '', 
        equipment: []
    }));
    handleNext();
  };

  const handleEquipmentToggle = (item: string) => {
    setFormData(prev => {
      const exists = prev.equipment.includes(item);
      return {
        ...prev,
        equipment: exists 
          ? prev.equipment.filter(e => e !== item)
          : [...prev.equipment, item]
      };
    });
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const handleTriggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages: string[] = [];
      Array.from(e.target.files).forEach(file => {
          // Create a local URL for the selected file
          newImages.push(URL.createObjectURL(file as Blob));
      });
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAddTag = (tag: string) => {
    const currentDesc = formData.description;
    if (!currentDesc.includes(tag)) {
      updateField('description', currentDesc ? currentDesc + ', ' + tag : tag);
    }
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateField('model', value);
    
    if (value.length > 0) {
      const filtered = mockModels.filter(m => m.toLowerCase().includes(value.toLowerCase()));
      setFilteredModels(filtered);
      setShowModelSuggestions(true);
    } else {
      setShowModelSuggestions(false);
    }
  };

  const selectModel = (model: string) => {
    updateField('model', model);
    setShowModelSuggestions(false);
  };

  // Validation Logic
  const validateStep = () => {
    switch (step) {
      case 1:
        return !!formData.category;
      case 2:
        if (formData.category === 'Accessoires') {
          return !!formData.accessoryType && !!formData.condition;
        }
        // Ensure all required vehicle fields are filled
        return !!formData.brand && !!formData.model && !!formData.year && !!formData.mileage && !!formData.cc && !!formData.condition;
      case 3:
        // Require at least one image
        return formData.images.length > 0;
      case 4:
        return !!formData.price && !!formData.city && !!formData.description;
      default:
        return false;
    }
  };

  const isStepValid = validateStep();
  const isAccessory = formData.category === 'Accessoires';

  // --- RENDERERS FOR EACH STEP ---

  const renderStep1 = () => (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4 text-center md:text-left">Que souhaitez-vous vendre ?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Moto', 'Scooter', 'Accessoires'].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategorySelect(cat as Category)}
            className={`p-4 md:p-6 rounded-xl border transition-all flex flex-row md:flex-col items-center justify-start md:justify-center gap-4 group active:scale-[0.98] 
              ${formData.category === cat 
                ? 'border-primary-600 bg-primary-50 ring-1 ring-primary-600' 
                : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-gray-50'}`}
          >
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-colors flex-shrink-0
              ${formData.category === cat 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-500 group-hover:bg-primary-100 group-hover:text-primary-600'}`}
            >
              {cat === 'Moto' && <Bike size={24} className="md:w-8 md:h-8" />}
              {cat === 'Scooter' && <Bike size={24} className="md:w-8 md:h-8 scale-x-[-1]" />} 
              {cat === 'Accessoires' && <ShoppingBag size={24} className="md:w-8 md:h-8" />}
            </div>
            <span className={`font-bold text-base md:text-lg ${formData.category === cat ? 'text-primary-700' : 'text-gray-700'}`}>{cat}</span>
            <div className="ml-auto md:hidden text-gray-400"><ChevronRight size={20} /></div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4">Détails du véhicule</h2>

      {/* Conditional: Accessoires vs Vehicles */}
      {isAccessory ? (
        <div className="space-y-5">
          {/* Accessory Type */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Type d'article</label>
            <div className="flex flex-wrap gap-2">
              {accessoryTypes.map(type => (
                <button
                  key={type}
                  onClick={() => updateField('accessoryType', type)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all border 
                    ${formData.accessoryType === type 
                      ? 'bg-primary-600 text-white border-primary-600' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Condition for Accessory */}
          <div className="pt-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">État général</label>
            <div className="relative">
              <select 
                value={formData.condition}
                onChange={(e) => updateField('condition', e.target.value as Condition)}
                className="w-full appearance-none px-4 py-3 rounded-xl bg-white border border-gray-200 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none text-base md:text-sm cursor-pointer"
              >
                <option value="" disabled>Sélectionner l'état</option>
                {conditions.map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Brand - Dropdown */}
            <div className="col-span-full md:col-span-1">
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Marque</label>
              <div className="relative">
                <select 
                  value={formData.brand}
                  onChange={(e) => updateField('brand', e.target.value)}
                  className="w-full appearance-none px-4 py-3 rounded-xl bg-white border border-gray-200 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none text-base md:text-sm cursor-pointer"
                >
                  <option value="" disabled>Sélectionner une marque</option>
                  {brandsMoto.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={18} className="text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* Model - Input with Prediction */}
            <div className="relative col-span-full md:col-span-1">
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Modèle</label>
              <input 
                type="text" 
                value={formData.model}
                onChange={handleModelChange}
                onFocus={() => { if(formData.model) setShowModelSuggestions(true); }}
                onBlur={() => setTimeout(() => setShowModelSuggestions(false), 200)}
                placeholder="Ex: MT-07, TMAX..."
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none text-base md:text-sm transition-all"
              />
              
              {/* Suggestions Dropdown */}
              {showModelSuggestions && filteredModels.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {filteredModels.map((m, i) => (
                      <button 
                          key={i}
                          onClick={() => selectModel(m)}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors border-b border-gray-50 last:border-0"
                      >
                          {m}
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Year - Dropdown */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Année</label>
              <div className="relative">
                <select 
                  value={formData.year}
                  onChange={(e) => updateField('year', e.target.value)}
                  className="w-full appearance-none px-4 py-3 rounded-xl bg-white border border-gray-200 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none text-base md:text-sm cursor-pointer"
                >
                  <option value="" disabled>Année</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={18} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Mileage */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Kilométrage (km)</label>
              <input 
                type="number" 
                value={formData.mileage}
                onChange={(e) => updateField('mileage', e.target.value)}
                placeholder="Ex: 15000"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none text-base md:text-sm transition-all"
              />
            </div>

            {/* CC - Dropdown */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Cylindrée (cc)</label>
              <div className="relative">
                <select 
                  value={formData.cc}
                  onChange={(e) => updateField('cc', e.target.value)}
                  className="w-full appearance-none px-4 py-3 rounded-xl bg-white border border-gray-200 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none text-base md:text-sm cursor-pointer"
                >
                  <option value="" disabled>Cylindrée</option>
                  {ccList.map(cc => (
                    <option key={cc} value={cc}>{cc} cc</option>
                  ))}
                  <option value="Autre">Autre</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={18} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Condition - Next to CC */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">État général</label>
              <div className="relative">
                <select 
                  value={formData.condition}
                  onChange={(e) => updateField('condition', e.target.value as Condition)}
                  className="w-full appearance-none px-4 py-3 rounded-xl bg-white border border-gray-200 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none text-base md:text-sm cursor-pointer"
                >
                  <option value="" disabled>Sélectionner l'état</option>
                  {conditions.map(cond => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={18} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Equipment (Checkboxes) - Vehicle Only */}
      {!isAccessory && (
        <div className="pt-4 border-t border-gray-100">
          <label className="block text-sm font-bold text-gray-700 mb-3">Options et équipements (Optionnel)</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {equipmentOptions.map((item) => {
              const isChecked = formData.equipment.includes(item);
              return (
                <div 
                  key={item} 
                  onClick={() => handleEquipmentToggle(item)}
                  className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all select-none ${isChecked ? 'bg-primary-50 border-primary-500 ring-1 ring-primary-500' : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors flex-shrink-0 ${isChecked ? 'bg-primary-600 border-primary-600' : 'bg-white border-gray-300'}`}>
                    {isChecked && <Check size={10} className="text-white" />}
                  </div>
                  <span className={`text-xs font-semibold truncate ${isChecked ? 'text-primary-700' : 'text-gray-600'}`}>{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-1">Photos</h2>
        <p className="text-sm text-gray-500">Ajoutez au moins 1 photo pour attirer plus d'acheteurs.</p>
      </div>

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden" 
        accept="image/*"
        multiple
      />

      {/* Photos Grid / Dropzone */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
         {/* Dropzone Button */}
         <div 
           onClick={handleTriggerImageUpload}
           className="col-span-2 md:col-span-4 aspect-[2/1] md:aspect-[5/1] border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group active:scale-[0.99]"
         >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 group-hover:scale-110 transition-transform">
               <Camera className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">Ajouter des photos</h3>
         </div>

         {/* Image Previews */}
         {formData.images.map((img, index) => (
            <div key={index} className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group shadow-sm border border-gray-100">
               <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
               <button 
                 onClick={(e) => { e.stopPropagation(); handleRemoveImage(index); }}
                 className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
               >
                  <X size={12} />
               </button>
            </div>
         ))}
      </div>

      {/* Guidelines */}
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
           <div key={i} className="aspect-[4/3] bg-white rounded-xl border border-gray-100 flex items-center justify-center relative overflow-hidden opacity-60">
              <Camera size={20} className="text-gray-300" />
              <div className="absolute bottom-1.5 left-0 right-0 text-center text-[9px] text-gray-400 font-bold uppercase tracking-wide">
                 {i === 1 ? 'Avant' : i === 2 ? 'Arrière' : 'Profil'}
              </div>
           </div>
        ))}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4">Finalisation</h2>

      {/* Price Input */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Prix de vente</label>
        <div className="relative max-w-[200px]">
          <input 
            type="number" 
            value={formData.price}
            onChange={(e) => updateField('price', e.target.value)}
            placeholder="0"
            className="w-full pl-4 pr-12 py-3 text-2xl font-extrabold text-gray-900 placeholder-gray-300 bg-white border-b-2 border-gray-200 focus:border-primary-600 outline-none transition-colors"
          />
          <span className="absolute right-0 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">DT</span>
        </div>
        <p className="text-xs text-green-600 font-bold mt-2 flex items-center gap-1">
          <Check size={12} /> Prix cohérent
        </p>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1.5">Ville</label>
        <div className="relative">
           <select 
             value={formData.city}
             onChange={(e) => updateField('city', e.target.value)}
             className="w-full appearance-none px-4 py-3 rounded-xl bg-white border border-gray-200 focus:bg-white focus:border-primary-600 outline-none text-base md:text-sm cursor-pointer"
           >
             <option>Tunis</option>
             <option>Sousse</option>
             <option>Sfax</option>
             <option>Bizerte</option>
           </select>
           <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
             <MapPin size={18} className="text-gray-400" />
           </div>
        </div>
      </div>

      {/* Description & Tags */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
        
        {/* Helper Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {['Première main', 'Jamais chuté', 'Dort au garage', 'Prix négociable'].map(tag => (
            <button 
              key={tag}
              onClick={() => handleAddTag(tag)}
              className="text-[10px] md:text-xs font-semibold px-2.5 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors border border-gray-200"
            >
              + {tag}
            </button>
          ))}
        </div>

        <textarea 
          rows={4}
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Décrivez votre bien en quelques lignes (état, entretien, options...)"
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 outline-none resize-none text-base md:text-sm transition-all"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-28 lg:pb-12">
      <Header 
        variant="white" 
        onNavigate={onNavigate} 
        onGoHome={onGoHome} 
        isLoggedIn={isLoggedIn}
        onTriggerLogin={onTriggerLogin}
        onLogout={onLogout}
        hideSellButton={true}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start justify-center">
          
          {/* LEFT COLUMN: FORM WIZARD (7 cols) */}
          <div className="lg:col-span-7 w-full">
            
            {/* Main Form Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
               
               {/* Progress Bar (Inside Header) */}
               <div className="px-6 md:px-8 pt-6 pb-2">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">
                    <span>Étape {step} / 4</span>
                    <span className="text-primary-600">{Math.round((step / 4) * 100)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-600 transition-all duration-500 ease-out rounded-full"
                      style={{ width: `${(step / 4) * 100}%` }}
                    ></div>
                  </div>
               </div>

               {/* Step Content */}
               <div className="p-6 md:p-8">
                  {step === 1 && renderStep1()}
                  {step === 2 && renderStep2()}
                  {step === 3 && renderStep3()}
                  {step === 4 && renderStep4()}
               </div>

               {/* Desktop Navigation Footer (Inside Card) */}
               <div className="hidden lg:flex justify-between items-center px-8 py-6 bg-gray-50 border-t border-gray-100">
                  <button 
                    onClick={handleBack}
                    disabled={step === 1}
                    className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 
                      ${step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-white hover:shadow-sm hover:text-gray-900'}`}
                  >
                    <ChevronLeft size={18} />
                    Retour
                  </button>
                  
                  <button 
                    onClick={step === 4 ? handleSubmit : handleNext}
                    disabled={isSubmitting || !isStepValid}
                    className={`px-6 py-2.5 bg-primary-600 text-white font-bold rounded-xl flex items-center gap-2 transition-all active:scale-95 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${(!isStepValid || isSubmitting) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-700'}`}
                  >
                    {isSubmitting ? 'Publication...' : (step === 4 ? 'Publier l\'annonce' : 'Continuer')}
                    {!isSubmitting && <ArrowRight size={18} />}
                  </button>
               </div>
            </div>

          </div>

          {/* RIGHT COLUMN: LIVE PREVIEW (5 cols) - Sticky */}
          <div className="hidden lg:block lg:col-span-5 w-full">
             <div className="sticky top-28 space-y-4">
                
                {/* Live Preview Card */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-500 hover:shadow-md">
                   {/* Image Area */}
                   <div className="relative h-56 bg-gray-100 flex items-center justify-center text-gray-400">
                      {formData.images.length > 0 ? (
                        <img src={formData.images[0]} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center">
                           <Camera size={32} className="mb-2 opacity-40" />
                           <span className="text-[10px] font-semibold uppercase tracking-wide opacity-60">Pas de photo</span>
                        </div>
                      )}
                      
                      {/* Condition Badge */}
                      {formData.condition && (
                         <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold shadow-sm uppercase tracking-wide text-gray-700">
                               {formData.condition}
                            </span>
                         </div>
                      )}
                   </div>

                   {/* Content */}
                   <div className="p-5">
                      <div className="flex justify-between items-start mb-1">
                         <h3 className="text-lg font-extrabold text-gray-900 leading-snug line-clamp-2">
                            {isAccessory 
                              ? (formData.accessoryType || 'Titre de l\'annonce') 
                              : (formData.brand ? `${formData.brand} ${formData.model}` : 'Titre de l\'annonce')
                            }
                         </h3>
                         <span className="text-lg font-extrabold text-primary-600 whitespace-nowrap ml-2">
                            {formData.price ? formData.price : '--'} <span className="text-xs">DT</span>
                         </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 font-medium">
                         <MapPin size={12} />
                         <span>{formData.city}</span>
                      </div>

                      {/* Specs Row */}
                      {!isAccessory && (
                         <div className="flex items-center gap-3 text-xs font-bold text-gray-600 py-3 border-t border-gray-50">
                            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                               <Calendar size={12} className="text-gray-400"/>
                               <span>{formData.year || 'Année'}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                               <Gauge size={12} className="text-gray-400"/>
                               <span>{formData.mileage ? `${formData.mileage} km` : 'Km'}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                               <Info size={12} className="text-gray-400"/>
                               <span>{formData.cc ? `${formData.cc} cc` : 'Cyl.'}</span>
                            </div>
                         </div>
                      )}
                   </div>
                </div>

                <div className="bg-blue-50 text-blue-800 p-3 rounded-xl text-xs flex gap-2 leading-relaxed">
                   <Info size={16} className="flex-shrink-0 mt-0.5" />
                   <p>Ceci est un aperçu automatique. L'apparence finale peut varier légèrement selon l'appareil de l'acheteur.</p>
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* MOBILE STICKY FOOTER NAVIGATION */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-area-bottom z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex gap-3">
         {step > 1 && (
            <button 
              onClick={handleBack}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 text-gray-600 active:bg-gray-200 transition-colors"
            >
               <ChevronLeft size={20} />
            </button>
         )}
         <button 
           onClick={step === 4 ? handleSubmit : handleNext}
           disabled={isSubmitting || !isStepValid}
           className={`flex-1 h-12 bg-primary-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base active:scale-95 transition-transform ${(!isStepValid || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
         >
           {isSubmitting ? '...' : (step === 4 ? 'Publier' : 'Continuer')}
           {!isSubmitting && step < 4 && <ArrowRight size={18} />}
         </button>
      </div>

      {/* SUCCESS MODAL POPUP */}
      {showSuccessModal && (
        <div 
           className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up"
           role="dialog"
           aria-modal="true"
        >
           <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative p-8 text-center animate-scale-in">
              
              {/* Confetti / Decoration */}
              <div className="absolute top-0 left-0 -mt-10 -ml-10 w-40 h-40 bg-success-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 -mb-10 -mr-10 w-40 h-40 bg-primary-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

              {/* Icon */}
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-success-50 text-success-500 mb-6">
                 <div className="absolute inset-0 rounded-full border-4 border-success-100 animate-ping opacity-20"></div>
                 <CheckCircle2 size={48} className="relative z-10" />
              </div>

              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Félicitations !</h2>
              <p className="text-gray-500 mb-6">Votre annonce a bien été envoyée et sera mise en ligne après validation par notre équipe.</p>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-8 text-sm text-gray-600 border border-gray-100 flex items-start gap-3 text-left">
                 <Info size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                 <p>Délai moyen de validation : <span className="font-bold text-gray-900">2 heures</span></p>
              </div>

              <div className="space-y-3">
                 <button 
                   onClick={() => onNavigate?.('home')}
                   className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                 >
                    <Eye size={18} />
                    Voir mon annonce
                 </button>
                 <button 
                   onClick={() => onNavigate?.('home')}
                   className="w-full py-3.5 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                 >
                    <Home size={18} />
                    Retour à l'accueil
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default DepositAd;
