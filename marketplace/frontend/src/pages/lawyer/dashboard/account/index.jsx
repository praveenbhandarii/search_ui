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

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loader"></div>
  </div>
);

const Account = () => {
  const router = useRouter();

  //users details
  const [firstname, setFirstname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();
  const [usertype, setUsertype] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(getCookie("user"));

  const handleSignOut = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_DATABASE}/user/logout`,
      headers: {
        Authorization: `Token ${token}`
      }
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
          Authorization: `Token ${token}`
        }
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data.user_type === "lawyer") {
            console.log(response.data.phone);
            setFirstname(response.data.first_name);
            setEmail(response.data.email_id);
            setPhone(response.data.phone);
            setCity(response.data.city);
            setPincode(response.data.pincode);
            setUsertype(response.data.user_type);
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

  const handleInputChange = (e) => {
    setFirstname(e.target.value); // Update the state with the new input value
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Layout>
            <div>
              <div className="text-[#343434] font-bold text-3xl p-4">
                Personal information
              </div>
              <div className="p-4">
                <div className=" rounded-[20px]">
                  <div class="w-full px-4 sm:px-6 md:px-8">
                    <div className="grid gap-6 md:grid-cols-1 xl:grid-cols-2"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Narrow Card */}
                    <div className="col-span-1 bg-gray-200 p-4 rounded-lg">
                      <div className="flex flex-col justify-center max-w-xs rounded-xl bg-[#FEFEFE]">
                        <Link href="/lawyer/dashboard/account/update">
                          <div className="flex justify-end rounded-xl mt-4 mx-4">
                            <button
                              type="button"
                              data-hs-overlay="#hs-large-modal"
                              className="inline-flex focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-xl border border-transparent font-semibold bg-[#FEFEFE] text-white transition-all text-sm"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="17"
                                viewBox="0 0 17 17"
                                fill="none"
                              >
                                <path
                                  d="M16.3777 0.622274C15.9792 0.223835 15.4388 0 14.8752 0C14.3117 0 13.7713 0.223835 13.3728 0.622274L12.4361 1.5589L15.4411 4.56386L16.3777 3.62723C16.7762 3.22873 17 2.68828 17 2.12475C17 1.56123 16.7762 1.02078 16.3777 0.622274ZM14.5822 5.42276L11.5772 2.4178L1.7415 12.2535C1.2419 12.7529 0.874638 13.3689 0.672922 14.0458L0.0253014 16.2194C-0.00596561 16.3243 -0.00829759 16.4357 0.0185523 16.5418C0.0454022 16.6479 0.100435 16.7448 0.177829 16.8222C0.255222 16.8996 0.352097 16.9546 0.458203 16.9814C0.564309 17.0083 0.6757 17.0060.780589 16.9747L2.95417 16.3271C3.63111 16.1254 4.24711 15.7581 4.74646 15.2585L14.5822 5.42276Z"
                                  fill="#969696"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </Link>

                        <img
                          src="/user286.svg"
                          alt=""
                          className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
                        />
                        <div className="space-y-4 text-center">
                          <div className="my-2 space-y-1">
                            <h2 className="text-xl font-semibold sm:text-2xl">
                              {firstname}
                            </h2>
                            <div className="text-[#9B9B9B] capitalize">
                              {usertype}
                            </div>
                          </div>
                          <div className="flex justify-start px-10 flex-col">
                            <div className="text-left mb-3">
                              <div className="text-[#9B9B9B] text-sm font-normal">
                                Email
                              </div>
                              <div className="text-[#4F4E4E] text-base tracking-[-0.15px]">
                                {email}
                              </div>
                            </div>
                            <div className="text-left mb-3">
                              <div className="text-[#9B9B9B] text-sm font-normal">
                                Phone
                              </div>
                              <div className="text-[#4F4E4E] text-base tracking-[-0.15px]">
                                +{phone}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </Layout>
        </>
      )}
    </>
  );
};

export default Account;
