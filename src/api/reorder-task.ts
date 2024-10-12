import { map, orderBy } from "lodash";
import { api } from ".";
import { TasksProps } from "./get-tasks";

export const useMoveTaskPosition = async ({
  tasks,
  sourceIndex,
  destinationIndex,
}: {
  tasks: TasksProps[]; // Tipo da lista de tasks
  sourceIndex: number; // Índice de origem
  destinationIndex: number; // Índice de destino
}): Promise<TasksProps[]> => {
  // Faz uma cópia do array de tasks
  const updatedTasks = [...tasks];

  // Remove a task da posição de origem
  const [movedTask] = updatedTasks.splice(sourceIndex, 1);

  // Insere a task na nova posição
  updatedTasks.splice(destinationIndex, 0, movedTask);

  // Atualiza a propriedade 'position' de cada task com base no novo índice
  const reorderedTasks = map(updatedTasks, (task, index) => ({
    ...task,
    position: index,
  }));

  // Atualiza as tasks no backend
  await Promise.all(
    reorderedTasks.map((task) =>
      api.patch(`/tasks/${task.id}`, { position: task.position })
    )
  );

  // Reordena as tasks localmente com base na propriedade 'position'
  const orderedTasks = orderBy(reorderedTasks, ["position"], ["asc"]);

  return orderedTasks;
};
