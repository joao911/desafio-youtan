import { map } from "lodash";
import { api } from ".";
import { TasksProps } from "./get-tasks";

export const updateTaskOrder = async (updatedTasks: TasksProps[]) => {
  const updatePromises = map(updatedTasks, (task) =>
    api.put(`/tasks/${task.id}`, task)
  );

  await Promise.all(updatePromises);
};
