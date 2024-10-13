import { api } from ".";
import { TasksProps } from "./get-tasks";

export async function useCreateTask({ title, status, id }: TasksProps) {
  await api.post("/tasks", { title, status, id });
}
