
import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  CheckCircle2, 
  Wrench,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import Header from './layout/Header';
import { mockTips } from '../data/mockData';

interface TipDetailsProps {
  tipId: number;
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  onBack?: () => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const TipDetails: React.FC<TipDetailsProps> = ({ 
  tipId, 
  onGoHome, 
  onNavigate, 
  onBack,
  isLoggedIn, 
  onTriggerLogin, 
  onLogout 
}) => {
  
  const [helpful, setHelpful] = useState<'yes' | 'no' | null>(null);

  // Find tip or fallback
  const tip = mockTips.find(t => t.id === tipId) || mockTips[0];
  const relatedTips = mockTips.filter(t => t.id !== tip.id).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
    setHelpful(null);
  }, [tipId]);

  // Color logic for difficulty
  const getDifficultyColor = (diff: string) => {
      switch(diff) {
          case 'Débutant': return 'text-success-700 bg-success-50 border-success-200';
          case 'Intermédiaire': return 'text-warning-700 bg-warning-50 border-warning-200';
          case 'Expert': return 'text-red-700 bg-red-50 border-red-200';
          default: return 'text-gray-700 bg-gray-50 border-gray-200';
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

      <main>
        {/* Header / Hero Section */}
        <div className="bg-white border-b border-gray-200 pb-8 md:pb-12 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="max-w-7xl mx-auto px-6 md:px-8 pt-6 md:pt-10">
                
                {/* Breadcrumb & Back */}
                <div className="flex items-center justify-between mb-8">
                    <button 
                      onClick={onBack}
                      className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Retour aux conseils
                    </button>
                    <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                        <span onClick={() => onNavigate?.('tips')} className="hover:text-gray-900 cursor-pointer transition-colors">Conseils</span>
                        <ChevronRight size={14} />
                        <span className="text-gray-900 font-medium">{tip.category}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    
                    {/* Header Info (8 cols) */}
                    <div className="lg:col-span-8">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getDifficultyColor(tip.difficulty)}`}>
                                {tip.difficulty}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-gray-50 text-gray-600 text-xs font-bold uppercase tracking-wide border border-gray-200">
                                {tip.category}
                            </span>
                        </div>
                        
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
                            {tip.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border border-primary-200">
                                    {tip.author.charAt(0)}
                                </div>
                                <span className="text-gray-900">{tip.author}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock size={16} className="text-gray-400" />
                                <span>{tip.readTime}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar size={16} className="text-gray-400" />
                                <span>{tip.date}</span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Actions (4 cols) */}
                    <div className="hidden lg:flex lg:col-span-4 justify-end">
                       <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 hover:text-primary-600 hover:border-gray-300 transition-all shadow-sm active:scale-95">
                          <Share2 size={18} />
                          Partager ce guide
                       </button>
                    </div>

                </div>
            </div>
        </div>

        {/* Content Layout */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 -mt-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* LEFT COLUMN: Main Content (8 cols) */}
              <div className="lg:col-span-8">
                 
                 {/* Hero Image */}
                 <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-md mb-10 aspect-video relative z-10 border border-gray-100">
                    <img src={tip.image} alt={tip.title} className="w-full h-full object-cover" />
                 </div>

                 {/* Intro Summary - Subtle Shadow */}
                 <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-10">
                     <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                        {tip.summary}
                     </p>
                 </div>

                 {/* Rich Content Body - Subtle Shadow */}
                 <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-12">
                    <div 
                      className="prose prose-lg prose-slate max-w-none
                        prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                        prose-p:text-gray-600 prose-p:leading-relaxed
                        prose-li:text-gray-600
                        prose-strong:text-gray-900 prose-strong:font-extrabold
                        prose-img:rounded-2xl prose-img:shadow-sm prose-img:border prose-img:border-gray-100"
                      dangerouslySetInnerHTML={{ __html: tip.content || "<p>Contenu détaillé indisponible.</p>" }}
                    />
                 </div>

                 {/* Feedback Section */}
                 <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center mb-16">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Ce guide vous a-t-il été utile ?</h3>
                    <div className="flex justify-center gap-4">
                       <button 
                         onClick={() => setHelpful('yes')}
                         className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border ${helpful === 'yes' ? 'bg-success-600 text-white border-success-600 shadow-md transform scale-105' : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm'}`}
                       >
                          <ThumbsUp size={20} /> Oui, merci !
                       </button>
                       <button 
                         onClick={() => setHelpful('no')}
                         className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border ${helpful === 'no' ? 'bg-gray-800 text-white border-gray-800 shadow-md transform scale-105' : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm'}`}
                       >
                          <ThumbsDown size={20} /> Pas vraiment
                       </button>
                    </div>
                    {helpful === 'yes' && <p className="text-success-600 font-bold mt-4 animate-fade-in-up flex items-center justify-center gap-2"><CheckCircle2 size={18}/> Merci pour votre retour !</p>}
                 </div>

              </div>

              {/* RIGHT COLUMN: Sidebar (4 cols) */}
              <div className="lg:col-span-4 space-y-8">
                 
                 {/* Toolkit Card (Sticky) */}
                 <div className="sticky top-24 space-y-6">
                    
                    {/* Tools Needed - Reduced Shadow */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                       <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 flex items-center gap-3">
                          <div className="bg-white/20 p-1.5 rounded-lg">
                             <Wrench className="text-white" size={18} />
                          </div>
                          <h3 className="font-bold text-white text-lg">Ce qu'il vous faut</h3>
                       </div>
                       <div className="p-6">
                          {tip.tools && tip.tools.length > 0 ? (
                             <ul className="space-y-4">
                                {tip.tools.map((tool, idx) => (
                                   <li key={idx} className="flex items-start gap-3 group">
                                      <div className="w-5 h-5 rounded-full bg-primary-50 text-primary-600 border border-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                         <CheckCircle2 size={12} />
                                      </div>
                                      <span className="text-gray-700 font-medium text-sm leading-tight pt-0.5">{tool}</span>
                                   </li>
                                ))}
                             </ul>
                          ) : (
                             <p className="text-gray-500 italic text-sm">Aucun matériel spécifique requis pour ce conseil.</p>
                          )}
                       </div>
                    </div>

                    {/* Quick Stats Card - Reduced Shadow */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                       <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                          <Lightbulb className="text-warning-500 fill-warning-500" size={20} />
                          En bref
                       </h3>
                       <div className="space-y-4">
                          <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                             <span className="text-gray-500 text-sm font-medium">Difficulté</span>
                             <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase border ${getDifficultyColor(tip.difficulty)}`}>{tip.difficulty}</span>
                          </div>
                          <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                             <span className="text-gray-500 text-sm font-medium">Temps estimé</span>
                             <span className="font-bold text-gray-900 text-sm">{tip.readTime}</span>
                          </div>
                          <div className="flex justify-between items-center">
                             <span className="text-gray-500 text-sm font-medium">Catégorie</span>
                             <span className="font-bold text-gray-900 text-sm">{tip.category}</span>
                          </div>
                       </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 flex gap-3 items-start">
                       <AlertTriangle className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
                       <p className="text-xs text-orange-900 leading-relaxed font-medium">
                          <strong>Note :</strong> La mécanique moto comporte des risques. En cas de doute, consultez toujours un professionnel.
                       </p>
                    </div>

                 </div>
              </div>

           </div>
        </div>

        {/* Read Next Section */}
        <section className="bg-white mt-12 py-16 md:py-24 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Autres conseils utiles</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedTips.map(rel => (
                        <div 
                          key={rel.id} 
                          onClick={() => onNavigate?.('tip-details', { id: rel.id })}
                          className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-all cursor-pointer group border border-gray-200 flex flex-col h-full hover:-translate-y-1 duration-300"
                        >
                            <div className="relative h-48 overflow-hidden bg-gray-100">
                                <img src={rel.image} alt={rel.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 left-3">
                                    <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-xs font-bold uppercase tracking-wider rounded-lg text-gray-800 shadow-sm">
                                        {rel.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 font-medium">
                                   <span className={`w-2 h-2 rounded-full ${rel.difficulty === 'Expert' ? 'bg-red-500' : rel.difficulty === 'Intermédiaire' ? 'bg-warning-500' : 'bg-success-500'}`}></span>
                                   {rel.difficulty}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
                                    {rel.title}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                                    {rel.summary}
                                </p>
                                <span className="text-sm font-bold text-primary-600 flex items-center gap-1 mt-auto group-hover:gap-2 transition-all">
                                    Consulter <ChevronRight size={16} />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

      </main>
    </div>
  );
};

export default TipDetails;
