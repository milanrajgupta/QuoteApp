
import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';

import { setToken, setUser } from '../../utils/Slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    // const {token,user} = useSelector((store) => store.auth);
    const navigate=useNavigate()
    const dispatch=useDispatch()
  const [formData, setFormData] = useState({
   
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
const {email,password}=formData;
  const handleSubmit =async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
     
      
      const imageUrl=`https://api.dicebear.com/5.x/initials/svg?seed=${data.user.firstName}+${data.user.lastName}`
      
      dispatch(setToken(data.token))
      data.user.image=imageUrl
      dispatch(setUser(data.user))
      
      localStorage.setItem("token", JSON.stringify(data.token))
      localStorage.setItem("user", JSON.stringify(data.user));
    //   console.log('Login successful', data.user);
    //   console.log("image",imageUrl)
    navigate("/dashboard")
  
    } else {
    
      console.log('Login failed', data.message);
    }


  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>
        
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
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
            <label className="block text-gray-700">Password</label>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
