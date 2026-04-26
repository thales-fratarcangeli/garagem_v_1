import { HeroCarousel } from "@/components/home/hero-carousel";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { NewsGrid } from "@/components/home/news-grid";
import { SellCta } from "@/components/home/sell-cta";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <CategoriesGrid />
      <NewsGrid />
      <SellCta />
    </>
  );
}
