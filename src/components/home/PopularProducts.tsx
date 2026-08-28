import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '../ui/ProductCard';

import { useAdminStore } from '../../store/useAdminStore';

export const PopularProducts: React.FC = () => {
  const { products } = useAdminStore();
  const popularProducts = products.slice(0, 5);
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-2">Nos produits populaires</h2>
            <div className="w-12 h-0.5 bg-gold mt-2"></div>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-gold hover:text-gold-dark transition-colors font-medium text-sm">
            Voir tout <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {popularProducts.length > 0 ? (
            popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-8 text-center text-gray-500">
              Chargement des produits...
            </div>
          )}
        </div>
        
        <div className="mt-8 flex justify-center md:hidden">
          <Link to="/shop" className="flex items-center gap-2 text-gold hover:text-gold-dark transition-colors font-medium text-sm">
            Voir tout <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
