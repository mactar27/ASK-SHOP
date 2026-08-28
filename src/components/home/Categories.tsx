import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: "PARFUMS",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=300&auto=format&fit=crop",
    link: "/shop?category=parfums"
  },
  {
    name: "BRUMES",
    image: "https://images.unsplash.com/photo-1595526114101-2a0280eb4c75?q=80&w=300&auto=format&fit=crop",
    link: "/shop?category=brumes"
  },
  {
    name: "MUSCS",
    image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?q=80&w=300&auto=format&fit=crop",
    link: "/shop?category=muscs"
  },
  {
    name: "HUILES",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=300&auto=format&fit=crop",
    link: "/shop?category=huiles"
  },
  {
    name: "LUNETTES",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=300&auto=format&fit=crop",
    link: "/shop?category=lunettes"
  },
  {
    name: "ACCESSOIRES",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=300&auto=format&fit=crop",
    link: "/shop?category=accessoires"
  }
];

export const Categories: React.FC = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-primary mb-2">Nos catégories</h2>
          <div className="w-12 h-0.5 bg-gold mt-2"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 justify-items-center">
          {categories.map((category, idx) => (
            <Link 
              key={idx} 
              to={category.link}
              className="flex flex-col items-center group"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-gold transition-all duration-300 shadow-sm p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-beige">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <span className="text-sm font-medium text-primary tracking-wider group-hover:text-gold transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
