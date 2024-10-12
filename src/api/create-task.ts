import { api } from ".";
import { TasksProps } from "./get-tasks";

export async function useCreateTask({
  title,
  status,
  id,
  position,
}: TasksProps) {
  await api.post("/tasks", { title, status, id, position });
}
