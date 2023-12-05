"use client";
import React, { useState, useEffect } from "react";
import Roundedlogo from "../../component/roundedlogo";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { FaCircleUser } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { RiNewspaperFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Layout from "./layout";

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loader"></div>
  </div>
);

const Dashboard = () => {
  const router = useRouter();

  //users details
  const [firstname, setFirstname] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(getCookie("user"));
  const [totalcases, setTotalCases] = useState();
  const events = [{ title: "Meeting", start: new Date() }];
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
          setTotalCases(dataCount);
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
                  <div className="min-w-0 rounded-[20px] shadow-xs overflow-hidden bg-white dark:bg-gray-800">
                    <div className="p-4 flex items-center">
                      <div className="p-3 rounded-full text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4">
                        <ImBooks size={20} />
                      </div>
                      <div>
                        <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                          Total Cases
                        </p>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                          {totalcases}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0 rounded-[20px] shadow-xs overflow-hidden bg-white dark:bg-gray-800">
                    <div className="p-4 flex items-center">
                      <div className="p-3 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
                        <RiNewspaperFill size={20} />
                      </div>
                      <div>
                        <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                          Ongoing Cases
                        </p>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                          0
                        </p>
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
