import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { FaShopware } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Reciept() {
  const { cartItems } = useContext(CartContext);
  const formatTotalPrice = (price) => {
    return `${Number(price).toLocaleString()}`;
  };
  const calculateTotal = (items) => {
    return formatTotalPrice(
      items.reduce((total, item) => total + item.price, 0)
    );
  };
  const navigate = useNavigate();
  const PrintButton = () => {
    window.print();
  };
  const clearcart = () => {
    // eslint-disable-next-line no-restricted-globals
    const question = confirm("Are you sure you want to clear the cart?");
    if (question === true) {
      sessionStorage.removeItem("cartItems");
      navigate("/cashier");
    }
  };
  return (
    <div>
      <div className="text-center flex flex-col justify-center items-center py-9 font-semibold">
        <div className="">
          <div className="logo flex justify-center items-center flex-col">
            <FaShopware className="text-[30px] text-primary" />
            <h1 className="text-[22px]">Shop Ware</h1>
          </div>
        </div>
        <div className="receipt">
          <h2 className="text-center text-[20px] my-3">Receipt</h2>
          <div className="flex flex-col gap-3 border-t-2 border-black">
            <div className="">
              <table className="table-auto mt-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Product_name</th>
                    <th className="px-4 py-2 text-left">Price ₦</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td className="border-b px-4 py-2 border-gray-400 text-left">
                        {item.name}
                      </td>

                      <td className="border-b px-4 py-2 border-gray-400 text-left">
                        {formatTotalPrice(item.price)}
                      </td>
                      <td className="border-b px-4 py-2 border-gray-400 text-left">
                        {item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="my-3">Total: {calculateTotal(cartItems)}</p>
        </div>
        <div className="flex flex-col justify-center items-center text-center gap-3">
          <h1>Good bought in good condition are not returnable</h1>
          <h1>Thanks for shopping with us</h1>
          <h1>See you soon!</h1>
        </div>
      </div>
      <div className="flex justify-center items-center my-3">
        <button
          className="print text-center bg-primary rounded-xl text-white py-2 px-5"
          onClick={PrintButton}
        >
          Print reciept
        </button>
      </div>
      <div className="flex justify-center items-center">
        <button
          className="print text-center bg-primary rounded-xl text-white py-2 px-5"
          onClick={clearcart}
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default Reciept;
