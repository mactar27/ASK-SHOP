import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

import { useAdminStore } from '../store/useAdminStore';

export const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { shippingZones, addOrder, addCustomer } = useAdminStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Use dynamic shipping zones, fallback to a default if empty
  const defaultZone = shippingZones[0] || { id: 'default', zone: 'Standard', price: 2000 };
  const [deliveryZone, setDeliveryZone] = useState(defaultZone);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Dakar',
    neighborhood: '',
    instructions: ''
  });

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const subTotal = getTotalPrice();
  const total = subTotal + deliveryZone.price;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final submit: Generate real order and customer in database
      const orderId = `#${Math.floor(1000 + Math.random() * 9000)}`;
      const today = new Date().toLocaleDateString('fr-FR');
      
      const orderData = {
        client: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        date: today,
        amount: total,
        items: items.length,
        status: 'En attente',
        color: 'bg-blue-100 text-blue-700'
      };
      await addOrder(orderData as Parameters<typeof addOrder>[0]);

      const customerData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        orders: 1,
        totalSpent: total,
        lastOrder: today
      };
      await addCustomer(customerData as Parameters<typeof addCustomer>[0]);

      clearCart();
      navigate('/confirmation', { 
        state: { 
          order: {
            id: orderId,
            total,
            items: items.length,
            delivery: deliveryZone.zone,
            payment: 'À la livraison'
          }
        } 
      });
    }
  };

  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-colors ${
                  step > s ? 'bg-gold text-white' : step === s ? 'bg-primary text-white' : 'bg-white text-gray-400 border border-gray-200'
                }`}>
                  {step > s ? <Check size={18} /> : s}
                </div>
                <span className={`text-xs mt-2 font-medium ${step >= s ? 'text-primary' : 'text-gray-400'}`}>
                  {s === 1 ? 'Informations' : s === 2 ? 'Livraison' : 'Confirmation'}
                </span>
              </div>
              {s < 3 && (
                <div className={`w-16 md:w-32 h-0.5 mx-2 -mt-6 ${step > s ? 'bg-gold' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Content */}
          <div className="flex-1">
            <form id="checkout-form" onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-md shadow-sm border border-subtle-brown/10">
              
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-serif text-primary mb-6">Informations personnelles</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Nom complet *</label>
                      <input required name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:border-gold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Téléphone *</label>
                      <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:border-gold" />
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">Email (optionnel)</label>
                      <input name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:border-gold" />
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">Adresse détaillée *</label>
                      <input required name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:border-gold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Ville *</label>
                      <input required name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:border-gold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Quartier *</label>
                      <input required name="neighborhood" value={formData.neighborhood} onChange={handleInputChange} type="text" className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:border-gold" />
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">Instructions de livraison (optionnel)</label>
                      <textarea name="instructions" value={formData.instructions} onChange={handleInputChange} rows={3} className="w-full border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none focus:border-gold resize-none"></textarea>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-serif text-primary mb-6">Zone de livraison</h2>
                  <div className="space-y-3">
                    {shippingZones.map(zone => (
                      <label key={zone.id} className={`flex items-center justify-between p-4 border rounded-md cursor-pointer transition-colors ${deliveryZone.id === zone.id ? 'border-gold bg-gold/5' : 'border-gray-200 hover:border-gold/50'}`}>
                        <div className="flex items-center gap-3">
                          <input 
                            type="radio" 
                            name="deliveryZone" 
                            checked={deliveryZone.id === zone.id}
                            onChange={() => setDeliveryZone(zone)}
                            className="w-4 h-4 text-gold focus:ring-gold accent-gold"
                          />
                          <span className="font-medium text-primary">{zone.zone}</span>
                        </div>
                        <span className="text-sm font-medium">{zone.price.toLocaleString('fr-FR')} FCFA</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-serif text-primary mb-6">Paiement</h2>
                  <div className="p-6 bg-[#f9f9f9] border border-gray-200 rounded-md">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full border-4 border-gold bg-white flex-shrink-0 mt-0.5"></div>
                      <div>
                        <h4 className="font-medium text-primary">Paiement à la livraison</h4>
                        <p className="text-sm text-gray-600 mt-1">Vous paierez en espèces lors de la réception de votre commande.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50/50 p-4 border border-orange-100 rounded-md text-sm text-gray-700">
                    <p className="font-medium mb-1">Paiement Mobile (À venir)</p>
                    <p>Le paiement par Wave et Orange Money sera bientôt disponible.</p>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Sidebar Summary */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white p-6 rounded-md shadow-sm border border-subtle-brown/10 sticky top-28">
              <h3 className="font-serif text-lg text-primary mb-4 font-semibold">Récapitulatif de commande</h3>
              
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>{items.length} article(s)</span>
                <span>{subTotal.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                <span>Livraison</span>
                <span>{deliveryZone.price.toLocaleString('fr-FR')} FCFA</span>
              </div>
              
              <div className="flex justify-between items-center text-primary mb-6">
                <span className="font-medium">Total</span>
                <span className="font-bold text-lg">{total.toLocaleString('fr-FR')} FCFA</span>
              </div>
              
              <button 
                type="submit" 
                form="checkout-form"
                className="w-full bg-gold hover:bg-gold-dark text-white font-medium py-3 rounded-md transition-colors flex justify-center items-center gap-2 shadow-sm"
              >
                {step < 3 ? 'Continuer' : 'Confirmer la commande'}
                {step < 3 && <ChevronRight size={18} />}
              </button>

              {step > 1 && (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="w-full mt-3 py-3 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                >
                  Retour
                </button>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
