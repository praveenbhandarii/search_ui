import React from "react";
import Layout from "./components/layout";
import Image from "next/image";
import { GrCheckmark } from "react-icons/gr";
import Link from "next/link";
import KycBanner from "./components/kycbanner";

const Client = () => {
  const Advantage = [
    {
      id: "01",
      text: "Track the progress of your case",
    },
    {
      id: "02",
      text: "Communicate securely with your lawyer",
    },
    {
      id: "03",
      text: "Receive real-time updates",
    },
    {
      id: "04",
      text: "Manage payments effortlessly",
    },
  ];

  const Offerings = [
    {
      id: "01",
      title: "Client Matching",
      desc: "Efficiently connect with clients who match your expertise and preferences.",
      image: "/Puzzle.svg"
    },
    {
      id: "02",
      title: "Case Management",
      desc: "Streamline case tracking, document management, and appointments.",
      image: "/Data.svg"
    },
    {
      id: "03",
      title: "Top legal professionals",
      desc: "Get expert advice from top legal professionals tailored to your needs.",
      image: "/Network.svg"
    },
    {
      id: "04",
      title: "Top legal professionals",
      desc: "Get expert advice from top legal professionals tailored to your needs.",
      image: "/Money.svg"
    },
  ];

  return (
    <Layout>
      <section>
        <div className="grid max-w-screen-xl px-16 sm:px-28 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-2 sm:mb-6 text-4xl sm:text-[60px] font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Welcome to <span className="text-primarycolor">Lawyantra,</span>
            </h1>
            <p className="max-w-2xl font-normal text-[#545454] lg:mb-8 sm:text-[30px] text-center sm:text-left">
              Your Case, Your Match
            </p>
            <p className="max-w-2xl mb-6 font-normal text-textsecondry lg:mb-8 sm:text-[28px] text-center sm:text-left">
              Simplify Client Connections, Erase Admin Hassles, and Dive into
              Fulfilling Legal Advocacy.
            </p>
          </div>
          <div className="lg:mt-0 lg:col-span-5 lg:flex place-content-center">
            <img src="lawyerhome.svg" alt="mockup" />
          </div>
        </div>
      </section>
      <section>
        <div className="py-8 px-16 sm:px-28 mx-auto max-w-screen-xl sm:py-16">
          <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl sm:text-[60px] tracking-[-0.6px] font-extrabold text-gray-900 dark:text-white text-center sm:text-left">
              Our <span className="text-primarycolor">Offerings</span>
            </h2>
            <p className="text-gray-500 text-[16px] sm:text-[30px] text-center sm:text-left">
              Providing you with top notch services
            </p>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-12 md:space-y-0 place-content-center">
            {Offerings.map((data) => (
              <div
                key={data.id}
                className="max-w p-6 bg-white border rounded-[25px]"
              >
                <Image src={data.image} width="37" height="37" alt={""} />

                <h5 className="mb-2 mt-5 text-xl font-semibold tracking-tight text-primarycolor">
                  {data.title}
                </h5>

                <p className="mb-3 text-lg font-normal text-gray-500 dark:text-gray-400">
                  {data.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="grid max-w-screen-xl px-16 sm:px-28 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7 mb-6">
            <h1 className="max-w-2xl mb-4 text-4xl font-semibold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white text-center sm:text-left">
              Access our <span className="text-primarycolor">dashboard</span>
            </h1>

            <p className="max-w-2xl mb-6 font-normal text-textsecondry lg:mb-8 md:text-lg lg:text-2xl dark:text-gray-400 text-center sm:text-left">
              Take control of your legal matters with our user-friendly
              dashboard
            </p>
            <ul>
              {Advantage.map((data) => (
                <li key={data.id} className="flex items-center space-x-3 mb-5">
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-primarycolor "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                  <span className="text-[#373737] font-normal text-xl">
                    <p>{data.text}</p>
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/signin" className="invisible sm:visible mb-4 sm:mb-2 text-white bg-primarycolor hover:bg-primarycolor/60 font-medium rounded-full text-sm w-full px-5 py-2.5 text-center">Go to dashboard</Link>
          </div>
          <div className="lg:mt-0 lg:col-span-5 lg:flex place-content-center ">
            <img src="clientdash.svg" alt="mockup" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Client;
