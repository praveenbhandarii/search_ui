import React from "react";
import Roundedlogo from "../../component/roundedlogo";

const Dashboardlayout = ({ Children }) => {
  return (
    <div>
      <div>
        <div>
          <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:pl-64 ">
            <nav
              className="flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8"
              aria-label="Global"
            >
              <div className="mr-5 lg:mr-0 lg:hidden">
                <div className="flex items-center">
                  <Roundedlogo width={30} height={30} />
                  <span className="ml-2 text-lg font-medium tracking-wide">
                    Lawyantra
                  </span>
                </div>
              </div>

              <div className="w-full flex items-center justify-end ml-auto sm:justify-between sm:gap-x-3 sm:order-3">
                <div className="sm:hidden">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-600"
                    data-hs-overlay="#application-sidebar"
                    aria-controls="application-sidebar"
                    aria-label="Toggle navigation"
                  >
                    <span className="sr-only">Toggle Navigation</span>
                    <svg
                      className="w-5 h-5"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="hidden sm:block">
                  <label for="icon" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="icon"
                      name="icon"
                      className="py-2 px-4 pl-11 block w-full border-gray-200 shadow-sm rounded-full text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      placeholder="Search"
                    />
                  </div>
                </div>

                <div className="flex flex-row items-center justify-end gap-2">
                  <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                    <button
                      id="hs-dropdown-with-header"
                      type="button"
                      className="border-1 hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-[7px] font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs dark:bg-gray-800 dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="13"
                        viewBox="0 0 12 13"
                        fill="none"
                      >
                        <path
                          d="M11.8648 8.20019L10.6154 6.98672V5.37923C10.614 4.26835 10.1885 3.19744 9.42122 2.37358C8.65396 1.54972 7.59943 1.03144 6.46154 0.918952V0H5.53846V0.918952C4.40057 1.03144 3.34604 1.54972 2.57879 2.37358C1.81153 3.19744 1.38605 4.26835 1.38462 5.37923V6.98672L0.135231 8.20019C0.0486695 8.28423 2.61403e-05 8.39823 0 8.51711V9.86192C0 9.98081 0.0486262 10.0948 0.135181 10.1789C0.221737 10.263 0.339131 10.3102 0.461538 10.3102H3.69231V10.6585C3.68227 11.2272 3.88865 11.7795 4.2719 12.2095C4.65515 12.6396 5.18832 12.9171 5.76923 12.989C6.09008 13.0199 6.41404 12.9853 6.72027 12.8873C7.0265 12.7893 7.30822 12.6301 7.54732 12.42C7.78641 12.2099 7.97759 11.9536 8.10854 11.6674C8.2395 11.3812 8.30733 11.0716 8.30769 10.7585V10.3102H11.5385C11.6609 10.3102 11.7783 10.263 11.8648 10.1789C11.9514 10.0948 12 9.98081 12 9.86192V8.51711C12 8.39823 11.9513 8.28423 11.8648 8.20019ZM7.38462 10.7585C7.38462 11.1151 7.23874 11.4572 6.97907 11.7094C6.71941 11.9616 6.36722 12.1033 6 12.1033C5.63278 12.1033 5.28059 11.9616 5.02093 11.7094C4.76126 11.4572 4.61538 11.1151 4.61538 10.7585V10.3102H7.38462V10.7585ZM11.0769 9.41365H0.923077V8.7027L2.17246 7.48923C2.25902 7.40519 2.30767 7.29118 2.30769 7.17231V5.37923C2.30769 4.42812 2.6967 3.51597 3.38914 2.84344C4.08159 2.1709 5.02074 1.79308 6 1.79308C6.97926 1.79308 7.91841 2.1709 8.61086 2.84344C9.3033 3.51597 9.69231 4.42812 9.69231 5.37923V7.17231C9.69233 7.29118 9.74098 7.40519 9.82754 7.48923L11.0769 8.7027V9.41365Z"
                          fill="#838383"
                        />
                      </svg>
                    </button>

                    <div
                      className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700"
                      aria-labelledby="hs-dropdown-with-header"
                    >
                      <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-gray-700">
                        welcome
                      </div>
                      <div className="mt-2 py-2 first:pt-0 last:pb-0">
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                          href="#"
                        >
                          <svg
                            className="flex-none"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                          </svg>
                          Newsletter
                        </a>
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                          href="#"
                        >
                          <svg
                            className="flex-none"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
                            <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
                          </svg>
                          Purchases
                        </a>
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                          href="#"
                        >
                          <svg
                            className="flex-none"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z"
                            />
                            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                          </svg>
                          Downloads
                        </a>
                        <a
                          className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                          href="#"
                        >
                          <svg
                            className="flex-none"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                          </svg>
                          Team Account
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>

          <div
            id="application-sidebar"
            className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-64 bg-[#EDF1F7] pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0"
          >
            <div className="px-6">
              <div className="flex items-center">
                <Roundedlogo width={30} height={30} />
                <span className="ml-2 text-lg font-medium tracking-wide">
                  Lawyantra
                </span>
              </div>
            </div>

            <nav
              className="hs-accordion-group pt-10 p-6 w-full flex flex-col flex-wrap"
              data-hs-accordion-always-open
            >
              <ul className="space-y-1.5">
                <li>
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-2.5 text-primarycolor bg-gray-100 font-bold text-base rounded-md  "
                    href="javascript:;"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="24"
                      viewBox="0 0 28 24"
                      fill="none"
                    >
                      <path
                        d="M5.92 2H2.54C1.14 2 0 3.15 0 4.561V7.97C0 9.39 1.14 10.53 2.54 10.53H5.92C7.33 10.53 8.46 9.39 8.46 7.97V4.561C8.46 3.15 7.33 2 5.92 2Z"
                        fill="#0027B3"
                      />
                      <path
                        d="M5.92 13.4688H2.54C1.14 13.4688 0 14.6098 0 16.0298V19.4387C0 20.8487 1.14 21.9987 2.54 21.9987H5.92C7.33 21.9987 8.46 20.8487 8.46 19.4387V16.0298C8.46 14.6098 7.33 13.4688 5.92 13.4688Z"
                        fill="#0027B3"
                      />
                      <path
                        d="M17.4591 2H14.0791C12.6691 2 11.5391 3.15 11.5391 4.561V7.97C11.5391 9.39 12.6691 10.53 14.0791 10.53H17.4591C18.8591 10.53 19.9991 9.39 19.9991 7.97V4.561C19.9991 3.15 18.8591 2 17.4591 2Z"
                        fill="#0027B3"
                      />
                      <path
                        d="M17.4591 13.4688H14.0791C12.6691 13.4688 11.5391 14.6098 11.5391 16.0298V19.4387C11.5391 20.8487 12.6691 21.9987 14.0791 21.9987H17.4591C18.8591 21.9987 19.9991 20.8487 19.9991 19.4387V16.0298C19.9991 14.6098 18.8591 13.4688 17.4591 13.4688Z"
                        fill="#F37802"
                      />
                    </svg>
                    Dashboard
                  </a>
                </li>
                <li className="group">
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-2.5 text-[#8F91A5] hover:bg-gray-100 font-bold text-base rounded-md group-hover:text-[#5F82FF]"
                    href="/profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="24"
                      viewBox="0 0 28 24"
                      fill="none"
                    >
                      <path
                        className="fill-[#8F91A5] group-hover:fill-[#5F82FF]"
                        d="M9.00098 4C10.0618 4 11.0793 4.42143 11.8294 5.17157C12.5795 5.92172 13.001 6.93913 13.001 8C13.001 9.06087 12.5795 10.0783 11.8294 10.8284C11.0793 11.5786 10.0618 12 9.00098 12C7.94011 12 6.92269 11.5786 6.17255 10.8284C5.4224 10.0783 5.00098 9.06087 5.00098 8C5.00098 6.93913 5.4224 5.92172 6.17255 5.17157C6.92269 4.42143 7.94011 4 9.00098 4ZM9.00098 14C13.421 14 17.001 15.79 17.001 18V20H1.00098V18C1.00098 15.79 4.58098 14 9.00098 14Z"
                      />
                    </svg>
                    Profile
                  </a>
                </li>

                <div className="absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex z-20">
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <img src="/twitter.svg" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Jassica
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <button>LogOut</button>
                    </div>
                  </div>
                </div>
              </ul>
            </nav>
          </div>

          <div className="w-full px-4 sm:px-6 md:px-8 lg:pl-72">{Children}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardlayout;
