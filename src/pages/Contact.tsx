import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="bg-cream min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-primary">Contactez-nous</h1>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4 mb-6"></div>
          <p className="text-gray-600">Notre service client est à votre écoute pour toute question.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-lg shadow-sm border border-subtle-brown/20">
          <div className="space-y-8">
            <h2 className="text-2xl font-serif text-primary">Nos coordonnées</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/10 text-gold rounded-full">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-primary">Téléphone / WhatsApp</h3>
                  <p className="text-gray-600">77 460 18 67</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/10 text-gold rounded-full">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-primary">Email</h3>
                  <p className="text-gray-600">ask.shop.sn@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/10 text-gold rounded-full">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-primary">Localisation</h3>
                  <p className="text-gray-600">Dakar, Sénégal</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/10 text-gold rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
                <div>
                  <h3 className="font-medium text-primary">Instagram</h3>
                  <p className="text-gray-600">@a.s.k._shop_sn</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                <input type="text" className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={5} className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:border-gold resize-none"></textarea>
              </div>
              <button className="w-full bg-gold hover:bg-gold-dark text-white font-medium py-3 rounded-md transition-colors">
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
