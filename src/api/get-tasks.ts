import { api } from ".";
interface IDataProps {
  id: string;
  title: string;
  status: string;
}

export interface TasksProps {
  first: number;
  prev: null | number;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: IDataProps[];
}

export function getTasks(page: number) {
  return api.get<TasksProps[]>(`tasks?_page=${page}`);
}
