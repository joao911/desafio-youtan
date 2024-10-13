import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TodoList } from "./index";
import { useCreateTask } from "@/api/create-task";
import { getTasks } from "@/api/get-tasks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, describe, beforeEach, afterEach, it, expect } from "vitest";
import { queryClient } from "@/api/react-query";
import "@testing-library/jest-dom";
import { useUpdateTask } from "@/api/update-task";

vi.mock("@/api/create-task", () => ({
  useCreateTask: vi.fn(),
  useDeleteTask: vi.fn(),
  useUpdateTask: vi.fn(),
}));

vi.mock("@/api/get-tasks", () => ({
  getTasks: vi.fn().mockResolvedValue({
    data: [
      { id: "1", title: "Tarefa 1", status: "to-do" },
      { id: "2", title: "Tarefa 2", status: "done" },
    ],
  }),
}));

describe("TodoList", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar a tela corretamente", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    );

    const taskElement = screen.getByText("Gerenciador de Tarefas");
    expect(taskElement).to.exist;

    const totalTaskElement = screen.getByText("Total de Tarefas");
    expect(totalTaskElement).to.exist;
  });

  it("deve criar uma nova tarefa", async () => {
    const mockCreateTask = useCreateTask as unknown as {
      (): Promise<void>;
      mockResolvedValueOnce: (value: Promise<void>) => void;
    };

    mockCreateTask.mockResolvedValueOnce(Promise.resolve());

    render(
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("Insira o nome da tarefa"), {
      target: { value: "Nova Tarefa" },
    });
    fireEvent.click(screen.getByText("Criar"));

    await waitFor(() => {
      expect(mockCreateTask).toHaveBeenCalled();
      expect(
        screen.getByPlaceholderText("Insira o nome da tarefa")
      ).toHaveValue("");
    });
  });

  it("deve atualizar uma tarefa existente", async () => {
    const mockUpdateTask = useUpdateTask as unknown as {
      (): Promise<void>;
      mockResolvedValueOnce: (value: Promise<void>) => void;
    };

    mockUpdateTask.mockResolvedValueOnce(Promise.resolve());
    const mockTask = { id: "1", title: "Tarefa 1", status: "to-do" };

    render(
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    );

    // Simula a seleção da tarefa a ser atualizada
    fireEvent.click(screen.getByText("Tarefa 1"));

    // Simula a mudança no campo de entrada
    fireEvent.change(screen.getByPlaceholderText("Insira o nome da tarefa"), {
      target: { value: "Tarefa Atualizada" },
    });

    // Simula o clique no botão de atualização
    fireEvent.click(screen.getByText("Atualizar"));

    await waitFor(() => {
      expect(mockUpdateTask).toHaveBeenCalledWith(mockTask);
      expect(
        screen.getByPlaceholderText("Insira o nome da tarefa")
      ).toHaveValue("");
    });
  });

  // Configuração do QueryClient

  // it('deve renderizar a tela corretamente', async () => {
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <TodoList />
  //     </QueryClientProvider>
  //   );

  //   // Verifica se o título é exibido
  //   expect(await screen.findByText('Gerenciador de Tarefas')).toBeInTheDocument();
  //   // Verifica se o total de tarefas é exibido
  //   expect(await screen.findByText('Total de Tarefas')).toBeInTheDocument();
  // });

  // it('deve criar uma nova tarefa', async () => {
  //   (useCreateTask as jest.Mock).mockResolvedValueOnce(Promise.resolve());

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <TodoList />
  //     </QueryClientProvider>
  //   );

  //   // Preenche o campo de entrada
  //   fireEvent.change(screen.getByPlaceholderText('Insira o nome da tarefa'), {
  //     target: { value: 'Nova Tarefa' },
  //   });
  //   fireEvent.click(screen.getByText('Criar'));

  //   await waitFor(() => {
  //     expect(useCreateTask).toHaveBeenCalled();
  //     expect(screen.getByPlaceholderText('Insira o nome da tarefa')).toHaveValue('');
  //   });
  // });

  // it('deve atualizar uma tarefa existente', async () => {
  //   (useUpdateTask as jest.Mock).mockResolvedValueOnce(Promise.resolve());
  //   const mockTask = { id: '1', title: 'Tarefa 1', status: 'to-do' };

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <TodoList />
  //     </QueryClientProvider>
  //   );

  //   // Simula a seleção de uma tarefa
  //   fireEvent.click(screen.getByText('Tarefa 1'));

  //   // Preenche o campo de entrada
  //   fireEvent.change(screen.getByPlaceholderText('Insira o nome da tarefa'), {
  //     target: { value: 'Tarefa Atualizada' },
  //   });
  //   fireEvent.click(screen.getByText('Atualizar'));

  //   await waitFor(() => {
  //     expect(useUpdateTask).toHaveBeenCalledWith(mockTask);
  //     expect(screen.getByPlaceholderText('Insira o nome da tarefa')).toHaveValue('');
  //   });
  // });

  // it('deve deletar uma tarefa', async () => {
  //   (useDeleteTask as jest.Mock).mockResolvedValueOnce(Promise.resolve());

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <TodoList />
  //     </QueryClientProvider>
  //   );

  //   // Simula a deleção de uma tarefa
  //   fireEvent.click(screen.getByText('Tarefa 1'));
  //   fireEvent.click(screen.getByText('Deletar')); // Assume que existe um botão para deletar

  //   await waitFor(() => {
  //     expect(useDeleteTask).toHaveBeenCalledWith({ id: '1' });
  //   });
  // });}
});
