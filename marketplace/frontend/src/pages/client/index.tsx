import React from "react";
import Layout from "./components/layout";
import Image from "next/image";

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
      title: "Top legal professionals",
      desc: "Get expert advice from top legal professionals tailored to your needs.",
      img: "Network.svg",
    },
    {
      id: "02",
      title: "Top legal professionals",
      desc: "Get expert advice from top legal professionals tailored to your needs.",
      img: "Network.svg",
    },
    {
      id: "03",
      title: "Top legal professionals",
      desc: "Get expert advice from top legal professionals tailored to your needs.",
      img: "Network.svg",
    },
    {
      id: "04",
      title: "Top legal professionals",
      desc: "Get expert advice from top legal professionals tailored to your needs.",
      img: "Network.svg",
    },
  ];

  return (
    <Layout>
      {/* welcome section */}
      <div className="bg-[url('/client_homepage_bg.svg')]">
      <section className="flex justify-center bg-gradient-to-br">
        <div className="mx-12 grid grid-cols-12 max-w-screen-xl px-4 py-8 lg:py-16 text-left">
          <div className="mt-16 ml-16 lg:items-center lg:content-center sm:col-span-7">
            <h1 className="max-w-2xl mb-4 text-[60px] font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Welcome to <span className="text-primarycolor">Lawyantra,</span>
            </h1>
            <p className="max-w-2xl mb-6 font-normal text-[#545454] lg:mb-8 text-xl sm:text-[30px] lg:text-3xl dark:text-gray-400">
              where finding the right lawyer for your case is made easy.
            </p>
            <p className="max-w-2xl mb-6 font-normal text-textsecondry lg:mb-8 sm:text-[28px] lg:text-2xl dark:text-gray-400">
              Connect with experienced lawyers and avoid
              <span className="text-primarycolor"> overcharging</span> with
              traditional legal services
            </p>
          </div>
          <div className="sm:mt-0 sm:col-span-5 place-content-center">
            <img src="/client_homepage_one.svg" alt="mockup" />
          </div>
        </div>
      </section>
      {/* Our Offering */}
      <section className="flex justify-center items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 ">
          <div className="mb-8 lg:mb-16">
            <h2 className="mb-4 text-[60px] tracking-[-0.6px] font-bold text-gray-900 dark:text-white">
              Our <span className="text-primarycolor">Offerings</span>
            </h2>
            <p className="text-gray-500 sm:text-3xl ">
              Providing you with top notch services
            </p>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-12 md:space-y-0 place-content-center">
            {Offerings.map((data) => (
              <div
                key={data.id}
                className="max-w p-6 bg-white transition border rounded-[25px]"
              >
                <Image src={data.img} width="37" height="37" alt={""} />

                <h5 className="mb-2 mt-5 text-xl font-bold tracking-tight text-primarycolor">
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
      </div>
      {/* Access Our Dashboard */}
      <section>
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-semibold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Access our <span className="text-primarycolor">dashboard</span>
            </h1>

            <p className="max-w-2xl mb-6 font-normal text-textsecondry lg:mb-8 md:text-lg lg:text-2xl dark:text-gray-400">
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
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex place-content-center ">
            <img src="clientdash.svg" alt="mockup" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Client;
