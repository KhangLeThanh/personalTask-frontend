import React, { useEffect } from "react";
import { Select, MenuItem, FormControl, TextField } from "@mui/material";
import { AxiosError } from "axios";
import FormDialog from "../../../components/FormDialog/FormDialog";
import Label from "../../../components/Label/Label";
import { Task, ErrorResponse } from "../../../utils/types";
import { TaskStatus } from "../../../utils/enum";
import { taskStatus } from "../../../constant/constantTaskStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserTask, updateUserTask } from "../../../api/personalTaskApi";
import { useFormik } from "formik";
import taskSchema from "../../../schema/taskSchema";

interface TaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  task: Task | null;
  isEdit?: boolean;
  userId: string | null;
}

const TaskDialog: React.FC<TaskDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  task,
  isEdit = false,
  userId,
}) => {
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      status: TaskStatus.toDO,
      taskId: "",
    },
    validationSchema: taskSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const personalTask = {
        title: values.title,
        content: values.content,
        status: values.status,
      };

      if (isEdit && task && userId) {
        await updateTask({
          userId,
          taskId: values.taskId,
          personalTask,
        });
        formik.resetForm({
          values: {
            title: "",
            content: "",
            status: TaskStatus.toDO,
            taskId: "",
          },
        });
      } else if (userId) {
        await createTask({
          userId,
          personalTask,
        });
        formik.resetForm({
          values: {
            title: "",
            content: "",
            status: TaskStatus.toDO,
            taskId: "",
          },
        });
      }
    },
  });

  useEffect(() => {
    if (task) {
      formik.setValues({
        title: task.title,
        content: task.content,
        status: task.status as TaskStatus,
        taskId: task._id || "",
      });
    }
  }, [task]);

  // Create mutation
  const { mutateAsync: createTask } = useMutation({
    mutationFn: createUserTask,
    onSuccess: async () => {
      const queryKey = userId ? ["tasks", userId] : ["tasks"];

      await queryClient.invalidateQueries({ queryKey });
      await queryClient.refetchQueries({ queryKey });

      onConfirm();
      onClose();
      formik.resetForm();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(
        error.response?.data?.message || "Error creating user task"
      );
    },
  });

  // Update mutation
  const { mutateAsync: updateTask } = useMutation({
    mutationFn: updateUserTask,
    onSuccess: async () => {
      const queryKey = userId ? ["tasks", userId] : ["tasks"];

      await queryClient.invalidateQueries({ queryKey });
      await queryClient.refetchQueries({ queryKey });

      onConfirm();
      onClose();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(
        error.response?.data?.message || "Error updating user task"
      );
    },
  });

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Task" : "Create Task"}
      onConfirm={formik.handleSubmit}
    >
      <Label text="Title:" />
      <TextField
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        fullWidth
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />

      <Label text="Content:" />
      <TextField
        name="content"
        value={formik.values.content}
        onChange={formik.handleChange}
        fullWidth
        multiline
        rows={4}
        error={formik.touched.content && Boolean(formik.errors.content)}
        helperText={formik.touched.content && formik.errors.content}
      />

      <FormControl fullWidth margin="normal">
        <Label text="Status:" />
        <Select
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
        >
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
