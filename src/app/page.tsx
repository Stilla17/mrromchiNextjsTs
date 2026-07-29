import HeroSection from "@/components/HeroSection";
import LazyHomeSections from "@/components/LazyHomeSections";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <LazyHomeSections />
    </main>
  );
}
