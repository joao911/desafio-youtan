import { setupWorker } from "msw/browser";
import { getMockTask } from "./getMockTasks";
import { undoneMockTask } from "./undoneMocktask";

export const worker = setupWorker(getMockTask, undoneMockTask);

export async function enableMSW() {
  await worker.start();
}
