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
import Layout from "./layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";


const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loader"></div>
  </div>
);

const Dashboard = () => {
  const router = useRouter();

  //users details
  const [firstname, setFirstname] = useState();
  const [notification, setnotification] = useState("");
  const [kycstatus, setKycStatus] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(getCookie("user"));
  const events = [{ title: "Meeting", start: new Date() }];
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
            console.log(response.data.kyc_status);
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
  }, [router, token]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Layout>
            <div>
              <div className="text-[#343434] font-bold text-3xl p-4">
                Dashboard
              </div>
              <div className="p-4 border-2 border-[#EDF1F7] bg-[#EDF1F7] rounded-[40px] ">
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
                  <div class="group flex flex-col bg-white rounded-[20px] shadow-xs ">
                    <div class="p-4 md:p-5">
                      <p className="mb-2 text-[24px] font-bold text-[#454545] dark:text-gray-400">
                        My Clients
                      </p>
                      <div class="flex justify-between items-center mb-5">
                        <div class="flex items-center">
                          {/* <Avatar img="/praveen.jpg" rounded> */}
                          <div className="space-y-1 font-medium dark:text-white">
                            <div>Pravin Bhandari</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              (no.: 2023CH100045)
                            </div>
                          </div>
                          {/* </Avatar> */}
                        </div>
                        <div class="pl-3">
                          <div
                            onClick={() => {
                              // You can fetch the phone number or generate it as needed

                              // Show the phone number in an alert directly within the onClick attribute
                              alert(`Client's Phone Number : 9619984854`);
                            }}
                            className="font-medium flex flex-row tracking-wide bg-primarycolor text-white px-4 py-1 rounded-full bottom-2 transition-colors duration-200 hover:bg-secondrycolor"
                            aria-label="Sign in"
                            title="Sign in"
                          >
                            Call Client
                          </div>
                        </div>
                      </div>
                      <div class="flex justify-between items-center mb-5">
                        <div class="flex items-center">
                          {/* <Avatar img="/rishabh.png" rounded> */}
                          <div className="space-y-1 font-medium dark:text-white">
                            <div>Rishabh Jain</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              (no.: 2023AD120034)
                            </div>
                          </div>
                          {/* </Avatar> */}
                        </div>
                        <div class="pl-3">
                          <div
                            onClick={() => {
                              // You can fetch the phone number or generate it as needed

                              // Show the phone number in an alert directly within the onClick attribute
                              alert(`Client's Phone Number : 9658965423`);
                            }}
                            className="font-medium flex flex-row tracking-wide bg-primarycolor text-white px-4 py-1 rounded-full bottom-2 transition-colors duration-200 hover:bg-secondrycolor"
                            aria-label="Sign in"
                            title="Sign in"
                          >
                            Call Client
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="group flex flex-col bg-white rounded-[20px] shadow-xs ">
                    <div class="p-4 md:p-5">
                      <p className="mb-2 text-[24px] font-bold text-[#454545] dark:text-gray-400">
                        Billing
                      </p>
                      <div class="relative overflow-x-auto sm:rounded-lg">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" class="px-6 py-3">
                                Client
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Case Type
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Hours
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                Rishabh Jain
                              </th>
                              <td class="px-6 py-4">Family law</td>
                              <td class="px-6 py-4">20</td>

                              <td class="px-6 py-4 text-right">
                                <div
                                  className="font-medium flex flex-row tracking-wide bg-[#66D49F] text-white px-4 py-1 rounded-full bottom-2 transition-colors duration-200 hover:bg-secondrycolor"
                                  aria-label="Sign in"
                                  title="Sign in"
                                >
                                  paid{" "}
                                </div>
                              </td>
                            </tr>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                Pravin Bhandari
                              </th>
                              <td class="px-6 py-4">Criminal law</td>
                              <td class="px-6 py-4">51</td>

                              <td class="px-6 py-4 text-right">
                                <div
                                  className="font-medium flex flex-row tracking-wide bg-[#FF867E] text-white px-4 py-1 rounded-full bottom-2 transition-colors duration-200 hover:bg-secondrycolor"
                                  aria-label="Sign in"
                                  title="Sign in"
                                >
                                  Unpaid
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                  </div>
                  <div className="bg-white p-10 rounded-xl mt-4">
                      <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        weekends={false}
                        events={events}
                      />
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

export default Dashboard;
