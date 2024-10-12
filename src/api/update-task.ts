import { api } from ".";

export interface itemProps {
  id: string;
  title: string;
  status: string;
  position: number;
}

export async function useUpdateTask({
  title,
  status,
  id,
  position,
}: itemProps) {
  await api.put(`/tasks/${id}`, { title, status, position });
}
