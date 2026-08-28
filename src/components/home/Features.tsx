import React from 'react';
import { CheckCircle2, ShieldCheck, Truck, MessageCircle } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <CheckCircle2 size={26} className="text-gold" />,
      title: "Produits 100%",
      subtitle: "Authentiques"
    },
    {
      icon: <ShieldCheck size={26} className="text-gold" />,
      title: "Paiement",
      subtitle: "à la livraison"
    },
    {
      icon: <Truck size={26} className="text-gold" />,
      title: "Livraison partout",
      subtitle: "au Sénégal"
    },
    {
      icon: <MessageCircle size={26} className="text-gold" />,
      title: "Service client",
      subtitle: "à votre écoute"
    }
  ];

  return (
    <section className="bg-cream py-8 border-b border-subtle-brown/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center md:items-start gap-3 text-center md:text-left">
              <div className="p-2.5 rounded-full bg-gold/10 flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-medium text-primary text-sm md:text-base leading-tight">{feature.title}</h4>
                <p className="text-gray-500 text-xs md:text-sm">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
