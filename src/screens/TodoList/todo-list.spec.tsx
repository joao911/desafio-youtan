import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TodoList } from "./index";
import { useCreateTask } from "@/api/create-task";
import { QueryClientProvider } from "@tanstack/react-query";
import { vi, describe, afterEach, it, expect } from "vitest";
import { queryClient } from "@/api/react-query";
import "@testing-library/jest-dom";

vi.mock("@/api/create-task", () => ({
  useCreateTask: vi.fn(),
}));

vi.mock("@/api/get-tasks", () => ({
  getTasks: vi.fn().mockResolvedValue({
    data: [
      { id: "1", title: "Tarefa 1", status: "to-do" },
      { id: "2", title: "Tarefa 2", status: "done" },
    ],
  }),
}));

vi.mock("@/api/update-task", () => ({
  useUpdateTask: vi.fn(),
}));

describe("TodoList", () => {
  afterEach(() => {
    vi.clearAllMocks();
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
});
