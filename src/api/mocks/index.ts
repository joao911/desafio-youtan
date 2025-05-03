import { setupWorker } from "msw/browser";
import { getMockTask } from "./getMockTasks";

export const worker = setupWorker(getMockTask);

export async function enableMSW() {
  await worker.start();
}
