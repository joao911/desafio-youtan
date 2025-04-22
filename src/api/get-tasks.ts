import { api } from ".";
export interface IDataProps {
  id: string;
  title: string;
  status: string;
  createdAt: string;
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
  return api.get<TasksProps>(
    `tasks?_page=${page}&_per_page=8&_sort=-createdAt`
  );
}
