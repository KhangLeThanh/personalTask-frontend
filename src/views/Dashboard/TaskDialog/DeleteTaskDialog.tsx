import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import FormDialog from "../../../components/FormDialog/FormDialog";
import { Task } from "../../../utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserTask } from "../../../api/personalTaskApi"; // Import API functions

type DeleteTaskDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  task: Task | null;
  userId: string | null;
};

const DeleteTaskDialog: React.FC<DeleteTaskDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  task,
  userId,
}) => {
  const [taskId, setTaskId] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (task) {
      setTaskId(task._id);
    }
  }, [task]);

  // Mutation for delete a task
  const { mutateAsync: deleteTask } = useMutation({
    mutationFn: deleteUserTask, // Function to perform mutation (delete task)
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["tasks", userId].filter(Boolean),
      });
      await queryClient.refetchQueries({
        queryKey: ["tasks", userId].filter(Boolean),
      });
      onConfirm();
      onClose();
    },
    onError: (error: any) => {
      console.error(
        error.response?.data?.message || "Error creating user task"
      );
    },
  });

  // Handle confirm delete action
  const handleConfirm = async () => {
    await deleteTask({ userId, taskId }); // Pass userId and taskData separately
  };

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Are you sure to delete"
      onConfirm={handleConfirm}
    >
      <Typography variant="h3"> Do you want to delete this task?</Typography>
    </FormDialog>
  );
};

export default DeleteTaskDialog;
