"use client";

import React from "react";
import { Swiper, SwiperSlide, type SwiperProps } from "swiper/react";
import type { SwiperModule } from "swiper/types";

type AppSwiperProps<T> = Omit<SwiperProps, "children" | "modules"> & {
  items: T[];
  getKey: (item: T, index: number) => React.Key;
  renderSlide: (item: T, index: number) => React.ReactNode;
  modules?: SwiperModule[];
  slideClassName?: string;
};

function AppSwiper<T>({
  items,
  getKey,
  renderSlide,
  modules,
  slideClassName,
  ...swiperProps
}: AppSwiperProps<T>) {
  return (
    <Swiper
      modules={modules}
      watchSlidesProgress={swiperProps.watchSlidesProgress ?? true}
      {...swiperProps}
    >
      {items.map((item, index) => (
        <SwiperSlide key={getKey(item, index)} className={slideClassName}>
          <div
            className="swiper-card-animate"
            style={
              {
                "--swiper-card-delay": `${Math.min(index % 5, 4) * 55}ms`,
              } as React.CSSProperties
            }
          >
            {renderSlide(item, index)}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default AppSwiper;
