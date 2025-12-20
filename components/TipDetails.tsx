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

      <main className="pt-20 md:pt-24">
        {/* Title & Metadata Section - Now integrated directly on the page background */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 md:py-8">
            
            {/* Breadcrumb & Back */}
            <div className="flex items-center justify-between mb-6">
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Header Info (8 cols) */}
                <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getDifficultyColor(tip.difficulty)}`}>
                            {tip.difficulty}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white text-gray-600 text-[10px] font-black uppercase tracking-widest border border-gray-200">
                            {tip.category}
                        </span>
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
                        {tip.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 font-bold uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-black border border-primary-200">
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
                <div className="hidden lg:flex lg:col-span-4 justify-end pt-2">
                   <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-50 hover:text-primary-600 hover:border-primary-300 transition-all shadow-sm active:scale-95">
                      <Share2 size={18} />
                      Partager
                   </button>
                </div>
            </div>
        </div>

        {/* Content Layout */}
        <div className="max-w-7xl mx-auto px-6 md:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* LEFT COLUMN: Main Content (8 cols) */}
              <div className="lg:col-span-8">
                 
                 {/* Hero Image */}
                 <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-lg mb-10 aspect-video relative border border-gray-100 bg-white">
                    <img src={tip.image} alt={tip.title} className="w-full h-full object-cover" />
                 </div>

                 {/* Intro Summary */}
                 <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-10">
                     <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-semibold italic">
                        {tip.summary}
                     </p>
                 </div>

                 {/* Rich Content Body */}
                 <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm mb-12">
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
                 <div className="bg-gray-100/50 border border-gray-200 rounded-3xl p-8 text-center mb-16">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider">Ce guide vous a-t-il été utile ?</h3>
                    <div className="flex justify-center gap-4">
                       <button 
                         onClick={() => setHelpful('yes')}
                         className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all border uppercase text-xs tracking-widest ${helpful === 'yes' ? 'bg-success-600 text-white border-success-600 shadow-xl scale-105' : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200 shadow-sm'}`}
                       >
                          <ThumbsUp size={18} /> Oui
                       </button>
                       <button 
                         onClick={() => setHelpful('no')}
                         className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all border uppercase text-xs tracking-widest ${helpful === 'no' ? 'bg-gray-800 text-white border-gray-800 shadow-xl scale-105' : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200 shadow-sm'}`}
                       >
                          <ThumbsDown size={18} /> Non
                       </button>
                    </div>
                    {helpful === 'yes' && <p className="text-success-600 font-black mt-6 animate-fade-in-up flex items-center justify-center gap-2 uppercase text-xs tracking-widest"><CheckCircle2 size={18}/> Merci pour votre retour !</p>}
                 </div>

              </div>

              {/* RIGHT COLUMN: Sidebar (4 cols) */}
              <div className="lg:col-span-4 space-y-8">
                 
                 {/* Toolkit Card (Sticky) */}
                 <div className="sticky top-24 space-y-6">
                    
                    {/* Tools Needed */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                       <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-5 flex items-center gap-3">
                          <div className="bg-white/10 p-2 rounded-lg">
                             <Wrench className="text-white" size={20} />
                          </div>
                          <h3 className="font-black text-white text-base uppercase tracking-wider">Matériel Requis</h3>
                       </div>
                       <div className="p-6">
                          {tip.tools && tip.tools.length > 0 ? (
                             <ul className="space-y-4">
                                {tip.tools.map((tool, idx) => (
                                   <li key={idx} className="flex items-start gap-3 group">
                                      <div className="w-5 h-5 rounded-full bg-primary-50 text-primary-600 border border-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                         <CheckCircle2 size={12} />
                                      </div>
                                      <span className="text-gray-700 font-bold text-sm leading-tight pt-0.5">{tool}</span>
                                   </li>
                                ))}
                             </ul>
                          ) : (
                             <p className="text-gray-400 italic text-sm">Aucun matériel spécifique requis.</p>
                          )}
                       </div>
                    </div>

                    {/* Quick Stats Card */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                       <h3 className="font-black text-gray-900 mb-5 flex items-center gap-2 uppercase text-xs tracking-widest">
                          <Lightbulb className="text-warning-500 fill-warning-400" size={18} />
                          En bref
                       </h3>
                       <div className="space-y-4">
                          <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                             <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Difficulté</span>
                             <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase border ${getDifficultyColor(tip.difficulty)}`}>{tip.difficulty}</span>
                          </div>
                          <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                             <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Temps</span>
                             <span className="font-black text-gray-900 text-xs">{tip.readTime}</span>
                          </div>
                          <div className="flex justify-between items-center">
                             <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Catégorie</span>
                             <span className="font-black text-gray-900 text-xs uppercase">{tip.category}</span>
                          </div>
                       </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100 flex gap-3 items-start">
                       <AlertTriangle className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
                       <p className="text-[10px] text-orange-900 leading-relaxed font-bold uppercase tracking-tight">
                          Note : La mécanique moto comporte des risques. En cas de doute, consultez un professionnel certifié.
                       </p>
                    </div>

                 </div>
              </div>

           </div>
        </div>

        {/* Read Next Section */}
        <section className="bg-white mt-12 py-16 md:py-24 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-10 uppercase">À consulter également</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedTips.map(rel => (
                        <div 
                          key={rel.id} 
                          onClick={() => onNavigate?.('tip-details', { id: rel.id })}
                          className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group border border-gray-100 flex flex-col h-full hover:-translate-y-1 duration-300"
                        >
                            <div className="relative h-48 overflow-hidden bg-gray-100">
                                <img src={rel.image} alt={rel.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 left-3">
                                    <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-lg text-gray-800 shadow-sm border border-white/50">
                                        {rel.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                   <span className={`w-2 h-2 rounded-full ${rel.difficulty === 'Expert' ? 'bg-red-500' : rel.difficulty === 'Intermédiaire' ? 'bg-warning-500' : 'bg-success-500'}`}></span>
                                   {rel.difficulty}
                                </div>
                                <h3 className="text-lg font-black text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
                                    {rel.title}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-1 font-medium">
                                    {rel.summary}
                                </p>
                                <span className="text-xs font-black text-primary-600 flex items-center gap-1 mt-auto uppercase tracking-widest group-hover:gap-2 transition-all">
                                    Lire la suite <ChevronRight size={16} />
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