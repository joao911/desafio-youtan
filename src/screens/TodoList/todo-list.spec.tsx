import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TodoList } from "./index";
import { useCreateTask } from "@/api/create-task";
import { QueryClientProvider } from "@tanstack/react-query";
import { vi, describe, afterEach, it, expect } from "vitest";
import { queryClient } from "@/api/react-query";
import { useUpdateTask } from "@/api/update-task";
import { useDeleteTask } from "@/api/delete-task";
import { useDarkMode } from "@/store/darkmode";
import "@testing-library/jest-dom";

vi.mock("@/api/create-task", () => ({
  useCreateTask: vi.fn().mockImplementation(() => Promise.resolve()),
}));

vi.mock("@/api/get-tasks", () => ({
  getTasks: vi.fn().mockResolvedValue({
    data: {
      data: [
        { id: "1", title: "Tarefa 1", status: "to-do", createdAt: "2025-05-03T02:52:52.282Z" },
        { id: "2", title: "Tarefa 2", status: "done", createdAt: "2025-05-03T02:52:52.282Z" },
      ],
      first: 1,
      prev: null,
      next: null,
      last: 1,
      pages: 1,
      items: 2,
    },
  }),
}));

vi.mock("@/api/update-task", () => ({
  useUpdateTask: vi.fn().mockImplementation(() => Promise.resolve()),
}));

vi.mock("@/api/delete-task", () => ({
  useDeleteTask: vi.fn().mockImplementation(() => Promise.resolve()),
}));

vi.mock("@/store/darkmode", () => ({
  useDarkMode: vi.fn(() => ({
    isDarkMode: false,
    toggleDarkMode: vi.fn(),
  })),
}));

describe("TodoList", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should match snapshot", () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render the screen correctly", async () => {
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

  it("should create a new task", async () => {
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
      expect(useCreateTask).toHaveBeenCalled();
      expect(
        screen.getByPlaceholderText("Insira o nome da tarefa")
      ).toHaveValue("");
    });
  });

  it("should update a task status", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    );

    // Aguarda as tasks serem carregadas
    await waitFor(() => {
      expect(screen.getByText("Tarefa 1")).to.exist;
    });

    // Clica no botão de concluir tarefa
    const completeButton = screen.getAllByRole("button", {
      name: /Concluir Tarefa/i,
    })[0];

    fireEvent.click(completeButton);

    await waitFor(() => {
      expect(useUpdateTask).toHaveBeenCalledWith({
        id: "1",
        title: "Tarefa 1",
        status: "done",
      });
    });
  });

  it("should delete a task", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    );

    // Aguarda as tasks serem carregadas
    await waitFor(() => {
      expect(screen.getByText("Tarefa 1")).to.exist;
    });

    // Clica no botão de deletar tarefa
    const deleteButton = screen.getAllByRole("button", {
      name: /Deletar Tarefa/i,
    })[0];

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(useDeleteTask).toHaveBeenCalledWith({ id: "1" });
    });
  });

  it("should edit a task", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    );

    // Aguarda as tasks serem carregadas
    await waitFor(() => {
      expect(screen.getByText("Tarefa 1")).to.exist;
    });

    // Clica no botão de editar tarefa
    const editButton = screen.getAllByRole("button", {
      name: /Editar Tarefa/i,
    })[0];

    fireEvent.click(editButton);

    // Verifica se o input foi preenchido com o título da task
    expect(screen.getByPlaceholderText("Insira o nome da tarefa")).toHaveValue("Tarefa 1");

    // Altera o título da task
    fireEvent.change(screen.getByPlaceholderText("Insira o nome da tarefa"), {
      target: { value: "Tarefa Editada" },
    });

    // Clica no botão de atualizar
    fireEvent.click(screen.getByText("Atualizar"));

    await waitFor(() => {
      expect(useUpdateTask).toHaveBeenCalledWith({
        id: "1",
        title: "Tarefa Editada",
        status: "to-do",
      });
    });
  });
});
