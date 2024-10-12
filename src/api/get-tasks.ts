import { api } from ".";

export interface GetTasksProps {
  totalItems: number;
  totalPages: number;
  pageSize: number;
  currentPage: number;
  tasks: {
    id: number;
    description: string;
    completed: boolean;
  }[];
}

export function getTasks(page: number, size = 10) {
  return api.get<GetTasksProps>("tasks/alltasks", {
    params: {
      page,
      size,
    },
  });
}
