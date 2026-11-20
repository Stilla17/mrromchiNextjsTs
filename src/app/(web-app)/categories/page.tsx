import { Suspense } from "react";
import Header from "@/components/WebAppCompnonents/Header";
import CategoryBrowser from "@/features/categories/CategoryBrowser";

export default function CategoriesPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <p
            role="status"
            className="p-5 text-sm"
          >
            Yuklanmoqda...
          </p>
        }
      >
        <CategoryBrowser />
      </Suspense>
    </>
  );
}
