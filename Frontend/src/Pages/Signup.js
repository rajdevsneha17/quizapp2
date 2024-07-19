import React,{useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitHandler = (data) => {
    
    setLoading(true);
    axios.post("https://quizapp-g98o.onrender.com/signup", data).then((res) => {
      setLoading(false);
      console.log(res);
      if (res.data === "exist") {
        toast.error("You already have an account");
        navigate("/login");
      } else {
        toast.success("Signup Successfully");
        const userData = JSON.parse(res.config.data);
        localStorage.setItem("userSignupData", JSON.stringify(userData));
        const intendedDestination = localStorage.getItem('intendedDestination');
        
        if (intendedDestination) {
          const totalScore = localStorage.getItem('totalScore');
          const maxScore = localStorage.getItem('maxScore');
          localStorage.removeItem('intendedDestination');
          navigate('/score', { state: { totalScore, maxScore } });
        } else {
          navigate("/");
        }
      }
    }).catch((error) => {
      setLoading(false);
      console.error("There was an error during signup!", error);
      toast.error("Signup failed. Please try again.");
    });
  };

  return (

    <div className="min-h-screen flex flex-col">
    <nav className="w-full bg-slate-400">
      <Navbar />
    </nav>
    <div className="flex flex-1 flex-col lg:flex-row items-center justify-center ">
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <form onSubmit={handleSubmit(submitHandler)} className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-extrabold text-center mb-4">Signup</h1>
          <div className="form-control mb-4">
            <label className="text-gray-900 font-bold">Firstname</label>
            <input
              type="text"
              name="fname"
              {...register("fname", { required: true })}
              className={`w-full p-2 border-b-2 text-gray-900 ${
                errors.fname ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:border-blue-500`}
              placeholder="Enter your Firstname"
            />
            {errors.fname && (
              <p className="text-red-500 mt-1">Firstname is required.</p>
            )}
          </div>
          <div className="form-control mb-4">
            <label className="text-gray-900 font-bold">Lastname</label>
            <input
              type="text"
              name="lname"
              {...register("lname", { required: true })}
              className={`w-full p-2 border-b-2 text-gray-900 ${
                errors.lname ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:border-blue-500`}
              placeholder="Enter your Lastname"
            />
            {errors.lname && (
              <p className="text-red-500 mt-1">Lastname is required.</p>
            )}
          </div>
          <div className="form-control mb-4">
            <label className="text-gray-900 font-bold">Email</label>
            <input
              type="text"
              name="email"
              {...register("email", { required: true })}
              className={`w-full p-2 border-b-2 text-gray-900 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:border-blue-500`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 mt-1">Email is required.</p>
            )}
          </div>
          <div className="form-control mb-4">
            <label className="text-gray-900 font-bold">Create Password</label>
            <input
              type="password"
              name="password"
              {...register("password", { required: true })}
              className={`w-full p-2 border-b-2 text-gray-900 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:border-blue-500`}
              placeholder="Create your Password"
            />
            {errors.password && (
              <p className="text-red-500 mt-1">Password is required.</p>
            )}
          </div>
          <div className="form-control flex justify-center items-center">
              <button
                type="submit"
                className="w-full py-2 bg-slate-800 text-gray-200 rounded-md hover:bg-slate-700 transition duration-300"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Signup'}
              </button>
            </div>
          <div className="text-gray-900 flex justify-center items-center mt-5">
            Already have an account? <Link to="/login"><p className="text-slate-800 underline ml-2">Login</p></Link>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}
