import { http, HttpResponse, HttpHandler } from "msw";
import { tasks, saveTasks } from "./getMockTasks";
import { IDataProps } from "@/api/get-tasks";

export const deleteMockTask: HttpHandler = http.delete("/tasks/:id", async ({ params }) => {
  const taskId = params.id;
  const taskIndex = tasks.findIndex((task: IDataProps) => task.id === taskId);
  
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    saveTasks(tasks);
  }
  
  return HttpResponse.json({ message: "Task deleted successfully" });
});
