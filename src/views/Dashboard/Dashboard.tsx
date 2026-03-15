import React, { useCallback, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useQuery } from "@tanstack/react-query";
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

  const navigate = useNavigate();
  const userId = getUserId();
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserProfile(userId!),
    enabled: !!userId,
  });

  const userName = profile?.userName || "";

  const handleUpdateProfile = () => {
    navigate("/update-profile");
  };

  const handleCreateTask = useCallback(() => {
    setSelectedTask(null);
    setTaskDialogOpen(true);
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Typography variant="h2">Welcome {userName}!</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
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
            onClick={() => navigate("/logout")}
            size="small"
            variant={UIButtonVariants.OUTLINED}
            color="error"
          >
            Logout
          </Button>
        </Box>
      </Box>
      <Button
        variant={UIButtonVariants.CONTAINED}
        onClick={handleCreateTask}
        size="small"
        color="primary"
      >
        Create Task
      </Button>
      <Box>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Tasks
        </Typography>
        {userId && (
          <TasksCard
            setSelectedTask={setSelectedTask}
            setTaskDialogOpen={setTaskDialogOpen}
            setIsEdit={setIsEdit}
            setIsDeleteDialog={setIsDeleteTaskDialogOpen}
            userId={userId}
          />
        )}
      </Box>

      {/* Task Dialog for Create/Edit */}
      <TaskDialog
        isOpen={isTaskDialogOpen}
        onClose={() => {
          setTaskDialogOpen(false);
          setIsEdit(false);
        }}
        onConfirm={() => {
          setIsEdit(false);
        }}
        task={selectedTask}
        userId={userId}
        isEdit={isEdit}
      />

      {/* Delete Task Dialog */}
      {userId && (
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
      )}
    </Box>
  );
};

export default Dashboard;
