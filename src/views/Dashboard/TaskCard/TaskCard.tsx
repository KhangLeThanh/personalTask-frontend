import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardHeader,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid2";
import { TaskStatus } from "../../../utils/enum";
import { Task } from "../../../utils/types";
import { getPersonalTask } from "../../../api/personalTaskApi";

type TaskCardProps = {
  userId: string;
  setSelectedTask: (task: Task) => void;
  setTaskDialogOpen: (open: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;
  setIsDeleteDialog: (isDelete: boolean) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({
  userId,
  setSelectedTask,
  setIsEdit,
  setTaskDialogOpen,
  setIsDeleteDialog,
}) => {
  // Query for fetching tasks by status
  const { data: toDoTasks, isLoading: isLoadingToDo } = useQuery({
    queryKey: ["tasks", userId, TaskStatus.toDO],
    queryFn: () => getPersonalTask(userId, TaskStatus.toDO),
    enabled: !!userId,
  });
  const { data: inProgressTasks, isLoading: isLoadingInProgress } = useQuery({
    queryKey: ["tasks", userId, TaskStatus.inProgress],
    queryFn: () => getPersonalTask(userId, TaskStatus.inProgress),
    enabled: !!userId,
  });

  const { data: doneTasks, isLoading: isLoadingDone } = useQuery({
    queryKey: ["tasks", userId, TaskStatus.done],
    queryFn: () => getPersonalTask(userId, TaskStatus.done),
    enabled: !!userId,
  });
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setTaskDialogOpen(true);
    setIsEdit(true);
  };

  const handleDeleteTask = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteDialog(true);
  };
  if (isLoadingToDo || isLoadingInProgress || isLoadingDone)
    return <p>Loading...</p>;
  // Column styling
  const columnStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    minHeight: "300px",
    backgroundColor: "#f9f9f9",
  };
  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* To Do Column */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={columnStyle}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              To Do
            </Typography>
            {toDoTasks.length > 0
              ? toDoTasks.map((task: Task) => (
                  <Card key={task._id} sx={{ marginBottom: 2 }}>
                    <CardHeader
                      title={
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Title: {task.title}
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Typography variant="body1">
                        Content: {task.content}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: 1,
                        }}
                      >
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => handleEditTask(task)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleDeleteTask(task)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))
              : null}
          </Box>
        </Grid>

        {/* In Progress Column */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={columnStyle}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              In Progress
            </Typography>
            {inProgressTasks.length > 0
              ? inProgressTasks.map((task: Task) => (
                  <Card key={task._id} sx={{ marginBottom: 2 }}>
                    <CardHeader
                      title={
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Title: {task.title}
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Typography variant="body1">
                        Content: {task.content}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: 1,
                        }}
                      >
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => handleEditTask(task)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleDeleteTask(task)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))
              : null}
          </Box>
        </Grid>

        {/* Done Column */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={columnStyle}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Done
            </Typography>
            {doneTasks.length > 0
              ? doneTasks.map((task: Task) => (
                  <Card key={task._id} sx={{ marginBottom: 2 }}>
                    <CardHeader
                      title={
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          Title: {task.title}
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Typography variant="body1">
                        Content: {task.content}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: 1,
                        }}
                      >
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => handleEditTask(task)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleDeleteTask(task)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))
              : null}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskCard;
