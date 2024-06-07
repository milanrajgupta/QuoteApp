import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../utils/Slices/authSlice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { token, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  // const image=localStorage.getItem("user.image")
  const dispatch = useDispatch();

  function logout(navigate) {
    return () => {
      dispatch(setToken(null));
      dispatch(setUser(null));

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // toast.success("Logged Out")
      toast.success("Logged Out", {
        position: "top-center",
      });
      navigate("/");
    };
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="bg-[#157788] w-[100vw] text-white p-4 fixed top-0 flex  justify-center items-center z-50">
      <div className="w-[1200px]  flex justify-between ">
        <div className="text-xl font-bold">
          <a href="/">Quotopia</a>
        </div>

        {!token ? (
          <div className="flex gap-3">
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                login
              </button>
            </Link>
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <div className=" flex justify-center gap-3 md:gap-10 items-center ">
           
              <Link to="/user/users-quote">
                <h1 className="font-bold">All Quotes</h1>
              </Link>
          
            <div className="  relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none"
              >
                <img
                  src={user.image}
                  alt="User Profile"
                  className="rounded-full w-10 h-10"
                />
                <IoIosArrowDown className="ml-2" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                  <a
                    href="/user/dashboard"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Dashboard
                  </a>
                  <button
                    onClick={logout(navigate)}
                    className="block px-4 py-2 w-full text-start text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
