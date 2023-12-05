"use client";
import React, { useState, useEffect } from "react";
import Roundedlogo from "../../../component/roundedlogo";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { FaCircleUser } from "react-icons/fa6";
import { Button, Timeline } from "flowbite-react";
import { TbMoneybag } from "react-icons/tb";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";
import { MdDateRange } from "react-icons/md";
import { GoLaw } from "react-icons/go";
import { ImBooks } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { RiNewspaperFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import Layout from "../layout";
import { FaUserLarge, FaMoneyCheckDollar, FaUserTie } from "react-icons/fa6";
import { BiSearch } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loader"></div>
  </div>
);

const CaseDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [caseDetails, setCaseDetails] = useState(null);

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
          if (response.data.user_type === "client") {
            setFirstname(response.data.first_name);
            setLawyer(response.data.id);
            setIsLoading(false);
          } else if (response.data.user_type === "lawyer") {
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
          const dataCount = response.data.length;
          console.log(`Number of cases: ${dataCount}`);
          setCases(response.data);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to fetch cases. Please try again later.");
        });
    }

    const fetchCaseDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE}/user/case/${id}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        setCaseDetails(response.data);
      } catch (error) {
        console.error("Error fetching case details:", error);
      }
    };

    if (id) {
      fetchCaseDetails();
    }
  }, [router, token, id]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!caseDetails) {
    return <p>Loading...</p>;
  }
  const {
    case_name,
    filing_number,
    date_of_filing,
    counsel_name,
    counsel_changes,
    name_of_judges_presiding,
    claim_value,
    intern_relif,
    lower_court,
    case_status,
    disposed_date,
  } = caseDetails[0];
  return (
    <>
      <Layout>
        <Toaster />
        <div>
          <div className="text-[#343434] font-bold text-3xl p-4">
            Case Details
          </div>
          <div>
            <div className="p-4 border-2 border-[#EDF1F7] bg-[#EDF1F7] rounded-[40px] ">
              <div className="bg-[#F8F8F8] p-5 rounded-[20px]">
                <div className="bg-white p-5 rounded-[20px] border border-[#D6D6D6] pb-5">
                  <div className="text-[#454545] font-bold text-xl mb-3">
                    {case_name}
                  </div>

                  <div>
                    <div>
                      <h2 class="sr-only">Steps</h2>
                      <div className="text-[#454545] font-bold text-xl mb-3">
                        Case Status
                      </div>
                      <div class="after:mt-4 m-5 after:block after:h-1 after:w-full after:rounded-lg after:bg-gray-200 mb-6">
                        <ol class="grid grid-cols-3 text-sm font-medium text-gray-500">
                          <li class="relative flex justify-start text-blue-600">
                            <span class="absolute -bottom-[1.75rem] start-0 rounded-full bg-blue-600 text-white">
                              <svg
                                class="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </span>

                            <span class="hidden sm:block"> Case Filed </span>

                            <svg
                              class="h-6 w-6 sm:hidden"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                              />
                            </svg>
                          </li>

                          <li class="relative flex justify-center text-blue-600">
                            <span class="absolute -bottom-[1.75rem] left-1/2 -translate-x-1/2 rounded-full bg-blue-600 text-white">
                              <svg
                                class="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </span>

                            <span class="hidden sm:block"> Approved </span>

                            <svg
                              class="mx-auto h-6 w-6 sm:hidden"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </li>

                          <li class="relative flex justify-end">
                            <span class="absolute -bottom-[1.75rem] end-0 rounded-full bg-gray-600 text-white">
                              <svg
                                class="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </span>

                            <span class="hidden sm:block">
                              {" "}
                              Case Dismissed{" "}
                            </span>

                            <svg
                              class="h-6 w-6 sm:hidden"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                              />
                            </svg>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 ">
                  <div class="rounded-lg">
                    <article class="rounded-[20px] border bg-white p-6 sm:justify-between border-[#D6D6D6]">
                      <div className="text-[#454545] font-bold text-xl mb-3">
                        Contact Lawyer
                      </div>
                      <div class="py-3 flex items-center justify-between">
                        <div class="flex items-center">
                          <img
                            class="rounded-full h-10 w-10"
                            src="https://loremflickr.com/g/600/600/paris"
                          />
                          <div class="ml-2 flex flex-col">
                            <div class="leading-snug text-sm text-gray-900 font-bold">
                              Lawyer Name
                            </div>
                            <div class="leading-snug text-xs text-gray-600">
                              Lawyer Location
                            </div>
                          </div>
                        </div>
                        <button class="rounded-full bg-blue-100 py-3 px-5 text-primarycolor sm:order-last">
                          Contact Lawyer
                        </button>
                      </div>
                    </article>
                  </div>
                  <div class=" rounded-lg ">
                    <article class="rounded-[20px] border bg-white p-6 sm:justify-between border-[#D6D6D6]">
                      <div className="text-[#454545] font-bold text-xl mb-3">
                        Up Coming Hearing
                      </div>
                      <div class="py-3 flex items-center justify-between">
                        <div class="flex items-center">
                          <div className="flex items-center justify-center rounded-full p-2 bg-[#D6D6D6] h-10 w-10">
                            <MdDateRange color="#0027B3" size={20} />
                          </div>
                          <div class="ml-2 flex flex-col">
                            <div class="leading-snug text-sm text-gray-900 font-bold">
                              Lawyer Name
                            </div>
                            <div class="leading-snug text-xs text-gray-600">
                              Lawyer Location
                            </div>
                          </div>
                        </div>
                        <button class="rounded-full bg-blue-100 py-3 px-5 text-primarycolor sm:order-last">
                          All Hearing's
                        </button>
                      </div>
                    </article>
                  </div>
                </div>
                <br />
                <div className="bg-white p-5 rounded-[20px] border border-[#D6D6D6] pb-5">
                  <div className="text-[#454545] font-bold text-xl mb-3">
                    Case Information
                  </div>
                  <>
                    {/* Card Section */}
                    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                      {/* Grid */}
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                        {/* Card */}
                        <a
                          className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          href="#"
                        >
                          <div className="p-4 md:p-5">
                            <div className="flex">
                              <GoLaw size={30} className="group-hover:text-primarycolor"/>
                              <div className="grow ms-5">
                                <h3 className="group-hover:text-primarycolor font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                                  Council Name
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {counsel_name}
                                </p>
                              </div>
                            </div>
                          </div>
                        </a>
                        {/* End Card */}
                        {/* Card */}
                        <a
                          className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          href="#"
                        >
                          <div className="p-4 md:p-5">
                            <div className="flex">
                              <FaUserTie size={30} className="group-hover:text-primarycolor"/>
                              <div className="grow ms-5">
                                <h3 className="group-hover:text-primarycolor font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                                  Name of Judge Presiding
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {name_of_judges_presiding}
                                </p>
                              </div>
                            </div>
                          </div>
                        </a>
                        {/* End Card */}
                        {/* Card */}
                        <a
                          className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          href="#"
                        >
                          <div className="p-4 md:p-5">
                            <div className="flex">
                              <FaMoneyCheckDollar size={30} className="group-hover:text-primarycolor"/>
                              <div className="grow ms-5">
                                <h3 className="group-hover:text-primarycolor font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                                  Claim Value
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {claim_value}
                                </p>
                              </div>
                            </div>
                          </div>
                        </a>
                        {/* End Card */}
                      </div>
                      {/* End Grid */}
                    </div>
                    {/* End Card Section */}
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CaseDetails;
