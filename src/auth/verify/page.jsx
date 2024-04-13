import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaShopware, FaSpinner } from "react-icons/fa";
// import { HiArrowLeft } from "react-icons/hi";
import { toast } from "react-toastify";

export default function Page() {
  const [email, setEmail] = useState("");
  const [num, setNum] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationCode1, setVerificationCode1] = useState(null);
  const [verificationCode2, setVerificationCode2] = useState(null);
  const [verificationCode3, setVerificationCode3] = useState(null);
  const [verificationCode4, setVerificationCode4] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const Email = localStorage.getItem("Email");
    setEmail(Email);
    const id = localStorage.getItem("id");
    const fetchdata = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:8000/api/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const code = userResponse.data.user.verification_code;
        setNum(code);
      } catch (error) {
        console.error("Error during fetching data:", error);
        // setLoading(false);
      }
    };
    fetchdata();
  }, []);
  const navigate = useNavigate();
  const small = (e, setterFunction) => {
    const enteredValue = e.target.value;
    const nextInput = e.target.nextSibling;

    // Update the state with the entered value
    setterFunction(enteredValue);

    // Move focus to the next input
    if (nextInput && enteredValue.length === 1) {
      nextInput.focus();
    }
  };
  const handleverify = (e) => {
    e.preventDefault();
    const verification_code =
      verificationCode1 +
      verificationCode2 +
      verificationCode3 +
      verificationCode4;
    const data = { verification_code: verification_code };
    axios
      .post("http://localhost:8000/api/oauth/cashier/verify", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
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
        setLoading(false);
        navigate("/cashier");
      })
      .catch((error) => {
        console.error("Error during verification:", error);
        setLoading(false);
        toast.error("An error occurred. Please try again later", {
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

  const getCode = () => {
    if (num === undefined) {
      toast.info(`Meet the Owner to send verification code`, {
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
      toast.info(`Verification code is ${num}`, {
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
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center w-[50%]">
        <div>
          <div className="mt-[100px] flex flex-col justify-center items-center ">
            {/* <h3 className=" rounded-full border border-gray-400 p-5 w-[60px] absolute top-9">
          <HiArrowLeft />
        </h3> */}
            <div className="">
              <div className="text-center">
                <h1 className="text-[40px] font-semibold">Verify Code</h1>
                <h3 className="text-center text-gray-400">
                  Please enter the code we just sent to email
                </h3>
                <span className=" text-primary">{email}</span>
              </div>

              <form className="" onSubmit={handleverify}>
                <div className="flex gap-3 my-7 items-center justify-center">
                  <input
                    type="text"
                    maxLength={"1"}
                    className="rounded-full border border-gray-300 p-3 w-[70px] text-center text-[19px]"
                    value={verificationCode1}
                    onChange={(e) => small(e, setVerificationCode1)}
                  />
                  <input
                    type="text"
                    maxLength={"1"}
                    className="rounded-full border border-gray-300 p-3 w-[70px] text-center text-[19px]"
                    value={verificationCode2}
                    onChange={(e) => small(e, setVerificationCode2)}
                  />
                  <input
                    type="text"
                    maxLength={"1"}
                    className="rounded-full border border-gray-300 p-3 w-[70px] text-center text-[19px]"
                    value={verificationCode3}
                    onChange={(e) => small(e, setVerificationCode3)}
                  />
                  <input
                    type="text"
                    maxLength={"1"}
                    className="rounded-full border border-gray-300 p-3 w-[70px] text-center text-[19px]"
                    value={verificationCode4}
                    onChange={(e) => small(e, setVerificationCode4)}
                  />
                </div>
                <h3 className="text-center text-gray-400 ">
                  Didn't revieve OTP?
                </h3>
                <h3
                  className="text-center underline text-primary"
                  onClick={() => {
                    getCode();
                  }}
                >
                  Resend code
                </h3>

                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="p-3 bg-primary w-[200px] rounded-xl text-white mt-2 flex justify-center"
                    disabled={loading}
                  >
                    {loading && (
                      <FaSpinner className="animate-spin text-white" />
                    )}
                    {!loading && <span>Verify</span>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
