import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/users/profile/",
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        setUser(response.data);
        localStorage.setItem("first_name", response.data.first_name);
        setUpdatedUser(response.data);
      } catch (error) {
        toast.error("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        "http://127.0.0.1:8000/api/users/profile/",
        updatedUser,
        { headers: { Authorization: `Token ${token}` } }
      );
      setUser(response.data);
      setEditing(false);
      localStorage.setItem("first_name", response.data.first_name);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("User is not authenticated");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/password-reset/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      const errorMessage =
        error.response?.data?.email?.[0] ||
        error.response?.data?.old_password?.[0] ||
        error.response?.data?.confirm_new_password?.[0] ||
        error.response?.data?.authorization?.[0] ||
        error.response?.data?.detail ||
        "Something went wrong";

      toast.error(errorMessage);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center  bg-gray-100 min-h-screen py-10">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full max-w-5xl px-4 mt-32 ">
        {/* Profile Section */}
        <div className="w-full bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            My Profile
          </h2>

          {!editing ? (
            <div className="space-y-4 text-gray-800">
              <p className="flex items-center">
                <span className="font-semibold w-1/3">First Name:</span>{" "}
                {user.first_name}
              </p>
              <p className="flex items-center">
                <span className="font-semibold w-1/3">Last Name:</span>{" "}
                {user.last_name}
              </p>
              <p className="flex items-center">
                <span className="font-semibold w-1/3">Email:</span> {user.email}
              </p>
              <button
                onClick={() => setEditing(true)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4 flex flex-col">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  value={updatedUser.first_name}
                  onChange={(e) =>
                    setUpdatedUser({
                      ...updatedUser,
                      first_name: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  value={updatedUser.last_name}
                  onChange={(e) =>
                    setUpdatedUser({
                      ...updatedUser,
                      last_name: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  value={updatedUser.email}
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-200 text-gray-600 cursor-not-allowed focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>

        {/* Password Reset Section */}
        <div className="w-full bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-center mb-4 text-gray-700">
            Reset Password
          </h3>
          <form onSubmit={handlePasswordReset} className="space-y-4">
            {["email", "old_password", "new_password", "confirm_new_password"].map(
              (field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.replace("_", " ")}
                  </label>
                  <input
                    type={field.includes("password") ? "password" : "email"}
                    name={field}
                    placeholder={`Enter your ${field.replace("_", " ")}`}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              )
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
