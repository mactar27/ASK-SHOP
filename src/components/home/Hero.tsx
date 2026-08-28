import React from 'react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-28 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        
        {/* Text Content */}
        <div className="space-y-6 relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-serif text-primary leading-[1.05]">
            Un éclat,<br />
            une <span className="text-gold" style={{ fontFamily: '"Great Vibes", cursive', fontSize: '1.35em', letterSpacing: '0.02em' }}>signature.</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Parfums • Brumes • Muscs • Huiles<br />
            Lunettes &amp; Accessoires
          </p>
          
          <div className="pt-2">
            <Link 
              to="/shop" 
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-medium text-sm tracking-wider uppercase hover:bg-black transition-colors duration-300"
            >
              Découvrir la boutique
            </Link>
          </div>
        </div>

        {/* Image Content - product collage */}
        <div className="relative z-10 flex justify-center md:justify-end">
          <div className="relative w-full max-w-md">
            {/* Main image */}
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=900&auto=format&fit=crop" 
                alt="A.S.K Shop Collection" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating card - product detail bottom left */}
            <div className="absolute -bottom-4 -left-6 md:-left-10 bg-white rounded-md shadow-xl p-3 flex items-center gap-3 z-20 w-44">
              <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1589365278144-c9e705f843ba?q=80&w=100&auto=format&fit=crop"
                  alt="product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 leading-tight">Musc Blanc</p>
                <p className="text-xs font-bold text-primary leading-tight">8 500 FCFA</p>
              </div>
            </div>

            {/* Floating badge top right */}
            <div className="absolute -top-4 -right-4 md:-right-6 bg-gold rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-lg z-20">
              <span className="text-white text-[10px] font-bold leading-tight text-center">NOUVEAU</span>
            </div>

            {/* Decorative background block */}
            <div className="absolute -z-10 top-8 -right-4 md:-right-8 w-full h-full bg-beige rounded-sm" />
          </div>
        </div>
      </div>
      
      {/* Subtle background gradient */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-[#f5eee6] rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/4" />
    </section>
  );
};
