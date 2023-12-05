"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Roundedlogo from "./roundedlogo";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";

const Navbar = () => {
  // navigation
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("");
  //
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userType, setUserType] = useState(""); // State to hold user type
  const [token, setToken] = useState(getCookie("user"));

  // check user
  useEffect(() => {
    setActiveLink(router.pathname);
    let config = {
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
        setUserType(response.data.user_type); // Set user type in state
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [router.pathname]);

  return (
    <header className="fixed bg-white flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full border-b-2 border-gray-200 text-sm py-2">
      <nav
        className="max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <span className="ml-2 text-lg font-medium tracking-wide">
            <Link href="/">
              <div className="flex justify-between">
                <Roundedlogo width={30} height={30} />
                Lawyantra
              </div>
            </Link>
          </span>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              data-hs-collapse="#navbar-collapse-with-animation"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
            >
              <svg
                className="hs-collapse-open:hidden w-4 h-4"
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
              <svg
                className="hs-collapse-open:block hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-collapse-with-animation"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block p-2"
        >
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7">
            <Link
              href="/about"
              aria-label="About us"
              title="About us"
              className={`font-medium tracking-wide hover:bg-primarycolor hover:text-white text-black px-4 py-2 rounded-full bottom-2 transition-colors duration-200  ${
                activeLink === "/about"
                  ? "font-medium tracking-wide bg-secondrycolor hover:bg-secondrycolor text-white px-4 py-1 rounded-full bottom-2 transition-colors duration-200 "
                  : ""
              }`}
            >
              <div>About Us</div>
            </Link>
            <Link
              href="/contact"
              aria-label="About us"
              title="About us"
              className={`font-medium tracking-wide hover:bg-primarycolor hover:text-white text-black px-4 py-2 rounded-full bottom-2 transition-colors duration-200  ${
                activeLink === "/contact"
                  ? "font-medium tracking-wide bg-secondrycolor hover:bg-secondrycolor text-white px-4 py-1 rounded-full bottom-2 transition-colors duration-200 "
                  : ""
              }`}
            >
              <div>Contact Us</div>
            </Link>

            {/* Conditional rendering based on user type */}
            <div className="flex items-center gap-x-2 sm:ml-auto">
              {userType === "lawyer" ? (
                <Link
                  href="/lawyer/dashboard"
                  className="font-medium tracking-wide bg-primarycolor text-white px-4 py-1 rounded-full bottom-2 transition-colors duration-200 hover:bg-secondrycolor"
                  aria-label="Go to Lawyer Dashboard"
                  title="Go to Lawyer Dashboard"
                >
                  lawyer Dashboard
                </Link>
              ) : userType === "client" ? (
                <Link
                  href="/client/dashboard"
                  className="font-medium tracking-wide bg-primarycolor text-white px-4 py-1 rounded-full bottom-2 transition-colors duration-200 hover:bg-secondrycolor"
                  aria-label="Go to Client Dashboard"
                  title="Go to Client Dashboard"
                >
                  client Dashboard
                </Link>
              ) : (
                // If userType is neither lawyer nor client, show Sign Up and Sign In buttons
                <div className="flex items-center gap-x-2 sm:ml-auto">
                  <Link
                    href="/signin"
                    className="font-medium tracking-wide bg-primarycolor text-white px-4 py-1 rounded-full bottom-2 transition-colors duration-200 hover:bg-secondrycolor"
                    aria-label="Sign in"
                    title="Sign in"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="font-medium tracking-wide text-primarycolor border-2 border-primarycolor hover:border-secondrycolor hover:text-secondrycolor px-4 py-1 rounded-full transition-colors duration-200 "
                    aria-label="Sign up"
                    title="Sign up"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
