import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewsCount: number;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore(state => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group flex flex-col bg-white rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-[#f9f5f0]">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-beige">
            <span className="text-gray-300 text-4xl">✦</span>
          </div>
        )}
        
        {/* Add to cart button - overlay */}
        <button 
          className={`absolute bottom-3 right-3 p-2.5 rounded-full shadow-md transition-all duration-300 z-10
            ${added 
              ? 'bg-gold text-white scale-110' 
              : 'bg-white text-primary hover:bg-primary hover:text-white md:opacity-0 md:-translate-y-1 md:group-hover:opacity-100 md:group-hover:translate-y-0'
            }`}
          aria-label="Ajouter au panier"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={16} />
        </button>
      </Link>
      
      {/* Info */}
      <div className="p-3 md:p-4 flex flex-col gap-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-primary text-sm leading-snug hover:text-gold transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="font-bold text-primary text-sm md:text-base mt-1">
          {product.price.toLocaleString('fr-FR')} FCFA
        </p>
        
        {product.rating > 0 && (
          <div className="flex items-center gap-1 mt-0.5">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <Star 
                  key={i} 
                  size={10} 
                  className={i <= Math.round(product.rating) ? "fill-gold text-gold" : "text-gray-200 fill-gray-200"} 
                />
              ))}
            </div>
            <span className="text-[11px] text-gray-500">({product.reviewsCount})</span>
          </div>
        )}
      </div>
    </div>
  );
};
