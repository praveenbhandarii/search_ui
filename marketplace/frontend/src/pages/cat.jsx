import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Select from "react-select";

const usePrevious = (value) => {
  const ref = useRef();
  useLayoutEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
const IndexPage = () => {
  const categories = [
    {
      id: 21,
      category_name: "Human Rights Law",
    },
    {
      id: 22,
      category_name: "Intellectual Property Law",
    },
    {
      id: 23,
      category_name: "Consumer Protection Law",
    },
    {
      id: 24,
      category_name: "Medical Law",
    },
    {
      id: 25,
      category_name: "Real Estate Law",
    },
    {
      id: 26,
      category_name: "Constitutional Law",
    },
    {
      id: 27,
      category_name: "Media and Entertainment Law",
    },
    {
      id: 28,
      category_name: "Corporate Law",
    },
    {
      id: 29,
      category_name: "Labor Law",
    },
    {
      id: 30,
      category_name: "Immigration Law",
    },
    {
      id: 31,
      category_name: "Environmental Law",
    },
    {
      id: 32,
      category_name: "Family Law",
    },
    {
      id: 33,
      category_name: "Tax Law",
    },
    {
      id: 34,
      category_name: "Banking and Finance Law",
    },
    {
      id: 35,
      category_name: "Civil Law",
    },
    {
      id: 36,
      category_name: "test category name",
    },
  ];

  const subcategories = [
    {
      id: 61,
      category_id: 21,
      subcategory_name: "International Human Rights",
    },
    {
      id: 62,
      category_id: 21,
      subcategory_name: "Civil Rights",
    },
    {
      id: 63,
      category_id: 21,
      subcategory_name: "Political Rights",
    },
    {
      id: 64,
      category_id: 21,
      subcategory_name: "Social and Economic Rights",
    },
    {
      id: 65,
      category_id: 22,
      subcategory_name: "Patents",
    },
    {
      id: 66,
      category_id: 22,
      subcategory_name: "Trademarks",
    },
    {
      id: 67,
      category_id: 22,
      subcategory_name: "Copyrights",
    },
    {
      id: 68,
      category_id: 22,
      subcategory_name: "Trade Secrets",
    },
    {
      id: 69,
      category_id: 23,
      subcategory_name: "Product Liability",
    },
    {
      id: 70,
      category_id: 23,
      subcategory_name: "Fraud and Deceptive Practices",
    },
    {
      id: 71,
      category_id: 23,
      subcategory_name: "Consumer Contracts",
    },
    {
      id: 72,
      category_id: 23,
      subcategory_name: "Privacy Rights",
    },
    {
      id: 73,
      category_id: 24,
      subcategory_name: "Healthcare Regulation",
    },
    {
      id: 74,
      category_id: 24,
      subcategory_name: "Medical Malpractice",
    },
    {
      id: 75,
      category_id: 24,
      subcategory_name: "Patient Rights",
    },
    {
      id: 76,
      category_id: 24,
      subcategory_name: "Health Insurance Law",
    },
    {
      id: 77,
      category_id: 25,
      subcategory_name: "Land Use and Zoning",
    },
    {
      id: 78,
      category_id: 25,
      subcategory_name: "Property Transactions",
    },
    {
      id: 79,
      category_id: 25,
      subcategory_name: "Property Tax",
    },
    {
      id: 80,
      category_id: 25,
      subcategory_name: "Landlord-Tenant Law",
    },
    {
      id: 81,
      category_id: 26,
      subcategory_name: "Bill of Rights",
    },
    {
      id: 82,
      category_id: 26,
      subcategory_name: "Equal Protection",
    },
    {
      id: 83,
      category_id: 26,
      subcategory_name: "Due Process",
    },
    {
      id: 84,
      category_id: 26,
      subcategory_name: "Constitutional Amendments",
    },
    {
      id: 85,
      category_id: 27,
      subcategory_name: "Copyright Law",
    },
    {
      id: 86,
      category_id: 27,
      subcategory_name: "Entertainment Contracts",
    },
    {
      id: 87,
      category_id: 27,
      subcategory_name: "Media Regulation",
    },
    {
      id: 88,
      category_id: 27,
      subcategory_name: "First Amendment Issues",
    },
    {
      id: 89,
      category_id: 28,
      subcategory_name: "Mergers and Acquisitions",
    },
    {
      id: 90,
      category_id: 28,
      subcategory_name: "Corporate Governance",
    },
    {
      id: 91,
      category_id: 28,
      subcategory_name: "Securities Law",
    },
    {
      id: 92,
      category_id: 28,
      subcategory_name: "Business Contracts",
    },
    {
      id: 93,
      category_id: 29,
      subcategory_name: "Employment Contracts",
    },
    {
      id: 94,
      category_id: 29,
      subcategory_name: "Collective Bargaining",
    },
    {
      id: 95,
      category_id: 29,
      subcategory_name: "Workplace Discrimination",
    },
    {
      id: 96,
      category_id: 29,
      subcategory_name: "Occupational Safety",
    },
    {
      id: 97,
      category_id: 30,
      subcategory_name: "Visas and Work Permits",
    },
    {
      id: 98,
      category_id: 30,
      subcategory_name: "Deportation Defence",
    },
    {
      id: 99,
      category_id: 30,
      subcategory_name: "Asylum and Refugee Law",
    },
    {
      id: 100,
      category_id: 30,
      subcategory_name: "Citizenship",
    },
    {
      id: 101,
      category_id: 31,
      subcategory_name: "Pollution Control",
    },
    {
      id: 102,
      category_id: 31,
      subcategory_name: "Conservation Law",
    },
    {
      id: 103,
      category_id: 31,
      subcategory_name: "Environmental Impact Assessment",
    },
    {
      id: 104,
      category_id: 31,
      subcategory_name: "Climate Change Law",
    },
    {
      id: 105,
      category_id: 32,
      subcategory_name: "Divorce and Separation",
    },
    {
      id: 106,
      category_id: 32,
      subcategory_name: "Child Custody",
    },
    {
      id: 107,
      category_id: 32,
      subcategory_name: "Adoption Law",
    },
    {
      id: 108,
      category_id: 32,
      subcategory_name: "Domestic Violence",
    },
    {
      id: 109,
      category_id: 33,
      subcategory_name: "Income Tax",
    },
    {
      id: 110,
      category_id: 33,
      subcategory_name: "Corporate Tax",
    },
    {
      id: 111,
      category_id: 33,
      subcategory_name: "International Tax",
    },
    {
      id: 112,
      category_id: 33,
      subcategory_name: "Tax Litigation",
    },
    {
      id: 113,
      category_id: 34,
      subcategory_name: "Banking Regulations",
    },
    {
      id: 114,
      category_id: 34,
      subcategory_name: "Securities Law",
    },
    {
      id: 115,
      category_id: 34,
      subcategory_name: "Financial Transactions",
    },
    {
      id: 116,
      category_id: 34,
      subcategory_name: "Consumer Finance",
    },
    {
      id: 117,
      category_id: 35,
      subcategory_name: "Contract Law",
    },
    {
      id: 118,
      category_id: 35,
      subcategory_name: "Tort Law",
    },
    {
      id: 119,
      category_id: 35,
      subcategory_name: "Property Law",
    },
    {
      id: 120,
      category_id: 35,
      subcategory_name: "Family Disputes",
    },
  ];

  const userSelections = [
    {
      user_id: 1,
      category_id: 21,
      subcategory_id: 62,
    },
    // Additional user selections can be added here
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState({});

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.category_name,
  }));

  useEffect(() => {
    if (selectedCategory) {
      const options = subcategories
        .filter(
          (subcategory) => subcategory.category_id === selectedCategory.value
        )
        .map((subcategory) => ({
          value: subcategory.id,
          label: subcategory.subcategory_name,
        }));
      setSubcategoryOptions(options);
    }
  }, [selectedCategory, subcategories]);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const handleSubcategoryChange = (selectedOptions) => {
    setSelectedSubcategories(selectedOptions);
  };

  const handleShowResult = () => {
    console.log(
      selectedSubcategories.map(({ value }) => ({ subcategory_id: value }))
    );
    // Additional actions can be performed here if needed
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Category Selector</h1>

      <div className="my-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Select a Category
        </label>
        <Select
          id="category"
          name="category"
          value={selectedCategory}
          options={categoryOptions}
          onChange={handleCategoryChange}
        />
      </div>

      {selectedCategory && (
        <div className="my-4">
          <label
            htmlFor="subcategories"
            className="block text-sm font-medium text-gray-700"
          >
            Select Subcategories
          </label>
          <Select
            id="subcategories"
            name="subcategories"
            value={selectedSubcategories}
            options={subcategoryOptions}
            isMulti
            onChange={handleSubcategoryChange}
          />
        </div>
      )}

      <button
        onClick={handleShowResult}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Show Result
      </button>

      {selectedSubcategories.length > 0 && (
        <div className="mt-4">
          <p className="text-lg font-semibold text-green-700">
            Result:{" "}
            {JSON.stringify(
              selectedSubcategories.map(({ value }) => ({
                subcategory_id: value,
              }))
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
