
import React, { useState } from 'react';
import { X, Mail, Lock, CheckCircle2, ArrowRight, ShieldAlert } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role?: 'user' | 'admin') => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLogin('user');
    }, 1000);
  };

  const handleAdminLogin = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        onLogin('admin');
    }, 800);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-4 text-primary-600">
               <Lock size={32} />
             </div>
             <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
               {isSignUp ? 'Créer un compte' : 'Bon retour !'}
             </h2>
             <p className="text-gray-500">
               {isSignUp 
                 ? 'Rejoignez la communauté MotoScoot en quelques secondes.' 
                 : 'Connectez-vous pour accéder à votre espace.'}
             </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
             {isSignUp && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Nom complet</label>
                  <input 
                    type="text" 
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all"
                    required
                  />
                </div>
             )}

             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email</label>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="exemple@email.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all"
                    required
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
             </div>

             <div className="space-y-2">
                <div className="flex justify-between">
                   <label className="text-sm font-bold text-gray-700">Mot de passe</label>
                   {!isSignUp && (
                     <button type="button" className="text-xs font-bold text-primary-600 hover:underline">Oublié ?</button>
                   )}
                </div>
                <div className="relative">
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none transition-all"
                    required
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
             </div>

             <button 
               type="submit" 
               disabled={loading}
               className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-6"
             >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    {isSignUp ? "S'inscrire gratuitement" : 'Se connecter'}
                    <ArrowRight size={18} />
                  </>
                )}
             </button>
          </form>

          {/* Footer & Admin Link */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
             <p className="text-gray-500 text-sm mb-4">
                {isSignUp ? 'Déjà un compte ?' : 'Pas encore de compte ?'}
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="font-bold text-primary-600 hover:text-primary-700 ml-2 focus:outline-none focus:underline"
                >
                  {isSignUp ? 'Se connecter' : "S'inscrire"}
                </button>
             </p>
             
             {/* Demo Admin Link */}
             <button 
                onClick={handleAdminLogin}
                className="text-xs font-bold text-gray-300 hover:text-gray-500 flex items-center justify-center gap-1 mx-auto transition-colors"
                title="Accès Démo Super Admin"
             >
                <ShieldAlert size={12} />
                Accès Admin (Démo)
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
