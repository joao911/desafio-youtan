import { http, HttpResponse, HttpHandler } from "msw";
import { tasks } from "./getMockTasks";

export const createMockTask: HttpHandler = http.post("/tasks", async ({ request }) => {
  const body = await request.json();
  const { title, status } = body;

  const newTask = {
    id: crypto.randomUUID(),
    title,
    status,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);

  return HttpResponse.json({
    data: newTask
  });
});
