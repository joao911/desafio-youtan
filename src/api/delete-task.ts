import { api } from ".";

export interface DeleteTaskProps {
  id: number;
}

export async function useDeleteTask({ id }: DeleteTaskProps) {
  await api.delete(`/tasks/${id}`);
}
