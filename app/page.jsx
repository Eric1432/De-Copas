"use client";

import HeroSlider from "@/components/HeroSlider";
import FeaturedProducts from "@/components/FeaturedProducts";
import Combos from "@/components/Combos";
import LocationSection from "@/components/LocationSection";

export default function HomePage() {
  return (
    <div className="bg-gray-100">
      <HeroSlider />
      <FeaturedProducts />
      <Combos/>
      <LocationSection />
    </div>
  );
}
