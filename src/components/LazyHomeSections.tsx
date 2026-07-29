"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";

const Products = dynamic(() => import("./Products"), {
  ssr: false,
  loading: () => <SectionSkeleton className="h-[760px]" />,
});
const Services = dynamic(() => import("./Services"), {
  ssr: false,
  loading: () => <SectionSkeleton className="h-[520px]" />,
});
const AboutUs = dynamic(() => import("./AboutUs"), {
  ssr: false,
  loading: () => <SectionSkeleton className="h-[620px]" />,
});
const Customers = dynamic(() => import("./Customers"), {
  ssr: false,
  loading: () => <SectionSkeleton className="h-[320px]" />,
});
const Contact = dynamic(() => import("./Contact"), {
  ssr: false,
  loading: () => <SectionSkeleton className="h-[620px]" />,
});
const ToUp = dynamic(() => import("./ToUp"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), {
  ssr: false,
  loading: () => <SectionSkeleton className="h-[420px]" />,
});

function SectionSkeleton({ className }: { className: string }) {
  return <div className={`mx-auto max-w-7xl px-4 ${className}`} />;
}

const LazyHomeSections: React.FC = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldLoad) return;

    const load = () => setShouldLoad(true);
    const sentinel = sentinelRef.current;

    if (!sentinel || !("IntersectionObserver" in window)) {
      const timeout = window.setTimeout(load, 2500);
      return () => window.clearTimeout(timeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -35% 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" />
      {shouldLoad ? (
        <>
          <Products />
          <Services />
          <AboutUs />
          <Customers />
          <Contact />
          <ToUp />
          <Footer />
        </>
      ) : (
        <SectionSkeleton className="h-[calc(100vh+480px)]" />
      )}
    </>
  );
};

export default LazyHomeSections;
