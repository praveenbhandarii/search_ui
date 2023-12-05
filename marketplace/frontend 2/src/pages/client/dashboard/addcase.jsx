"use client";
import React, { useState, useEffect } from "react";
import Roundedlogo from "../../component/roundedlogo";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { getCookie } from "cookies-next";
import { FaBell } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { RiNewspaperFill } from "react-icons/ri";
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
  const [text, setText] = useState("");

  // input fields
  const [language, setLanguage] = useState("");
  const [city, setCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // State variable for the selected category
  const [lawyers, setLawyers] = useState([]);

  // category state
  const predefinedTags = ["apple", "banana", "cherry", "date", "elderberry"];
  const [tags, setTags] = useState("");
  const [tagList, setTagList] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [tagSuggestions, setTagSuggestions] = useState([...predefinedTags]);
  const [tagsJson, setTagsJson] = useState(""); // Initialize tagsJson with an empty string

  const handleTagInputChange = (e) => {
    const inputText = e.target.value;
    setTags(inputText);

    // Filter suggestions based on user input
    const suggestions = predefinedTags.filter((tag) =>
      tag.toLowerCase().includes(inputText.toLowerCase())
    );
    setTagSuggestions(suggestions);
  };

  const handleTagSelection = (e) => {
    setSelectedSuggestion(e.target.value);
  };

  const addTag = () => {
    const selectedTag = selectedSuggestion.trim();
    if (selectedTag) {
      setTagList((prevTagList) => [...prevTagList, selectedTag]);
      setSelectedSuggestion("");
      setTagSuggestions((prevSuggestions) =>
        prevSuggestions.filter((suggestion) => suggestion !== selectedTag)
      );
    }
  };

  const removeTag = (tag) => {
    const updatedTagList = tagList.filter((t) => t !== tag);
    setTagList(updatedTagList);
    setTagSuggestions([...tagSuggestions, tag]);
  };

  const updateTagsJson = () => {
    const newTagsJson = JSON.stringify(tagList);
    setTagsJson(newTagsJson);
  };
  // category code

  // on click add case
  const handleTextareaChange = (e) => {
    setText(e.target.value); // Update the 'text' state with the content of the textarea
  };
  function searchLawyer() {
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_DATABASE}/user/user_list`,
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        client_input: text,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLawyers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
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
      router.push("/client/signin");
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
    }
  }, [router, token]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Toaster />
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
                    <div className="flex items-center">
                      {/* <Roundedlogo width={30} height={30} /> */}
                      {/* <span className="ml-2 text-lg font-medium tracking-wide">
                        Lawyantra
                      </span> */}
                      <img src="/lawyantra-color.svg" alt="logo" />
                    </div>
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
                          className="border-1 hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-[7px] font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs dark:bg-gray-800 dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                        >
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
                          <FaBell size={15} />
                        </button>

                        <div
                          className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700"
                          aria-labelledby="hs-dropdown-with-header"
                        >
                          <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-gray-700">
                            welcome {firstname}
                          </div>
                          {/* <div className="mt-2 py-2 first:pt-0 last:pb-0">
                            <a
                              className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                              href="#"
                            >
                              <svg
                                className="flex-none"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                              >
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                              </svg>
                              Newsletter
                            </a>
                          </div> */}
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
                  <div className="flex items-center">
                    {/* <Roundedlogo width={30} height={30} />
                    <span className="ml-2 text-lg font-medium tracking-wide">
                      Lawyantra
                    </span> */}
                    <img
                      src="/lawyantra-color.svg"
                      alt="logo"
                      className="h-1/4 w-3/4"
                    />
                  </div>
                </div>

                <nav
                  className="hs-accordion-group pt-10 p-6 w-full flex flex-col flex-wrap"
                  data-hs-accordion-always-open
                >
                  <ul className="space-y-1.5">
                    <li className="group">
                      <Link href="/client/dashboard">
                        <button
                          data-hs-overlay="#hs-static-backdrop-modal"
                          className="flex items-center gap-x-3.5 w-full py-2 px-2.5 text-[#8F91A5] hover:bg-gray-100 font-bold text-base rounded-md group-hover:text-primarycolor"
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
                              className="fill-[#8F91A5] group-hover:fill-primarycolor"
                            />
                            <path
                              d="M5.92 13.4688H2.54C1.14 13.4688 0 14.6098 0 16.0298V19.4387C0 20.8487 1.14 21.9987 2.54 21.9987H5.92C7.33 21.9987 8.46 20.8487 8.46 19.4387V16.0298C8.46 14.6098 7.33 13.4688 5.92 13.4688Z"
                              className="fill-[#8F91A5] group-hover:fill-primarycolor"
                            />
                            <path
                              d="M17.4591 2H14.0791C12.6691 2 11.5391 3.15 11.5391 4.561V7.97C11.5391 9.39 12.6691 10.53 14.0791 10.53H17.4591C18.8591 10.53 19.9991 9.39 19.9991 7.97V4.561C19.9991 3.15 18.8591 2 17.4591 2Z"
                              className="fill-[#8F91A5] group-hover:fill-primarycolor"
                            />
                            <path
                              d="M17.4591 13.4688H14.0791C12.6691 13.4688 11.5391 14.6098 11.5391 16.0298V19.4387C11.5391 20.8487 12.6691 21.9987 14.0791 21.9987H17.4591C18.8591 21.9987 19.9991 20.8487 19.9991 19.4387V16.0298C19.9991 14.6098 18.8591 13.4688 17.4591 13.4688Z"
                              className="fill-[#8F91A5] group-hover:fill-secondrycolor"
                            />
                          </svg>
                          Dashboard
                        </button>
                      </Link>
                    </li>
                    <li>
                      <a
                        className="flex items-center gap-x-3.5 py-2 px-2.5 text-primarycolor bg-gray-100 font-bold text-base rounded-md  "
                        href="javascript:;"
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
                          />
                          <path
                            d="M13.6845 10.0028C10.9892 9.91197 9.07604 12.0449 9.0028 14.3156C8.91197 17.0081 11.0477 18.9243 13.33 18.9975C15.9756 19.0825 18 16.9554 18 14.5002C17.9854 11.9834 15.9902 10.0819 13.6845 10.0028ZM16.4531 13.0382L12.8437 16.6478C12.5976 16.8939 12.3808 16.8675 12.1728 16.6595L10.5263 15.0129C10.5263 15.0129 10.245 14.5998 10.5849 14.298C10.9276 13.9933 11.2645 14.298 11.2645 14.298L12.5009 15.5373L15.7295 12.2998C15.7295 12.2998 16.0517 12.001 16.4092 12.335C16.7695 12.6719 16.4531 13.0382 16.4531 13.0382Z"
                            fill="#F37802"
                          />
                        </svg>
                        Search Lawyer
                      </a>
                    </li>
                    <li className="group">
                      <Link href="/client/dashboard/account">
                        <button
                          data-hs-overlay="#hs-static-backdrop-modal"
                          className="flex items-center gap-x-3.5 w-full py-2 px-2.5 text-[#8F91A5] hover:bg-gray-100 font-bold text-base rounded-md group-hover:text-primarycolor"
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
                              className="fill-[#8F91A5] group-hover:fill-primarycolor"
                            />
                          </svg>
                          Account
                        </button>
                      </Link>
                    </li>
                    <li className="group">
                      <Link href="/client/dashboard/trackcase">
                        <button
                          data-hs-overlay="#hs-static-backdrop-modal"
                          className="flex items-center gap-x-3.5 w-full py-2 px-2.5 text-[#8F91A5] hover:bg-gray-100 font-bold text-base rounded-md group-hover:text-primarycolor"
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
                              className="fill-[#8F91A5] group-hover:fill-primarycolor "
                            />
                          </svg>
                          Track Case
                        </button>
                      </Link>
                    </li>
                    <div className="absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex z-20">
                      <div className="flex items-center space-x-4">
                        <div className="group inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          <button onClick={handleSignOut}>
                            <li className="group">
                              <Link href="/">
                                <div onClick={handleSignOut}>
                                  <button
                                    data-hs-overlay="#hs-static-backdrop-modal"
                                    className="flex block items-center gap-x-3.5 w-full py-2 px-2.5 text-[#8F91A5] hover:bg-gray-100 font-bold text-base rounded-md group-hover:text-[#e60000]"
                                  >
                                    <FiLogOut />
                                    Logout
                                  </button>
                                </div>
                              </Link>
                            </li>
                          </button>
                        </div>
                      </div>
                    </div>
                  </ul>
                </nav>
              </div>

              <div className="w-full px-4 sm:px-6 md:px-8 lg:pl-72">
                <div>
                  <div className="text-[#343434] font-bold text-3xl p-4">
                    Search the best lawyer for your case.
                  </div>
                  <div>
                    <div className="p-4 border-2 border-[#EDF1F7] bg-[#EDF1F7] rounded-[40px] ">
                      <div className="bg-[#F8F8F8] p-5 rounded-[20px]">
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                          {/* <div>
                            <label
                              for="input-label"
                              class="block text-sm font-medium mb-2 dark:text-white"
                            >
                              Category
                            </label>
                            <input
                              onChange={(e) =>
                                setSelectedCategory(e.target.value)
                              }
                              type="text"
                              id="input-label"
                              class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                            />
                          </div> */}

                          {/* <div>
                            <select
                              value={selectedSuggestion}
                              onChange={handleTagSelection}
                            >
                              <option value="">Select a tag</option>
                              {tagSuggestions.map((suggestion, index) => (
                                <option key={index} value={suggestion}>
                                  {suggestion}
                                </option>
                              ))}
                            </select>
                            <button onClick={addTag}>Add Tag</button>
                            <button onClick={updateTagsJson}>
                              Update JSON
                            </button>

                            <div>
                              <h2>Tags:</h2>
                              <div className="tag-pills">
                                {tagList.map((tag, index) => (
                                  <span key={index} className="tag-pill">
                                    {tag}
                                    <button
                                      className="remove-tag"
                                      onClick={() => removeTag(tag)}
                                    >
                                      x
                                    </button>
                                  </span>
                                ))}
                              </div>
                            </div>

                            {tagsJson && (
                              <div>
                                <h2>Tags JSON:</h2>
                                <pre>{tagsJson}</pre>
                              </div>
                            )}
                          </div> */}

                          {/* this is other inputs */}

                          {/* <div>
                            <label
                              for="input-label"
                              class="block text-sm font-medium mb-2 dark:text-white"
                            >
                              Cost Per Hour
                            </label>
                            <input
                              onChange={(e) => setCity(e.target.value)}
                              type="text"
                              id="input-label"
                              class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                            />
                          </div>
                          <div>
                            <label
                              for="input-label"
                              class="block text-sm font-medium mb-2 dark:text-white"
                            >
                              Language
                            </label>
                            <input
                              onChange={(e) => setLanguage(e.target.value)}
                              type="text"
                              id="input-label"
                              class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                            />
                          </div> */}
                          <div className="items-center justify-center">
                            <label
                              for="input-label"
                              class="block text-sm font-medium mb-2 dark:text-white"
                            >
                              Add some details about your case
                            </label>
                            <textarea
                              class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                              rows="3"
                              value={text}
                              onChange={handleTextareaChange}
                            ></textarea>
                            <label
                              for="first_name"
                              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Enter Location
                            </label>
                            <input
                              type="text"
                              id="first_name"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="John"
                              required
                            />
                            <label
                              for="first_name"
                              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Language
                            </label>
                            <input
                              type="text"
                              id="first_name"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="John"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex justify-center items-center h-full mt-10">
                          <button
                            onClick={searchLawyer}
                            type="button"
                            class="text-white gap-2 bg-primarycolor font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
                          >
                            {/* <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7.4475 0.00455707C7.5231 1.04402e-07 7.6023 0 7.7049 0H10.296C10.3977 0 10.4769 1.04402e-07 10.5525 0.00455707C11.0201 0.0333431 11.4701 0.195933 11.85 0.473428C12.23 0.750923 12.5244 1.13193 12.699 1.57215C12.7269 1.64233 12.753 1.71797 12.7845 1.81641L12.7872 1.82552C12.8628 2.02967 13.0347 2.26208 13.2759 2.448C13.3029 2.46896 13.3299 2.4881 13.3569 2.50633C15.2946 2.50906 16.3062 2.54461 17.0037 3.1197C17.1477 3.23818 17.2782 3.37033 17.3943 3.51524C18 4.26896 18 5.38542 18 7.61833C18 8.18521 18 8.46775 17.865 8.68922C17.8384 8.73241 17.8083 8.77326 17.775 8.81134C17.604 9.00638 17.3367 9.08749 16.8012 9.25063L12.6 10.5266V9.79747C12.6 9.31404 12.4104 8.8504 12.0728 8.50856C11.7352 8.16673 11.2774 7.97468 10.8 7.97468H7.2C6.72261 7.97468 6.26477 8.16673 5.92721 8.50856C5.58964 8.8504 5.4 9.31404 5.4 9.79747V10.5266L1.1988 9.25063C0.6633 9.08749 0.3951 9.00638 0.225 8.81134C0.191693 8.77324 0.161588 8.73239 0.135 8.68922C8.04663e-08 8.46775 0 8.18521 0 7.61833C0 5.38542 1.07288e-07 4.26896 0.6057 3.51524C0.7227 3.36942 0.8532 3.23727 0.9963 3.1197C1.6938 2.54552 2.7054 2.50906 4.644 2.50633C4.671 2.4881 4.698 2.46896 4.725 2.448C4.9653 2.26208 5.1381 2.02876 5.2128 1.82552C5.247 1.72162 5.2722 1.64324 5.301 1.57124C5.47574 1.13119 5.77019 0.750373 6.15016 0.473046C6.53012 0.19572 6.97999 0.0332655 7.4475 0.00455707ZM11.5371 2.34046C11.5587 2.39696 11.5821 2.45165 11.6091 2.50633H6.3909C6.417 2.45165 6.4404 2.39696 6.4629 2.34046V2.33772L6.4674 2.32861L6.4719 2.31767L6.4764 2.30673L6.4791 2.29762L6.4809 2.29306L6.4845 2.28213L6.4881 2.27119L6.4899 2.26572L6.4926 2.25843L6.4944 2.25205L6.4962 2.24658C6.5313 2.14086 6.5421 2.10714 6.5529 2.08162C6.63223 1.8815 6.76603 1.70829 6.93873 1.58213C7.11143 1.45596 7.31594 1.38203 7.5285 1.36891C7.5573 1.36709 7.5933 1.36709 7.722 1.36709H10.2762C10.4049 1.36709 10.4409 1.36709 10.4697 1.36891C10.9035 1.39625 11.2833 1.67332 11.4462 2.08162C11.4552 2.10714 11.4669 2.13904 11.502 2.24658L11.5038 2.25205L11.5056 2.25843L11.5083 2.26572L11.5101 2.27119L11.5137 2.28213L11.5173 2.29306L11.5191 2.29762L11.5227 2.30673L11.5263 2.31767L11.5308 2.32861L11.5344 2.33772L11.5362 2.34046H11.5371ZM10.8 9.34177H7.2C7.08065 9.34177 6.96619 9.38978 6.8818 9.47524C6.79741 9.5607 6.75 9.67661 6.75 9.79747V11.7679C6.75002 11.8589 6.77695 11.9478 6.82732 12.0232C6.87768 12.0986 6.94918 12.1569 7.0326 12.1908L7.6626 12.446C8.52111 12.7938 9.47889 12.7938 10.3374 12.446L10.9674 12.1908C11.0508 12.1569 11.1223 12.0986 11.1727 12.0232C11.2231 11.9478 11.25 11.8589 11.25 11.7679V9.79747C11.25 9.67661 11.2026 9.5607 11.1182 9.47524C11.0338 9.38978 10.9193 9.34177 10.8 9.34177ZM5.409 11.9575L0.9054 10.5886C0.9324 13.4266 1.0962 16.0405 2.0862 16.9318C3.2724 18 5.1822 18 9 18C12.8178 18 14.7276 18 15.9138 16.9318C16.9038 16.0414 17.0676 13.4266 17.0946 10.5886L12.5901 11.9566C12.5562 12.2869 12.4338 12.6016 12.2362 12.8666C12.0385 13.1316 11.7732 13.3369 11.4687 13.4604L10.8387 13.7155C9.65838 14.1937 8.34162 14.1937 7.1613 13.7155L6.5313 13.4604C6.22683 13.3369 5.96145 13.1316 5.76382 12.8666C5.56618 12.6016 5.4438 12.2869 5.4099 11.9566L5.409 11.9575Z"
                                fill="#E2E2E2"
                              />
                            </svg> */}
                            Search Lawyer
                          </button>
                        </div>
                      </div>
                    </div>
                    {lawyers.map((lawyer) => (
                      <div
                        key={lawyer.id}
                        className="bg-white p-4 m-2 rounded-lg shadow-xl"
                      >
                        <div className="text-xl font-bold">
                          {" "}
                          {lawyer.first_name} {lawyer.middle_name}{" "}
                          {lawyer.last_name}
                        </div>

                        <div className="text-sm text-gray-600">
                          City: {lawyer.city}
                        </div>
                        <div className="text-sm text-gray-600">
                          Years of experience: {lawyer.advocate_no}
                        </div>
                        <div className="text-sm text-gray-600">
                          Cost Per Hour: {lawyer.cost_per_hour}
                        </div>
                        <button
                          className="font-medium cursor-pointer tracking-wide bg-primarycolor text-white px-4 py-1 rounded-full bottom-2 transition-colors duration-200 hover:bg-secondrycolor"
                          onClick={() => {
                            toast.success("Notification sent to lawyer");
                            // Axios configuration
                            let config = {
                              method: "post",
                              maxBodyLength: Infinity,
                              url: `${process.env.NEXT_PUBLIC_DATABASE}/notiff`,
                              headers: {
                                Authorization: `Token ${token}`,
                                "Content-Type": "application/json",
                              },
                              // Replace 'data' with the actual data you want to send
                              data: {
                                to: lawyer.id,
                                msg: "you got a client",
                                read_date: "2023-11-08T10:00:00Z",
                                delivered_date: "2023-11-08",
                              },
                            };

                            // Axios request
                            axios
                              .request(config)
                              .then((response) => {
                                console.log(JSON.stringify(response.data));
                                // Handle the response data here
                              })
                              .catch((error) => {
                                console.log(error);
                                // Handle errors here
                              });
                          }}
                        >
                          Select Lawyer
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Addcase;
