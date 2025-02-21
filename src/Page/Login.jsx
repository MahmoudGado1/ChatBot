import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import icon from "../assets/icon.png";

const Login = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/login/", formData);
  
      const token = response.data.token;
      const userName = response.data.user?.first_name || "User"; 
  
      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("first_name", userName);
  
        toast.success(`Welcome, ${userName}!`);
        navigate("/");
      } else {
        toast.error("No token received. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data);
  
      const errorMessages = Object.values(error.response?.data || {}).flat().join(", ");
      toast.error(errorMessages || "Invalid credentials");
    }
  };
  

  return (
    <>
      <div className="w-[100%] bg-white flex justify-center items-center">
        <a href="/" className="p-1.5">
          <span className="sr-only">Your Company</span>
          <img className="h-[60px] w-[60px]" src={icon} alt="Logo" />
        </a>
      </div>
      <div className="h-[90vh] flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md max-sm:w-[90%]">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Sign In
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
