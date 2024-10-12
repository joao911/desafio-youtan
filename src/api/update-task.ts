import { api } from ".";

export interface itemProps {
  id: string;
  title: string;
  status: string;
}

export async function useUpdateTask({ title, status, id }: itemProps) {
  await api.put(`/tasks/${id}`, { title, status });
}
