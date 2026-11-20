export type Category = {
  id: string;
  name: string;
  parentId: string | null;
  level: number;
};

export type CategoryInput = { name: string; parentId: string | null };

export const MAX_CATEGORY_LEVEL = 3;

export function categoryHref(id: string | null) {
  return id ? `/categories/?parent=${encodeURIComponent(id)}` : "/categories/";
}
