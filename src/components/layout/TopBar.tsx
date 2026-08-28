import React from 'react';
import { Phone } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#b59051] text-white text-xs py-2 px-4 flex justify-between items-center sm:text-sm">
      <div className="flex-1 hidden sm:block"></div>
      <div className="flex-1 text-center font-medium tracking-wide">
        Livraison partout au Sénégal 🇸🇳
      </div>
      <div className="flex-1 flex justify-end items-center gap-2 font-medium">
        <Phone size={14} />
        77 460 18 67
      </div>
    </div>
  );
};
