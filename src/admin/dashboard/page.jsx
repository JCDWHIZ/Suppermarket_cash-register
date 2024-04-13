import {
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaShopware,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";
import admin from "../../user.gif";
import { useState, useEffect } from "react";
import UseApi from "../../component/Api";
import { toast } from "react-toastify";
import axios from "axios";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import UseApi1 from "../../component/Api1";

export default function Page() {
  const [isopen1, setIsopen1] = useState(false);
  const API = UseApi1();
  const router = useNavigate();
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState([]);
  const [openpurchase, setOpenpurchase] = useState(true);
  const [openproduct, setOpenproduct] = useState(true);
  const [id, setId] = useState("");
  const [openuser, setOpenuser] = useState(true);
  const [purchase, setPurchase] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await API.fetchData(
      "POST",
      "http://localhost:8000/api/products",
      token,
      {},
      formData
    )
      .then((data) => {
        if (data.message === "Product Created Successfully") {
          console.log(data);
          toast.success("Product Created Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setIsopen1(false);
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
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unathorized", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  const logout = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/oauth/cashier/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      if (response.status === 200) {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        router("/");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
      } else {
        toast.error("Something went wrong", {
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
    } catch (error) {
      console.log(error);
      toast.error("An error occurred, try again", {
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

  const verification = async () => {
    toast.info("Processing", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    try {
      const verify = await API.fetchData(
        "GET",
        `http://localhost:8000/api/send/verification/${id}`,
        token,
        {},
        null
      );
      console.log(verify);
      // if (verify.response.status === 500 || verify.response.status === 400) {
      //   toast.error("Data Connection is needed to send mail", {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "colored",
      //   });
      // } else {
      //   toast.success(verify.data.message, {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: true,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "colored",
      //   });
      // }
      if (verify.message === "verification sent") {
        toast.success(verify.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Data Connection is needed to send mail", {
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
    } catch (err) {
      console.log(err);
      toast.error("Data Connection is needed to send mail", {
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
  const deleteProduct = async (id) => {
    try {
      const deleted = await API.fetchData(
        "DELETE",
        `http://localhost:8000/api/products/${id}`,
        token,
        {},
        null
      );
      console.log(deleted);
      toast.success(deleted.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
      toast.error("An Error Occured", {
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const usersResponse = await API.fetchData(
          "GET",
          "http://localhost:8000/api/users",
          token
        );
        // console.log("All Users:", usersResponse);
        setUser(usersResponse.users);
        const productsResponse = await API.fetchData(
          "GET",
          "http://localhost:8000/api/products/get",
          token
        );
        // console.log("All Products:", productsResponse);
        setProduct(productsResponse.products);
        const purchasesResponse = await API.fetchData(
          "GET",
          "http://localhost:8000/api/purchases/get",
          token
        );
        // console.log("All Products:", purchasesResponse);
        setPurchase(purchasesResponse[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error as needed
      }
    };

    fetchData();
  }, []); // Ensure to add dependencies as needed

  return (
    <div>
      <div className="">
        <div
          className={`${
            !isopen1
              ? "hidden"
              : "bg-black/90 h-full w-full z-40 fixed flex justify-center items-center top-0"
          }`}
        >
          <form
            className="flex flex-col gap-1 bg-white rounded-xl p-4 w-[350px] relative"
            onSubmit={handleSubmit}
          >
            <FaTimes
              className="text-gray-500 text-[20px] absolute top-2 right-2"
              onClick={() => {
                setIsopen1(false);
              }}
            />
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name of the Product"
              required
              className="p-2 border border-gray-500 rounded-xl"
            />
            <label htmlFor="">Price</label>
            <input
              type="number"
              required
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price of the Product"
              className="p-2 border border-gray-500 rounded-xl"
            />
            <label htmlFor="">Stock</label>
            <input
              type="number"
              required
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="No of Stock"
              className="p-2 border border-gray-500 rounded-xl"
            />
            <button
              type="submit"
              className=" p-3 bg-primary w-ful rounded-xl text-white mt-2 flex justify-center items-center"
            >
              {API.isLoading && (
                <FaSpinner className="animate-spin text-white" />
              )}
              {!API.isLoading && <span>Create</span>}
            </button>
          </form>
        </div>
        <div className="w-full h-[80px] bg-blue-600 flex justify-between px-[50px] items-center py-3">
          <div className="">
            <div className="logo flex justify-center">
              <FaShopware className="text-[28px] text-primary" />
              <h1 className="text-[22px] text-white">Shop Ware</h1>
            </div>
            <div className="text-white font-semibold">
              <h1>Welcome Admin</h1>
              <h1>Dashboard</h1>
            </div>
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="p-[2px] border border-green-500 rounded-full">
              <img
                src={admin}
                alt="user"
                className="h-[50px] w-[50px] rounded-full"
              />
            </div>
            <div className="" onClick={logout}>
              <button className="shadow-xl p-3 rounded-xl flex bg-primary items-center justify-center text-white gap-2">
                Logout
                <IoLogOutOutline className="text-[20px]" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-3">
          <div className="users">
            <h1 className="text-[20px] font-semibold border-b border-gray-500 py-4 flex justify-between items-center ">
              Users
              {openuser ? (
                <FaArrowCircleDown
                  className="cursor-pointer text-primary"
                  onClick={() => {
                    setOpenuser(!openuser);
                  }}
                />
              ) : (
                <FaArrowCircleUp
                  className="cursor-pointer text-primary"
                  onClick={() => {
                    setOpenuser(!openuser);
                  }}
                />
              )}
            </h1>
            <div
              className={`${
                !openuser
                  ? "overflow-x-auto scrollbar-none ease-in-out"
                  : "overflow-x-auto scrollbar-none h-7 ease-in-out"
              }`}
            >
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Id</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Phone Number</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Total Sales</th>
                    <th className="px-4 py-2">Today Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {user.map((item, index) => (
                    <tr key={index}>
                      <td className="border-b px-4 py-2">{item.id}</td>
                      <td className="border-b px-4 py-2">{item.name}</td>
                      <td className="border-b px-4 py-2">
                        0{item.Phone_number}
                      </td>
                      <td className="border-b px-4 py-2">{item.email}</td>
                      <td className="border-b px-4 py-2">{item.total_sales}</td>
                      <td className="border-b px-4 py-2">{item.today_sales}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="purchases">
            <h1 className="text-[20px] font-semibold border-b border-gray-500 py-4 flex justify-between items-center">
              Purchases
              {openpurchase ? (
                <FaArrowCircleDown
                  className="cursor-pointer text-primary"
                  onClick={() => {
                    setOpenpurchase(!openpurchase);
                  }}
                />
              ) : (
                <FaArrowCircleUp
                  className="cursor-pointer text-primary"
                  onClick={() => {
                    setOpenpurchase(!openpurchase);
                  }}
                />
              )}
            </h1>
            <div
              className={`${
                !openpurchase
                  ? "overflow-x-auto scrollbar-none ease-in-out"
                  : "overflow-x-auto scrollbar-none h-[100px] ease-in-out"
              }`}
            >
              <div className="flex flex-col gap-3 items-center justify-center shadow-xl rounded-xl w-full m-3 p-3">
                <div className=" flex gap-4 items-center justify-center">
                  <span>Cashier's id</span>
                  <span>Purchase Reference Number</span>
                  <span>Payment Method</span>
                  <span>Total Price</span>
                </div>{" "}
              </div>
              {purchase.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 items-center justify-center shadow-xl rounded-xl w-full m-3 p-3"
                >
                  <div className=" flex gap-4 items-center justify-center">
                    <span>{item.customer_id}</span>
                    <span>{item.reference_number}</span>
                    <span>{item.payment_method}</span>
                    <span>₦{item.total_price}</span>
                  </div>
                  {/* Purchase details table */}
                  {item.purchase_details.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="table-auto w-full">
                        <thead>
                          <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Product ID</th>
                            <th className="px-4 py-2">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.purchase_details.map((detail, index) => (
                            <tr key={index} className="">
                              <td className="border-b px-4 py-2">
                                {index + 1}
                              </td>
                              <td className="border-b px-4 py-2">
                                {detail.quantity}
                              </td>
                              <td className="border-b px-4 py-2">
                                {detail.product_id}
                              </td>
                              <td className="border-b px-4 py-2">
                                {detail.price}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="products">
            <h1 className="text-[20px] font-semibold border-b border-gray-500 py-4 flex justify-between items-center">
              Products{" "}
              {openproduct ? (
                <FaArrowCircleDown
                  className="cursor-pointer text-primary"
                  onClick={() => {
                    setOpenproduct(!openproduct);
                  }}
                />
              ) : (
                <FaArrowCircleUp
                  className="cursor-pointer text-primary"
                  onClick={() => {
                    setOpenproduct(!openproduct);
                  }}
                />
              )}
            </h1>
            <div
              className={`${
                !openproduct
                  ? "overflow-x-auto scrollbar-none ease-in-out"
                  : "overflow-x-auto scrollbar-none h-[50px] ease-in-out"
              }`}
            >
              <table className="table-auto w-full mt-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((item, index) => (
                    <tr key={index} className="">
                      <td className="border-b px-4 py-2">{index + 1}</td>
                      <td className="border-b px-4 py-2">{item.name}</td>
                      <td className="border-b px-4 py-2">{item.price}</td>
                      <td className="border-b px-4 py-2">{item.stock}</td>
                      <button
                        onClick={() => {
                          deleteProduct(item.id);
                        }}
                        className="rounded-xl bg-primary text-white p-3 mx-3"
                      >
                        Delete
                      </button>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="create">
            <h1 className="text-[20px] font-semibold border-b border-gray-500 py-4">
              Create Products
            </h1>
            <div className="">
              <div className="my-4">
                <button
                  className=" py-3 px-7 bg-primary rounded-xl whitespace-nowrap text-white"
                  onClick={() => {
                    setIsopen1(!isopen1);
                  }}
                >
                  Create Product
                </button>
              </div>
            </div>
          </div>

          <div className="verify">
            <h1 className="text-[20px] font-semibold border-b border-gray-500 py-4">
              Send Verification Mail
            </h1>
            <div className="my-3">
              <div className="flex p-3 items-center border rounded-lg border-gray-500 w-fit">
                <input
                  type="text"
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  placeholder="enter id"
                  className="py-3"
                />
                <button
                  className="rounded-xl bg-primary text-white p-3"
                  onClick={verification}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="">
              {product.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex gap-3 items-center justify-center shadow-xl rounded-xl w-[400px] m-3 p-3"
                  >
                    <span>{index}</span>
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                    <span>{item.stock}</span>
                  </div>
                );
              })}
            </div> */
}
{
  /* <div className="">
{user.map((item, index) => {
  return (
    <div
      key={index}
      className="flex gap-3 items-center justify-center shadow-xl rounded-xl w-[400px] m-3 p-3"
    >
      <span>{index}</span>
      <span>{item.name}</span>
      <span>{item.Phone_number}</span>
      <span>{item.email}</span>
      <span>{item.total_sales}</span>
    </div>
  );
})}
</div> */
}
