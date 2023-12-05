"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";

const Singin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [selectedRadio, setSelectedRadio] = useState("client"); // Default to the checked radio
  // Modal control
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  // otp check
  function otpCheck() {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_DATABASE}/user/login`,
      headers: {},
      data: {
        email_id: email,
        user_type: selectedRadio,
        otp: otp
      }
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.status === 1) {
          if (selectedRadio === "lawyer") {
            setCookie("user", response.data.token);
            console.log(getCookie("user"));
            console.log("redirectling to lawyer");
            router.push("/lawyer/dashboard");
          } else if (selectedRadio === "client") {
            setCookie("user", response.data.token);
            console.log(getCookie("user"));
            console.log("redirectling to client");
            router.push("/client/dashboard");
          } else {
            console.log("did not selected");
          }
        } else if (response.data.status === 0) {
          toast.error("User dosent exist");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // onclick send otp to email and show model
  const handleButtonClick = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_DATABASE}/user/email_otp`,
      headers: {},
      data: {
        email_id: email,
        user_type: selectedRadio
      }
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setOpenModal("default");
  };

  //change radio text
  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.id);
  };

  //change radio text as selected
  const displayText = () => {
    if (selectedRadio === "lawyer") {
      return "Your Case, Your Match. Simplify Client Connections";
    } else if (selectedRadio === "client") {
      return "Find the Right Lawyer, Not Just A Lawyer.";
    } else {
      return "";
    }
  };
  return (
    <>
      <>
        <Toaster />
        {/* modal */}
        <Modal
          show={props.openModal === "default"}
          onClose={() => props.setOpenModal(undefined)}
        >
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                OTP SENT to {email}
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                <input
                  onChange={(event) => setOtp(event.target.value)}
                  type="text"
                  placeholder="Enter OTP"
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
                />
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={otpCheck}>Submit</Button>
            <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
              Dismiss
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Model */}
        <div className="flex min-h-screen">
          {/* Container */}
          <div className="flex flex-row w-full">
            {/* Sidebar */}
            <div className="hidden lg:flex flex-col justify-between bg-[url('/signinbg.svg')] bg-cover bg-no-repeat lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg">
              {/* Sidebar */}
              <div className="flex items-center justify-start space-x-3">
                <Link href="/">
                  <img src="/lawyantra-no-bg.svg" />
                </Link>
              </div>
              <div className="space-y-5">
                <h1 className="lg:text-3xl text-white xl:text-5xl xl:leading-snug font-extrabold">
                  {displayText()}
                </h1>
                <p className="text-lg text-white">Don't have an account?</p>
                <Link href="/signup" replace>
                  <button className="inline-block flex-none py-3 border-2 rounded-[8px] font-medium bg-white text-primarycolor text-[18px] sm:px-[91px]">
                    Sign Up
                  </button>
                </Link>
              </div>
              <p className="font-medium text-white">© Lawyantra 2023</p>
            </div>
            {/* Login */}
            <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
              <div className="flex lg:hidden justify-between items-center w-full py-4">
                <div className="flex items-center justify-start space-x-3">
                  <img src="/lawyantra-color.svg" />
                </div>
                <div className="flex items-center space-x-2">
                  <span>Not a member? </span>
                  <Link
                    replace
                    href="/signup"
                    className="underline font-medium text-[#070eff]"
                  >
                    Sign up now
                  </Link>
                </div>
              </div>
              {/* Login box */}
              <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
                <div className="flex flex-col space-y-2 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold">Sign In</h2>
                  <p className="text-md md:text-xl">
                    Welcome to Lawyantra. The place to manage all your cases.
                  </p>
                </div>
                <div className="flex flex-col max-w-md space-y-5">
                  <div className="grid sm:grid-cols-2 gap-2">
                    <label
                      htmlFor="client"
                      className="p-3 block w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    >
                      <input
                        type="radio"
                        name="client"
                        id="client"
                        onChange={handleRadioChange}
                        checked={selectedRadio === "client"}
                      />
                      <span className="text-sm text-black ml-3 ">
                        I am a Client
                      </span>
                    </label>

                    <label
                      htmlFor="lawyer"
                      className="flex p-3 w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    >
                      <input
                        type="radio"
                        name="lawyer"
                        id="lawyer"
                        onChange={handleRadioChange}
                        checked={selectedRadio === "lawyer"}
                      />
                      <span className="text-sm text-black ml-3 ">
                        I am a Lawyer
                      </span>
                    </label>
                  </div>

                  <input
                    onChange={(event) => setEmail(event.target.value)}
                    type="text"
                    placeholder="Email Id"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-primarycolor rounded-lg font-medium placeholder:font-normal"
                  />

                  <button
                    onClick={handleButtonClick}
                    className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium  bg-primarycolor text-white"
                  >
                    Send OTP
                  </button>
                </div>
              </div>

              {/* Footer */}
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Singin;
