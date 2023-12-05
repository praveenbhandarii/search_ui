// pages/cases/[id].js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import Layout from "../layout";

const CaseDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [caseDetails, setCaseDetails] = useState(null);
  const [token, setToken] = useState(getCookie("user"));

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
      } catch (error) {
        console.error("Error fetching case details:", error);
      }
    };

    if (id) {
      fetchCaseDetails();
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

  return (
    <Layout>
      <div className="text-[#343434] font-bold text-3xl p-4">Case Details</div>
      <div>
        <div className="p-4 border-2 border-[#EDF1F7] bg-[#EDF1F7] rounded-[40px] ">
          <div
            id="hs-modal-signup"
            class="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto"
          >
            <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
              <div class="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div class="p-4 sm:p-7">
                  <ul class="space-y-5">
                    <li class="max-w-lg flex gap-x-2 sm:gap-x-4">
                      <div class="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
                        <h2 class="font-bold text-gray-800 dark:text-white">
                          Client
                        </h2>
                        <div class="space-y-1.5">Hi</div>
                      </div>
                    </li>

                    <li class="max-w-lg ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                      <div class="grow text-end space-y-3">
                        <div class="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                          <p class="text-sm text-white">Hi</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#F8F8F8] p-5 rounded-[20px]">
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

            <div className="flex justify-center items-center h-full mt-10">
              <button
                type="button"
                class="text-white gap-2 bg-primarycolor font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
                data-hs-overlay="#hs-modal-signup"
              >
                {/* <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7.4475 0.00455707C7.5231 1.04402e-07 7.6023 0 7.7049 0H10.296C10.3977 0 10.4769 1.04402e-07 10.5525 0.00455707C11.0201 0.0333431 11.4701 0.195933 11.85 0.473428C12.23 0.750923 12.5244 1.13193 12.699 1.57215C12.7269 1.64233 12.753 1.71797 12.7845 1.81641L12.7872 1.82552C12.8628 2.02967 13.0347 2.26208 13.2759 2.448C13.3029 2.46896 13.3299 2.4881 13.3569 2.50633C15.2946 2.50906 16.3062 2.54461 17.0037 3.1197C17.1477 3.23818 17.2782 3.37033 17.3943 3.51524C18 4.26896 18 5.38542 18 7.61833C18 8.18521 18 8.46775 17.865 8.68922C17.8384 8.73241 17.8083 8.77326 17.775 8.81134C17.604 9.00638 17.3367 9.08749 16.8012 9.25063L12.6 10.5266V9.79747C12.6 9.31404 12.4104 8.8504 12.0728 8.50856C11.7352 8.16673 11.2774 7.97468 10.8 7.97468H7.2C6.72261 7.97468 6.26477 8.16673 5.92721 8.50856C5.58964 8.8504 5.4 9.31404 5.4 9.79747V10.5266L1.1988 9.25063C0.6633 9.08749 0.3951 9.00638 0.225 8.81134C0.191693 8.77324 0.161588 8.73239 0.135 8.68922C8.04663e-08 8.46775 0 8.18521 0 7.61833C0 5.38542 1.07288e-07 4.26896 0.6057 3.51524C0.7227 3.36942 0.8532 3.23727 0.9963 3.1197C1.6938 2.54552 2.7054 2.50906 4.644 2.50633C4.671 2.4881 4.698 2.46896 4.725 2.448C4.9653 2.26208 5.1381 2.02876 5.2128 1.82552C5.247 1.72162 5.2722 1.64324 5.301 1.57124C5.47574 1.13119 5.77019 0.750373 6.15016 0.473046C6.53012 0.19572 6.97999 0.0332655 7.4475 0.00455707ZM11.5371 2.34046C11.5587 2.39696 11.5821 2.45165 11.6091 2.50633H6.3909C6.417 2.45165 6.4404 2.39696 6.4629 2.34046V2.33772L6.4674 2.32861L6.4719 2.31767L6.4764 2.30673L6.4791 2.29762L6.4809 2.29306L6.4845 2.28213L6.4881 2.27119L6.4899 2.26572L6.4926 2.25843L6.4944 2.25205L6.4962 2.24658C6.5313 2.14086 6.5421 2.10714 6.5529 2.08162C6.63223 1.8815 6.76603 1.70829 6.93873 1.58213C7.11143 1.45596 7.31594 1.38203 7.5285 1.36891C7.5573 1.36709 7.5933 1.36709 7.722 1.36709H10.2762C10.4049 1.36709 10.4409 1.36709 10.4697 1.36891C10.9035 1.39625 11.2833 1.67332 11.4462 2.08162C11.4552 2.10714 11.4669 2.13904 11.502 2.24658L11.5038 2.25205L11.5056 2.25843L11.5083 2.26572L11.5101 2.27119L11.5137 2.28213L11.5173 2.29306L11.5191 2.29762L11.5227 2.30673L11.5263 2.31767L11.5308 2.32861L11.5344 2.33772L11.5362 2.34046H11.5371ZM10.8 9.34177H7.2C7.08065 9.34177 6.96619 9.38978 6.8818 9.47524C6.79741 9.5607 6.75 9.67661 6.75 9.79747V11.7679C6.75002 11.8589 6.77695 11.9478 6.82732 12.0232C6.87768 12.0986 6.94918 12.1569 7.0326 12.1908L7.6626 12.446C8.52111 12.7938 9.47889 12.7938 10.3374 12.446L10.9674 12.1908C11.0508 12.1569 11.1223 12.0986 11.1727 12.0232C11.2231 11.9478 11.25 11.8589 11.25 11.7679V9.79747C11.25 9.67661 11.2026 9.5607 11.1182 9.47524C11.0338 9.38978 10.9193 9.34177 10.8 9.34177ZM5.409 11.9575L0.9054 10.5886C0.9324 13.4266 1.0962 16.0405 2.0862 16.9318C3.2724 18 5.1822 18 9 18C12.8178 18 14.7276 18 15.9138 16.9318C16.9038 16.0414 17.0676 13.4266 17.0946 10.5886L12.5901 11.9566C12.5562 12.2869 12.4338 12.6016 12.2362 12.8666C12.0385 13.1316 11.7732 13.3369 11.4687 13.4604L10.8387 13.7155C9.65838 14.1937 8.34162 14.1937 7.1613 13.7155L6.5313 13.4604C6.22683 13.3369 5.96145 13.1316 5.76382 12.8666C5.56618 12.6016 5.4438 12.2869 5.4099 11.9566L5.409 11.9575Z"
                                fill="#E2E2E2"
                              />
                            </svg> */}
                Contact Client
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CaseDetails;
