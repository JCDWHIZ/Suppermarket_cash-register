import { FaDropbox, FaSpinner, FaTimes } from "react-icons/fa";
import Navbar from "../component/Navbar";
import UseApi from "../component/Api";
import UseApi1 from "../component/Api1";
import cash from "../cash1.png";
import pos from "../pos.png";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { BsBank } from "react-icons/bs";
import { CartContext } from "../component/CartContext";
import { useNavigate } from "react-router-dom";

function Page() {
  const API = UseApi();
  const API1 = UseApi1();
  const ref_num = `TRXN${uuidv4()}`;
  const [products, setProducts] = useState([]);
  const [isopen, setIsopen] = useState(false);

  const router = useNavigate();
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { cartItems, addToCart, updateCartItemQuantity, removeFromCart } =
    useContext(CartContext);
  const token = localStorage.getItem("token");
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("Email");
    if (!token && !email) {
      toast.error("Please log In, You are not authenticated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      router("/auth/login");
    }
  });
  const handleModal = () => {
    setIsopen(!isopen);
    // if (!isLiked) {

    // } else {

    // }
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

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleQuantityDecrease = (itemId) => {
    const currentItem = cartItems.find((item) => item.id === itemId);
    if (currentItem && currentItem.quantity > 1) {
      updateCartItemQuantity(itemId, currentItem.quantity - 1);
    }
  };

  const handleQuantityIncrease = (itemId) => {
    const currentItem = cartItems.find((item) => item.id === itemId);
    if (currentItem) {
      updateCartItemQuantity(itemId, currentItem.quantity + 1);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetch = async () => {
      // Fetch data when the component mounts
      const products = await API.fetchData(
        "GET",
        "http://localhost:8000/api/products/get",
        token
      );
      const data = await products.data;
      if (products.status === 200 || products.status === 201) {
        setProducts(data.products);
      } else {
        console.log(data);
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
        // router("/");
      }
    };
    fetch();
  }, []);
  const currentDate = new Date();
  const handlePurchase = async (
    cartItems,
    totalPrice,
    paymentMethod,
    referenceNumber,
    token
  ) => {
    setLoading(true);
    try {
      toast.info(cartItems, totalPrice, paymentMethod, referenceNumber, token, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      const initialData = {
        total_price: totalPrice,
        transaction_date: currentDate
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
        payment_method: paymentMethod,
        reference_number: referenceNumber,
      };
      const initialResponse = await API1.fetchData(
        "POST",
        "http://localhost:8000/api/purchase",
        token,
        {},
        initialData
      );
      const id = initialResponse.data.id;
      setId(id);
      for (const item of cartItems) {
        const itemData = {
          purchase_id: id,
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        };
        const res = await API1.fetchData(
          "POST",
          "http://localhost:8000/api/purchase/details",
          token,
          {},
          itemData
        );
      }
      toast.success("Purchase successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsopen(false);
      // sessionStorage.removeItem("cartItems");
      router("/reciept");
      setLoading(false);
    } catch (error) {
      // Handle error
      console.error("Error submitting cart:", error);
      toast.error("An Error Occurred, please try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
  };
  const formatTotalPrice = (price) => {
    return `${Number(price).toLocaleString()}`;
  };
  return (
    <main>
      <div className="">
        <div
          className={`${
            !isopen
              ? "hidden"
              : "bg-black/90 h-full w-full z-40 fixed flex justify-center items-center top-0"
          }`}
        >
          <div className="card p-3 flex justify-center items-center bg-white shadow-lg rounded-2xl w-[900px]">
            <div className="flex flex-col gap-5 items-center justify-center border-gray-500">
              <div className="">
                <h1 className="my-3 text-center">Bank Transfer</h1>
                <div className="p-5 bg-primary/60 rounded-t-lg  font-semibold flex items-center gap-2">
                  <BsBank className="text-white" />
                  <h1>Fidelity Bank</h1>
                </div>
                <div className="p-5 border border-primary rounded-b-lg">
                  <h1 className="flex gap-2 justify-center items-center  font-semibold">
                    <span>Account Name:</span>
                    <span>Rite's Delight</span>
                  </h1>
                  <h1 className="flex gap-2 justify-center items-center  font-semibold ">
                    <span>Account Number:</span>
                    <span>2334546578</span>
                  </h1>
                </div>
              </div>
              <div className="">
                <div className="p-5 bg-primary/60 rounded-t-lg font-semibold flex items-center gap-2">
                  <BsBank className="text-white" />
                  <h1>Fidelity Bank</h1>
                </div>
                <div className="p-5 border border-primary rounded-b-lg">
                  <h1 className="flex gap-2 justify-center items-center font-semibold">
                    <span>Account Name:</span>
                    <span>Rite's Delight</span>
                  </h1>
                  <h1 className="flex gap-2 justify-center items-center font-semibold ">
                    <span>Account Number:</span>
                    <span>2334546578</span>
                  </h1>
                </div>
              </div>

              <button
                className="w-[200px] bg-primary p-3 rounded-2xl text-white m-2 flex justify-center items-center"
                onClick={() => {
                  // handleModal();
                  handlePurchase(
                    cartItems,
                    totalPrice,
                    "Bank Transfer",
                    ref_num,
                    token
                  );
                }}
              >
                {loading && <FaSpinner className="animate-spin text-white" />}
                {!loading && <span>Paid</span>}
              </button>
            </div>
            <div className="w-[2px] h-[500px] bg-gray-600 mx-4 border border-gray-600"></div>
            <div className="">
              <div className="flex flex-col gap-3 items-center justify-center">
                <h1>Paid using Pos</h1>
                <img src={pos} width={100} height={100} alt="" />
              </div>
              <button
                className="w-[200px] bg-primary p-3 rounded-2xl text-white m-2 flex justify-center items-center"
                onClick={() => {
                  handlePurchase(cartItems, totalPrice, "POS", ref_num, token);
                  // handleModal();
                }}
              >
                {loading && <FaSpinner className="animate-spin text-white" />}
                {!loading && <span>Paid</span>}
              </button>
            </div>
            <div className="w-[2px] h-[500px] bg-gray-600 mx-4 border border-gray-600"></div>
            <div className="">
              <div className="flex flex-col gap-3 items-center justify-center">
                <h1>Paid using Cash</h1>
                <img src={cash} width={100} height={100} alt="" />
              </div>
              <button
                className="w-[200px] bg-primary p-3 rounded-2xl text-white m-2 flex justify-center items-center"
                onClick={() => {
                  handlePurchase(cartItems, totalPrice, "Cash", ref_num, token);
                  // handleModal();
                }}
              >
                {loading && <FaSpinner className="animate-spin text-white" />}
                {!loading && <span>Paid</span>}
              </button>
            </div>
          </div>
        </div>
        <div className="relative">
          <Navbar />

          <div className="flex h-screen">
            <div className=" w-[50%]">
              <div className="cart overflow-y-scroll scrollbar-none h-[75vh]">
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-center items-center gap-3 card shadow-md  rounded-2xl m-3 p-2 relative "
                    >
                      <div className="">
                        <FaDropbox className="text-red-500 text-[30px] absolute left-3 top-[30px]" />
                        <h1 className="text-[24px] text-center font-semibold">
                          {item.name}
                        </h1>
                        <FaTimes
                          className="text-primary text-[30px] absolute right-3 top-[30px]"
                          onClick={() => handleRemoveFromCart(item.id)}
                        />
                      </div>
                      <div className="flex justify-center items-center gap-[150px] font-semibold">
                        <div className="">
                          <span>Price: ₦{formatTotalPrice(item.price)}</span>
                        </div>
                        <div className="count flex gap-3">
                          <button
                            onClick={() => handleQuantityIncrease(item.id)}
                            className="w-[30px] h-[30px] font-bold text-white bg-primary shadow-inner rounded-lg flex justify-center items-center"
                          >
                            +
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityDecrease(item.id)}
                            className="w-[30px] h-[30px] font-bold text-white bg-primary shadow-inner rounded-lg flex justify-center items-center"
                          >
                            -
                          </button>
                        </div>{" "}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center flex-col">
                    <h1 className="text-center text-primary text-[50px]">
                      No items in cart
                    </h1>
                    {/* image */}
                  </div>
                )}
              </div>

              <div className={`${cartItems.length === 0 ? "hidden" : ""}`}>
                <div className="flex gap-3">
                  <div className="flex gap-2">
                    <h1 className="text-primary">Total Price:</h1>
                    <span className="">₦{formatTotalPrice(totalPrice)}</span>
                  </div>
                  {/* <div className="flex gap-2">
                    <h1 className="text-primary">Discount:</h1>
                    <span>0%</span>
                  </div> */}
                </div>
                <div className="flex justify-center">
                  <button
                    className="w-[200px] bg-primary p-3 rounded-2xl text-white m-2"
                    onClick={handleModal}
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
            <div className=" w-[50%] border-l-2 border-gray-300">
              <div className="products overflow-y-scroll scrollbar-none h-[100vh]">
                {products.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex gap-2 card shadow-md items-center justify-center flex-col rounded-2xl m-3 p-2 relative"
                  >
                    <FaDropbox className="text-blue-600 text-[30px] absolute top-6 left-6" />
                    <div className="flex justify-center items-center gap-[80px]">
                      <h1 className="text-black font-semibold text-[20px]">
                        {item.name}
                      </h1>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-[50px] h-[40px] text-white bg-primary shadow-inner rounded-lg flex justify-center items-center absolute top-5 right-5"
                    >
                      Add
                    </button>
                    <div className="flex items-center justify-center gap-[80px] font-semibold">
                      <div className="">
                        <span>Price: ₦{formatTotalPrice(item.price)}</span>
                      </div>
                      <div className="flex gap-1">
                        <h1>Quantity:</h1> <span>{item.stock}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
