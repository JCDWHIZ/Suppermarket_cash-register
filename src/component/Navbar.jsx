import { FaSearch, FaSpinner } from "react-icons/fa";
import { FaShopware } from "react-icons/fa";
import user from "../user.gif";
import useApi1 from "./Api1";
import { useContext, useEffect, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const API = useApi1();
  const router = useNavigate();
  const [name, setName] = useState("");
  const [sales, setSales] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { addToCart } = useContext(CartContext);
  const baseURL = "http://localhost:8000/storage/cover_img";
  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const fetch = async () => {
      await API.fetchData("GET", `http://localhost:8000/api/user/${id}`, token)
        .then((data) => {
          setName(data.user.name);
          setSales(data.user.today_sales);
          setImage(data.user.cover_img);
        })
        .catch((error) => {
          console.log(error);
          toast.error("an error occured", {
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
    fetch();
  }, []);
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
  const handleSearch = async (search) => {
    setLoading(true);
    try {
      const response = await API.fetchData(
        "GET",
        `http://localhost:8000/api/products/${search}`,
        token,
        {},
        null
      );
      setSearchResults(response.products);
      setLoading(false);
    } catch (error) {
      console.error("Error searching products:", error);
      setLoading(false);
      // Handle error as needed
    }
  };
  const handleAddToCart = (product) => {
    const selectedProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1, // Default quantity
    };
    addToCart(selectedProduct);
  };
  const handleChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    handleSearch(value);
  };
  return (
    <div>
      <div className="">
        <div className="m-2">
          <div className="">
            <div className="flex justify-between items-center ">
              <div className="logo flex justify-center">
                <FaShopware className="text-[22px] text-primary" />
                <h1 className="text-[22px]">Shop Ware</h1>
              </div>
              <div className="flex gap-3 items-center shadow-lg w-[400px] rounded-xl px-2 relative">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search Products...."
                  className="focus:outline-none p-3 w-full relative"
                  value={searchQuery}
                  onChange={handleChange}
                />
                {loading && (
                  <div className="absolute top-[15px] right-2 text-gray-600 z-[60]d text-[25px]">
                    <FaSpinner className="animate-spin" />
                  </div>
                )}
                <div className="absolute w-[400px] top-[55px] bg-white p-3 rounded-xl z-50">
                  {searchResults?.map((product) => (
                    <div
                      key={product.id}
                      className="hover:bg-primary py-3 rounded-xl px-3 hover:text-white"
                      onClick={() => {
                        handleAddToCart(product);
                      }}
                    >
                      <p>{product.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 items-center justify-center hhh relative">
                <div className="p-[2px] border border-green-500 rounded-full">
                  <img
                    src={baseURL && image ? `${baseURL}/${image}` : user}
                    alt="user"
                    className="h-[50px] w-[50px] rounded-full"
                  />
                </div>
                <div className="">
                  <h1 className="text-[20px]">₦{sales}</h1>
                  <h1>{name}</h1>
                </div>

                <div className="ccc bg-black rounded-xl absolute top-[35px]">
                  <div className="">
                    <button
                      className="shadow-xl p-3 rounded-xl flex hover:bg-primary items-center justify-center text-white z-[60] gap-2"
                      onClick={logout}
                    >
                      Logout
                      <IoLogOutOutline className="text-[20px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
