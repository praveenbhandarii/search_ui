import Link from "next/link";
import Layout from "./component/layout/layout";
import Roundedlogo from "./component/roundedlogo";
import { useRouter } from "next/router";

import { SetStateAction, useState } from "react";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [Querydata, setQuerydata] = useState("");

  const handleMessageChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setQuerydata(e.target.value);
  };

  return (
    <Layout>
      <div>
        {/* hero section */}
        <div className="items-center bg-top bg-cover bg-no-repeat bg-fixed relative">
          {/* Blobs */}
          <div className="absolute left-10 top-72 z-0 w-96 h-96 bg-[#FFCD9C] rounded-full mix-blend-multiply filter blur-[170px] opacity-80"></div>
          <div className="absolute right-10 top-20 z-0 w-96 h-96 bg-[#BCD1FF] rounded-full mix-blend-multiply filter blur-[170px] opacity-80 "></div>

          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 flex h-screen items-center justify-center z-10">
            <div className="min-h-screen flex items-center justify-center px-16 relative">
              <div className="m-8 relative space-y-4 z-10">
                <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
                  <div className="flex justify-center">

                    <img
                      src="/lawyantra-color.svg"
                      className="h-[82px] w-[265px]"
                      alt=" "
                    />
                  </div>
                  <div className="mt-5 text-center mx-auto relative z-10">
                    <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
                      Find the <span className="text-primarycolor">Right </span>
                      Lawyer, <br />
                      Not Just A Lawyer.
                    </h1>
                  </div>
                  <div className="mt-5 max-w-3xl text-center mx-auto relative z-10">
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      At Lawyantra, we&apos;re not about quick fixes. <br />{" "}
                      We&apos;re about right fits.
                    </p>
                  </div>
                  <div className="mt-8 grid gap-3 w-full sm:inline-flex sm:justify-center relative z-20">
                    <Link
                      className="inline-flex justify-center items-center gap-x-3 text-center bg-primarycolor text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4 hover:bg-secondrycolor hover:text-white transition"
                      href="/signup"
                    >
                      Let's Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Game Plan section */}
        <section className="items-center bg-center bg-cover	bg-no-repeat">
          <div
            className="px-4 mx-auto 
        mb-16 max-w-7xl
        "
          >
            <div>
              <div>
                <div className="mx-auto flex flex-col items-center py-12 sm:py-10">
                  <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
                    <div className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl text-center tracking-normal text-[#353535] font-black">
                      What’s Our Game Plan?
                    </div>

                    <p className="mt-1 sm:mt-2 lg:w-10/12 text-[#808080] font-normal text-center text-xl">
                      Easy, Matching You With Your Legal MVP
                    </p>
                  </div>
                  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                      <div className="title-font sm:text-4xl text-2xl mb-4 font-medium text-gray-900">
                        <div>
                          Lawyantra isn&apos;t a search engine; <p />
                          it&apos;s a{" "}
                          <span className="text-primarycolor">
                            matchmaking service
                          </span>{" "}
                          for your legal needs.
                        </div>
                        <br />
                        <div>
                          No more sifting through piles of paperwork or
                          screening calls. We curate a list of{" "}
                          <span className="text-primarycolor">
                            expert lawyers
                          </span>{" "}
                          tailored for you.
                        </div>
                      </div>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                      <img
                        className="object-cover object-center rounded"
                        alt="hero"
                        src="/game_plan.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Our Secret Sauce & Who's Loving It with cards */}
        <section className="items-center">
          <div>
            <div>
              <div>
                <div
                  className="mx-auto flex flex-col items-center py-12 sm:py-10"
                  id="login"
                >
                  <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
                    <div className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl text-center tracking-normal text-textblack font-black">
                      Our Secret Sauce & Who&apos;s Loving It
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex flex-wrap gap-10 justify-center mt-10">
                      <div className="p-4 max-w-sm col-span-1">
                        <div className="group relative overflow-hidden border border-[#D7D7D7] bg-transparent px-6 pt-10 pb-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm rounded-3xl sm:px-10">
                          <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primarycolor transition-all duration-300 group-hover:scale-[12]"></span>
                          <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-primarycolor transition-all duration-300 group-hover:bg-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 42 42"
                                fill="none"
                              >
                                <path
                                  className="fill-[#ECEFF7] group-hover:fill-secondrycolor"
                                  d="M16.8 4.2C14.5722 4.2 12.4356 5.085 10.8603 6.6603C9.285 8.23561 8.4 10.3722 8.4 12.6C8.4 14.8278 9.285 16.9644 10.8603 18.5397C12.4356 20.115 14.5722 21 16.8 21C19.0278 21 21.1644 20.115 22.7397 18.5397C24.315 16.9644 25.2 14.8278 25.2 12.6C25.2 10.3722 24.315 8.23561 22.7397 6.6603C21.1644 5.085 19.0278 4.2 16.8 4.2ZM4.2 12.6C4.2 9.25827 5.5275 6.05341 7.89045 3.69045C10.2534 1.3275 13.4583 0 16.8 0C20.1417 0 23.3466 1.3275 25.7095 3.69045C28.0725 6.05341 29.4 9.25827 29.4 12.6C29.4 15.9417 28.0725 19.1466 25.7095 21.5095C23.3466 23.8725 20.1417 25.2 16.8 25.2C13.4583 25.2 10.2534 23.8725 7.89045 21.5095C5.5275 19.1466 4.2 15.9417 4.2 12.6ZM31.1388 3.6897C31.3338 3.49445 31.5654 3.33956 31.8204 3.23387C32.0753 3.12819 32.3486 3.0738 32.6245 3.0738C32.9005 3.0738 33.1738 3.12819 33.4287 3.23387C33.6837 3.33956 33.9153 3.49445 34.1103 3.6897C35.2805 4.85975 36.2088 6.24885 36.8422 7.7777C37.4755 9.30654 37.8015 10.9452 37.8015 12.6C37.8015 14.2548 37.4755 15.8935 36.8422 17.4223C36.2088 18.9511 35.2805 20.3403 34.1103 21.5103C33.9152 21.7054 33.6836 21.8602 33.4286 21.9658C33.1737 22.0714 32.9005 22.1257 32.6245 22.1257C32.3486 22.1257 32.0754 22.0714 31.8205 21.9658C31.5655 21.8602 31.3339 21.7054 31.1388 21.5103C30.9437 21.3152 30.7889 21.0836 30.6833 20.8286C30.5777 20.5737 30.5234 20.3005 30.5234 20.0245C30.5234 19.7486 30.5777 19.4754 30.6833 19.2205C30.7889 18.9655 30.9437 18.7339 31.1388 18.5388C32.7136 16.9636 33.5982 14.8274 33.5982 12.6C33.5982 10.3726 32.7136 8.23643 31.1388 6.6612C30.9435 6.46617 30.7887 6.23456 30.683 5.97962C30.5773 5.72469 30.5229 5.45142 30.5229 5.17545C30.5229 4.89948 30.5773 4.62621 30.683 4.37127C30.7887 4.11634 30.9435 3.88473 31.1388 3.6897ZM32.613 30.9897C32.7484 30.4499 33.0925 29.9859 33.5697 29.6997C34.0469 29.4134 34.6183 29.3283 35.1582 29.463C37.947 30.1602 39.7131 31.941 40.7274 33.9738C41.7102 35.9373 42 38.1318 42 39.9C42 40.457 41.7788 40.9911 41.3849 41.3849C40.9911 41.7788 40.457 42 39.9 42C39.343 42 38.8089 41.7788 38.4151 41.3849C38.0212 40.9911 37.8 40.457 37.8 39.9C37.8 38.5203 37.5648 37.0377 36.9726 35.8512C36.4119 34.7319 35.5509 33.8898 34.1397 33.537C33.5999 33.4016 33.1359 33.0575 32.8497 32.5803C32.5634 32.1031 32.4783 31.5296 32.613 30.9897ZM9.45 33.6C6.804 33.6 4.2 36.1473 4.2 39.9C4.2 40.457 3.97875 40.9911 3.58492 41.3849C3.1911 41.7788 2.65695 42 2.1 42C1.54305 42 1.0089 41.7788 0.615076 41.3849C0.221249 40.9911 0 40.457 0 39.9C0 34.3728 3.9753 29.4 9.45 29.4H24.15C29.6247 29.4 33.6 34.3728 33.6 39.9C33.6 40.457 33.3787 40.9911 32.9849 41.3849C32.5911 41.7788 32.057 42 31.5 42C30.943 42 30.4089 41.7788 30.0151 41.3849C29.6212 40.9911 29.4 40.457 29.4 39.9C29.4 36.1473 26.796 33.6 24.15 33.6H9.45Z"
                                />
                              </svg>
                            </span>

                            <div className="space-y-6 pt-5 text-base leading-7 transition-all duration-300 group-hover:text-white/90">
                              <div className="text-xl">
                                <span className="text-primarycolor group-hover:text-secondrycolor">Clients</span>, {" "}
                                <span className="text-black">Your Right Lawyer Awaits Here.</span>
                              </div>
                              <p className="text-[#808080]">
                                Lawyantra listens to you, understands you, and
                                then finds you the legal ally you deserve.
                              </p>
                            </div>
                            <div className="pt-5 text-base font-semibold leading-7">
                              <Link href="/client">
                                <button className="bg-primarycolor group-hover:bg-secondrycolor transition-colors text-white font-normal px-5 py-1 rounded-full">
                                  More details
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 max-w-sm col-span-1">

                        <div className="group relative overflow-hidden border border-[#D7D7D7] bg-transparent px-6 pt-10 pb-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm rounded-3xl sm:px-10">
                          <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-primarycolor transition-all duration-300 group-hover:scale-[12]"></span>
                          <div className="relative z-10 mx-auto max-w-md">
                            <span className="grid h-20 w-20 place-items-center rounded-full bg-primarycolor transition-all duration-300 group-hover:bg-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 44 39"
                                fill="none"
                              >
                                <path
                                  d="M24.0625 2.01724V5.37931H26.7713C27.6073 5.37931 28.4296 5.59448 29.1556 6.00062L32.7031 7.98021C32.8076 8.03938 32.9231 8.06897 33.0441 8.06897H39.1877C39.7347 8.06897 40.2593 8.2815 40.6461 8.6598C41.0329 9.03811 41.2502 9.5512 41.2502 10.0862C41.2502 10.6212 41.0329 11.1343 40.6461 11.5126C40.2593 11.8909 39.7347 12.1034 39.1877 12.1034H38.0134L43.8188 24.7233C43.9903 25.0967 44.0417 25.5122 43.966 25.9148C43.8904 26.3174 43.6913 26.6879 43.3953 26.9772L41.9377 25.5517L43.3925 26.9799L43.3898 26.9853L43.3843 26.9907L43.3678 27.0068L43.3512 27.0203L43.3238 27.0472L43.2 27.1548C42.6225 27.6281 41.9872 28.0343 41.3135 28.3651C40.0292 28.9945 38.1702 29.5862 35.7502 29.5862C33.8238 29.6084 31.9188 29.1903 30.1868 28.3651C29.5122 28.0344 28.8791 27.6283 28.3003 27.1548L28.1766 27.0472L28.1326 27.0068L28.1161 26.9907L28.1051 26.9799V26.9772C27.809 26.6879 27.6099 26.3174 27.5343 25.9148C27.4587 25.5122 27.51 25.0967 27.6816 24.7233L33.4896 12.1034H33.0441C32.2054 12.1034 31.3831 11.891 30.6571 11.4821L27.1096 9.50255C27.006 9.44386 26.8883 9.41323 26.7686 9.41379H24.0625V34.9655H30.9376C31.4846 34.9655 32.0092 35.1781 32.396 35.5564C32.7828 35.9347 33.0001 36.4478 33.0001 36.9828C33.0001 37.5178 32.7828 38.0309 32.396 38.4092C32.0092 38.7875 31.4846 39 30.9376 39H13.0624C12.5154 39 11.9908 38.7875 11.604 38.4092C11.2172 38.0309 10.9999 37.5178 10.9999 36.9828C10.9999 36.4478 11.2172 35.9347 11.604 35.5564C11.9908 35.1781 12.5154 34.9655 13.0624 34.9655H19.9375V9.41379H17.2314C17.1117 9.41323 16.994 9.44386 16.8904 9.50255L13.3457 11.4848C12.6169 11.8883 11.7946 12.1034 10.9559 12.1034H10.5104L16.3184 24.7233C16.49 25.0967 16.5414 25.5122 16.4657 25.9148C16.3901 26.3174 16.191 26.6879 15.8949 26.9772L14.4374 25.5517L15.8922 26.9799L15.8894 26.9853L15.8839 26.9907L15.8674 27.0068L15.8234 27.0472L15.6997 27.1548C15.1222 27.6281 14.4869 28.0343 13.8132 28.3651C12.5289 28.9945 10.6699 29.5862 8.24984 29.5862C6.32348 29.6084 4.41844 29.1903 2.68652 28.3651C2.0119 28.0344 1.37882 27.6283 0.800003 27.1548L0.676251 27.0472L0.632251 27.0068L0.61575 26.9907L0.60475 26.9799V26.9772C0.308687 26.6879 0.109614 26.3174 0.0339709 25.9148C-0.0416725 25.5122 0.00969289 25.0967 0.181245 24.7233L5.98931 12.1034H4.8123C4.26528 12.1034 3.74067 11.8909 3.35387 11.5126C2.96708 11.1343 2.74978 10.6212 2.74978 10.0862C2.74978 9.5512 2.96708 9.03811 3.35387 8.6598C3.74067 8.2815 4.26528 8.06897 4.8123 8.06897H10.9559C11.0764 8.0695 11.195 8.03888 11.2996 7.98021L14.8417 5.99793C15.5704 5.59448 16.3927 5.37931 17.2314 5.37931H19.9375V2.01724C19.9375 1.48224 20.1548 0.969142 20.5416 0.590836C20.9284 0.21253 21.453 0 22 0C22.547 0 23.0716 0.21253 23.4584 0.590836C23.8452 0.969142 24.0625 1.48224 24.0625 2.01724ZM32.1614 24.8174C32.9451 25.1806 34.1359 25.5517 35.7502 25.5517C37.3644 25.5517 38.5552 25.1806 39.339 24.8174L35.7502 17.0174L32.1614 24.8174ZM4.66105 24.8174C5.44481 25.1806 6.63557 25.5517 8.24984 25.5517C9.86411 25.5517 11.0549 25.1806 11.8386 24.8174L8.24984 17.0174L4.66105 24.8174Z"
                                  className="fill-[#ECEFF7] group-hover:fill-secondrycolor"
                                />
                              </svg>
                            </span>
                            <div className="space-y-6 pt-5 text-base leading-7 transition-all duration-300 group-hover:text-white/90">
                              <div className="text-xl">
                                <span className="text-primarycolor group-hover:text-secondrycolor">Lawyers</span>, {" "}
                                <span className="text-black">here’s Your New Home Base.</span>
                              </div>
                              <p className="text-[#808080]">
                                Unmatched clients, seamless case management, and
                                a community of peers. All under one roof.
                              </p>
                            </div>
                            <div className="pt-5 text-base font-semibold leading-7">
                              <Link href="/lawyer">
                                <button className="bg-primarycolor group-hover:bg-secondrycolor transition-colors text-white font-normal px-5 py-1 rounded-full">
                                  More details</button>
                              </Link>
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
        </section>
        {/* Magic */}
        <section className="items-center">
          <div>
            <div>
              <div>
                <div className="container mx-auto flex px-5 py-10 items-center justify-center flex-col">
                  <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
                    <div className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl text-center tracking-normal text-textblack font-black">
                      Who’s Behind the Magic?
                    </div>
                    <div className="text-textsecondry text-2xl	">
                      (Hint: It&apos;s Not Just Us, It&apos;s You.)
                    </div>
                  </div>
                  <img
                    className="mb-20 mt-20 object-cover object-center"
                    alt="hero"
                    src="/magic.svg"
                  />
                  <div className="text-center lg:w-2/3 w-full">
                    <p className="mb-8 leading-relaxed font-normal text-black text-2xl">
                      At Lawyantra, we’ve created a marketplace that levels the
                      playing field, where lawyers and clients meet on common
                      ground. No jargon, no fuss. Just the right connections,
                      made easy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Lets Chat */}
        <section>
          <div className="bg-[url('/contact_bg.svg')] bg-cover bg-no-repeat bg-center bg-primarycolor rounded-t-[122px]">
            <div className="relative isolate overflow-hidden px-6 py-24 sm:px-24 xl:py-20">
              <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-[0.54px] leading-[60.762px] text-white sm:text-[54px]">
                Questions? Let&apos;s Chat!
              </h2>

              <p className="mx-auto mt-8 max-w-xl text-center text-[28px] tracking-[-0.14px] leading-[28.986px] text-white">
                Got a question you&apos;re itching to ask? <br />
                Drop us a line. We&apos;re all ears
              </p>
              <form className="mx-auto mt-10 flex max-w-md gap-x-4">
                <input
                  id="query"
                  name="query"
                  type="text"
                  required
                  value={Querydata}
                  onChange={handleMessageChange}
                  className="min-w-0 flex-auto outline-none placeholder:text-center rounded-full bg-white px-3.5 py-2 text-black shadow-sm sm:text-sm sm:leading-6"
                  placeholder="Ask anything"
                />

                <Link
                  href={{
                    pathname: "/contact",
                    query: { querie: Querydata },
                  }}
                  type="submit"
                  className="transition flex-none rounded-full px-3.5 py-2.5 text-sm font-normal text-white border-white border-2 bg-primarycolor  shadow-sm hover:bg-primarycolor hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Let's Talk
                </Link>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
