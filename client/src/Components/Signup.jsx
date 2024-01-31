import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../Features/api/authApiSlice";
import { toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");

  const navigate = useNavigate();
  const [addUser] = useAddUserMutation();

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    handleAddUser({email, username, password });
  };

  const handleAddUser = (user) => {
    addUser(user)
      .unwrap()
      .then(() => navigate("/login"))
      .catch((err) => {
        console.log("error creating user", err);
        toast.error(err.data);
      });
  };
  return (
    <div className="fixed h-full top-0 left-0 right-0 bg-[#F3F4F6] overflow-y-auto">
      <div className="flex justify-center items-center px-8 py-32 lg:py-32">
        <div className="bg-white shadow-lg rounded-lg w-96 h-auto p-10">
          <form onSubmit={handleSignUpSubmit}>
            <div className="from-group">
              <label htmlFor="" className="font-semibold">
                Username  
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full p-3 mt-1 outline-none rounded-lg shadow-md focus:bg-slate-100 focus:border border-orange-500"
                placeholder="Enter Your Username"
              />
            </div>

            <div className="from-group mt-4">
              <label htmlFor="" className="font-semibold">
                Email  
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-1 outline-none rounded-lg shadow-md focus:bg-slate-100 focus:border border-orange-500"
                placeholder="Enter Your Email"
              />
            </div>

            <div className="relative from-group mt-4">
              <label htmlFor="" className="font-semibold">
                Password  
              </label>
              <input
                type={showPassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-1 outline-none rounded-lg shadow-md focus:bg-slate-100 focus:border border-orange-500"
                placeholder="Enter Your Password"
              />

              {showPassword == "password" ? (
                <AiFillEyeInvisible
                  onClick={() => setShowPassword("")}
                  className="absolute top-11 right-5 text-xl"
                />
              ) : (
                <AiFillEye
                  onClick={() => setShowPassword("password")}
                  className="absolute top-11 right-5 text-xl"
                />
              )}
            </div>

            <div className="from-group mt-6">
              <button
                type="submit"
                className="bg-orange-700 w-full p-3 rounded-md text-center text-white hover:bg-orange-500">
                Register
              </button>
            </div>

            <div className="flex flex-col items-center justify-center mt-4">
              <p>
                I have already account {" "}
                <Link to="/login" className="text-orange-600 font-bold">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
