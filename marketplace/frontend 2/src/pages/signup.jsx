"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";

const Singup = () => {
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [selectedRadio, setSelectedRadio] = useState("client"); // Default to the checked radio
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [fnameError, setfnameError] = useState('Enter First Name');
  const [lnameError, setlnameError] = useState('Enter Last Name');
  const [mnameError, setmnameError] = useState('Enter Middle Name');
  const [selectedTitle, setSelectedTitle] = useState("Mr");
  const [isSubmitting, setisSubmitting] = useState(false); //false = button enabled ; true = button disables
  const titles = ["Mr.", "Mrs.", "Miss.", "Other"]; // Add more titles as needed

  // const isSubmitDisabled = !fname || !email || !phone || !lname || isSubmitting;
  // Modal control
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };

  function registeruser() {
    let config = {
      method: "post",
      
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_DATABASE}/user`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email_id: email,
        title: "Mr",
        useraggrement: true,
        phone: `+91${phone}`,
        first_name: fname,
        last_name: lname,
        middle_name: mname,
        user_type: selectedRadio,
      },
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
        otp: otp,
      },
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.status === 0) {
          registeruser();
        } else if (response.data.status === 1) {
          toast.error("User dosent exist");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // otp check
  function otpChecka() {
    if (selectedRadio === "lawyer") {
      lawyerOtpcheck();
    } else if (selectedRadio === "client") {
      clientOtpcheck();
    } else {
      console.log("error");
      toast.error("There was some error checking otp");
    }
  }

  const checkFormValidity = () => {
    // Check each field and update error messages
    // ...
    console.log(phone)
    // Update isButtonDisabled based on the validity of all fields
    if(fname != "" && lname != "" && phone != "" && email != ""){
      setisSubmitting(false);
  }
  };

  const emailCheck = (value) => {
    // Validate email and phone here before sending OTP
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const phoneRegex = /^\d{10}$/;
    if(emailRegex){
      setEmailError('');
      setEmail(value);
    }
    
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      // return
    } else{
      setEmailError('');
      setEmail(value);
      // check()
      
      // setbuttonState(true)
      // return true;
    }
    checkFormValidity()
  };


  const phoneCheck = (value) => {
    var p=value
    // console.log(p)
    if (p.length == 10) { 
      setPhoneError('');
      setPhone(value   )
    }
    if(value){setPhone(value)}

    const phoneRegex = /^\d{10}$/;
    

    if (p.length === 0) {
      setPhoneError('Phone number is required');
    } else if (p.length < 10) {
      if (!phoneRegex.test(p)) {
        setPhoneError('Invalid phone number (10 digits required)');
        // 
        // setbuttonState(false)
      } else {
        setPhoneError('');
        setPhone(p)
        setPhone(value)
        // check()
      }
    }

    checkFormValidity()
    
  };


  const FnameCheck = (value) => {
    // Validate email and phone here before sending OTP
    // const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    // const phoneRegex = /^\d{10}$/;
    
    if (value.length <=0 ) {
      setfnameError('Enter First Name');
    } else {
      setfnameError('');
      setFname(value);
      // check()
      // setbuttonState(true)
      // return true;
    }

    checkFormValidity()
    // }
  };
  const LnameCheck = (value) => {
    if (value.length <=0 ) {
      setlnameError('Enter Last Name');
    } else {
      setlnameError('');
      setLname(value);
      // check()
    }
    checkFormValidity()
  };


  // if else on button click
  const handleButtonClick = () => {
    // check()
    // if(check){
      console.log(selectedRadio);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DATABASE}/user/email_otp`,
        headers: {},
        data: {
          email_id: email,
          user_type: selectedRadio,
        },
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
    // }

    
  };

  //change radio text
  const handleRadioChange = (event) => {email
    setSelectedRadio(event.target.id);
  };

  //change radio text as selected
  const displayText = () => {
    if (selectedRadio === "lawyer") {
      return "Your Case, Your Match.Simplify Client Connections";
    } else if (selectedRadio === "client") {
      return "Find the Right Lawyer, Not Just A Lawyer.";
    } else {
      return "";
    }
  };
  // setEmailError(false)
  // setPhoneError(false) 

  //  ButtonDisabled = emailError || phoneError || isButtonDisabled;                                     ;
  
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
                      <span className="text-sm text-black ml-3">
                        I am a Lawyer
                      </span>
                    </label>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2 justify-center">
                  <label
                    htmlFor="title"
                    className="p-3 block w-full bg-white border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  >
                    <span className="text-sm text-black ml-3">Title</span>
                    <select
                      id="title"
                      onChange={(e) => handleTitleChange(e.target.value)}
                      value={selectedTitle}
                      className="block w-full mt-1"
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
                  onChange={(event) => FnameCheck(event.target.value)}
                  type="text"
                  placeholder="First name"
                  required
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-primarycolor rounded-lg font-medium placeholder:font-normal"
                />
                 {fnameError && <p className="text-red-500">{fnameError}</p>} {/* Display phone error */}
                
                <input
                  
                  onChange={(event) => setMname(event.target.value)}
                  type="text"
                  placeholder="Middle name"
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-primarycolor rounded-lg font-medium placeholder:font-normal"
                />
                 
                <input
                  onChange={(event) => LnameCheck(event.target.value)}
                  type="text"
                  placeholder="Last Name"
                  required
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-primarycolor rounded-lg font-medium placeholder:font-normal"
                />
                 {lnameError && <p className="text-red-500">{lnameError}</p>} {/* Display phone error */}
                <input
                  // onChange={(event) => setPhone(event.target.value)}
                  onChange={(event) => phoneCheck(event.target.value)}
                  onInput={(event) => event.target.value = event.target.value.replace(/\D/, '')}
                  type="tel"
                  maxLength="10"
                  required
                  placeholder="Phone Number"
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-primarycolor rounded-lg font-medium placeholder:font-normal"
                />
                {phoneError && <p className="text-red-500">{phoneError}</p>} {/* Display phone error */}
                <input
                  onChange={(event) => emailCheck(event.target.value)}
                  type="email"
                  placeholder="Email Id"
                  required
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-primarycolor rounded-lg font-medium placeholder:font-normal"
                />
                {emailError && <p className="text-red-500">{emailError}</p>} {/* Display email error */}
                <button
                  className={`flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium bg-primarycolor text-white ${
                    isSubmitting && "cursor-not-allowed opacity-50"  }`}
                  
                  onClick={handleButtonClick}  
                  disabled={isSubmitting}
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
