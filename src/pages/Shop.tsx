import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';

const categories = [
  "Toutes les catégories",
  "Parfums",
  "Brumes",
  "Muscs",
  "Huiles",
  "Lunettes",
  "Accessoires"
];

import { useAdminStore } from '../store/useAdminStore';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'Toutes les catégories';
  const [activeCategory, setActiveCategory] = useState(
    categories.find(c => c.toLowerCase() === initialCategory.toLowerCase()) || "Toutes les catégories"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Populaires");

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === "Toutes les catégories") {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category.toLowerCase());
    }
    setSearchParams(searchParams);
  };

  const { products: allProducts, isLoading } = useAdminStore();
  
  const filteredProducts = allProducts
    .filter(p => activeCategory === "Toutes les catégories" || (p.category && p.category.toLowerCase() === activeCategory.toLowerCase()))
    .filter(p => p.name && p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "Prix croissant") return a.price - b.price;
      if (sortBy === "Prix décroissant") return b.price - a.price;
      return 0; // Default to Popular (which is just the initial order for now)
    });

  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-28 bg-white p-6 rounded-md shadow-sm border border-subtle-brown/10">
              <h3 className="font-serif text-lg text-primary mb-4 font-semibold">Catégories</h3>
              <ul className="space-y-3">
                {categories.map((cat, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => handleCategoryChange(cat)}
                      className={`text-sm text-left w-full transition-colors ${
                        activeCategory === cat ? 'text-gold font-medium' : 'text-gray-600 hover:text-gold'
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-md shadow-sm border border-subtle-brown/10">
              <h1 className="font-serif text-2xl text-primary font-semibold">Boutique</h1>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold w-full sm:w-48"
                  />
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500 whitespace-nowrap">Trier par :</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-200 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-gold text-primary bg-white"
                  >
                    <option value="Populaires">Populaires</option>
                    <option value="Prix croissant">Prix croissant</option>
                    <option value="Prix décroissant">Prix décroissant</option>
                    <option value="Nouveautés">Nouveautés</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="bg-white p-12 text-center rounded-md shadow-sm border border-subtle-brown/10">
                <p className="text-gray-500">Chargement des produits...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-md shadow-sm border border-subtle-brown/10">
                <p className="text-gray-500">Aucun produit ne correspond à votre recherche.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
