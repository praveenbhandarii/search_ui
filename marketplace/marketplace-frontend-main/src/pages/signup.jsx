"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";

const Singup = () => {
  const [selectedTitle, setSelectedTitle] = useState("Mr");
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const router = useRouter();
  const [selectedRadio, setSelectedRadio] = useState("client"); // Default to the checked radio
  // Modal control
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  const titles = ["Mr.", "Mrs.", "Miss.", "Other"]; // Add more titles as needed

  const [errors, setErrors] = useState({
    fname: "",
    mname: "",
    lname: "",
    phone: "",
    email: "",
    selectedRadio: ""
  });

  const handleCheckboxChange = () => {
    setAcceptTerms(!acceptTerms);
  };

  const isValidEmailDomain = (domain) => {
    const validDomains = [
      "gmail.com",
      "yahoo.com",
      "example.com",
      "outlook.com"
    ]; // Add valid domains
    return validDomains.includes(domain);
  };

  const handleTitleChange = (value) => {
    setSelectedTitle(value);
  };

  function registeruser() {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_DATABASE}/user`,
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        email_id: email,
        title: selectedTitle,
        useraggrement: true,
        phone: `+91${phone}`,
        first_name: fname,
        last_name: lname,
        middle_name: mname,
        user_type: selectedRadio,
        pro_bono_community: 1
      }
    };

    axios
      .request(config)
      .then((response) => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //opt gen for both lawyer and client
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
        if (response.data.status === 0) {
          registeruser();
        } else if (response.data.status === 1) {
          toast.error("User already exist");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //validate input
  const validateInput = () => {
    // Reset errors
    setErrors({
      fname: "",
      mname: "",
      lname: "",
      phone: "",
      email: "",
      selectedRadio: ""
    });

    // Perform validation
    let isValid = true;

    // Validation for First Name
    if (fname.trim() === "") {
      isValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        fname: "First Name is required"
      }));
    }

    // Validation for Middle Name
    if (mname.trim() === "") {
      isValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        mname: "Middle Name is required"
      }));
    }

    // Validation for Last Name
    if (lname.trim() === "") {
      isValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        lname: "Last Name is required"
      }));
    }

    // Validation for Phone Number
    if (phone.trim() === "") {
      isValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Phone Number is required"
      }));
    } else if (!/^\d{10}$/.test(phone)) {
      isValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Phone Number is not valid"
      }));
    }

    // Validation for Email
    if (email.trim() === "") {
      isValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required"
      }));
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is not valid"
      }));
    }

    // Validation for Radio buttons
    if (selectedRadio === "") {
      isValid = false;
      setErrors((prevErrors) => ({
        ...prevErrors,
        selectedRadio: "Please select a user type"
      }));
    }

    return isValid;
  };

  // if else on button click
  const handleButtonClick = () => {
    // Trigger validation before proceeding
    const isValid = validateInput();

    if (!acceptTerms) {
      setTermsError(true);
    } else {
      setTermsError(false);
    }

    if (isValid && acceptTerms) {
      // If all fields are valid, proceed with the API call
      console.log(selectedRadio);
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
    }
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
                <p className="text-lg text-white">Already have an account?</p>
                <Link href="/signin" replace>
                  <button className="inline-block flex-none py-3 border-2 rounded-[8px] font-medium bg-white text-primarycolor text-[18px] sm:px-24">
                    Sign In
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
                    href="/signin"
                    className="underline font-medium text-[#070eff]"
                  >
                    Sign In now
                  </Link>
                </div>
              </div>
              {/* Login box */}
              <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
                <div className="flex flex-col space-y-2 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold">Sign Up</h2>
                  <p className="text-md md:text-xl">
                    Register with Lawyantra and get all your cases at one place.{" "}
                  </p>
                </div>
                <div className="flex flex-col max-w-md space-y-5">
                  <div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      <label
                        htmlFor="client"
                        className="p-3 block w-full bg-[#F4F4F4] border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
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
                        className="flex p-3 w-full bg-[#F4F4F4] border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      >
                        <input
                          type="radio"
                          name="lawyer"
                          id="lawyer"
                          onChange={handleRadioChange}
                          checked={selectedRadio === "lawyer"}
                        />
                        <span className="text-sm text-black ml-3">
                          I am a Lawyer
                        </span>
                      </label>
                    </div>
                    <div class="text-center text-[#989898] mt-2">
                      Once selected, you cannot change it later*
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="title"
                      className="p-3 block w-full bg-[#F4F4F4] border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <span className="text-sm text-black ml-3">Title</span>
                      <select
                        id="title"
                        onChange={(e) => handleTitleChange(e.target.value)}
                        value={selectedTitle}
                        className="block w-full mt-1 rounded-[5px] border-white"
                      >
                        {titles.map((title) => (
                          <option key={title} value={title}>
                            {title}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <input
                    onChange={(event) => setFname(event.target.value)}
                    type="text"
                    placeholder="First name"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-primarycolor rounded-lg font-medium placeholder:font-normal"
                  />
                  {errors.fname && (
                    <p style={{ color: "red" }}>{errors.fname}</p>
                  )}

                  <input
                    onChange={(event) => setMname(event.target.value)}
                    type="text"
                    placeholder="Middle name"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-primarycolor rounded-lg font-medium placeholder:font-normal"
                  />
                  {errors.mname && (
                    <p style={{ color: "red" }}>{errors.mname}</p>
                  )}

                  <input
                    onChange={(event) => setLname(event.target.value)}
                    type="text"
                    placeholder="Last Name"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-primarycolor rounded-lg font-medium placeholder:font-normal"
                  />
                  {errors.lname && (
                    <p style={{ color: "red" }}>{errors.lname}</p>
                  )}

                  <input
                    onChange={(event) => setPhone(event.target.value)}
                    type="text"
                    placeholder="Phone Number"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-primarycolor rounded-lg font-medium placeholder:font-normal"
                  />
                  {errors.phone && (
                    <p style={{ color: "red" }}>{errors.phone}</p>
                  )}

                  <input
                    onChange={(event) => setEmail(event.target.value)}
                    type="text"
                    placeholder="Email Id"
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-primarycolor rounded-lg font-medium placeholder:font-normal"
                  />
                  {errors.email && (
                    <p style={{ color: "red" }}>{errors.email}</p>
                  )}

                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      onChange={handleCheckboxChange}
                      checked={acceptTerms}
                      className="mr-2"
                    />
                    <label htmlFor="acceptTerms" className="text-sm text-black">
                      I accept the terms and conditions
                    </label>
                  </div>

                  {/* Error message for terms and conditions */}
                  {!acceptTerms && (
                    <p className="text-red-500 text-sm mt-2">
                      Please accept the terms and conditions.
                    </p>
                  )}

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

export default Singup;
