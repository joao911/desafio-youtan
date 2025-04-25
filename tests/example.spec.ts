import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/");
  await page.waitForTimeout(4000);

  await expect(
    page.getByRole("heading", { name: "Gerenciador de Tarefas" })
  ).toBeVisible();
});

test("has total tasks name, tasks done name and pending tasks name", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:5173/");

  await page.waitForTimeout(1000);

  await expect(page.getByText("Total de Tarefas")).toBeVisible();
  await expect(page.getByText("Tarefas concluídas")).toBeVisible();
  await expect(page.getByText("Tarefas pendentes")).toBeVisible();
});

test("create task", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/");

  await page.waitForTimeout(1000);

  await page.getByRole("textbox", { name: "Nome da Tarefa" }).click();
  await page.getByPlaceholder("Insira o nome da tarefa").fill("Tarefa criada");
  await page.waitForTimeout(1000);

  await page.getByRole("button", { name: "Criar" }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByText("Tarefa criada")).toBeVisible();
});

test("Edit task", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/");
  await page.waitForTimeout(4000);

  await page.getByRole("button", { name: "Editar Tarefa" }).click();
  await page.waitForTimeout(1000);

  await page
    .getByRole("textbox", { name: "Nome da Tarefa" })
    .fill("Tarefa editada");
  await page.getByRole("button", { name: "Atualizar" }).click();
  await page.waitForTimeout(2000);

  await expect(page.getByText("Tarefa editada")).toBeVisible();
});

test("Complete task", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/");
  await page.waitForTimeout(2000);

  await page.getByRole("button", { name: "Concluir Tarefa" }).click();
  await page.waitForTimeout(2000);

  await expect(
    page.getByRole("button", { name: "Deletar Tarefa" })
  ).not.toBeVisible();
});

test("Undone task", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/");
  await page.waitForTimeout(2000);

  await page.getByRole("button", { name: "Concluir Tarefa" }).click();
  await page.waitForTimeout(2000);

  await expect(
    page.getByRole("button", { name: "Deletar Tarefa" })
  ).toBeVisible();
});

test("Delete task", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/");
  await page.waitForTimeout(2000);

  await page.getByRole("button", { name: "Deletar Tarefa" }).click();

  await page.waitForTimeout(2000);

  await expect(page.getByText("Tarefa editada")).not.toBeVisible();
});

test("Change to dark mode", async ({ page }) => {
  await await page.goto("http://127.0.0.1:5173/");
  await page.waitForTimeout(2000);

  await page.getByRole("button", { name: "Tema claro" }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole("button", { name: "Tema escuro" })).toBeVisible();
});
