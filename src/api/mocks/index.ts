import { setupWorker } from "msw/browser";
import { getMockTask } from "./getMockTasks";
import { updateTaskMock } from "./undoneMocktask";
import { deleteMockTask } from "./deleteMockTask";
import { createMockTask } from "./createMockTask";

export const worker = setupWorker(getMockTask, updateTaskMock, deleteMockTask,createMockTask);

export async function enableMSW() {
  await worker.start();
}
