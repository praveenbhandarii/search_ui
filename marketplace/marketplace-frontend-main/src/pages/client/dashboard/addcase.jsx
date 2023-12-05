"use client";
import React, { useState, useEffect } from "react";
import Roundedlogo from "../../component/roundedlogo";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { getCookie } from "cookies-next";
import {
  IoLocationOutline,
  IoLanguage,
  IoList,
  IoSearch
} from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { RiNewspaperFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import Layout from "./layout";

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loader"></div>
  </div>
);

const Addcase = () => {
  const router = useRouter();
  const [searched, setSearched] = useState(false); // State variable to track if the user has clicked the search button

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

  // on click add case
  const handleTextareaChange = (e) => {
    setText(e.target.value); // Update the 'text' state with the content of the textarea
  };
  // Update the input change handler for language
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value); // Update the 'language' state with the content of the input
  };

  // Update the input change handler for location
  const handleLocationChange = (e) => {
    setCity(e.target.value); // Update the 'city' state with the content of the input
  };

  const searchLawyer = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DATABASE}/user/user_search`,
        {
          client_input: text
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.length === 0) {
        // If no lawyers found, reject the promise with an error message
        throw "Unfortunately, no lawyers found.";
      } else {
        // If lawyers found, resolve the promise with the lawyers
        return response.data;
      }
    } catch (error) {
      console.error("Error searching for lawyers:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        throw "Error from server: " + error.response.status;
      } else if (error.request) {
        // The request was made but no response was received
        throw "No response from server.";
      } else {
        // Something happened in setting up the request that triggered an Error
        throw "An error occurred while processing the request.";
      }
    }
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
          Authorization: `Token ${token}`
        }
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

  const handleSearchLawyer = () => {
    toast
      .promise(searchLawyer(), {
        loading: "Searching...",
        success: (foundLawyers) => {
          // Update the state with the found lawyers
          setLawyers(foundLawyers);
          return "Lawyers found!";
        },
        error: (error) => {
          // Show an error toast
          return error.message;
        }
      })
      .then(() => {
        // Update the state to indicate that the user has clicked the search button
        setSearched(true);
      });
  };
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
          <Layout>
            <div className="text-[#343434] font-bold text-3xl p-4">
              Search the best lawyer for your case.
            </div>
            <div>
              <div className="p-4 border-2 border-[#EDF1F7] bg-[#EDF1F7] rounded-[40px] ">
                <div className="bg-[#F9F9F9] p-5 rounded-[20px]">
                  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                    <div class="rounded-lg">
                      <label
                        for="input-label-with-helper-text"
                        class="block text-lg font-bold mb-4 text-[#454545] flex items-center"
                      >
                        <IoLocationOutline class="mr-2" />
                        Enter location
                      </label>
                      <input
                        type="text"
                        id="input-label-with-helper-text"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        placeholder="Mumbai, Maharashtra"
                        aria-describedby="hs-input-helper-text"
                        onChange={handleLocationChange} // Use the new change handler for location
                      />
                    </div>
                    <div class="rounded-lg">
                      <label
                        for="input-label-with-helper-text"
                        class="block text-lg font-bold mb-4 text-[#454545] flex items-center"
                      >
                        <IoLanguage class="mr-2" />
                        Enter language
                      </label>
                      <input
                        type="text"
                        id="input-label-with-helper-text"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        placeholder="English, Hindi"
                        aria-describedby="hs-input-helper-text"
                        onChange={handleLanguageChange} // Use the new change handler for language
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <label
                      for="input-label-with-helper-text"
                      class="block text-lg font-bold mb-4 text-[#454545] flex items-center"
                    >
                      <IoList class="mr-2" />
                      Add some details about your case
                    </label>
                    <textarea
                      id="textarea-label-with-helper-text"
                      class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      rows="3"
                      onChange={handleTextareaChange}
                      placeholder="Case Details"
                      aria-describedby="hs-textarea-helper-text"
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-center items-center h-full mt-10">
                  <button
                    onClick={handleSearchLawyer}
                    type="button"
                    class="text-white gap-2 bg-primarycolor font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
                  >
                    <IoSearch size={20} /> Search Lawyer
                  </button>
                </div>

                {lawyers.length > 0 && (
                  <div>
                    {/* Display lawyer details */}
                    {lawyers.map((lawyer) => (
                      <div
                        key={lawyer.id}
                        className="bg-white p-4 m-2 rounded-lg"
                      >
                        <div class="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
                          <div class="w-4/5 h-10 py-3 px-1">
                            <p class="hover:text-blue-dark">
                              {lawyer.first_name}
                            </p>
                            <p class="hover:text-blue-dark">{lawyer.city}</p>
                          </div>
                          <div class="w-1/5 h-10 text-right p-3">
                            <p class="text-sm text-grey-dark">
                              <button
                                className="font-medium cursor-pointer tracking-wide bg-primarycolor text-white px-4 py-1 rounded-[8px] bottom-2 transition-colors duration-200 hover:bg-secondrycolor"
                                onClick={() => {
                                  toast.success("Notification sent to lawyer");
                                  // Axios configuration
                                  let config = {
                                    method: "post",
                                    maxBodyLength: Infinity,
                                    url: `${process.env.NEXT_PUBLIC_DATABASE}/notiff`,
                                    headers: {
                                      Authorization: `Token ${token}`,
                                      "Content-Type": "application/json"
                                    },
                                    // Replace 'data' with the actual data you want to send
                                    data: {
                                      to: lawyer.id,
                                      msg: "you got a client",
                                      read_date: "2023-11-08T10:00:00Z",
                                      delivered_date: "2023-11-08"
                                    }
                                  };

                                  // Axios request
                                  axios
                                    .request(config)
                                    .then((response) => {
                                      console.log(
                                        JSON.stringify(response.data)
                                      );
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
                            </p>
                          </div>
                        </div>

                        <div className="mb-4" />
                        {/* ... (previous code) */}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Layout>
        </>
      )}
    </>
  );
};

export default Addcase;
