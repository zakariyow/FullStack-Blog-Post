import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../Features/api/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCredentials } from "../Features/AppSlice/authSlice";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if(userInfo){
      navigate('/');
    }
  }, [])

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const { error, data } = await login({ username, password });
    if (!error) {
      dispatch(setCredentials({...data}))
      navigate('/')
    } else {
      toast.error(error.data);
    }
  };
  return (
    <div className="fixed top-0 h-full left-0 right-0 bg-[#F3F4F6]">
      <div className="flex justify-center items-center px-8 py-32 lg:py-48">
        <div className="bg-white shadow-lg rounded-lg w-96 h-auto p-10">
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="" className="font-bold">
                Username 
              </label>

              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                name="username"
                placeholder="Enter Username"
                className="w-full bg-white shadow p-3 rounded-md outline-none mt-2 focus:bg-slate-100"
              />
            </div>

            <div className="relative form-group mt-4">
              <label htmlFor="" className="font-bold">
                Password  
              </label>

              <input
                type={showPassword}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                name="password"
                placeholder="Enter Your Password"
                className="w-full bg-white shadow p-3 rounded-md outline-none mt-2 focus:bg-slate-100"
              />
              {showPassword == "password" ? (
                <AiFillEyeInvisible
                  onClick={() => setShowPassword("")}
                  className="absolute top-11 right-5 text-xl cursor-pointer"
                />
              ) : (
                <AiFillEye
                  onClick={() => setShowPassword("password")}
                  className="absolute top-11 right-5 text-xl cursor-pointer"
                />
              )}
            </div>

            <div className="form-group mt-6">
              <button
                type="submit"
                className="bg-orange-700 w-full p-3 rounded-md text-center text-white hover:bg-orange-500"
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex flex-col items-center mt-4">
            <p>
              I don't have account {" "}
              <Link
                to="/signup"
                className="text-orange-600 font-bold text-center"
              >
                Sign Up
              </Link>
            </p>
            <Link to="#" className="text-orange-600 font-bold">
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;