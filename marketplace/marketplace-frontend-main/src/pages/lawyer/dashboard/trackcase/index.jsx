"use client";
import React, { useState, useEffect } from "react";
import Roundedlogo from "../../../component/roundedlogo";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { FaCircleUser } from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { RiNewspaperFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import Layout from "../layout";
import { BiSearch } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loader"></div>
  </div>
);

const Trackcase = () => {
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
  const [cases, setCases] = useState([]);

  // on click add case

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

      let axiosConfig = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DATABASE}/user/cases`,
        headers: {
          Authorization: `Token ${token}`, // Use the actual token from your state
        },
      };

      axios
        .request(axiosConfig)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setCases(response.data);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to fetch cases. Please try again later.");
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
            Track Cases
          </div>
          <div>
            <div className="p-4 border-2 border-[#EDF1F7] bg-[#EDF1F7] rounded-[40px] ">
              <div className="bg-[#F8F8F8] p-5 rounded-[20px]">
                <div class="hs-accordion-group">
                  {cases.map((singleCase) => (
                    <div
                      key={singleCase.case_id}
                      class="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700"
                      id="hs-bordered-heading-two"
                    >
                      <button
                        class="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"
                        aria-controls="hs-basic-bordered-collapse-two"
                      >
                        <svg
                          class="hs-accordion-active:hidden block w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                        <svg
                          class="hs-accordion-active:block hidden w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M5 12h14" />
                        </svg>
                        <span className="text-xl text-primarycolor font-semibold">
                          {singleCase.case_name}
                        </span>
                      </button>
                      <div
                        id="hs-basic-bordered-collapse-two"
                        class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                        aria-labelledby="hs-bordered-heading-two"
                      >
                        <div className="flex justify-between">
                          <div class="pb-4 px-5">
                            <ul>
                              <li>Filing Number: {singleCase.filing_number}</li>
                              <li>
                                Date of Filing: {singleCase.date_of_filing}
                              </li>
                            </ul>
                          </div>
                          {/* <div className="flex justify-center "> */}
                          <Link
                            href="/lawyer/dashboard/trackcase/[id]"
                            as={`/lawyer/dashboard/trackcase/${singleCase.case_id}`}
                            className="justify-center text-white bg-primarycolor font-bold rounded-xl text-sm px-4 py-3 text-center inline-flex items-center hover:bg-transparent hover:text-primarycolor transition mr-4 mb-8"
                          >
                            View Case Details
                          </Link>
                          {/* </div> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Trackcase;
