import React from 'react';

export const PromoBanner: React.FC = () => {
  return (
    <section className="py-12 bg-cream">
      <div className="container mx-auto px-4">
        <div className="relative w-full rounded-md overflow-hidden bg-[#0a0a0a] border border-gold/30 flex flex-col md:flex-row shadow-2xl">
          
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1200&auto=format&fit=crop"
              alt="Background"
              className="w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(207,169,104,0.15) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(207,169,104,0.1) 0%, transparent 60%)'
            }} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row w-full py-14 md:py-20">
            {/* Left Text */}
            <div className="flex-1 px-8 md:px-16 flex flex-col justify-center items-center md:items-start text-center md:text-left">
              <span className="text-gold uppercase tracking-[0.25em] text-xs md:text-sm mb-3 font-semibold">Offre spéciale</span>
              <h3 className="text-5xl md:text-7xl font-serif mb-4 text-white tracking-wide leading-none">15 AOÛT</h3>
              <p className="text-2xl md:text-3xl text-gold" style={{ fontFamily: '"Great Vibes", cursive' }}>Faites-vous plaisir !</p>
            </div>

            {/* Divider */}
            <div className="hidden md:flex items-center">
              <div className="w-px h-32 bg-gradient-to-b from-transparent via-gold/60 to-transparent" />
            </div>
            <div className="md:hidden w-3/4 mx-auto my-6 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            
            {/* Right Text */}
            <div className="flex-1 px-8 md:px-16 flex flex-col justify-center items-center md:items-start text-center md:text-left">
              <div className="space-y-1 mb-8">
                <h4 className="text-3xl md:text-5xl font-serif text-white tracking-wide">1 ACHETÉ,</h4>
                <h4 className="text-3xl md:text-5xl font-serif text-gold tracking-wide">1 CADEAU OFFERT</h4>
              </div>
              
              <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                  <rect x="3" y="11" width="18" height="10" rx="2"/>
                  <path d="M12 22V11"/>
                  <path d="M7.5 11c1.5 0 3-1.5 4.5-3 1.5-1.5 1.5-4.5 0-4.5-1.5 0-4.5 1.5-4.5 4.5s0 3 0 3z"/>
                  <path d="M16.5 11c-1.5 0-3-1.5-4.5-3-1.5-1.5-1.5-4.5 0-4.5 1.5 0 4.5 1.5 4.5 4.5s0 3 0 3z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
