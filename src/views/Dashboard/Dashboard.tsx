import React, { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getUserId } from "../../utils/auth";
import { getUserProfile } from "../../api/userProfileApi";
import TaskDialog from "./TaskDialog/TaskDialog";
import TasksCard from "./TaskCard/TaskCard";
import DeleteTaskDialog from "./TaskDialog/DeleteTaskDialog";
import { UIButtonVariants } from "../../utils/enum";
import { Task } from "../../utils/types";

const Dashboard: React.FC = () => {
  const [isTaskDialogOpen, setTaskDialogOpen] = useState(false);
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  const userId = getUserId();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (userId) {
      getUserProfile(userId)
        .then((res) => {
          setUserName(res.userName);
        })
        .catch((error) => {
          console.log("Error fetching user:", error);
        });
    }
  }, [userId]);

  const handleUpdateProfile = () => navigate("/update-profile");

  const handleCreateTask = () => {
    setSelectedTask(null);
    setTaskDialogOpen(true);
  };

  return (
    <Box>
      <Typography variant="h2">Welcome {userName}!</Typography>
      <Box
        sx={{
          display: "flex",
          marginTop: 1,
        }}
      >
        <Button
          onClick={() => navigate("/logout")}
          size="small"
          variant={UIButtonVariants.CONTAINED}
          color="primary"
        >
          Logout
        </Button>
        <Button
          variant={UIButtonVariants.CONTAINED}
          onClick={handleUpdateProfile}
          size="small"
          color="primary"
          sx={{ mr: 2, ml: 2 }}
        >
          Update Profile
        </Button>
        <Button
          variant={UIButtonVariants.CONTAINED}
          onClick={handleCreateTask}
          size="small"
          color="primary"
        >
          Create Task
        </Button>
      </Box>
      <Box>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Tasks
        </Typography>
        <TasksCard
          setSelectedTask={setSelectedTask}
          setTaskDialogOpen={setTaskDialogOpen}
          setIsEdit={setIsEdit}
          setIsDeleteDialog={setIsDeleteTaskDialogOpen}
          userId={userId}
        />
      </Box>

      {/* Task Dialog for Create/Edit */}
      <TaskDialog
        isOpen={isTaskDialogOpen}
        onClose={() => {
          setTaskDialogOpen(false);
          setIsEdit(false);
        }}
        onConfirm={() => {
          queryClient.invalidateQueries({
            queryKey: ["tasks", userId].filter((v): v is string => !!v),
          });
          setIsEdit(false);
        }}
        task={selectedTask}
        userId={userId}
        isEdit={isEdit}
      />

      {/* Delete Task Dialog */}
      <DeleteTaskDialog
        isOpen={isDeleteTaskDialogOpen}
        onClose={() => setIsDeleteTaskDialogOpen(false)}
        onConfirm={() => {
          queryClient.invalidateQueries({
            queryKey: ["tasks", userId].filter((v): v is string => !!v),
          });
          setIsDeleteTaskDialogOpen(false);
        }}
        task={selectedTask}
        userId={userId}
      />
    </Box>
  );
};

export default Dashboard;
