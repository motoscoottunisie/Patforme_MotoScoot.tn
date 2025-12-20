import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin,
  Tag,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import Header from './layout/Header';
import { mockArticles } from '../data/mockData';

interface ArticleDetailsProps {
  articleId: number;
  onGoHome?: () => void;
  onNavigate?: (view: string, params?: any) => void;
  onBack?: () => void;
  isLoggedIn?: boolean;
  onTriggerLogin?: () => void;
  onLogout?: () => void;
}

const ArticleDetails: React.FC<ArticleDetailsProps> = ({ 
  articleId, 
  onGoHome, 
  onNavigate, 
  onBack,
  isLoggedIn, 
  onTriggerLogin, 
  onLogout 
}) => {
  
  // Find article
  const article = mockArticles.find(a => a.id === articleId) || mockArticles[0];
  const relatedArticles = mockArticles.filter(a => a.id !== article.id).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  return (
    <div className="min-h-screen bg-white font-sans pb-12">
      
      <Header 
        variant="white" 
        onNavigate={onNavigate} 
        onGoHome={onGoHome} 
        isLoggedIn={isLoggedIn}
        onTriggerLogin={onTriggerLogin}
        onLogout={onLogout}
      />

      {/* Progress Bar (Reading) - Optional Visual Flourish */}
      <div className="fixed top-0 left-0 h-1 bg-primary-600 z-[60] w-full origin-left transform scale-x-0 animate-scroll-progress"></div>

      <main className="pt-20 md:pt-28">
        {/* Article Header / Hero */}
        <div className="max-w-4xl mx-auto px-6 md:px-8 pt-6 md:pt-12 pb-8">
            
            {/* Breadcrumb & Back */}
            <div className="flex items-center justify-between mb-8">
                <button 
                  onClick={onBack}
                  className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Retour aux actualités
                </button>
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                    <span onClick={() => onNavigate?.('news')} className="hover:text-gray-900 cursor-pointer">Actualités</span>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium">{article.category}</span>
                </div>
            </div>

            {/* Title & Meta */}
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                        {article.author.charAt(0)}
                    </div>
                    <span className="font-bold text-gray-900">{article.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Calendar size={16} />
                    <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock size={16} />
                    <span>{article.readTime} de lecture</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wide">
                    {article.category}
                </span>
            </div>
        </div>

        {/* Featured Image - Full Width Container */}
        <div className="w-full max-w-5xl mx-auto px-0 md:px-6 mb-12">
            <div className="relative aspect-[16/9] md:rounded-3xl overflow-hidden shadow-sm">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
            </div>
        </div>

        {/* Content & Sidebar Layout */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Social Sidebar (Desktop) */}
            <div className="hidden lg:block lg:col-span-1 lg:col-start-2">
                <div className="sticky top-32 flex flex-col gap-4 items-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 [writing-mode:vertical-lr] rotate-180">Partager</p>
                    <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-500 hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all">
                        <Facebook size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-500 hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-all">
                        <Twitter size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-500 hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-all">
                        <Linkedin size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-800 hover:text-white flex items-center justify-center transition-all">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <article className="lg:col-span-8 lg:col-start-3 max-w-3xl">
                {/* Intro Summary */}
                <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed mb-10 border-l-4 border-primary-600 pl-6">
                    {article.summary}
                </p>

                {/* Article Body HTML content */}
                <div 
                  className="prose prose-lg prose-gray max-w-none 
                    prose-headings:font-bold prose-headings:text-gray-900 
                    prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-2xl prose-img:shadow-md
                    prose-blockquote:border-l-primary-600 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic"
                  dangerouslySetInnerHTML={{ __html: article.content || "<p>Contenu en cours de rédaction...</p>" }}
                />

                {/* Tags */}
                {article.tags && (
                    <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
                        {article.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                                <Tag size={14} />
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </article>

        </div>

        {/* Read Next Section */}
        <section className="bg-gray-50 mt-20 py-16 md:py-24 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">À lire aussi</h2>
                    <button 
                      onClick={() => onNavigate?.('news')}
                      className="hidden md:flex items-center font-bold text-primary-600 hover:text-primary-700 transition-colors group"
                    >
                        Toute l'actualité
                        <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedArticles.map(rel => (
                        <div 
                          key={rel.id} 
                          onClick={() => onNavigate?.('article-details', { id: rel.id })}
                          className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img src={rel.image} alt={rel.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 left-3">
                                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider rounded-md">
                                        {rel.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                    <Calendar size={12} /> {rel.date}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                                    {rel.title}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                                    {rel.summary}
                                </p>
                                <span className="text-sm font-bold text-primary-600 flex items-center gap-1 mt-auto">
                                    Lire l'article <ChevronRight size={16} />
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

export default ArticleDetails;