import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserId } from "../../utils/auth";
import { getPersonalTask } from "../../api/personalTaskApi";
import TaskDialog from "./TaskDialog/TaskDialog";
import TasksCard from "./TaskCard/TaskCard";
import DeleteTaskDialog from "./TaskDialog/DeleteTaskDialog";

// Fetch tasks using React Query
const fetchTasks = async (userId: string | null) => {
  if (!userId) throw new Error("User ID is required");
  return await getPersonalTask(userId);
};

const Dashboard: React.FC = () => {
  const [isTaskDialogOpen, setTaskDialogOpen] = useState(false);
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const navigate = useNavigate();
  const userId = getUserId();
  const queryClient = useQueryClient();

  // Fetch tasks using React Query
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks", userId],
    queryFn: () => fetchTasks(userId),
    enabled: !!userId,
  });

  const handleUpdateProfile = () => navigate("/update-profile");

  const handleCreateTask = () => {
    setSelectedTask(null);
    setTaskDialogOpen(true);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching tasks</p>;

  return (
    <div className="p-6">
      <h2>Welcome!</h2>
      <div className="flex gap-2">
        <button
          onClick={() => navigate("/logout")}
          className="bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>
        <button
          onClick={handleUpdateProfile}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Update Profile
        </button>
        <button
          onClick={handleCreateTask}
          className="bg-green-500 text-white p-2 rounded"
        >
          Create Task
        </button>
      </div>

      <div className="mt-4">
        <h3>Tasks</h3>
        <TasksCard
          tasks={tasks?.personalTasks || []}
          setSelectedTask={setSelectedTask}
          setTaskDialogOpen={setTaskDialogOpen}
          setIsEdit={setIsEdit}
          setIsDeleteDialog={setIsDeleteTaskDialogOpen}
          userId={userId}
        />
      </div>

      {/* Task Dialog for Create/Edit */}
      <TaskDialog
        isOpen={isTaskDialogOpen}
        onClose={() => {
          setTaskDialogOpen(false);
          setIsEdit(false);
        }}
        onConfirm={() => {
          queryClient.invalidateQueries(["tasks", userId]);
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
          queryClient.invalidateQueries(["tasks", userId]);
        }}
        task={selectedTask}
        userId={userId}
      />
    </div>
  );
};

export default Dashboard;
