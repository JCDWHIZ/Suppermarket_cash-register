"use client";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import UseApi1 from "../../component/Api1";

export default function Page() {
  const router = useNavigate();
  const API = UseApi1();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await API.fetchData(
      "POST",
      "http://localhost:8000/api/admin/login",
      null,
      {},
      formData
    );

    if (data.message === "Log in Successful") {
      console.log(data);
      toast.success("Logged in Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", "");
      router("/admin/dashboard");
    } else {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="form flex flex-col justify-center items-center">
        <h1 className="text-[40px] font-semibold pb-3">Log In</h1>
        <form
          className="flex flex-col gap-1 backdrop-blur-xl rounded-xl border border-gray-500 p-4 w-[350px]"
          onSubmit={handleSubmit}
        >
          <label htmlFor="">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email address"
            className="p-2 border border-gray-500 rounded-xl"
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            required
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border border-gray-500 rounded-xl"
          />
          <button
            type="submit"
            className=" p-3 bg-primary w-ful rounded-xl text-white mt-2 flex justify-center items-center"
          >
            {API.isLoading && <FaSpinner className="animate-spin text-white" />}
            {!API.isLoading && <span>Log In</span>}
          </button>
        </form>
      </div>
    </div>
  );
}
