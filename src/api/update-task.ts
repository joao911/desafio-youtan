import { api } from ".";

export interface itemProps {
  id: number;
  description: string;
  completed: boolean;
}

export async function useUpdateTask({ description, completed, id }: itemProps) {
  await api.put(`/tasks/${id}`, { description, completed });
}
