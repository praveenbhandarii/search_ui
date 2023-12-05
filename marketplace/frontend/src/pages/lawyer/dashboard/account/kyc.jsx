"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { IoMdArrowRoundBack } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../layout";

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loader"></div>
  </div>
);

const Account = () => {
  const router = useRouter();

  // State variables
  const [panCard, setPanCard] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState();
  const [usertype, setUsertype] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const [token, setToken] = useState(getCookie("user"));

  useEffect(() => {
    const token = getCookie("user");

    if (!token) {
      router.push("/signin");
    } else {
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
            setIsLoading(false);
            setEmail(response.data.email_id);
            setUsertype(response.data.user_type);
            setPanCard(response.data.pan_number); // Set the existing PAN card number
            setAadharCard(response.data.aadhar_number); // Set the existing Aadhar card number
          } else if (response.data.user_type === "client") {
            router.push("/signin");
          } else {
            router.push("/signin");
          }
        })
        .catch((error) => {
          console.log(error);
          router.push("/signin");
        });
    }
  }, [router]);

  const updateDetails = () => {
    setIsUpdating(true);

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_DATABASE}/user`,
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        password: "password",
        pan_number: panCard,
        aadhar_number: aadharCard,
        email_id: email,
        user_type: usertype,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setIsUpdating(false);
        toast.success("Successfully updated profile!");
      })
      .catch((error) => {
        console.log(error);
        setIsUpdating(false);
        toast.error("Failed to update profile. Please try again.");
      });
  };

  return (
    <>
      <Toaster />
      {isLoading ? (
        <LoadingScreen />
      ) : isUpdating ? (
        <div className="loading-screen">
          <div className="loading"></div>
        </div>
      ) : (
        <>
          <Layout>
            <div>
              <div className="inline-flex text-[#343434] font-bold text-3xl p-4">
                <div>
                  <Link href="/lawyer/dashboard/account">
                    <button
                      type="button"
                      className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-md border border-transparent font-semibold text-white transition-all text-sm"
                    >
                      <IoMdArrowRoundBack color="red" size={30} />
                    </button>
                  </Link>
                </div>
                KYC Verification
              </div>
              <div className="p-4 border-2 border-[#EDF1F7] bg-[#EDF1F7] rounded-[40px] ">
                <div className="bg-[#F8F8F8] p-5 rounded-[20px]">
                  <section class="bg-white">
                    <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                      <div class="mx-auto max-w-4xl text-center">
                        <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">
                          Upload a proof of your identity
                        </h2>

                        <p class="mt-4 text-gray-500 sm:text-xl">
                          Lawyantra requires a valid government issue ID
                          (driver’s license, passport, national ID)
                        </p>
                      </div>
                      <div class="grid grid-cols-1 mt-20 gap-4 lg:grid-cols-2 lg:gap-8">
                        <div class="rounded-lg ">
                          <div className="mb-4 text-[#343434] font-bold text-2xl">
                            Your State
                          </div>
                          <select class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                            <option selected>Choose a state</option>
                            <option>Andhra Pradesh</option>
                            <option>Arunachal Pradesh</option>
                            <option>Assam</option>
                            <option>Bihar</option>
                            <option>Chhattisgarh</option>
                            <option>Goa</option>
                            <option>Gujarat</option>
                            <option>Haryana</option>
                            <option>Himachal Pradesh</option>
                            <option>Jharkhand</option>
                            <option>Karnataka</option>
                            <option>Kerala</option>
                            <option>Madhya Pradesh</option>
                            <option>Maharashtra</option>
                            <option>Manipur</option>
                            <option>Meghalaya</option>
                            <option>Mizoram</option>
                            <option>Nagaland</option>
                            <option>Odisha</option>
                            <option>Punjab</option>
                            <option>Rajasthan</option>
                            <option>Sikkim</option>
                            <option>Tamil Nadu</option>
                            <option>Telangana</option>
                            <option>Tripura</option>
                            <option>Uttar Pradesh</option>
                            <option>Uttarakhand</option>
                            <option>West Bengal</option>
                          </select>
                        </div>
                        <div class="rounded-lg">
                          <div className="mb-4 text-[#343434] font-bold text-2xl">
                            Document type
                          </div>
                          <select class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                            <option selected>
                              Choose a government document
                            </option>
                            <option>Aadhar Card</option>
                            <option>PAN Card</option>
                            <option>Voter ID</option>
                            <option>Passport</option>
                            <option>Driving License</option>
                            <option>Ration Card</option>
                            <option>Income Tax Return</option>
                            <option>Property Deed</option>
                            <option>Birth Certificate</option>
                            <option>Death Certificate</option>
                            <option>Marriage Certificate</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                      <div class="mt-8 sm:mt-12">
                        <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div class="flex flex-col rounded-lg text-center">
                            <div class="mb-8">
                              <input
                                type="file"
                                name="file"
                                id="file"
                                class="sr-only"
                              />
                              <label
                                for="file"
                                class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                              >
                                <div>
                                  <span class="mb-2 block text-xl font-semibold text-[#07074D]">
                                    Front side of your document
                                  </span>
                                  <span class="mb-2 block text-base font-medium text-[#6B7280]">
                                    Upload the front side your document <br />
                                    Supports: JPG, PNG, PDF
                                  </span>
                                  <span class="inline-flex rounded-full border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                    Choose file
                                  </span>
                                </div>
                              </label>
                            </div>
                          </div>

                          <div class="flex flex-col rounded-lg text-center">
                            <div class="mb-8">
                              <input
                                type="file"
                                name="file"
                                id="file"
                                class="sr-only"
                              />
                              <label
                                for="file"
                                class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                              >
                                <div>
                                  <span class="mb-2 block text-xl font-semibold text-[#07074D]">
                                    Back side of your document
                                  </span>
                                  <span class="mb-2 block text-base font-medium text-[#6B7280]">
                                    Upload the front side your document <br />
                                    Supports: JPG, PNG, PDF
                                  </span>
                                  <span class="inline-flex rounded-full border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                    Choose file
                                  </span>
                                </div>
                              </label>
                            </div>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </section>

                  <div className="flex justify-center items-center h-full mt-10">
                    <button
                      onClick={updateDetails}
                      type="button"
                      className="text-white gap-2 bg-primarycolor font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
                    >
                      Update Profile
                    </button>
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
