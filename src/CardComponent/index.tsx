import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { Card, IconButton, Tooltip } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { itemProps } from "@/api/update-task";

interface CardComponentProps {
  item: itemProps;
  index: number;
  onDelete: (id: number) => void;
  onUpdate: (item: itemProps) => void;
  setTaskSelected: (item: itemProps) => void;
}
export const CardComponent: React.FC<CardComponentProps> = ({
  item,
  index,
  onDelete,
  setTaskSelected,
  onUpdate,
}) => {
  return (
    <Card className="flex items-center justify-between p-4 mt-4">
      <div className="flex items-center gap-4">
        <Tooltip title="Concluir Tarefa">
          <IconButton
            onClick={() =>
              onUpdate({
                ...item,
                completed: item.completed ? true : false,
              })
            }
          >
            {item.completed ? (
              <RadioButtonUncheckedIcon />
            ) : (
              <CheckCircleOutlineIcon />
            )}
          </IconButton>
        </Tooltip>
        <p>{item.description}</p>
      </div>
      <div className="flex gap-4 ">
        <Tooltip title="Deletar Tarefa">
          <IconButton onClick={() => onDelete(item.id)}>
            <DeleteIcon className="text-red-500 cursor-pointer" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Editar Tarefa">
          <IconButton onClick={() => setTaskSelected(item)}>
            <CreateIcon className="text-blue-500 cursor-pointer" />
          </IconButton>
        </Tooltip>
      </div>
    </Card>
  );
};
