import HeroSection from "@/components/HeroSection";
import LazyHomeSections from "@/components/LazyHomeSections";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <LazyHomeSections />
    </main>
  );
}
