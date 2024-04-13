import { toast } from "react-toastify";
import user from "../../user.gif";
import { useRef, useState } from "react";
import UseApi from "../../component/Api";
import { FaPenAlt, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Page() {
  const router = useNavigate();
  const API = UseApi();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
    cover_img: null,
  });
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = document.createElement("img"); // Create image element
        img.src = reader.result;
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          if (width === height) {
            setFormData({ ...formData, cover_img: file });
          } else {
            toast.error("Please input an image with equal height and width", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePenIconClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataWithImage = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataWithImage.append(key, formData[key]);
    });
    const register = await API.fetchData(
      "POST",
      "http://localhost:8000/api/oauth/cashier/register",
      null,
      {},
      formDataWithImage
    );
    console.log(register);
    const data = await register.data;
    if (register.status === 200 || register.status === 201) {
      toast.success("Registeration Successful", {
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
      router("/auth/verify");
    } else {
      toast.error("An errror Occured", {
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
          {/* <h1 className="text-[25px] font-semibold pb-3">Register</h1> */}
          <form
            className="flex flex-col gap-1 backdrop-blur-xl rounded-xl border border-gray-500 p-2 w-[350px]"
            onSubmit={handleSubmit}
          >
            <div className="my-4 relative">
              <div className=" flex justify-center">
                <img
                  src={
                    formData.cover_img
                      ? URL.createObjectURL(formData.cover_img)
                      : user
                  }
                  alt="user"
                  className="object-cover rounded-full h-[100px]"
                  width={100}
                  height={100}
                />
              </div>

              <span
                className="absolute border-4 border-white p-2 bg-primary text-white rounded-full bottom-0 right-[110px]"
                onClick={handlePenIconClick}
              >
                <FaPenAlt />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  ref={fileInputRef}
                />
              </span>
            </div>
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-2 border border-gray-500 rounded-xl"
            />
            <label htmlFor="">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-2 border border-gray-500 rounded-xl"
            />
            <label htmlFor="">Phone Number</label>
            <input
              type="number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="p-2 border border-gray-500 rounded-xl"
            />
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="p-2 border border-gray-500 rounded-xl"
            />
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
              className="p-2 border border-gray-500 rounded-xl"
            />
            <button
              type="submit"
              className="p-3 bg-primary w-full rounded-xl text-white mt-2 flex justify-center"
            >
              {API.isLoading && (
                <FaSpinner className="animate-spin text-white" />
              )}
              {!API.isLoading && <span>Register</span>}
            </button>
            <h1 className="text-center">
              Don't have an Account?{" "}
              <Link to="/auth/login">
                <span className="text-primary">Sign Up</span>
              </Link>
            </h1>{" "}
          </form>
        </div>
      </div>
    </div>
  );
}
