import React, { useState } from "react";
import Layout from "./component/layout/layout";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaLocationPin } from "react-icons/fa6";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";

const Contact = () => {
  const router = useRouter();
  const { querie } = router.query;

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Query, setQuery] = useState(querie);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const data = {
    name: Name,
    email_id: Email,
    phone: Mobile,
    query: Query,
  };

  const isSubmitDisabled = !Name || !Email || !Mobile || !Query || isSubmitting;

  const handleButtonClick = () => {
    // Reload the current page
    router.reload();
  };

  function sendContact() {
    // Validate form fields
    if (!Name || !Email || !Mobile || !Query) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(Mobile)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Clear previous validation messages
    setPhoneError("");
    setEmailError("");

    // Show loading toast
    const loadingToastId = toast.loading("Submitting...");

    setIsSubmitting(true);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_DATABASE}/contact_us`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: Name,
        email_id: Email,
        phone: Mobile,
        query: Query,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        // Close loading toast
        toast.success("Message Sent Successfully", { id: loadingToastId });
        // Clear the form fields after successful submission
        setName("");
        setEmail("");
        setMobile("");
        setQuery("");
        setFormSubmitted(true);
        window.scrollTo({ top: 140, behavior: "smooth" });
      })
      .catch((error) => {
        console.log(error);
        // Close loading toast on error
        toast.error("Failed to send message", { id: loadingToastId });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <Layout>
      <div className="relative">
        {/* Top Blob (Orange) */}
        <div className="absolute top-0 right-0 z-0 w-96 h-96 bg-[#87a9f1] rounded-full mix-blend-multiply filter blur-[150px] opacity-80 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-96 lg:h-96 xl:w-96 xl:h-96"></div>

        <Toaster />
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 relative z-10">
          <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="max-w-2xl lg:max-w-5xl mx-auto">
              <div className="flex flex-col justify-center">
                <div className="max-w-xl mb-2">
                  <div className="max-w-lg font-sans text-3xl font-bold tracking-tight text-black sm:text-5xl sm:leading-none">
                    Let's <span className="text-primarycolor">Talk</span>
                  </div>
                </div>
              </div>
              <div className="mt-12 grid p-2 lg:grid-cols-2 gap-2 lg:gap-8 bg-white rounded-lg relative z-10">
                {/* Form Section */}
                <div className="bg-[url('/contactbg.svg')] bg-cover rounded-md">
                  <div className="p-8 mr-0">
                    <div className="text-2xl font-bold text-white">
                      Contact information
                    </div>
                    <h2 className="mb-8 text-lg text-gray-400">
                      Could you please share a few details?{" "}
                    </h2>
                    <p className="flex items-center space-x-4 text-white">
                      <BsTelephoneFill />
                      <span>022-66324501</span>
                    </p>
                    <br />
                    <span className="flex items-center space-x-4 text-white">
                      <MdEmail />
                      <p>contact@lawyantra.com</p>
                    </span>
                    <br />
                    <span className="flex items-center space-x-4 text-white">
                      <FaLocationPin />
                      <p>
                        Empirilex, 111B, Mittal Tower, Nariman Point, Mumbai - 400021.
                      </p>
                    </span>
                    <div className="sm:bottom-4 sm:mb-3 mb-1 md:static md:mt-8 md:mb-2 lg:absolute sm:absolute sm:mt-0 mt-6 relative space-x-4">
                      <div className="flex flex-row gap-3">
                        <Link href="https://www.linkedin.com/in/devarshsaraf/">
                          <div className="bg-[#2E54DA] rounded-full p-2">
                            <AiFillLinkedin size={20} color="white" />
                          </div>
                        </Link>
                        <Link href="https://instagram.com/sarafdevarsh">
                          <div className="bg-[#2E54DA] rounded-full p-2">
                            <AiFillInstagram size={20} color="white" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                {!formSubmitted ? (
                  <div className="flex flex-col rounded-xl px-5 md:px-10 lg:px-20 py-10 sm:py-16 md:py-16">
                    <form>
                      <div className="text-[#808080] font-normal text-lg mb-5 text-center">
                        Could you please share a few details?
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          id="name"
                          placeholder="Name"
                          onChange={(event) => setName(event.target.value)}
                          value={Name}
                          className="bg-gray-200 focus:ring-secondarycolor transition-colors text-gray-900 text-sm rounded-[8px] block w-full p-2.5"
                        />
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="email"
                          id="email"
                          onChange={(event) => setEmail(event.target.value)}
                          value={Email}
                          className={`bg-gray-200 focus:ring-secondarycolor transition-colors text-gray-900 text-sm rounded-[8px] block w-full p-2.5 ${
                            emailError && "border-red-500"
                          }`}
                          placeholder="Email-Id"
                          required
                        />
                        {emailError && (
                          <p className="text-red-500">{emailError}</p>
                        )}
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          id="mobile"
                          pattern="[0-9]{10}"
                          placeholder="Phone Number"
                          onChange={(event) => setMobile(event.target.value)}
                          value={Mobile}
                          className={`bg-gray-200 focus:ring-secondarycolor transition-colors text-gray-900 text-sm rounded-[8px] block w-full p-2.5 ${
                            phoneError && "border-red-500"
                          }`}
                        />
                        {phoneError && (
                          <p className="text-red-500">{phoneError}</p>
                        )}
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <textarea
                          id="message"
                          rows="4"
                          onChange={(event) => setQuery(event.target.value)}
                          value={Query}
                          className="block p-2.5 w-full text-sm bg-gray-200 focus:ring-secondarycolor transition-colors text-gray-900 rounded-[10px]"
                          placeholder="Tell us what you are after"
                        ></textarea>
                      </div>
                      <button
                        type="button"
                        onClick={sendContact}
                        className={`text-white bg-primarycolor hover:bg-primarycolor/60 font-medium rounded-full text-sm w-full px-5 py-2.5 text-center ${
                          isSubmitDisabled && "cursor-not-allowed opacity-50"
                        }`}
                        disabled={isSubmitDisabled}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </form>
                  </div>
                ) : (
                  // Display thank you message
                  <div className="flex flex-col rounded-xl px-5 md:px-10 lg:px-20 py-10 sm:py-16 md:py-16">
                    <div className="text-primarycolor font-bold text-4xl mb-5 text-center">
                      Thank you!
                    </div>
                    {/* <div className="text-[#808080] font-normal text-xl mb-2 text-left">
                      We have received your message.
                    </div> */}
                    <div className="text-[#808080] font-normal text-xl mb-2 text-center">
                      We'll contact you regarding your query.
                    </div>
                    <Link
                        href="/contact"
                        type="button"
                        onClick={handleButtonClick}
                        className="text-white bg-primarycolor hover:bg-primarycolor/60 font-medium rounded-full text-sm py-2.5 text-center sm:mt-40"
                      >Contact Us Again!</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Blob (Blue) */}
        <div className="absolute left-0 bottom-0 z-0 w-96 h-96 bg-[#f3b97f] rounded-full mix-blend-multiply filter blur-[150px] opacity-80 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-96 lg:h-96 xl:w-96 xl:h-96"></div>
      </div>
    </Layout>
  );
};

export default Contact;
