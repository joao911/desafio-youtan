import { http, HttpResponse, HttpHandler } from "msw";
import { IDataProps } from "@/api/get-tasks";

// Estado compartilhado para as tasks
const initialTasks: IDataProps[] = [
  {
    title: "Verificar listagem de carnes com parcelas a pagar (user normal - regra so pode listar carnês que tem parcelas de 1° até a 12° parcela)",
    status: "to-do",
    id: "24522f97-39f9-44e2-8208-05bb682b40d2",
    createdAt: "2025-05-03T02:52:52.282Z",
  },
  {
    title: "Verificar listagem de carnes disponíveis a resgate (Deve conter apenas os carnês com Status quitado e opcional pagar 13° parcela)",
    status: "to-do",
    id: "b3de1778-dc9e-4acd-aa33-9cc797b5ed8d",
    createdAt: "2025-05-03T03:14:03.346Z",
  },
];

// Função para carregar tasks do localStorage
const loadTasks = () => {
  if (typeof window !== 'undefined') {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  }
  return initialTasks;
};

// Função para salvar tasks no localStorage
export const saveTasks = (tasksToSave: IDataProps[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tasks', JSON.stringify(tasksToSave));
  }
};

export let tasks = loadTasks();

export const getMockTask: HttpHandler = http.get("/tasks", () => {
  return HttpResponse.json({
    first: 1,
    prev: null,
    next: null,
    last: 1,
    pages: 1,
    items: tasks.length,
    data: tasks
  });
});

// Exportar a função para atualizar tasks
export const updateTaskStatus = (taskId: string, newStatus: string, newTitle?: string) => {
  tasks = tasks.map((task: IDataProps) => {
    if (task.id === taskId) {
      return {
        ...task,
        status: newStatus,
        ...(newTitle && { title: newTitle })
      };
    }
    return task;
  });
  saveTasks(tasks);
};
