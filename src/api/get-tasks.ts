import { api } from ".";

export interface TasksProps {
  id: string;
  title: string;
  status: string;
}

export function getTasks() {
  return api.get<TasksProps[]>("tasks");
}
