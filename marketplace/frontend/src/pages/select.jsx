import React, { useState, useEffect } from "react";
import Select from "react-select";
const lawDictionary = {
  "Human Rights Law": [
    "International Human Rights",
    "Civil Rights",
    "Political Rights",
    "Social and Economic Rights",
  ],
  "Intellectual Property Law": [
    "Patents",
    "Trademarks",
    "Copyrights",
    "Trade Secrets",
  ],
  "Consumer Protection Law": [
    "Product Liability",
    "Fraud and Deceptive Practices",
    "Consumer Contracts",
    "Privacy Rights",
  ],
  "Medical Law": [
    "Healthcare Regulation",
    "Medical Malpractice",
    "Patient Rights",
    "Health Insurance Law",
  ],
  "Real Estate Law": [
    "Land Use and Zoning",
    "Property Transactions",
    "Property Tax",
    "Landlord-Tenant Law",
  ],
  "Constitutional Law": [
    "Bill of Rights",
    "Equal Protection",
    "Due Process",
    "Constitutional Amendments",
  ],
  "Media and Entertainment Law": [
    "Copyright Law",
    "Entertainment Contracts",
    "Media Regulation",
    "First Amendment Issues",
  ],
  "Criminal Law": [
    "Violent Crimes",
    "White Collar Crimes",
    "Drug Offenses",
    "Cybercrimes",
  ],
  "Corporate Law": [
    "Mergers and Acquisitions",
    "Corporate Governance",
    "Securities Law",
    "Business Contracts",
  ],
  "Labor Law": [
    "Employment Contracts",
    "Collective Bargaining",
    "Workplace Discrimination",
    "Occupational Safety",
  ],
  "Immigration Law": [
    "Visas and Work Permits",
    "Deportation Defence",
    "Asylum and Refugee Law",
    "Citizenship",
  ],
  "Environmental Law": [
    "Pollution Control",
    "Conservation Law",
    "Environmental Impact Assessment",
    "Climate Change Law",
  ],
  "Family Law": [
    "Divorce and Separation",
    "Child Custody",
    "Adoption Law",
    "Domestic Violence",
  ],
  "Tax Law": [
    "Income Tax",
    "Corporate Tax",
    "International Tax",
    "Tax Litigation",
  ],
  "Banking and Finance Law": [
    "Banking Regulations",
    "Securities Law",
    "Financial Transactions",
    "Consumer Finance",
  ],
  "Civil Law": ["Contract Law", "Tort Law", "Property Law", "Family Disputes"],
};

const Home = () => {
  const [selectedKey, setSelectedKey] = useState(Object.keys(lawDictionary)[0]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [userSelections, setUserSelections] = useState([]);

  useEffect(() => {
    setSelectedSubcategories([]);
  }, [selectedKey]); // Reset selectedSubcategories when the selectedKey changes

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (selectedSubcategories.length > 0) {
      // Filter out already selected subcategories
      const uniqueSubcategories = selectedSubcategories.filter(
        (subcategory) =>
          !userSelections.some(
            (selection) => selection.subcategory_id === subcategory.value
          )
      );

      // Create a new user selection object for each selected subcategory
      const newUserSelections = uniqueSubcategories.map((subcategory) => ({
        user_id: 1, // Replace this with the actual user ID
        category_id: Object.keys(lawDictionary).indexOf(selectedKey) + 1,
        subcategory_id: subcategory.value,
      }));

      // Update the userSelections state
      setUserSelections([...userSelections, ...newUserSelections]);

      // Clear the selectedSubcategories state
      setSelectedSubcategories([]);
    }
  };

  const options = lawDictionary[selectedKey].map((value) => ({
    value,
    label: value,
  }));

  // Filter out already selected subcategories from the options
  const filteredOptions = options.filter(
    (option) =>
      !userSelections.some(
        (selection) => selection.subcategory_id === option.value
      )
  );

  return (
    <div>
      <h1>Law Dropdowns</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="keysDropdown">Select a Key:</label>
        <select
          id="keysDropdown"
          onChange={(e) => setSelectedKey(e.target.value)}
          value={selectedKey}
        >
          {Object.keys(lawDictionary).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>

        <label htmlFor="valuesDropdown">Select Subcategories:</label>
        <Select
          id="valuesDropdown"
          isMulti
          options={filteredOptions}
          value={selectedSubcategories}
          onChange={(selectedOptions) =>
            setSelectedSubcategories(selectedOptions)
          }
        />

        <button type="submit">Submit</button>
      </form>

      <h2>User Selections:</h2>
      <pre>{JSON.stringify(userSelections, null, 2)}</pre>
    </div>
  );
};

export default Home;
