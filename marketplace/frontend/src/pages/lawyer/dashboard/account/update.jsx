"use client";
import React, { useState, useEffect } from "react";
import Roundedlogo from "../../../component/roundedlogo";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Modal } from "flowbite-react";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { RiNewspaperFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../layout";
import { AiFillEdit } from "react-icons/ai";
import Select from "react-select";

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
  const [language, setLanguages] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false); // State variable for update progress

  // Language Function

  const languagesFromUserProfile = ["English"];

  const languagesFromApi = [
    { id: 1, language: "English" },
    { id: 2, language: "Hindi" },
    { id: 3, language: "Marathi" },
    { id: 4, language: "Telugu" },
    { id: 5, language: "Spanish" },
    { id: 6, language: "French" },
    { id: 7, language: "German" },
    { id: 8, language: "Chinese" },
    { id: 9, language: "Japanese" },
    { id: 10, language: "Russian" },
    { id: 11, language: "Bengali" },
    { id: 12, language: "Tamil" },
    { id: 13, language: "Urdu" },
    { id: 14, language: "Gujarati" },
    { id: 15, language: "Kannada" }
    // Add more languages as needed
  ];

  const userProfileOptions = languagesFromUserProfile.map((lang) => ({
    value: lang,
    label: lang
  }));

  const apiOptions = languagesFromApi
    .filter((apiLang) => !languagesFromUserProfile.includes(apiLang.language))
    .map((lang) => ({ value: lang.id, label: lang.language }));

  const [selectedLanguages, setSelectedLanguages] =
    useState(userProfileOptions);

  const handleChange = (selectedOptions) => {
    setSelectedLanguages(selectedOptions);
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
          Authorization: `Token ${token}`
        }
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data.user_type === "lawyer") {
            setId(response.data.id);
            setFirstname(response.data.first_name);
            setMiddlename(response.data.middle_name);
            setLastname(response.data.last_name);
            setGender(response.data.gender);
            setDob(response.data.date_of_birth);
            setState(response.data.state);
            setAddress(response.data.address);
            setEmail(response.data.email_id);
            setPhone(response.data.phone);
            setCity(response.data.city);
            setPincode(response.data.pincode);
            setUsertype(response.data.user_type);
            setIsLoading(false);
            setLanguages(response.data.languages);
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
  }, [router, token]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  function updateDetails() {
    // language update

    const allSelectedLanguages = Array.from(
      new Set([
        ...languagesFromUserProfile,
        ...selectedLanguages.map((lang) => lang.value)
      ])
    );

    const selectedLanguageIds = allSelectedLanguages.map((selectedLang) => {
      const matchedLanguage = languagesFromApi.find(
        (apiLang) =>
          apiLang.language === selectedLang || apiLang.id === selectedLang
      );
      return { lang_id: matchedLanguage ? matchedLanguage.id : null };
    });

    console.log(selectedLanguageIds);

    // upload language to user
    let langconfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_DATABASE}/user/language`,
      headers: {
        Authorization: `Token ${token}`
      },
      data: [
        {
          lang_id: 1
        }
      ]
    };

    axios
      .request(langconfig)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    // language update

    setIsUpdating(true);
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_DATABASE}/user`,
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
        aadhar_number: aadhar,
        user_type: usertype
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
            <div>
              <div className="inline-flex text-[#343434] font-bold text-3xl p-4">
                <div>
                  <Link href="/lawyer/dashboard/account">
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
                        className="block text-sm font-medium mb-2"
                      >
                        Gender
                      </label>
                      <select
                        value={gender}
                        onChange={handleInputChange}
                        id="gender"
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
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

                    <div>
                      <div className="container mx-auto p-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Select Languages
                          </label>
                          <Select
                            isMulti
                            options={apiOptions}
                            value={selectedLanguages}
                            onChange={handleChange}
                          />
                        </div>
                        {/* <button
                          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
                          onClick={handleLogLanguages}
                        >
                          Show Selected Language IDs
                        </button> */}
                      </div>
                    </div>
                  </div>

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
