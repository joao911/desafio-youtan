import { api } from ".";

export interface CreateTaskProps {
  title: string;
  status: string;
}

export async function useCreateTask({ title, status }: CreateTaskProps) {
  await api.post("/Tasks", { title, status });
}
