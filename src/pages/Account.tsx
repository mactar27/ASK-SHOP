import React, { useState } from 'react';

const mockUser = {
  name: 'Fatou Diop',
  email: 'fatou.diop@example.com',
  phone: '77 123 45 67',
  address: 'Medina, Rue 11x10, Dakar'
};

const mockOrders = [
  { id: '#1258', date: '15/08/2026', items: 3, total: 30000, status: 'En attente' },
  { id: '#1257', date: '10/08/2026', items: 1, total: 25000, status: 'Livrée' },
];

export const Account: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

  if (!isAuthenticated) {
    return (
      <div className="bg-cream min-h-[70vh] flex items-center justify-center py-12 px-4">
        <div className="bg-white p-8 md:p-10 rounded-md shadow-sm border border-subtle-brown/20 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif text-primary mb-2">Connexion</h1>
            <p className="text-gray-500 text-sm">Accédez à votre espace client</p>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" required className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input type="password" required className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:border-gold" />
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-xs text-gold hover:underline">Mot de passe oublié ?</a>
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-black text-white font-medium py-3 rounded-md transition-colors mt-4">
              Se connecter
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            Vous n'avez pas de compte ? <a href="#" className="text-gold font-medium hover:underline">S'inscrire</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-10">
          <h1 className="text-3xl font-serif text-primary">Mon Compte</h1>
          <p className="text-gray-500 mt-2">Bonjour, {mockUser.name} ✨</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-md shadow-sm border border-subtle-brown/10 overflow-hidden">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-6 py-4 font-medium transition-colors ${activeTab === 'orders' ? 'bg-gold/10 text-gold border-l-4 border-gold' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
              >
                Mes Commandes
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-6 py-4 font-medium transition-colors ${activeTab === 'profile' ? 'bg-gold/10 text-gold border-l-4 border-gold' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'}`}
              >
                Mon Profil
              </button>
              <button 
                onClick={() => setIsAuthenticated(false)}
                className="w-full text-left px-6 py-4 font-medium text-red-500 hover:bg-red-50 transition-colors border-l-4 border-transparent"
              >
                Déconnexion
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'orders' && (
              <div className="bg-white rounded-md shadow-sm border border-subtle-brown/10 p-6 md:p-8">
                <h2 className="text-xl font-serif text-primary mb-6">Historique de commandes</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 font-medium text-gray-600 text-sm">Commande</th>
                        <th className="py-3 px-4 font-medium text-gray-600 text-sm">Date</th>
                        <th className="py-3 px-4 font-medium text-gray-600 text-sm">Articles</th>
                        <th className="py-3 px-4 font-medium text-gray-600 text-sm">Total</th>
                        <th className="py-3 px-4 font-medium text-gray-600 text-sm">Statut</th>
                        <th className="py-3 px-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order, idx) => (
                        <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                          <td className="py-4 px-4 text-sm font-medium">{order.id}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{order.date}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{order.items}</td>
                          <td className="py-4 px-4 text-sm font-medium">{order.total.toLocaleString('fr-FR')} FCFA</td>
                          <td className="py-4 px-4 text-sm">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Livrée' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button className="text-sm text-gold hover:underline">Voir</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-md shadow-sm border border-subtle-brown/10 p-6 md:p-8">
                <h2 className="text-xl font-serif text-primary mb-6">Informations personnelles</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <input type="text" defaultValue={mockUser.name} className="w-full border border-gray-300 rounded-md py-2.5 px-3 bg-gray-50" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" defaultValue={mockUser.email} className="w-full border border-gray-300 rounded-md py-2.5 px-3 bg-gray-50" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input type="text" defaultValue={mockUser.phone} className="w-full border border-gray-300 rounded-md py-2.5 px-3 bg-gray-50" readOnly />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                    <input type="text" defaultValue={mockUser.address} className="w-full border border-gray-300 rounded-md py-2.5 px-3 bg-gray-50" readOnly />
                  </div>
                </div>
                <div className="mt-8">
                  <button className="bg-white border border-gray-300 hover:border-gold hover:text-gold text-primary font-medium py-2.5 px-6 rounded-md transition-colors">
                    Modifier mes informations
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
