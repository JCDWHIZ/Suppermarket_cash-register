import React from "react";
import img from "../404.png";
import { Link } from "react-router-dom";

function Four04() {
  return (
    <div>
      <div className="">
        <div className="flex flex-col justify-center items-center gap-3">
          <img src={img} alt="" className="w-[500px]" />
          <h1 className="text-[40px] font-semibold ">
            Oops! Something went wrong
          </h1>
          <Link to={"/"}>
            <button className="px-4 py-2 bg-primary rounded-xl text-white">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Four04;
