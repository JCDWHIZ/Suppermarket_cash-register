import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UseApi from "../../component/Api";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Page() {
  const router = useNavigate();
  const API = UseApi();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submit = await API.fetchData(
      "POST",
      "http://localhost:8000/api/oauth/cashier/login",
      null,
      {},
      formData
    );
    console.log(submit);
    const data = submit.data || (await submit.response.data);
    if (data.message === "Login successful") {
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
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("id", data.user.id);
      router("/cashier");
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
      <div className="">
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
              className="p-2 border border-gray-500 rounded-xl"
            />
            <label htmlFor="">Password</label>
            <input
              type="password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 border border-gray-500 rounded-xl"
            />
            <button
              type="submit"
              className="p-3 bg-primary w-ful rounded-xl text-white mt-2 flex justify-center items-center"
            >
              {API.isLoading && (
                <FaSpinner className="animate-spin text-white" />
              )}
              {!API.isLoading && <span>Log In</span>}
            </button>
            <h1 className="text-center">
              Already have an Account?{" "}
              <Link to="/auth/register">
                <span className="text-primary">Sign In</span>
              </Link>
            </h1>{" "}
          </form>
        </div>
      </div>
    </div>
  );
}
