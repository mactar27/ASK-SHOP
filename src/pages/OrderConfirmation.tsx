import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, MessageCircle } from 'lucide-react';

export const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const whatsappNumber = "221774601867";
  const message = `Bonjour A.S.K._Shop_SN, je souhaite confirmer ma commande ${order.id}.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="bg-cream min-h-[80vh] flex items-center py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-sm border border-subtle-brown/20 text-center">
          
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center">
              <CheckCircle size={40} className="text-gold" />
            </div>
          </div>
          
          <h1 className="text-3xl font-serif text-primary mb-2">Merci pour votre commande ✨</h1>
          <p className="text-gray-600 mb-8">Votre commande a bien été enregistrée et est en cours de traitement.</p>
          
          <div className="bg-[#f9f9f9] border border-gray-100 rounded-md p-6 text-left mb-8">
            <h3 className="font-medium text-primary mb-4 border-b border-gray-200 pb-2">Détails de la commande</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Numéro de commande</span>
                <span className="font-medium text-primary">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Articles</span>
                <span className="font-medium text-primary">{order.items}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Livraison</span>
                <span className="font-medium text-primary">{order.delivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Paiement</span>
                <span className="font-medium text-primary">{order.payment}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
                <span className="font-medium text-gray-700">Total</span>
                <span className="font-bold text-primary">{order.total.toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-8">
            Nous vous contacterons très prochainement pour confirmer votre commande.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              <MessageCircle size={20} />
              Contacter sur WhatsApp
            </a>
            <Link 
              to="/shop" 
              className="flex items-center justify-center bg-white border border-gray-300 hover:border-gold hover:text-gold text-primary font-medium py-3 px-6 rounded-md transition-colors"
            >
              Retour à la boutique
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};
