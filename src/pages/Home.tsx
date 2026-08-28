import React from 'react';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { Categories } from '../components/home/Categories';
import { PopularProducts } from '../components/home/PopularProducts';
import { PromoBanner } from '../components/home/PromoBanner';
import { InstagramFeed } from '../components/home/InstagramFeed';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <Categories />
      <PopularProducts />
      <PromoBanner />
      <InstagramFeed />
    </div>
  );
};
