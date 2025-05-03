import { http, HttpResponse, HttpHandler } from "msw";
import { updateTaskStatus } from "./getMockTasks";

export const updateTaskMock: HttpHandler = http.put("/tasks/:id", async ({ params, request }) => {
  const taskId = params.id;
  const body = await request.json();
  const { status, title } = body;
  
  updateTaskStatus(taskId, status, title);
  
  return HttpResponse.json({
    data: {
      title: title,
      status: status,
      id: taskId,
      createdAt: "2025-05-03T02:52:52.282Z"
    }
  });
});
