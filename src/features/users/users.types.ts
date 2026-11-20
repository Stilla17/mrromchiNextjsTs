export type User = {
  id: string;
  name: string;
  phone: string;
  initials: string;
  status: "active" | "blocked" | "deleted";
};

export type UserInput = { fullName: string; phone: string };

export type UsersResponse = {
  data: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
