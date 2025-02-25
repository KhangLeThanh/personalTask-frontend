import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserId } from "../../utils/auth";
import { getPersonalTask } from "../../api/personalTaskApi"; // Import the API function to fetch tasks
import TaskDialog from "./TaskDialog/TaskDialog";
import TasksCard from "./TaskCard/TaskCard";

// Fetch tasks using React Query
const fetchTasks = async (userId: string | null) => {
  if (userId) {
    return await getPersonalTask(userId); // Fetch tasks by user ID
  }
  throw new Error("User ID is required");
};

const Dashboard: React.FC = () => {
  const [isTaskDialogOpen, setTaskDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();
  const userId = getUserId(); // Get user ID from localStorage
  const queryClient = useQueryClient();

  // Query for fetching tasks
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks", userId], // query key
    queryFn: () => fetchTasks(userId), // query function
    enabled: !!userId, // configuration
  });
  console.log("test tasks", selectedTask);
  const handleUpdateProfile = () => {
    navigate("/update-profile");
  };

  const handleCreateTask = () => {
    setSelectedTask(null); // Clear selected task for creating a new one
    setTaskDialogOpen(true);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching tasks</p>;

  return (
    <div className="p-6">
      <h2>Welcome!</h2>
      <button
        onClick={() => navigate("/logout")}
        className="bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
      <button
        onClick={handleUpdateProfile}
        className="bg-red-500 text-white p-2 rounded"
      >
        Update Profile
      </button>
      <button
        onClick={handleCreateTask}
        className="bg-green-500 text-white p-2 rounded"
      >
        Create Task
      </button>

      <div>
        <h3>Tasks</h3>
        <TasksCard
          tasks={tasks.personalTasks}
          setSelectedTask={setSelectedTask}
          setTaskDialogOpen={setTaskDialogOpen}
          setIsEdit={setIsEdit}
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
        }} // Invalidate the query on confirm
        task={selectedTask}
        userId={userId}
        isEdit={isEdit}
      />
    </div>
  );
};

export default Dashboard;
