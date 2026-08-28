import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="bg-cream min-h-[60vh] py-16">
      <div className="container mx-auto px-4 max-w-3xl text-center space-y-8">
        <h1 className="text-4xl font-serif text-primary">À propos de nous</h1>
        <div className="w-16 h-0.5 bg-gold mx-auto"></div>
        <p className="text-gray-600 leading-relaxed text-lg">
          Bienvenue chez <span className="font-serif font-bold text-primary">A.S.K Shop S.N</span>, votre destination de choix pour les parfums, brumes, muscs, huiles, lunettes et accessoires au Sénégal.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Notre slogan, <span className="italic">« Un éclat, une signature »</span>, reflète notre engagement à vous proposer des produits d'une qualité exceptionnelle qui soulignent votre personnalité unique. Nous sélectionnons avec soin chaque article de notre catalogue pour vous garantir l'authenticité et le raffinement que vous méritez.
        </p>
      </div>
    </div>
  );
};
