import React from "react";
import { FaShopware } from "react-icons/fa";
import { Outlet } from "react-router-dom";

function Authlayout() {
  return (
    <div>
      <div className="w-full h-full">
        <div className="h-screen w-[100%] flex">
          <div className="text w-[50%] bg-blue-600 flex flex-col justify-center items-center text-white">
            <div className="logo ">
              <div className="logo flex justify-center">
                <FaShopware className="text-[28px] text-primary" />
                <h1 className="text-[22px] text-white">Shop Ware</h1>
              </div>
            </div>
            <div className="">
              <h1 className="font-semibold text-[40px]">
                Register as a New Cashier
              </h1>

              <h1 className="py-3">Rules</h1>
              <ul className="flex flex-col gap-2">
                <li>1. Scan each item carefully to ensure accurate pricing.</li>
                <li>
                  2. Handle cash and electronic payments securely and
                  confidentially.
                </li>
                <li>
                  3. Verify the quantity and type of items purchased before
                  finalizing the transaction.
                </li>
                <li>
                  4. Be attentive to customers' questions and provide helpful
                  answers or assistance.
                </li>
                <li>
                  Keep the checkout area clean, organized, and free of clutter.
                </li>
                <li>
                  5. Thank the customer for their purchase and invite them to
                  visit again.
                </li>
                <li>
                  6. Stay updated on promotions, discounts, and store policies
                  to assist customers effectively.
                </li>
                <li>
                  7. Handle returns, refunds, and exchanges according to store
                  policies.
                </li>
                <li>
                  8. Remain patient and courteous, especially during busy
                  periods or when dealing with difficult customers.
                </li>
              </ul>

              <h3 className="font-bold pt-7">
                <i>
                  * Any default in expected behaviour or misconduct will be
                  punishable under the rule
                </i>
              </h3>
            </div>
          </div>
          <div className="flex justify-center items-center w-[50%]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authlayout;
