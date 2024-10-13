import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CardComponent } from "./index";
import { TasksProps } from "@/api/get-tasks";

describe("CardComponent", () => {
  const mockItem: TasksProps = {
    id: "1",
    title: "Tarefa 1",
    status: "to-do",
  };
  const mockOnUpdate = vi.fn();
  const mockOnDelete = vi.fn();
  const mockSetTaskSelected = vi.fn();

  it("renders the CardComponent correctly", () => {
    render(
      <CardComponent
        item={mockItem}
        onUpdate={mockOnUpdate}
        loading={false}
        onDelete={mockOnDelete}
        setTaskSelected={mockSetTaskSelected}
      />
    );

    const taskElement = screen.getByText("Tarefa 1");
    expect(taskElement).to.exist;
  });

  it("calls onUpdate when the complete task button is clicked", () => {
    render(
      <CardComponent
        item={mockItem}
        onUpdate={mockOnUpdate}
        loading={false}
        onDelete={mockOnDelete}
        setTaskSelected={mockSetTaskSelected}
      />
    );

    const completeButton = screen.getByRole("button", {
      name: /Concluir Tarefa/i,
    });

    fireEvent.click(completeButton);

    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...mockItem,
      status: "done",
    });
  });

  it("calls onDelete when the delete task button is clicked", () => {
    render(
      <CardComponent
        item={mockItem}
        onUpdate={mockOnUpdate}
        loading={false}
        onDelete={mockOnDelete}
        setTaskSelected={mockSetTaskSelected}
      />
    );

    const deleteButton = screen.getByRole("button", {
      name: /Deletar Tarefa/i,
    });

    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(mockItem.id);
  });
  it("calls setTaskSelected when the edit task button is clicked", () => {
    render(
      <CardComponent
        item={mockItem}
        onUpdate={mockOnUpdate}
        loading={false}
        onDelete={mockOnDelete}
        setTaskSelected={mockSetTaskSelected}
      />
    );

    const editButton = screen.getByRole("button", {
      name: /Editar Tarefa/i,
    });

    fireEvent.click(editButton);

    expect(mockSetTaskSelected).toHaveBeenCalledWith(mockItem);
  });

  it("disables buttons when loading is true", () => {
    render(
      <CardComponent
        item={mockItem}
        onUpdate={mockOnUpdate}
        loading={true}
        onDelete={mockOnDelete}
        setTaskSelected={mockSetTaskSelected}
      />
    );

    const completeButton = screen.getByRole("button", {
      name: /Concluir Tarefa/i,
    });
    const deleteButton = screen.getByRole("button", {
      name: /Deletar Tarefa/i,
    });
    const editButton = screen.getByRole("button", {
      name: /Editar Tarefa/i,
    });

    // Verificar se os botões estão desabilitados com Chai
    expect(completeButton).to.have.property("disabled", true);
    expect(deleteButton).to.have.property("disabled", true);
    expect(editButton).to.have.property("disabled", true);
  });

  it("applies line-through class when status is done", () => {
    const doneItem: TasksProps = {
      id: "1",
      title: "Tarefa 1",
      status: "done",
    };

    render(
      <CardComponent
        item={doneItem}
        onUpdate={mockOnUpdate}
        loading={false}
        onDelete={mockOnDelete}
        setTaskSelected={mockSetTaskSelected}
      />
    );

    const taskElement = screen.getByText("Tarefa 1");
    expect(taskElement.classList.contains("line-through")).to.be.true;
  });
});
