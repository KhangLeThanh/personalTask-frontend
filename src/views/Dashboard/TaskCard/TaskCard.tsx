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
  userId: string | null;
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

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* To Do Column */}
        <Grid size={4}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            To Do
          </Typography>
          {toDoTasks?.personalTasks.map((task: Task) => (
            <Card key={task._id} sx={{ marginBottom: 2 }}>
              <CardHeader
                title={
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Title: {task.title}
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body1">Content: {task.content}</Typography>
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
          ))}
        </Grid>

        {/* In Progress Column */}
        <Grid size={4}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            In Progress
          </Typography>
          {inProgressTasks?.personalTasks.map((task: Task) => (
            <Card key={task._id} sx={{ marginBottom: 2 }}>
              <CardHeader
                title={
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Title: {task.title}
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body1">Content: {task.content}</Typography>
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
          ))}
        </Grid>

        {/* Done Column */}
        <Grid size={4}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Done
          </Typography>
          {doneTasks?.personalTasks.map((task: Task) => (
            <Card key={task._id} sx={{ marginBottom: 2 }}>
              <CardHeader
                title={
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Title: {task.title}
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body1">Content: {task.content}</Typography>
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
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskCard;
