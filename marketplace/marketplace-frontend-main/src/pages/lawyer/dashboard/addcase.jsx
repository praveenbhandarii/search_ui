"use client";
import React, { useState, useEffect } from "react";
import Roundedlogo from "../../component/roundedlogo";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { FaCircleUser } from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { RiNewspaperFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import Layout from "./layout";
import { BiSearch } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loader"></div>
  </div>
);

const Addcase = () => {
  const router = useRouter();

  //users details
  const [firstname, setFirstname] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(getCookie("user"));

  // input fields
  const [clientId, setClientId] = useState("");
  const [lawyerId, setLawyerId] = useState("");
  const [caseName, setCaseName] = useState("");
  const [filingNumber, setFilingNumber] = useState("");
  const [dateOfFiling, setDateOfFiling] = useState("");
  const [counselName, setCounselName] = useState("");
  const [counselChanges, setCounselChanges] = useState("");
  const [nameOfJudgesPresiding, setNameOfJudgesPresiding] = useState("");
  const [claimValue, setClaimValue] = useState("");
  const [disposedDate, setDisposedDate] = useState("");
  const [addedBy, setAddedBy] = useState("");
  const [clientphonenumber, setPhoneNumber] = useState("");
  const [clientemailid, setEmailId] = useState("");
  const [clientData, setClientData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formlawyerid, setLawyer] = useState("");

  // function to addcase

  // on click add case
  const handleButtonClick = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_DATABASE}/user/user_search`,
      headers: {
        Authorization: `token ${token}`,
      },
      data: {
        email_id: clientemailid,
        phone: `91${clientphonenumber}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        // Check if the response is empty
        if (response.data.length === 0) {
          // Show an alert
          toast.error("No User Found");
        } else {
          // console.log(JSON.stringify(response.data));
          toast.success("User Found");
          setClientData(response.data);
          console.log(clientData);
          // Handle the non-empty response here
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your Axios or fetch logic here to submit the form data
    const formData = {
      client_id: clientData[0]?.id,
      lawyer_id: formlawyerid,
      case_name: caseName,
      filing_number: filingNumber,
      date_of_filing: dateOfFiling,
      counsel_name: counselName,
      counsel_changes: counselChanges,
      name_of_judges_presiding: nameOfJudgesPresiding,
      claim_value: claimValue,
      disposed_date: disposedDate,
      added_by: formlawyerid,
    };
    console.log("Form Data Submitted:", formData);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_DATABASE}/user/case`,
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        client_id: clientData[0]?.id,
        lawyer_id: formlawyerid,
        case_name: caseName,
        filing_number: filingNumber,
        date_of_filing: dateOfFiling,
        counsel_name: counselName,
        counsel_changes: counselChanges,
        name_of_judges_presiding: nameOfJudgesPresiding,
        claim_value: claimValue,
        disposed_date: disposedDate,
        added_by: formlawyerid,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success("Case Added Successfully");

        // Clear the form
        setCaseName("");
        setFilingNumber("");
        setDateOfFiling("");
        setCounselName("");
        setCounselChanges("");
        setNameOfJudgesPresiding("");
        setClaimValue("");
        setDisposedDate("");

        // Redirect to trackcase after a short delay
        setTimeout(() => {
          router.push("/lawyer/dashboard/trackcase");
        }, 1000); // Adjust the delay as needed
      })
      .catch((error) => {
        console.log(error);
        toast.error("Case Not Added");
      });
  };
  const handlePrintUserData = () => {
    if (clientData) {
      console.log("Client Data:", clientData);
      setShowForm(true);
    } else {
      console.log("Client Data is null or undefined");
    }
  };

  const handleSignOut = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_DATABASE}/user/logout`,
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        router.push("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!token) {
      // If user is not authenticated, redirect to sign-in page
      router.push("/lawyer/signin");
    } else {
      // User is authenticated, fetch user details
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DATABASE}/user`,
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data.user_type === "lawyer") {
            setFirstname(response.data.first_name);
            setLawyer(response.data.id);
            setIsLoading(false);
          } else if (response.data.user_type === "client") {
            // If user is a lawyer, redirect to sign-in page
            router.push("/signin");
          } else {
            // Handle other cases (e.g., errors)
            router.push("/signin");
          }
        })
        .catch((error) => {
          console.log(error);
          // Handle errors here, for example, redirect to sign-in page
          router.push("/signin");
        });
    }
  }, [router, token]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Layout>
        <Toaster />
        <div>
          <div className="text-[#343434] font-bold text-3xl p-4">
            Search Client
          </div>
          <div className="mb-4">
            <div className="p-4 border-2 border-[#EDF1F7] bg-[#EDF1F7] rounded-[10px] ">
              <div className="mx-1 bg-[#F8F8F8] p-5 rounded-[10px] flex flex-row space-x-4 justify-center">
                {/* <div> */}
                {/* <label
                    for="input-label"
                    class="block text-sm font-medium mb-2 dark:text-white text-center"
                  >
                    Enter Phone Number
                  </label> */}
                <input
                  type="tel"
                  id="input-label"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  class="py-3 px-8 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 text-left"
                  placeholder="Enter Phone Number"
                />
                {/* </div> */}
                {/* <div> */}
                {/* <label
                    for="input-label"
                    class="block text-sm font-medium mb-2 dark:text-white text-center"
                  >
                    Enter Email Id
                  </label> */}
                <input
                  type="text"
                  onChange={(e) => setEmailId(e.target.value)}
                  id="input-label"
                  class="py-3 px-8 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 text-left"
                  placeholder="Enter Email Id"
                />
                {/* </div> */}
              </div>

              <div className="flex justify-center items-center h-full mt-10">
                <button
                  onClick={handleButtonClick}
                  type="button"
                  class="text-white gap-2 bg-primarycolor font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 hover:bg-transparent hover:text-primarycolor transition"
                >
                  <BiSearch size={20} />
                  Search Client
                </button>
              </div>
              <div>
                {clientData && (
                  <div className="mt-4">
                    <h2 className="text-2xl font-bold mb-2">Clients</h2>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                      {/* Render user data in a card */}
                      {clientData.map((user, index) => (
                        <div
                          key={index}
                          className="flex flex-row justify-between"
                        >
                          {/* Display user details as needed */}
                          <p>
                            <span className="font-bold">Client Name: </span>
                            {user.first_name} {user.last_name}
                            <br />
                            {/* Add more fields as needed */}
                          </p>
                          <button
                            onClick={() => setShowForm(true)}
                            className="text-white bg-primarycolor font-bold rounded-lg text-sm px-4 py-2 text-center inline-flex items-center hover:bg-transparent hover:text-primarycolor transition"
                          >
                            Select User
                          </button>
                        </div>
                      ))}
                    </div>
                    {/* Button to print user data to console */}
                    {/* <button
                        onClick={handlePrintUserData}
                        className="mt-3 text-white bg-primarycolor font-bold rounded-lg text-sm px-3 py-1 text-center inline-flex items-center"
                      >
                        Print User Data to Console
                      </button> */}
                    {/* Button to show form with user details */}
                  </div>
                )}
                {/* </div> */}
                <div>
                  {showForm && (
                    <div className="mt-8">
                      <h2 className="font-bold text-xl text-primarycolor">
                        Case Details Form
                      </h2>
                      <form onSubmit={handleSubmit} className="">
                        <br />
                        <div className="relative z-0 w-full mb-6 group">
                          <input
                            name="case_name"
                            id="case_name"
                            type="text"
                            value={caseName}
                            onChange={(e) => setCaseName(e.target.value)}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label
                            for="case_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Case Name:{" "}
                          </label>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              name="filing_number"
                              id="filing_number"
                              type="text"
                              value={filingNumber}
                              onChange={(e) => setFilingNumber(e.target.value)}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              for="filing_number"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Filing Number:
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              name="dof"
                              id="dof"
                              type="date"
                              value={dateOfFiling}
                              onChange={(e) => setDateOfFiling(e.target.value)}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              for="dof"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Date of Filing:
                            </label>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              name="counsel_name"
                              id="counsel_name"
                              type="text"
                              value={counselName}
                              onChange={(e) => setCounselName(e.target.value)}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              for="counsel_name"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Counsel Name:
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              name="counsel_changes"
                              id="counsel_changes"
                              type="text"
                              value={counselChanges}
                              onChange={(e) =>
                                setCounselChanges(e.target.value)
                              }
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              for="counsel_changes"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Counsel Changes:
                            </label>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              name="nojp"
                              id="nojp"
                              type="text"
                              value={nameOfJudgesPresiding}
                              onChange={(e) =>
                                setNameOfJudgesPresiding(e.target.value)
                              }
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              for="nojp"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Name of Judges Presiding:
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              name="cv"
                              id="cv"
                              type="text"
                              value={claimValue}
                              onChange={(e) => setClaimValue(e.target.value)}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              for="cv"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Claim Value:
                            </label>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                          <div className="relative z-0 w-full mb-6 group">
                            <input
                              name="dd"
                              id="dd"
                              type="date"
                              value={disposedDate}
                              onChange={(e) => setDisposedDate(e.target.value)}
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              required
                            />
                            <label
                              for="dd"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Disposed Date:
                            </label>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <button
                            type="submit"
                            className="text-white bg-primarycolor font-bold rounded-lg text-sm px-4 py-2 text-center inline-flex items-center hover:bg-transparent hover:text-primarycolor transition"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Addcase;
