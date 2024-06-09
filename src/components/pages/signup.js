// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {

  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
const {firstName,lastName,email,password}=formData;


  const handleSubmit = async(e) => {
    e.preventDefault();
   
     const response = await fetch('http://34.132.16.55:8000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({firstName,lastName, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success("Account Created", {
        position: "top-center", 
      });
      console.log('Login successful', data);
      navigate("/login");
     
     
    } else {
    
      console.log('Login failed');
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-r">
      <div className="bg-[#1d7a8a] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-white">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white ">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white ">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white ">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block  text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
