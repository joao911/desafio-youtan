import { api } from ".";

export interface CreateTaskProps {
  description: string;
}

export async function useCreateTask({ description }: CreateTaskProps) {
  await api.post("/addtasks", { description });
}
