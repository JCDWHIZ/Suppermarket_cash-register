import React from "react";
import { Link } from "react-router-dom";

function Four00() {
  return (
    <div>
      <div className="flex mt-[100px] justify-center items-center">
        <div className="flex flex-col gap-4 text-primary justify-center items-center w-[400px]">
          <h1 className="font-bold leading-tight text-[30px] text-center">
            Oops! Something went wrong please try again
          </h1>
          <h1 className="text-[100px]">400</h1>
          <h3 className="text-[25px]">Page</h3>
          <Link to={"/"}>
            <div className="py-2 px-4 bg-primary rounded-lg text-white">
              Go to Home
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Four00;
