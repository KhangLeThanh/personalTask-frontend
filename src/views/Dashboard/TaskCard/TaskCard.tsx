import React from "react";
import { Task } from "../../utils/types";

type TaskCardProps = {
  tasks: Task[]; // Accept tasks as an array of Task type
  setSelectedTask: (task: Task) => void; // Function to set the selected task for editing
  setTaskDialogOpen: (open: boolean) => void; // Function to toggle the task dialog
  setIsEdit: (isEdit: boolean) => void; // Function to toggle the task dialog
};

const TaskCard: React.FC<TaskCardProps> = ({
  tasks,
  setSelectedTask,
  setIsEdit,
  setTaskDialogOpen,
}) => {
  const handleEditTask = (task: Task) => {
    setSelectedTask(task); // Set the selected task for editing
    setTaskDialogOpen(true); // Open the task dialog
    setIsEdit(true);
  };
  return !tasks ? (
    <div className="p-6">
      <h2>No Tasks</h2>
    </div>
  ) : (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="p-4 border-b">
            <span>{task.title}</span>
            <button
              onClick={() => handleEditTask(task)}
              className="bg-blue-500 text-white p-2 rounded ml-4"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskCard;
