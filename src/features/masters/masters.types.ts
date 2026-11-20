export type Master = {
  id: string;
  categoryId: string;
  name: string;
  phone: string;
  description: string;
  rating: number;
  extraDetails: string[];
};

export type MasterFields = Omit<Master, "id" | "categoryId">;
export type MasterInput = MasterFields & { categoryId: string };
