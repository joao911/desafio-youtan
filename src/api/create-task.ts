import { api } from ".";
import { IDataProps } from "./get-tasks";

export async function useCreateTask({
  title,
  status,
  id,
  createdAt,
}: IDataProps) {
  await api.post("/tasks", { title, status, id, createdAt });
}
