// pages/cases/[id].js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

const CaseDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [caseDetails, setCaseDetails] = useState(null);
  const [token, setToken] = useState(getCookie("user"));
  const [message, setMessage] = useState("");
  const [text, setText] = useState([]);
  const [client_id, setclientID] = useState();
  // var message=""

  useEffect(() => {
    // Fetch case details using the API
    const fetchCaseDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE}/user/case/${id}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        setCaseDetails(response.data);
        setclientID(response.data.client_id);
        getmessages()
      } catch (error) {
        console.error("Error fetching case details:", error);
      }
    };

    if (id) {
      fetchCaseDetails();
      check_room();
    }
  }, [id]);

  if (!caseDetails) {
    
    return <p>Loading...</p>;
  }

  const {
    case_name,
    filing_number,
    date_of_filing,
    counsel_name,
    counsel_changes,
    name_of_judges_presiding,
    claim_value,
    intern_relif,
    lower_court,
    case_status,
    disposed_date,
  } = caseDetails[0];

  function getmessages() {
    // function otpCheck() {
      // setclientID(caseDetails[0].client_id);
    // console.log(caseDetails[0])
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_DATABASE}/getMessages/${id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log("chatttttttt")
        console.log(response.data);
        setText(response.data.messages);

        // console.log(text.size)
        console.log(text);
      })
      .catch((error) => {
        console.log(error);
      });
    // }
    // console.log("chatt")
  }

  function sendMessage() {
    // function otpCheck() {

    console.log("sendddd chatt");
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_DATABASE}/sendMessage`,
      headers: {},
      data: {
        message: message,
        username: caseDetails[0].client_id,
        room_id: String(id),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log("sendddd");
        console.log(response.data);
        getmessages();
      })
      .catch((error) => {
        console.log(error);
      });
    // }
    // console.log("chatt")
  }
  function check_room() {
    // function otpCheck() {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_DATABASE}/checkview`,
      headers: {},
      data: {
        room_name: id,
        username: "varad",
      },
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "Room already exists") {
          console.log("testtttt");
          getmessages();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const formatDate = (dateString) => {
    const options = { hour: "numeric", minute: "numeric", second: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  return (
    <div>
      <h1>Case Details</h1>
      <p>Case ID: {id}</p>
      <p>Case Name: {case_name}</p>
      <p>Filing Number: {filing_number}</p>
      <p>Date of Filing: {date_of_filing}</p>
      <p>Counsel Name: {counsel_name}</p>
      <p>Counsel Changes: {counsel_changes}</p>
      <p>Judges Presiding: {name_of_judges_presiding}</p>
      <p>Claim Value: {claim_value}</p>
      <p>Intern Relief: {intern_relif}</p>
      <p>Lower Court: {lower_court}</p>
      <p>Case Status: {case_status ? "Active" : "Inactive"}</p>
      <p>Disposed Date: {disposed_date}</p>
      <button
        type="button"
        class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        data-hs-overlay="#hs-scroll-inside-body-modal"
      >
        Scroll inside body
      </button>

      <div
        id="hs-scroll-inside-body-modal"
        class="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)]">
          <div class="max-h-full overflow-hidden flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div class="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 class="font-bold text-gray-800 dark:text-white">Chat</h3>
              <button
                type="button"
                class="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-scroll-inside-body-modal"
              >
                <span class="sr-only">Close</span>
                <svg
                  class="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div class="p-4 overflow-y-auto">
              <ul class="space-y-5">
                {text.map((message, index) => (
                  <li
                    key={index}
                    className={`flex gap-x-2 sm:gap-x-4 ${
                      message.user == caseDetails[0].client_id ? "ms-auto" : ""
                    }`}
                  >
                    {message.user == caseDetails[0].client_id ? (
                      // If user is varad, render on the right
                      <div className="grow text-end space-y-3">
                        <div className="inline-flex flex-col justify-end">
                          <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                            <p className="text-sm text-white">
                              {message.value}
                            </p>
                          </div>
                          <span className="mt-1.5 ms-auto flex items-center gap-x-1 text-xs text-gray-500">
                            <svg
                              className="flex-shrink-0 w-3 h-3"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 6 7 17l-5-5" />
                              <path d="m22 10-7.5 7.5L13 16" />
                            </svg>
                            Sent {formatDate(message.date)}
                          </span>
                        </div>
                      </div>
                    ) : (
                      // If user is not varad, render on the left
                      <div>
                        <img
                          className="inline-block h-9 w-9 rounded-full"
                          src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
                          alt="Image Description"
                        />
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
                          {message.value}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <input
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
                type="text"
                class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Enter Message"
              />

              <button
                onClick={sendMessage}
                type="button"
                class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetails;
