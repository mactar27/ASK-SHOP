import React from 'react';

const feed = [
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=300&auto=format&fit=crop"
];

export const InstagramFeed: React.FC = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">Suivez-nous sur Instagram</h2>
          <p className="text-gray-500 max-w-lg mb-8">
            Découvrez nos nouveautés, nos offres et nos clientes satisfaites ✨
          </p>
          <a 
            href="https://instagram.com/a.s.k._shop_sn" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:border-gold hover:text-gold transition-colors font-medium text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            @a.s.k._shop_sn
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
          {feed.map((img, idx) => (
            <a 
              key={idx} 
              href="https://instagram.com/a.s.k._shop_sn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden group block rounded-sm"
            >
              <img 
                src={img} 
                alt={`Instagram post ${idx + 1}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
