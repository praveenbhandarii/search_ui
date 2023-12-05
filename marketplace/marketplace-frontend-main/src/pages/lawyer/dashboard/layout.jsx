"use client";
import React, { useState, useEffect } from "react";
import Roundedlogo from "../../component/roundedlogo";
import axios from "axios";
import { Avatar } from "flowbite-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { LuFingerprint } from "react-icons/lu";
import { FaCircleUser } from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { RiNewspaperFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { FaBell } from "react-icons/fa";

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loader"></div>
  </div>
);

function Layout({ children }) {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("");

  //users details
  const [firstname, setFirstname] = useState();
  const [notification, setnotification] = useState("");
  const [kycstatus, setKycStatus] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(getCookie("user"));
  const values = []; // Replace this with your list of values

  const call_notification = () => {
    values.splice(0);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_DATABASE}/notiff`,
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        // setnotification(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("notfaicaskda")
  };

  // call_notification = useEffect()
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
    setActiveLink(router.pathname);

    setTimeout(() => {
      call_notification();
    }, 1000);
    if (notification == null) {
      setnotification(" ");
    }
    if (!token) {
      // If user is not authenticated, redirect to sign-in page
      router.push("/signin");
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
            setIsLoading(false);
            if (response.data.kyc_status === 1) {
              setKycStatus(1);
            } else if (response.data.kyc_status === 0) {
              setKycStatus(0);
            } else {
              console.log("not a lawyer");
            }
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
  }, [router, token, router.pathname]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div>
            <div>
              <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:pl-64 ">
                <nav
                  className="flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8"
                  aria-label="Global"
                >
                  <div className="mr-5 lg:mr-0 lg:hidden">
                    {/* <div className="flex items-center"> */}
                    <Link href="/" className="flex items-center">
                      <img
                        src="/lawyantra-color.svg"
                        alt="logo"
                        className="h-1/4 w-3/4"
                      />
                    </Link>
                    {/* <Roundedlogo width={30} height={30} />
                      <span className="ml-2 text-lg font-medium tracking-wide">
                        Lawyantra
                      </span> */}
                    {/* </div> */}
                  </div>

                  <div className="w-full flex items-center justify-end ml-auto sm:justify-between sm:gap-x-3 sm:order-3">
                    <div className="hidden sm:block"></div>

                    <div className="flex flex-row items-center justify-end gap-2">
                      <div className="mr-5 lg:mr-0 lg:hidden">
                        <button
                          type="button"
                          className="text-gray-500 hover:text-gray-600"
                          data-hs-overlay="#application-sidebar"
                          aria-controls="application-sidebar"
                          aria-label="Toggle navigation"
                        >
                          <span className="sr-only">Toggle Navigation</span>
                          <svg
                            className="w-5 h-5"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                        <button
                          id="hs-dropdown-with-header"
                          type="button"
                          // onClick={call_notification}
                          className="border-1 hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-[7px] font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs dark:bg-gray-800 dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                        >
                          <FaBell size={15} />
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="13"
                            viewBox="0 0 12 13"
                            fill="none"
                          >
                            <path
                              d="M11.8648 8.20019L10.6154 6.98672V5.37923C10.614 4.26835 10.1885 3.19744 9.42122 2.37358C8.65396 1.54972 7.59943 1.03144 6.46154 0.918952V0H5.53846V0.918952C4.40057 1.03144 3.34604 1.54972 2.57879 2.37358C1.81153 3.19744 1.38605 4.26835 1.38462 5.37923V6.98672L0.135231 8.20019C0.0486695 8.28423 2.61403e-05 8.39823 0 8.51711V9.86192C0 9.98081 0.0486262 10.0948 0.135181 10.1789C0.221737 10.263 0.339131 10.3102 0.461538 10.3102H3.69231V10.6585C3.68227 11.2272 3.88865 11.7795 4.2719 12.2095C4.65515 12.6396 5.18832 12.9171 5.76923 12.989C6.09008 13.0199 6.41404 12.9853 6.72027 12.8873C7.0265 12.7893 7.30822 12.6301 7.54732 12.42C7.78641 12.2099 7.97759 11.9536 8.10854 11.6674C8.2395 11.3812 8.30733 11.0716 8.30769 10.7585V10.3102H11.5385C11.6609 10.3102 11.7783 10.263 11.8648 10.1789C11.9514 10.0948 12 9.98081 12 9.86192V8.51711C12 8.39823 11.9513 8.28423 11.8648 8.20019ZM7.38462 10.7585C7.38462 11.1151 7.23874 11.4572 6.97907 11.7094C6.71941 11.9616 6.36722 12.1033 6 12.1033C5.63278 12.1033 5.28059 11.9616 5.02093 11.7094C4.76126 11.4572 4.61538 11.1151 4.61538 10.7585V10.3102H7.38462V10.7585ZM11.0769 9.41365H0.923077V8.7027L2.17246 7.48923C2.25902 7.40519 2.30767 7.29118 2.30769 7.17231V5.37923C2.30769 4.42812 2.6967 3.51597 3.38914 2.84344C4.08159 2.1709 5.02074 1.79308 6 1.79308C6.97926 1.79308 7.91841 2.1709 8.61086 2.84344C9.3033 3.51597 9.69231 4.42812 9.69231 5.37923V7.17231C9.69233 7.29118 9.74098 7.40519 9.82754 7.48923L11.0769 8.7027V9.41365Z"
                              fill="#838383"
                            />
                          </svg> */}
                        </button>

                        <div
                          className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700"
                          aria-labelledby="hs-dropdown-with-header"
                        >
                          <div className="py-3 px-5 -m-2 bg-white rounded-t-lg dark:bg-gray-700 ">
                            <strong>Welcome {firstname}</strong>
                          </div>
                          <div>
                            {notification &&
                              notification.length > 0 &&
                              notification.map((notif) => (
                                <div
                                  key={notif.id}
                                  className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-gray-700"
                                >
                                  ⚫{" " + notif.msg}
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </header>

              <div
                id="application-sidebar"
                className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-64 bg-[#EDF1F7] pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0"
              >
                <div className="px-6">
                  <Link href="/" className="flex items-center">
                    <img
                      src="/lawyantra-color.svg"
                      alt="logo"
                      className="h-1/4 w-3/4"
                    />
                  </Link>
                  {/* <div className="flex items-center">
                    <Roundedlogo width={30} height={30} />
                    <span className="ml-2 text-lg font-medium tracking-wide">
                      Lawyantra
                    </span>
                  </div> */}
                </div>

                <nav
                  className="hs-accordion-group pt-10 p-6 w-full flex flex-col flex-wrap"
                  data-hs-accordion-always-open
                >
                  <ul className="space-y-1.5">
                    <div>
                      {kycstatus === 0 && (
                        // Render this when kycStatus is 0
                        <div>
                          <li>
                            <Link
                              className="flex items-center gap-x-3.5 py-2 px-2.5 text-white bg-red-500 font-bold text-base rounded-md"
                              href="/lawyer/dashboard/account/kyc"
                            >
                              <LuFingerprint />
                              Complete KYC
                            </Link>
                          </li>
                        </div>
                      )}
                    </div>
                    <li className="group">
                      <Link href="/lawyer/dashboard">
                        <button
                          data-hs-overlay="#hs-static-backdrop-modal"
                          className={`flex items-center gap-x-3.5 w-full py-2 px-2.5 text-[#8F91A5] hover:bg-gray-100 font-bold text-base rounded-md group-hover:text-primarycolor ${
                            activeLink === "/lawyer/dashboard"
                              ? "`flex items-center gap-x-3.5 w-full py-2 px-2.5 text-primarycolor hover:bg-gray-100 font-bold text-base rounded-md group-hover:text-primarycolor"
                              : ""
                          }
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="24"
                            viewBox="0 0 28 24"
                            fill="none"
                          >
                            <path
                              d="M5.92 2H2.54C1.14 2 0 3.15 0 4.561V7.97C0 9.39 1.14 10.53 2.54 10.53H5.92C7.33 10.53 8.46 9.39 8.46 7.97V4.561C8.46 3.15 7.33 2 5.92 2Z"
                              className={`fill-[#8F91A5] group-hover:fill-primarycolor ${
                                activeLink === "/lawyer/dashboard"
                                  ? "fill-primarycolor"
                                  : ""
                              }
                              }`}
                            />
                            <path
                              d="M5.92 13.4688H2.54C1.14 13.4688 0 14.6098 0 16.0298V19.4387C0 20.8487 1.14 21.9987 2.54 21.9987H5.92C7.33 21.9987 8.46 20.8487 8.46 19.4387V16.0298C8.46 14.6098 7.33 13.4688 5.92 13.4688Z"
                              className={`fill-[#8F91A5] group-hover:fill-primarycolor ${
                                activeLink === "/lawyer/dashboard"
                                  ? "fill-primarycolor"
                                  : ""
                              }
                              }`}
                            />
                            <path
                              d="M17.4591 2H14.0791C12.6691 2 11.5391 3.15 11.5391 4.561V7.97C11.5391 9.39 12.6691 10.53 14.0791 10.53H17.4591C18.8591 10.53 19.9991 9.39 19.9991 7.97V4.561C19.9991 3.15 18.8591 2 17.4591 2Z"
                              className={`fill-[#8F91A5] group-hover:fill-primarycolor ${
                                activeLink === "/lawyer/dashboard"
                                  ? "fill-primarycolor"
                                  : ""
                              }
                              }`}
                            />
                            <path
                              d="M17.4591 13.4688H14.0791C12.6691 13.4688 11.5391 14.6098 11.5391 16.0298V19.4387C11.5391 20.8487 12.6691 21.9987 14.0791 21.9987H17.4591C18.8591 21.9987 19.9991 20.8487 19.9991 19.4387V16.0298C19.9991 14.6098 18.8591 13.4688 17.4591 13.4688Z"
                              className={`fill-[#8F91A5] group-hover:fill-secondrycolor ${
                                activeLink === "/lawyer/dashboard"
                                  ? "fill-secondrycolor"
                                  : ""
                              }
                              }`}
                            />
                          </svg>
                          Dashboard
                        </button>
                      </Link>
                    </li>

                    <li className="group">
                      <Link href="/lawyer/dashboard/account">
                        <button
                          data-hs-overlay="#hs-static-backdrop-modal"
                          className={`flex items-center gap-x-3.5 w-full py-2 px-2.5 text-[#8F91A5] hover:bg-gray-100 font-bold text-base rounded-md group-hover:text-primarycolor ${
                            activeLink === "/lawyer/dashboard/account"
                              ? "`flex items-center gap-x-3.5 w-full py-2 px-2.5 text-primarycolor hover:bg-gray-100 font-bold text-base rounded-md group-hover:text-primarycolor"
                              : ""
                          }
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                          >
                            <path
                              d="M8.86328 0C9.92415 0 10.9416 0.421427 11.6917 1.17157C12.4419 1.92172 12.8633 2.93913 12.8633 4C12.8633 5.06087 12.4419 6.07828 11.6917 6.82843C10.9416 7.57857 9.92415 8 8.86328 8C7.80242 8 6.785 7.57857 6.03485 6.82843C5.28471 6.07828 4.86328 5.06087 4.86328 4C4.86328 2.93913 5.28471 1.92172 6.03485 1.17157C6.785 0.421427 7.80242 0 8.86328 0ZM8.86328 10C13.2833 10 16.8633 11.79 16.8633 14V16H0.863281V14C0.863281 11.79 4.44328 10 8.86328 10Z"
                              className={`fill-[#8F91A5] group-hover:fill-primarycolor ${
                                activeLink === "/lawyer/dashboard/account"
                                  ? "fill-primarycolor"
                                  : ""
                              }
                              }`}
                            />
                          </svg>
                          Account
                        </button>
                      </Link>
                    </li>
                    <li className="group">
                      <Link href="/lawyer/dashboard/addcase">
                        <button
                          data-hs-overlay="#hs-static-backdrop-modal"
                          className={`flex items-center gap-x-3.5 w-full py-2 px-2.5 text-[#8F91A5] hover:bg-gray-100 font-bold text-base rounded-md group-hover:text-primarycolor ${
                            activeLink === "/lawyer/dashboard/addcase"
                              ? "`flex items-center gap-x-3.5 w-full py-2 px-2.5 text-primarycolor hover:bg-gray-100 font-bold text-base rounded-md group-hover:text-primarycolor"
                              : ""
                          }
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="19"
                            viewBox="0 0 18 19"
                            fill="none"
                          >
                            <path
                              d="M13.5533 10.7368C14.401 10.7368 15.2467 11.0061 15.9056 11.4534H16V0.894737C16 0.358291 15.6244 0 15.0579 0H0.942142C0.377678 0 0 0.358291 0 0.894737V16.1053C0 16.6417 0.375625 17 0.942142 17H10.0721C9.60205 16.3745 9.31879 15.5688 9.31879 14.7632C9.31879 12.5263 11.201 10.7368 13.5533 10.7368ZM3.2 3.57895H12.6132C12.8965 3.57895 13.0833 3.7571 13.0833 4.02632C13.0833 4.29553 12.8944 4.47368 12.6132 4.47368H3.2C2.91674 4.47368 2.72996 4.29553 2.72996 4.02632C2.72996 3.7571 2.91879 3.57895 3.2 3.57895ZM3.2 8.05263H12.6132C12.8965 8.05263 13.0833 8.23079 13.0833 8.5C13.0833 8.76921 12.8944 8.94737 12.6132 8.94737H3.2C2.91674 8.94737 2.72996 8.76921 2.72996 8.5C2.72996 8.23277 2.91879 8.05263 3.2 8.05263ZM8.09545 13.4211H3.10763C2.91879 13.4211 2.73201 13.2429 2.73201 12.9737C2.73201 12.7045 2.92085 12.5263 3.10763 12.5263H8.09545C8.28428 12.5263 8.47107 12.7045 8.47107 12.9737C8.47107 13.2429 8.28223 13.4211 8.09545 13.4211Z"
                              fill="#0027B3"
                              className={`fill-[#8F91A5] group-hover:fill-primarycolor ${
                                activeLink === "/lawyer/dashboard/addcase"
                                  ? "fill-primarycolor"
                                  : ""
                              }
                              }`}
                            />
                            <path
                              d="M13.6845 10.0028C10.9892 9.91197 9.07604 12.0449 9.0028 14.3156C8.91197 17.0081 11.0477 18.9243 13.33 18.9975C15.9756 19.0825 18 16.9554 18 14.5002C17.9854 11.9834 15.9902 10.0819 13.6845 10.0028ZM16.4531 13.0382L12.8437 16.6478C12.5976 16.8939 12.3808 16.8675 12.1728 16.6595L10.5263 15.0129C10.5263 15.0129 10.245 14.5998 10.5849 14.298C10.9276 13.9933 11.2645 14.298 11.2645 14.298L12.5009 15.5373L15.7295 12.2998C15.7295 12.2998 16.0517 12.001 16.4092 12.335C16.7695 12.6719 16.4531 13.0382 16.4531 13.0382Z"
                              className={`fill-[#8F91A5] group-hover:fill-secondrycolor ${
                                activeLink === "/lawyer/dashboard/addcase"
                                  ? "fill-secondrycolor"
                                  : ""
                              }
                              }`}
                            />
                          </svg>
                          Search Client
                        </button>
                      </Link>
                    </li>
                    <li className="group">
                      <Link href="/lawyer/dashboard/trackcase">
                        <button
                          data-hs-overlay="#hs-static-backdrop-modal"
                          className={`flex items-center gap-x-3.5 w-full py-2 px-2.5 text-[#8F91A5] hover:bg-gray-100 font-bold text-base rounded-md group-hover:text-primarycolor ${
                            activeLink === "/lawyer/dashboard/trackcase"
                              ? "`flex items-center gap-x-3.5 w-full py-2 px-2.5 text-primarycolor hover:bg-gray-100 font-bold text-base rounded-md group-hover:text-primarycolor"
                              : ""
                          }
                          }`}
                        >
                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M4.81 0H13.191C16.28 0 18 1.78 18 4.83V15.16C18 18.26 16.28 20 13.191 20H4.81C1.77 20 0 18.26 0 15.16V4.83C0 1.78 1.77 0 4.81 0ZM5.08469 4.66039V4.65039H8.07369C8.50469 4.65039 8.85469 5.00039 8.85469 5.42939C8.85469 5.87039 8.50469 6.22039 8.07369 6.22039H5.08469C4.65369 6.22039 4.30469 5.87039 4.30469 5.44039C4.30469 5.01039 4.65369 4.66039 5.08469 4.66039ZM5.07687 10.7407H12.9169C13.3469 10.7407 13.6969 10.3907 13.6969 9.96069C13.6969 9.53069 13.3469 9.17969 12.9169 9.17969H5.07687C4.64587 9.17969 4.29688 9.53069 4.29688 9.96069C4.29688 10.3907 4.64587 10.7407 5.07687 10.7407ZM5.08094 15.3104H12.9209C13.3199 15.2704 13.6209 14.9294 13.6209 14.5304C13.6209 14.1204 13.3199 13.7804 12.9209 13.7404H5.08094C4.78094 13.7104 4.49094 13.8504 4.33094 14.1104C4.17094 14.3604 4.17094 14.6904 4.33094 14.9504C4.49094 15.2004 4.78094 15.3504 5.08094 15.3104Z"
                              className={`fill-[#8F91A5] group-hover:fill-primarycolor ${
                                activeLink === "/lawyer/dashboard/trackcase"
                                  ? "fill-primarycolor"
                                  : ""
                              }
                              }`}
                            />
                          </svg>
                          Track case
                        </button>
                      </Link>
                    </li>
                    <div className="absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex z-20">
                      <div className="flex items-center space-x-4">
                        <div className="group inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          <button onClick={handleSignOut}>
                            <li className="group">
                              <button
                                data-hs-overlay="#hs-static-backdrop-modal"
                                className="flex block items-center gap-x-3.5 w-full py-2 px-2.5 text-[#8F91A5] hover:bg-gray-100 font-bold text-base rounded-md group-hover:text-[#e60000]"
                              >
                                <FiLogOut />
                                Logout
                              </button>
                            </li>
                          </button>
                        </div>
                      </div>
                    </div>
                  </ul>
                </nav>
              </div>

              <div className="w-full px-4 sm:px-6 md:px-8 lg:pl-72">
                <main>{children}</main>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Layout;
