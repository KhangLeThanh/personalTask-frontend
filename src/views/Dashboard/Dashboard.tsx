import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserName } from "../../utils/types";
import { logout, getUserId } from "../../utils/auth";
import { getUser } from "../../api/userApi"; // Import the API functions

const Dashboard = () => {
  const [user, setUser] = useState<UserName>();
  const navigate = useNavigate();
  const userId = getUserId(); // Get user ID from localStorage

  useEffect(() => {
    if (userId) {
      getUser(userId)
        .then((res) => {
          setUser(res); // Set the state with the response data
        })
        .catch((error) => {
          console.log("Error fetching user:", error);
        });
    }
  }, [userId]);
  const handleUpdateProfile = () => {
    // Simulate login process and navigate to created-user page
    navigate("/update-profile");
  };
  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2>Welcome, {user.userName}!</h2>
      <button onClick={logout} className="bg-red-500 text-white p-2 rounded">
        Logout
      </button>
      <button
        onClick={handleUpdateProfile}
        className="bg-red-500 text-white p-2 rounded"
      >
        Update Profile
      </button>
    </div>
  );
};

export default Dashboard;
