import React, { useState, useRef } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  ArrowRight, 
  User, 
  Building2, 
  MapPin, 
  Upload, 
  CheckCircle2, 
  Briefcase,
  ChevronDown,
  Image as ImageIcon
} from 'lucide-react';
import { governoratesList } from '../../data/mockData';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role?: 'user' | 'admin') => void;
}

type UserType = 'individual' | 'pro';

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState<UserType>('individual');
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulation de délai réseau
    setTimeout(() => {
      setLoading(false);
      onLogin('user');
    }, 1000);
  };

  const handleLogoUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setLogoPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLogoUpload(e.dataTransfer.files[0]);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setLogoPreview(null);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up"
      role="dialog"
      aria-modal="true"
    >
      {/* Container principal sans shadow */}
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden border border-neutral-200 relative shadow-none">
        {/* Bouton Fermer */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-900 bg-gray-100 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-10 max-h-[90vh] overflow-y-auto no-scrollbar">
          {/* En-tête */}
          <div className="text-center mb-8">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 mb-4 text-primary-600 border border-primary-100">
               {isSignUp ? <User size={32} /> : <Lock size={32} />}
             </div>
             <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight">
               {isSignUp ? 'Créer un compte' : 'Bienvenue'}
             </h2>
             <p className="text-gray-500 text-sm font-medium">
               {isSignUp ? 'Rejoignez la communauté MotoScoot.tn' : 'Connectez-vous pour gérer vos annonces.'}
             </p>
          </div>

          {/* Toggle Type Utilisateur - Uniquement en mode Inscription */}
          {isSignUp && (
            <div className="flex p-1 bg-gray-100 rounded-2xl mb-8 border border-gray-200">
                <button 
                  type="button"
                  onClick={() => setUserType('individual')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${userType === 'individual' ? 'bg-white text-primary-600 border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <User size={16} />
                    Particulier
                </button>
                <button 
                  type="button"
                  onClick={() => setUserType('pro')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${userType === 'pro' ? 'bg-white text-primary-600 border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Briefcase size={16} />
                    Professionnel
                </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
             {/* Champs dynamiques d'inscription */}
             {isSignUp && (
               <div className="space-y-4 animate-scale-in">
                 {userType === 'individual' ? (
                   <>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Prénom</label>
                          <input type="text" placeholder="Prénom" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 outline-none transition-all font-bold text-gray-900 shadow-none" required />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nom</label>
                          <input type="text" placeholder="Nom" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 outline-none transition-all font-bold text-gray-900 shadow-none" required />
                        </div>
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Gouvernorat</label>
                        <div className="relative">
                          <select className="w-full appearance-none px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 outline-none transition-all font-bold text-gray-900 cursor-pointer shadow-none" required>
                             <option value="" disabled selected>Choisir mon gouvernorat</option>
                             {governoratesList.map(gov => <option key={gov} value={gov}>{gov}</option>)}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                        </div>
                     </div>
                   </>
                 ) : (
                   <>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nom de la boutique</label>
                        <div className="relative">
                          <input type="text" placeholder="Ex: Tunis Moto Shop" className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 outline-none transition-all font-bold text-gray-900 shadow-none" required />
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nom du gérant</label>
                        <div className="relative">
                          <input type="text" placeholder="Nom et Prénom" className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 outline-none transition-all font-bold text-gray-900 shadow-none" required />
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Adresse boutique</label>
                        <div className="relative">
                          <input type="text" placeholder="Rue, Ville..." className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 outline-none transition-all font-bold text-gray-900 shadow-none" required />
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                      </div>
                      
                      {/* Logo Drag & Drop */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Logo de la boutique</label>
                        <div 
                          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                          onDragLeave={() => setIsDragging(false)}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`relative h-28 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer group ${isDragging ? 'border-primary-600 bg-primary-50' : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-primary-300'}`}
                        >
                          {logoPreview ? (
                            <div className="flex items-center gap-3">
                                <img src={logoPreview} alt="Preview" className="h-20 w-20 object-contain rounded-lg" />
                                <span className="text-xs font-bold text-gray-400">Cliquez pour modifier</span>
                            </div>
                          ) : (
                            <>
                              <Upload className={`mb-1 ${isDragging ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-500'}`} size={24} />
                              <span className="text-[11px] font-bold text-gray-500">Logo (JPG, PNG)</span>
                            </>
                          )}
                          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => e.target.files && handleLogoUpload(e.target.files[0])} />
                        </div>
                      </div>
                   </>
                 )}
               </div>
             )}

             {/* Champs communs (Email & Password) */}
             <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">EMAIL</label>
                   <div className="relative">
                     <input type="email" placeholder="votre@email.com" className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 outline-none transition-all font-bold text-gray-900 shadow-none" required />
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   </div>
                </div>

                <div className="space-y-1.5">
                   <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">MOT DE PASSE</label>
                      {!isSignUp && (
                        <button type="button" className="text-[10px] font-black text-primary-600 uppercase hover:underline">OUBLIÉ ?</button>
                      )}
                   </div>
                   <div className="relative">
                     <input type="password" placeholder="••••••••" className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 outline-none transition-all font-bold text-gray-900 shadow-none" required />
                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   </div>
                </div>
             </div>

             <button 
               type="submit" 
               disabled={loading}
               className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-black rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-6 border-none shadow-none"
             >
                {loading ? (
                  <span className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    {isSignUp ? "Créer mon compte" : 'Me connecter'}
                    <ArrowRight size={18} />
                  </>
                )}
             </button>
          </form>

          {/* Footer de navigation entre modes */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
             <p className="text-gray-500 text-sm font-medium">
                {isSignUp ? 'Déjà membre ?' : 'Pas encore de compte ?'}
                <button 
                  onClick={toggleMode}
                  className="font-black text-primary-600 hover:text-primary-700 ml-2"
                >
                  {isSignUp ? 'Se connecter' : "S'inscrire gratuitement"}
                </button>
             </p>
             
             <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                <CheckCircle2 size={14} className="text-success-600" />
                Connexion sécurisée SSL
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;