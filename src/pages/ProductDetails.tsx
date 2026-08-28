import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShieldCheck, Truck, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

import { useAdminStore } from '../store/useAdminStore';

export const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const { products } = useAdminStore();
  const product = products.find(p => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [activeVariant, setActiveVariant] = useState(product?.variants[0] || "");
  const [activeImage, setActiveImage] = useState(product?.image || "");
  
  // Accordion state
  const [openSection, setOpenSection] = useState<string | null>("description");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  if (!product) {
    return <div className="min-h-[50vh] flex items-center justify-center">Produit introuvable.</div>;
  }

  const handleDecrease = () => setQuantity(prev => Math.max(1, prev - 1));
  const handleIncrease = () => setQuantity(prev => prev + 1);

  const handleAddToCart = () => {
    useCartStore.getState().addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      variant: product.variants.length > 0 ? activeVariant : undefined
    });
    // Silent add to cart without alert
  };

  return (
    <div className="bg-cream min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-gold transition-colors">Accueil</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-gold transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-primary font-medium">{product.name}</span>
        </div>

        <div className="bg-white p-6 md:p-12 rounded-md shadow-sm border border-subtle-brown/10 mb-12">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-[4/5] bg-[#f9f9f9] rounded-md overflow-hidden relative">
                <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setActiveImage(product.image)}
                  className={`w-20 aspect-square rounded-md overflow-hidden border-2 transition-colors ${activeImage === product.image ? 'border-gold' : 'border-transparent'}`}
                >
                  <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
                </button>
                {product.gallery.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 aspect-square rounded-md overflow-hidden border-2 transition-colors ${activeImage === img ? 'border-gold' : 'border-transparent'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 2}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <h1 className="font-serif text-3xl md:text-4xl text-primary mb-2 font-semibold">{product.name}</h1>
              <p className="font-bold text-2xl text-primary mb-4">{product.price.toLocaleString('fr-FR')} FCFA</p>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviewsCount} avis)</span>
              </div>

              <p className="text-gray-600 mb-8 text-sm md:text-base leading-relaxed">
                {product.shortDescription}
              </p>

              {product.variants.length > 0 && (
                <div className="mb-6">
                  <span className="block text-sm font-medium text-gray-700 mb-2">Contenance</span>
                  <select 
                    value={activeVariant}
                    onChange={(e) => setActiveVariant(e.target.value)}
                    className="w-full md:w-1/2 border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                  >
                    {product.variants.map((v, i) => (
                      <option key={i} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-8">
                <span className="block text-sm font-medium text-gray-700 mb-2">Quantité</span>
                <div className="flex items-center border border-gray-300 rounded-md w-max">
                  <button onClick={handleDecrease} className="px-4 py-2 text-gray-600 hover:text-gold transition-colors">−</button>
                  <span className="w-10 text-center font-medium">{quantity}</span>
                  <button onClick={handleIncrease} className="px-4 py-2 text-gray-600 hover:text-gold transition-colors">+</button>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full md:w-3/4 bg-gold hover:bg-gold-dark text-white font-medium py-4 rounded-md transition-colors mb-8 shadow-md"
              >
                Ajouter au panier
              </button>

              <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <CreditCard className="text-gold" size={24} />
                  <span className="text-xs text-gray-600">Paiement à la livraison</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck className="text-gold" size={24} />
                  <span className="text-xs text-gray-600">Livraison partout au Sénégal</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <ShieldCheck className="text-gold" size={24} />
                  <span className="text-xs text-gray-600">Produits Authentiques</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accordions */}
        <div className="bg-white rounded-md shadow-sm border border-subtle-brown/10 max-w-3xl mx-auto">
          {[
            { id: 'description', title: 'Description', content: product.description },
            { id: 'info', title: 'Informations complémentaires', content: 'Détails sur les ingrédients et l\'utilisation...' },
            { id: 'reviews', title: `Avis (${product.reviewsCount})`, content: 'Les avis de nos clients...' }
          ].map((section) => (
            <div key={section.id} className="border-b border-gray-100 last:border-0">
              <button 
                onClick={() => toggleSection(section.id)}
                className="w-full flex justify-between items-center py-5 px-6 font-medium text-primary hover:text-gold transition-colors"
              >
                <span>{section.title}</span>
                {openSection === section.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openSection === section.id && (
                <div className="px-6 pb-6 text-gray-600 text-sm">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
