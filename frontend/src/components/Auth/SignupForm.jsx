import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import GoogleButton from "./GoogleButton";

export default function SignupForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (evt) => {
    evt.preventDefault();

    const { name, email, password } = user;

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("/api/auth/signup", { name, email, password });

      console.log("Successfully Created Account:", res.data);
      navigate("/"); // redirect after success
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-4">
          <img src="/logo.png" alt="App Logo" className="w-20 h-20 mx-auto mb-4 object-contain" />
          <h1 className="text-2xl font-semibold text-gray-900">Create your account</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your career with ease.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              value={user.name}
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              value={user.email}
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={user.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={user.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />

            {/* Show error only if both fields are filled and don't match */}
            {user.confirmPassword && user.password !== user.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">Passwords must match</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={!user.email || !user.password || user.password !== user.confirmPassword}
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold rounded-lg py-2.5 hover:bg-indigo-700 transition cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 hover:text-indigo-700 hover:underline transition-all font-medium cursor-pointer"
          >
            Log in
          </a>
        </p>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-400">or continue with gmail</span>
          </div>
        </div>

        {/* Google Button */}
        <GoogleButton />
      </div>
    </div>
  );
}
