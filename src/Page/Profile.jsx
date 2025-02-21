import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://127.0.0.1:8000/api/users/profile/', {
          headers: { Authorization: `Token ${token}` },
        });
        setUser(response.data);
        localStorage.setItem('first_name', response.data.first_name);
        setUpdatedUser(response.data);
      } catch (error) {
        toast.error('Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(
        'http://127.0.0.1:8000/api/users/profile/',
        updatedUser,
        { headers: { Authorization: `Token ${token}` } }
      );
  
      setUser(response.data); // Update user state
      setEditing(false);
      localStorage.setItem('first_name', response.data.first_name);
  
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile.');
    }
  };
  
  

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );

  return (
    <div className="flex  bg-gray-100 justify-center items-center h-screen">
      <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">My Profile</h2>

        {!editing ? (
          <div className="space-y-4 text-gray-800">
            <p className="flex items-center">
              <span className="font-semibold w-1/3">First Name:</span> {user.first_name}
            </p>
            <p className="flex items-center">
              <span className="font-semibold w-1/3">Last Name:</span> {user.last_name}
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
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">First Name</label>
              <input
                type="text"
                value={updatedUser.first_name}
                onChange={(e) => setUpdatedUser({ ...updatedUser, first_name: e.target.value })}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Last Name</label>
              <input
                type="text"
                value={updatedUser.last_name}
                onChange={(e) => setUpdatedUser({ ...updatedUser, last_name: e.target.value })}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email (Read-only)</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full p-2 border bg-gray-100 rounded-md cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <button
                type="submit"
                className="w-full sm:w-1/2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="w-full sm:w-1/2 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
