import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategoryExplorer } from '../components/home/CategoryExplorer';
import { TrendingSection } from '../components/home/TrendingSection';
import { FeaturedArticles } from '../components/home/FeaturedArticles';
import { CharacterSpotlight } from '../components/home/CharacterSpotlight';
import { TrailerSection } from '../components/home/TrailerSection';
import { EventsSection } from '../components/home/EventsSection';
import { MerchandiseSection } from '../components/home/MerchandiseSection';

export function Home() {
  return (
    <>
      <HeroSection />
      <CategoryExplorer />
      <TrendingSection />
      <FeaturedArticles />
      <CharacterSpotlight />
      <TrailerSection />
      <EventsSection />
      <MerchandiseSection />
    </>
  );
}
