import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="">
        <main className="flex justify-center items-center h-[500px]">
          <div className=" flex flex-col gap-3">
            <div className="text-primary font-light text-[20px]">
              <Link to={"/cashier"}>
                <div className="flex justify-center items-center gap-2">
                  <h1>Cashier</h1>
                  <FaArrowRight />
                </div>
              </Link>
            </div>
            <div className="text-primary font-light text-[20px]">
              <Link to={"/auth/register"}>
                <div className="flex justify-center items-center gap-2">
                  <h1>Register</h1>
                  <FaArrowRight />
                </div>
              </Link>
            </div>
            <div className="text-primary font-light text-[20px]">
              <Link to={"/auth/login"}>
                <div className="flex justify-center items-center gap-2">
                  <h1>Login</h1>
                  <FaArrowRight />
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
