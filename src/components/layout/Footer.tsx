import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 pt-16 pb-8 border-t border-gold/20">
      <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="flex flex-col items-start justify-center text-white leading-none">
            <span className="text-xl font-bold tracking-[0.2em] mb-0.5">A•S-K</span>
            <span className="text-3xl text-gold" style={{ fontFamily: '"Great Vibes", cursive', lineHeight: '0.7' }}>Shop</span>
            <span className="text-sm font-semibold tracking-[0.2em] mt-1.5">S•N</span>
          </Link>
          <p className="text-sm text-gray-400">
            Un éclat, une signature.<br/>
            Merci de faire confiance à<br/>
            <span className="text-gold">A.S.K._Shop_SN</span>.
          </p>
          <div className="flex gap-4 pt-4">
            <a href="https://instagram.com/a.s.k._shop_sn" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gold transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            {/* TikTok Icon */}
            <a href="#" className="text-gray-400 hover:text-gold transition-colors flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </a>
            <a href="https://wa.me/221774601867" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gold transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-4">
          <h4 className="text-white font-medium mb-6">Navigation</h4>
          <ul className="space-y-3">
            <li><Link to="/" className="hover:text-gold transition-colors">Accueil</Link></li>
            <li><Link to="/shop" className="hover:text-gold transition-colors">Boutique</Link></li>
            <li><Link to="/shop?category=parfums" className="hover:text-gold transition-colors text-gray-400">Parfums</Link></li>
            <li><Link to="/shop?category=lunettes" className="hover:text-gold transition-colors text-gray-400">Lunettes</Link></li>
            <li><Link to="/shop?category=accessoires" className="hover:text-gold transition-colors text-gray-400">Accessoires</Link></li>
            <li><Link to="/about" className="hover:text-gold transition-colors">À propos</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Aide */}
        <div className="space-y-4">
          <h4 className="text-white font-medium mb-6">Aide</h4>
          <ul className="space-y-3">
            <li><Link to="/faq" className="hover:text-gold transition-colors">FAQ</Link></li>
            <li><Link to="/shipping" className="hover:text-gold transition-colors">Livraison</Link></li>
            <li><Link to="/returns" className="hover:text-gold transition-colors">Retours & Remboursements</Link></li>
            <li><Link to="/terms" className="hover:text-gold transition-colors">Conditions générales</Link></li>
            <li><Link to="/privacy" className="hover:text-gold transition-colors">Politique de confidentialité</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h4 className="text-white font-medium mb-6">Contact</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-gold mt-0.5" />
              <span>77 460 18 67</span>
            </li>
            <li className="flex items-start gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold mt-0.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <span>@a.s.k._shop_sn</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={18} className="text-gold mt-0.5" />
              <span>ask.shop.sn@gmail.com</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-gold mt-0.5" />
              <span>Dakar, Sénégal</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl pt-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Payment methods */}
          <div className="flex items-center gap-3">
            {/* Orange Money */}
            <div className="h-7 px-2 bg-white/10 rounded flex items-center justify-center">
              <span className="text-[10px] font-bold text-orange-400 whitespace-nowrap">Orange Money</span>
            </div>
            {/* Wave */}
            <div className="h-7 px-2 bg-white/10 rounded flex items-center justify-center">
              <span className="text-[10px] font-bold text-blue-400 whitespace-nowrap">Wave</span>
            </div>
            {/* Visa */}
            <div className="h-7 px-2 bg-white rounded flex items-center justify-center">
              <svg viewBox="0 0 48 16" className="h-4 w-10" fill="none">
                <text x="0" y="13" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#1a1f71">VISA</text>
              </svg>
            </div>
            {/* Mastercard */}
            <div className="h-7 px-2 bg-white rounded flex items-center justify-center gap-0.5">
              <div className="w-5 h-5 rounded-full bg-[#EB001B] opacity-90" />
              <div className="w-5 h-5 rounded-full bg-[#F79E1B] opacity-90 -ml-2.5" />
            </div>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500 text-center flex flex-col md:flex-row items-center justify-center gap-1">
            <span>© {new Date().getFullYear()} A.S.K._Shop_SN - Tous droits réservés.</span>
            <span className="hidden md:inline">|</span>
            <span>
              Réalisé par <a href="https://wockytech.xyz" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors">WockyTech</a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};
