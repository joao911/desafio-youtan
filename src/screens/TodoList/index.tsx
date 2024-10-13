import React, { useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Skeleton,
  TextField,
  Toolbar,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isEmpty, map, size } from "lodash";
import { useMutation, useQuery } from "@tanstack/react-query";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { v4 as uuidv4 } from "uuid";

import { CardComponent } from "@/components/CardComponent";
import { useCreateTask } from "@/api/create-task";
import { getTasks } from "@/api/get-tasks";
import { useDeleteTask } from "@/api/delete-task";
import { queryClient } from "@/api/react-query";
import { itemProps, useUpdateTask } from "@/api/update-task";
import { CardDash } from "@/components/CardDash";
import { DarkMode } from "@/components/DarkMode";

export const TodoList: React.FC = () => {
  const [taskSelected, setTaskSelected] = useState<itemProps>({} as itemProps);
  const [loading, setLoading] = useState(false);

  const userSchema = z.object({
    task: z.string().min(1, "Insira o nome da tarefa"),
  });
  type NewCycleFormData = z.infer<typeof userSchema>;

  const {
    handleSubmit,

    reset,
    control,
    formState: { errors },
  } = useForm<NewCycleFormData>({
    resolver: zodResolver(userSchema),
    values: {
      task: taskSelected.title || "",
    },
  });

  const { data: result, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });

  const { mutateAsync: createTask } = useMutation({
    mutationFn: useCreateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { mutateAsync: updateTask } = useMutation({
    mutationFn: useUpdateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { mutateAsync: deleteTaskFn } = useMutation({
    mutationFn: useDeleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  async function handleDeleteTask(id: string) {
    try {
      setLoading(true);
      await deleteTaskFn({ id });
      setTaskSelected({} as itemProps);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateTask(item: itemProps) {
    try {
      setLoading(true);
      await updateTask({
        title: item.title,
        status: item.status,
        id: item.id,
      });
      setTaskSelected({} as itemProps);
      reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateTask = async (task: string) => {
    try {
      setLoading(true);
      await createTask({
        title: task,
        status: "to-do",
        id: uuidv4(),
      });
      reset();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: NewCycleFormData) => {
    const { task } = data;
    !taskSelected.id
      ? await handleCreateTask(task)
      : await handleUpdateTask({
          title: task,
          status: taskSelected.status,
          id: taskSelected.id,
        });
  };

  const totalTasks = useMemo(() => {
    return size(result?.data);
  }, [result?.data]);

  const completedTasks = useMemo(() => {
    return size(result?.data.filter((item) => item.status === "done"));
  }, [result?.data]);

  const notCompletedTasks = useMemo(() => {
    return size(result?.data.filter((item) => item.status === "to-do"));
  }, [result?.data]);

  return (
    <Box className="w-screen h-screen py-8 ">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" className="flex justify-between">
          <Toolbar className="flex justify-between">
            <h1 className="text-2xl font-bold">Gerenciador de Tarefas</h1>
            <DarkMode />
          </Toolbar>
        </AppBar>
      </Box>

      <div className="px-8 mt-14">
        <div className="flex flex-col w-full gap-4 md:flex-row">
          <CardDash
            icon={
              <Box className="flex items-center justify-center p-3 bg-purple-200 rounded-xl">
                <FormatListBulletedIcon className="text-purple-500" />
              </Box>
            }
            title={totalTasks}
            subtitle="Total de Tarefas"
          />
          <CardDash
            icon={
              <Box className="flex items-center justify-center p-3 bg-blue-200 rounded-xl">
                <CheckCircleOutlineIcon className="text-blue-500" />
              </Box>
            }
            title={completedTasks}
            subtitle="Tarefas concluídas"
          />
          <CardDash
            icon={
              <Box className="flex items-center justify-center p-3 bg-orange-200 rounded-xl">
                <RadioButtonUncheckedIcon className="text-orange-500" />
              </Box>
            }
            title={notCompletedTasks}
            subtitle="Tarefas pendentes"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex h-24 gap-4">
          <Controller
            name="task"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={!!error}
                fullWidth
                helperText={error ? error.message : ""}
                label="Nome da Tarefa"
                placeholder="Insira o nome da tarefa"
                margin="normal"
              />
            )}
          />
          <div className="mt-4">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="font-bold text-white bg-button-color h-14"
              disabled={loading}
              data-testid="button"
            >
              {!taskSelected.id ? "Criar " : "Atualizar"}
            </Button>
          </div>
        </form>
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={300} />
        ) : (
          <div className="overflow-auto h-[40rem]">
            {!isEmpty(result) &&
              map(result?.data, (item) => (
                <CardComponent
                  key={item.id}
                  item={item}
                  onUpdate={handleUpdateTask}
                  setTaskSelected={setTaskSelected}
                  loading={loading}
                  onDelete={handleDeleteTask}
                />
              ))}
          </div>
        )}
      </div>
    </Box>
  );
};
