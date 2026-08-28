import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MessageCircle } from 'lucide-react';
import { useAdminStore } from '../../store/useAdminStore';

export const Layout: React.FC = () => {
  const fetchData = useAdminStore((state) => state.fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const whatsappNumber = "221774601867";
  const defaultMessage = "Bonjour A.S.K._Shop_SN, je souhaite avoir des renseignements.";
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-50 flex items-center justify-center"
        aria-label="Contact sur WhatsApp"
      >
        <MessageCircle fill="currentColor" size={24} />
      </a>
    </div>
  );
};
