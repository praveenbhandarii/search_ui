"use client";
import React, { useState, useEffect } from "react";
import Roundedlogo from "../../../component/roundedlogo";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { FiLogOut } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { FaBell } from "react-icons/fa";
import { RiNewspaperFill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
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
  const [lastname, setLastname] = useState();
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
          console.log(response.data);
          if (response.data.user_type === "client") {
            console.log(response.data);
            setFirstname(response.data.first_name);
            setLastname(response.data.last_name);
            setEmail(response.data.email_id);
            setPhone(response.data.phone);
            setCity(response.data.city);
            setPincode(response.data.pincode);
            setUsertype(response.data.user_type);
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
            {/* <div className="text-[#343434] font-bold text-3xl p-4">Account</div> */}
            {/* <div className="bg-[#F8F8F8] rounded-[20px]">
                <div class="w-full px-4 sm:px-6 md:px-8"> */}
            <div>
              <div className="text-[#343434] font-medium text-[22px] mt-8 mb-5">
                Personal information
              </div>

              <div className="rounded-xl bg-[#FEFEFE] w-full">
                <div className="flex flex-row">
                  <img src="/profile_new.svg" alt="" className="ml-[50px]" />
                  <div className="text-left ml-12 py-8">
                    <div className="flex items-center">
                      <h2 className="text-xl font-semibold sm:text-2xl">
                        {firstname} {lastname}
                      </h2>
                      <Link href="/client/dashboard/account/update">
                        <div className="ml-2">
                          <MdModeEdit color="#969696" size={20} />
                        </div>
                      </Link>
                    </div>
                    <div className="text-[#9B9B9B] capitalize text-[14px] mb-3">
                      {usertype}
                    </div>
                    <div className="flex sm:flex-row flex-col justify-start space-x-6 text-[15px]">
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
                      {city && (
                        <div className="text-left mb-3">
                          <div className="text-[#9B9B9B] text-sm font-normal">
                            City
                          </div>
                          <div className="text-[#4F4E4E] text-base tracking-[-0.15px]">
                            {city}
                          </div>
                        </div>
                      )}
                      {pincode && (
                        <div className="text-left mb-3">
                          <div className="text-[#9B9B9B] text-sm font-normal">
                            Zip
                          </div>
                          <div className="text-[#4F4E4E] text-base tracking-[-0.15px]">
                            {pincode}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div>
              </div> */}
            {/* <div className="p-4 border-2 border-[#EDF1F7] bg-[#EDF1F7] rounded-[40px] ">

            </div> */}
          </Layout>
        </>
      )}
    </>
  );
};

export default Account;
