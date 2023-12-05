"use client";
import React, { useState, useEffect } from "react";
import Roundedlogo from "../../../component/roundedlogo";
import axios from "axios";
import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { FaBell } from "react-icons/fa";
import { getCookie } from "cookies-next";
import Layout from "../layout";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { RiNewspaperFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";

const LoadingScreen = () => (
  <div className="loading-screen">
    <div className="loader"></div>
  </div>
);

const Account = () => {
  const router = useRouter();

  //users details
  const [firstname, setFirstname] = useState();
  const [middlename, setMiddlename] = useState();
  const [lastname, setLastname] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();
  const [address, setAddress] = useState();
  const [userid, setId] = useState();
  const [state, setState] = useState();
  const [aadhar, setAadhar] = useState();
  const [pan, setPan] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();
  const [usertype, setUsertype] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(getCookie("user"));
  const [userDetails, setProfilePic] = useState();
  const [isUpdating, setIsUpdating] = useState(false); // State variable for update progress
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [base64String, setBase64String] = useState(null);

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
            setId(response.data.id);
            setFirstname(response.data.first_name);
            setMiddlename(response.data.middle_name);
            setAadhar(response.data.aadhar_number);
            setLastname(response.data.last_name);
            setGender(response.data.gender);
            setDob(response.data.date_of_birth);
            setState(response.data.state);
            setAddress(response.data.address);
            setEmail(response.data.email_id);
            setPan(response.data.pan_number);
            setPhone(response.data.phone);
            setCity(response.data.city);
            setPincode(response.data.pincode);
            setUsertype(response.data.user_type);
            setIsLoading(false);
            setProfilePic(response.data.profile_picture || <CgProfile />);
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
  }, [router, token, selectedFile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
      console.log("Please select a file");
      return;
    }

    try {
      const base64String = await getBase64(selectedFile);
      console.log("Base64 format:", base64String);
    } catch (error) {
      console.error("Error converting to base64:", error);
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result.split(",")[1]);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleButtonClick = () => {
    if (!base64String) {
      console.log("Please select a file");
      return;
    }

    console.log("Base64 format:", base64String);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  async function updateDetails() {
    setIsUpdating(true);
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_DATABASE}/user?profile_picture=1`,
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
      },
      data: {
        password: "password",
        email_id: email,
        first_name: firstname,
        last_name: lastname,
        middle_name: middlename,
        gender: gender,
        date_of_birth: dob,
        address: address,
        pincode: pincode,
        city: city,
        state: state,
        phone: phone,
        pan_number: pan,
        user_type: "client",
        aadhar_number: aadhar
      }
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setIsUpdating(false); // Set isUpdating to false on success
        toast.success("Successfully updated profile!");
      })
      .catch((error) => {
        console.log(error);
        setIsUpdating(false); // Set isUpdating to false on failure
      });
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case "first-name":
        setFirstname(value);
        break;
      case "middle-name":
        setMiddlename(value);
        break;
      case "last-name":
        setLastname(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone-number":
        setPhone(value);
        break;
      case "date-of-birth":
        setDob(value);
        break;
      case "pan-number":
        setPan(value);
        break;
      case "aadhar-number":
        setAadhar(value);
        break;
      case "state":
        setState(value);
        break;
      case "city":
        setCity(value);
        break;
      case "pincode":
        setPincode(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
      // Handle other cases or provide a default behavior
    }
    console.log(`${id}: ${value}`);
  };

  return (
    <>
      <Toaster />
      {isLoading ? (
        <LoadingScreen />
      ) : isUpdating ? ( // Show loading screen while updating
        <div className="loading-screen">
          <div className="loading"></div>
        </div>
      ) : (
        <>
          <Layout>
            <div className="inline-flex text-[#343434] font-bold text-3xl p-4">
              <div>
                <Link href="/client/dashboard/account">
                  <button
                    type="button"
                    class="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-md border border-transparent font-semibold text-white transition-all text-sm"
                  >
                    <IoMdArrowRoundBack color="red" size={30} />
                  </button>
                </Link>
              </div>
              Update Profile
            </div>
            <div className="p-4 border-2 border-[#EDF1F7] bg-[#EDF1F7] rounded-[40px] ">
              <div className="bg-[#F8F8F8] p-5 rounded-[20px]">
                <div className="container mx-auto p-8">
                  <h1 className="text-3xl font-semibold mb-6">User Profile</h1>

                  {userDetails && (
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        {userDetails.profile_picture ? (
                          <img
                            src={userDetails.profile_picture}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            {userDetails.profile_picture || (
                              <CgProfile size={32} />
                            )}
                          </div>
                        )}
                      </div>

                      <div>
                        {/* Displaying the file upload button */}
                        <label className="block">
                          <span className="sr-only">Choose file</span>
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="text-sm text-gray-500
                  me-4 py-2 px-4
                  rounded-lg border border-gray-300
                  text-sm font-semibold
                  bg-blue-600 text-white
                  hover:bg-blue-700
                  focus:outline-none focus:ring focus:border-blue-300
                  disabled:opacity-50 disabled:pointer-events-none
                  dark:bg-blue-500
                  dark:hover:bg-blue-400
                "
                          />
                        </label>

                        {/* Displaying the upload button */}
                        <button
                          onClick={handleUploadClick}
                          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                          Upload and Log
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium mb-2 "
                    >
                      First Name
                    </label>
                    <input
                      value={firstname}
                      onChange={handleInputChange}
                      type="text"
                      id="first-name"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="middle-name"
                      className="block text-sm font-medium mb-2 "
                    >
                      Middle Name
                    </label>
                    <input
                      value={middlename}
                      onChange={handleInputChange}
                      type="text"
                      id="middle-name"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium mb-2 "
                    >
                      Last Name
                    </label>
                    <input
                      value={lastname}
                      onChange={handleInputChange}
                      type="text"
                      id="last-name"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium mb-2 "
                    >
                      Gender
                    </label>
                    <input
                      value={gender}
                      onChange={handleInputChange}
                      type="text"
                      id="gender"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-gray-500 font-medium mb-2 "
                    >
                      Email-Id
                    </label>
                    <input
                      value={email}
                      onChange={handleInputChange}
                      disabled
                      type="email"
                      id="email"
                      title="Can't update email once set"
                      className="py-3 cursor-not-allowed px-4 block w-full text-gray-500 bg-gray-300 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone-number"
                      className="block text-sm font-medium mb-2 "
                    >
                      Phone Number
                    </label>
                    <input
                      value={phone}
                      onChange={handleInputChange}
                      type="number"
                      id="phone-number"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="date-of-birth"
                      className="block text-sm font-medium mb-2 "
                    >
                      Date of Birth
                    </label>
                    <input
                      value={dob}
                      onChange={handleInputChange}
                      type="date"
                      id="date-of-birth"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="pan-number"
                      className="block text-sm font-medium mb-2 "
                    >
                      Pan Number
                    </label>
                    <input
                      value={pan}
                      onChange={handleInputChange}
                      type="text"
                      id="pan-number"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="aadhar-number"
                      className="block text-sm font-medium mb-2 "
                    >
                      Aadhar Number
                    </label>
                    <input
                      value={aadhar}
                      onChange={handleInputChange}
                      type="text"
                      id="aadhar-number"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium mb-2 "
                    >
                      State
                    </label>
                    <input
                      value={state}
                      onChange={handleInputChange}
                      type="text"
                      id="state"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium mb-2 "
                    >
                      City
                    </label>
                    <input
                      value={city}
                      onChange={handleInputChange}
                      type="text"
                      id="city"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium mb-2 "
                    >
                      Pincode
                    </label>
                    <input
                      value={pincode}
                      onChange={handleInputChange}
                      type="number"
                      id="pincode"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium mb-2 "
                    >
                      Address
                    </label>
                    <input
                      value={address}
                      onChange={handleInputChange}
                      type="text"
                      id="address"
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center h-full mt-10">
                  <button
                    onClick={updateDetails}
                    type="button"
                    class="text-white gap-2 bg-primarycolor font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
                  >
                    Update Profile
                  </button>
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
