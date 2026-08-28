import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';
import { TopBar } from './TopBar';
import { useCartStore } from '../../store/useCartStore';

export const Header: React.FC = () => {
  const totalItems = useCartStore(state => state.getTotalItems());

  return (
    <header className="w-full sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-subtle-brown/20">
      <TopBar />
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex flex-col items-center justify-center text-primary leading-none mt-2">
          <span className="text-xl font-bold tracking-[0.2em] mb-0.5">A•S-K</span>
          <span className="text-3xl text-gold" style={{ fontFamily: '"Great Vibes", cursive', lineHeight: '0.7' }}>Shop</span>
          <span className="text-sm font-semibold tracking-[0.2em] mt-1.5">S•N</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-gold transition-colors">Accueil</Link>
          <Link to="/shop" className="hover:text-gold transition-colors">Boutique</Link>
          <Link to="/shop?category=parfums" className="hover:text-gold transition-colors text-gray-500 hover:text-gray-900">Parfums</Link>
          <Link to="/shop?category=lunettes" className="hover:text-gold transition-colors text-gray-500 hover:text-gray-900">Lunettes</Link>
          <Link to="/shop?category=accessoires" className="hover:text-gold transition-colors text-gray-500 hover:text-gray-900">Accessoires</Link>
          <Link to="/about" className="hover:text-gold transition-colors text-gray-500 hover:text-gray-900">À propos</Link>
          <Link to="/contact" className="hover:text-gold transition-colors text-gray-500 hover:text-gray-900">Contact</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button className="text-primary hover:text-gold transition-colors">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link to="/cart" className="text-primary hover:text-gold transition-colors relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-gold text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
