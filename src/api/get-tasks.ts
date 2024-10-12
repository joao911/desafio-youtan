import { api } from ".";

export interface GetTasksProps {
  totalCount: number;
  totalPages: number;
  page: number;
  pageSize: number;
  tasks: {
    id: string;
    title: string;
    status: string;
  }[];
}

export function getTasks(page: number, pageSize = 10) {
  return api.get<GetTasksProps>("Tasks", {
    params: {
      page,
      pageSize,
    },
  });
}
