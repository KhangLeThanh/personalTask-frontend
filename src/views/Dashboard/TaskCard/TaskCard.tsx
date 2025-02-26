import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
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
  const [toDoTasks, setToDoTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  console.log("test do", toDoTasks);
  useEffect(() => {
    if (userId) {
      getPersonalTask(userId, TaskStatus.toDO).then((tasks) => {
        console.log("Fetched To Do Tasks:", tasks); // Check the fetched data
        setToDoTasks(tasks);
      });
      getPersonalTask(userId, TaskStatus.inProgress).then(setInProgressTasks);
      getPersonalTask(userId, TaskStatus.done).then(setDoneTasks);
    }
  }, [userId]);
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setTaskDialogOpen(true);
    setIsEdit(true);
  };

  const handleDeleteTask = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteDialog(true);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* To Do Column */}
        <Grid size={4}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            To Do
          </Typography>
          {toDoTasks.map((task) => (
            <Card key={task._id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="body1">{task.title}</Typography>
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
          {inProgressTasks.map((task) => (
            <Card key={task._id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="body1">{task.title}</Typography>
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
          {doneTasks.map((task) => (
            <Card key={task._id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="body1">{task.title}</Typography>
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
