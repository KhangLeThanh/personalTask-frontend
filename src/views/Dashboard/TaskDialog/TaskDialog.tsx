import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, TextField } from "@mui/material";
import FormDialog from "../../../components/FormDialog/FormDialog";
import Label from "../../../components/Label/Label";
import { Task } from "../../../utils/types";
import { TaskStatus } from "../../../utils/enum";
import { taskStatus } from "../../../constant/constantTaskStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserTask, updateUserTask } from "../../../api/personalTaskApi"; // Import API functions

type TaskDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  task: Task | null;
  isEdit?: boolean;
  userId: string | null;
};

const TaskDialog: React.FC<TaskDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  task,
  isEdit = false,
  userId,
}) => {
  const [status, setStatus] = useState<TaskStatus | string>(TaskStatus.toDO);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [taskId, setTaskId] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (task) {
      setStatus(task.status);
      setTitle(task.title);
      setContent(task.content);
      setTaskId(task._id);
    } else {
      setStatus(TaskStatus.toDO);
      setTitle("");
      setContent("");
    }
  }, [task]);

  // Mutation for creating a task
  const { mutateAsync: createTask } = useMutation({
    mutationFn: createUserTask, // Function to perform mutation (create task)
    onSuccess: async () => {
      await queryClient.invalidateQueries(["tasks", userId].filter(Boolean));
      await queryClient.refetchQueries(["tasks", userId].filter(Boolean));
      onConfirm(); // Trigger onConfirm after the mutation
      onClose(); // Close the dialog
      // Reset the form
      setStatus(TaskStatus.toDO);
      setTitle("");
      setContent("");
    },
    onError: (error: any) => {
      console.error(
        error.response?.data?.message || "Error creating user task"
      );
    },
  });

  // Mutation for updating an existing task
  const { mutateAsync: updateTask } = useMutation({
    mutationFn: updateUserTask, // API function for updating a task
    onSuccess: async () => {
      await queryClient.invalidateQueries(["tasks", userId].filter(Boolean));
      await queryClient.refetchQueries(["tasks", userId].filter(Boolean));
      onConfirm(); // Trigger onConfirm after the mutation
      onClose(); // Close the dialog
    },
    onError: (error: any) => {
      console.error(
        error.response?.data?.message || "Error updating user task"
      );
    },
  });

  // Handle confirm action (Create or Update)
  const handleConfirm = async () => {
    const personalTask = { title, content, status };

    if (isEdit && task && userId) {
      // Update task if in edit mode
      await updateTask({ userId, taskId, personalTask });
    } else if (userId) {
      // Create task if not in edit mode
      await createTask({ userId, personalTask });
    }
  };

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Task" : "Create Task"}
      onConfirm={handleConfirm}
    >
      <Label text="Title:" />
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
      />
      <Label text="Content:" />
      <TextField
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        required
        multiline
        rows={4}
      />
      <FormControl fullWidth margin="normal">
        <Label text="Status:" />
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          {taskStatus.map((menu) => (
            <MenuItem key={menu.value} value={menu.value}>
              {menu.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FormDialog>
  );
};

export default TaskDialog;
