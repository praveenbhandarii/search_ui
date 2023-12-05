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

  useEffect(() => {
    // Fetch case details using the API
    const fetchCaseDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/user/case/${id}`,
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
    </div>
  );
};

export default CaseDetails;
