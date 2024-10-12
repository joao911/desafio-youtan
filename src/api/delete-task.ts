import { api } from ".";

export interface DeleteTaskProps {
  id: string;
}

export async function useDeleteTask({ id }: DeleteTaskProps) {
  await api.delete(`/tasks/${id}`);
}
