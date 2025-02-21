import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import icon from "../assets/icon.png";

const Register = () => {
  const navigate = useNavigate();

  // State to store form input values
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password1: "",
    password2: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/register/",
        formData
      );

      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      // console.error("Registration failed:", error.response.data);

      // Extract error message(s)
      if (error.response && error.response.data) {
        const errorMessages = Object.values(error.response.data)
          .flat()
          .join(", ");
        toast.error(errorMessages);
      } else {
        toast.error("Registration failed. Please try again.");
      }
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
        <div className="bg-white p-8 rounded-lg shadow-lg max-sm:w-[90%] sm:w-[90%] md:w-[70%] lg:w-[50%]">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Enter your First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Enter your Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
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
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password1"
                  placeholder="Enter your password"
                  value={formData.password1}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password2"
                  placeholder="Confirm your password"
                  value={formData.password2}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4"
            >
              Sign Up
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already Registered?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
