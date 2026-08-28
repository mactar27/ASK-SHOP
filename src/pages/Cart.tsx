import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, getTotalItems, getTotalPrice } = useCartStore();
  const navigate = useNavigate();

  const subTotal = getTotalPrice();
  const delivery = subTotal > 0 ? 2000 : 0; // Flat rate for now
  const total = subTotal + delivery;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-cream px-4">
        <h2 className="text-2xl font-serif text-primary mb-4">Votre panier est vide</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Découvrez nos collections de parfums et accessoires pour trouver votre signature.
        </p>
        <Link 
          to="/shop" 
          className="bg-gold text-white px-8 py-3 rounded-md hover:bg-gold-dark transition-colors font-medium"
        >
          Découvrir la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-serif text-primary mb-8">Mon panier ({getTotalItems()})</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.variant}`} className="bg-white p-4 rounded-md shadow-sm border border-subtle-brown/10 flex gap-4 items-center">
                <div className="w-20 h-24 bg-[#f9f9f9] rounded flex-shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <h3 className="font-medium text-primary line-clamp-1">{item.name}</h3>
                    {item.variant && <p className="text-xs text-gray-500 mt-1">Variante : {item.variant}</p>}
                    <p className="font-bold text-primary mt-2">{item.price.toLocaleString('fr-FR')} FCFA</p>
                  </div>
                  
                  <div className="flex items-center gap-4 sm:ml-auto">
                    <div className="flex items-center border border-gray-300 rounded-md bg-white">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                        className="px-3 py-1 text-gray-600 hover:text-gold transition-colors"
                        disabled={item.quantity <= 1}
                      >−</button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                        className="px-3 py-1 text-gray-600 hover:text-gold transition-colors"
                      >+</button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id, item.variant)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80">
            <div className="bg-white p-6 rounded-md shadow-sm border border-subtle-brown/10 sticky top-28">
              <h3 className="font-serif text-xl text-primary mb-6">Récapitulatif</h3>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span className="font-medium">{subTotal.toLocaleString('fr-FR')} FCFA</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison (Dakar)</span>
                  <span className="font-medium">{delivery.toLocaleString('fr-FR')} FCFA</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4 mb-8">
                <div className="flex justify-between items-center text-primary">
                  <span className="font-medium text-lg">Total</span>
                  <span className="font-bold text-xl">{total.toLocaleString('fr-FR')} FCFA</span>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-primary hover:bg-black text-white font-medium py-3 rounded-md transition-colors"
              >
                Passer la commande
              </button>
              
              <div className="mt-4 flex justify-center">
                <Link to="/shop" className="text-sm text-gold hover:text-gold-dark transition-colors font-medium">
                  Continuer mes achats
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
