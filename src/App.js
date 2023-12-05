import "./styles.css";
import React, { useState } from "react";
import { RemoteRunnable } from "langchain/runnables/remote";
import PropTypes from 'prop-types';

function ResultCard({ item }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const { metadata } = item;
  const partiesInvolved = Array.isArray(metadata["Parties Involved"]) 
    ? metadata["Parties Involved"].join(' vs. ')
    : metadata["Parties Involved"];

  return (
    <div className="result-card">
      <h3>{metadata["Case Name"]}</h3>
      <p><strong>Date:</strong> {metadata["Date"]}</p>
      <p><strong>Parties Involved:</strong> {partiesInvolved}</p>
      <p><strong>Court:</strong> {metadata["Court Name"]}</p>
      <p><strong>Document Type:</strong> {metadata["Document Type"]}</p>
      <p><strong>Case Summary:</strong> {metadata["Case Summary"]}</p>
      <div className="keywords-container">
        {metadata.Keywords && metadata.Keywords.map((keyword, index) => (
          <button 
            key={index}
            className="keyword-button"
            onClick={() => handleKeywordClick(keyword)}
          >
            {keyword}
          </button>
        ))}
      </div>
      <button onClick={() => setModalOpen(true)} className="view-document">View Summary</button>
      {isModalOpen && (
        <DocumentModal
          content={item.pageContent}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

function handleKeywordClick(keyword) {
  console.log("Keyword clicked:", keyword);
  // Add your logic here for what happens when a keyword is clicked
}

function DocumentModal({ content, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={onClose} className="close-modal">Close</button>
        <p>{content}</p>
      </div>
    </div>
  );
}

DocumentModal.propTypes = {
  content: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

ResultCard.propTypes = {
  item: PropTypes.shape({
    pageContent: PropTypes.string.isRequired,
    metadata: PropTypes.shape({
      'Date': PropTypes.string,
      'Parties Involved': PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
      'Case Name': PropTypes.string,
      'Court Name': PropTypes.string,
      'Document Type': PropTypes.string,
      'Case Summary': PropTypes.string,
      'Keywords': PropTypes.arrayOf(PropTypes.string), // Add this line
    }).isRequired,
  }).isRequired,
};



function App() {
  const [searchQuery, setSearchQuery] = useState("");
  // const [filters, setFilters] = useState({
  //   icj: false,
  //   un: false,
  //   hudoc: false,
  // });
  // const [yearFilter, setYearFilter] = useState("all");
  const [uniqueKeywords, setUniqueKeywords] = useState([]);
  console.log(uniqueKeywords)
  // const [selectedKeywords, setSelectedKeywords] = useState(new Set());
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const [uniqueDates, setUniqueDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const [uniqueParties, setUniqueParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);


  const handleSearch = async () => {
      setLoading(true);
    // Initialize the RemoteRunnable with your LangChain API endpoint
    const chain = new RemoteRunnable({
      url: `https://yantra-api-gcp-image-fxhbdhovha-el.a.run.app/chat`, // Replace with your actual API endpoint http://localhost:8081/chat
      url: 'https://search-1t0l.onrender.com/chat'
    });
    
    try {
      // Invoke the LangChain API with the search query
      const result = await chain.invoke(
        searchQuery
      );
      setResults(result);
      extractFilterValues(result);
      console.log(result);
    } catch (error) {
      setResults(null); 
      console.error("Error fetching data: ", error); // Handle any errors
    }
    finally {
      setLoading(false); // Stop loading
    }
  };
  const extractFilterValues = (results) => {
    const dates = new Set(results.map(item => item.metadata.Date));
    setUniqueDates([...dates]);
  
    const parties = new Set(results.flatMap(item => item.metadata["Parties Involved"] || []));
    setUniqueParties([...parties]);
    const keywords = new Set(results.flatMap(item => item.metadata.Keywords || []));
    setUniqueKeywords([...keywords]);
    // ...Similarly extract values for other filters...
  };

  // const toggleKeywordFilter = (keyword) => {
  //   setSelectedKeywords(prevKeywords => {
  //     const newKeywords = new Set(prevKeywords);
  //     if (newKeywords.has(keyword)) {
  //       newKeywords.delete(keyword);
  //     } else {
  //       newKeywords.add(keyword);
  //     }
  //     return newKeywords;
  //   });
  // }
  
  // const filteredResults = results ? results.filter(item => {
  //   return (
  //     (selectedKeywords.size === 0 || item.metadata.Keywords.some(keyword => selectedKeywords.has(keyword))) &&
  //     (!selectedDate || item.metadata.Date === selectedDate) &&
  //     (!selectedParty || item.metadata["Parties Involved"].includes(selectedParty))
  //   );
  // }) : [];

  // const handleFilterChange = (event) => {
  //   const { name, checked } = event.target;
  //   setFilters({ ...filters, [name]: checked });
  // };

  // const handleYearFilterChange = (event) => {
  //   setYearFilter(event.target.value);
  // };
  

  return (
    <div className="main-container">
       <div className="left-filters">
       <div className="filter-title">Year</div>
      {/* Date Filters */}
      {uniqueDates.map(date => (
        <button 
          key={date} 
          onClick={() => setSelectedDate(date === selectedDate ? null : date)}
          className={selectedDate === date ? 'active' : ''}
        >
          {date}
        </button>
      ))}
      {/* ...other left-side filters if any... */}
    </div>
    <div className="central-content">
    <div className="search-container">
      <h1>Human Rights Search</h1>
      {/* Filter UI for Keywords */}
     
      {/* ...Add UI for other filters... */}
      {/* <div className="filter-section">
        <div className="court-filters">
          <label>
            <input
              type="checkbox"
              name="icj"
              checked={filters.icj}
              onChange={handleFilterChange}
            />
            ICJ
          </label>
          <label>
            <input
              type="checkbox"
              name="un"
              checked={filters.un}
              onChange={handleFilterChange}
            />
            UN
          </label>
          <label>
            <input
              type="checkbox"
              name="hudoc"
              checked={filters.hudoc}
              onChange={handleFilterChange}
            />
            HUDOC
          </label>
        </div>
        <div className="year-filter">
          <label>
            Year:
            <select
              name="year"
              onChange={handleYearFilterChange}
              value={yearFilter}
            >
              <option value="all">All Time</option>
              <option value="1">Last 1 Year</option>
              <option value="5">Last 5 Years</option>
              <option value="10">Last 10 Years</option>
            </select>
          </label>
        </div>
      </div> */}

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter search query..."
        className="search-query"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
      </div>
      {loading && <div>Loading...</div>} {/* Loading indicator */}
      
      <div className="search-results">
        {loading && <div className="loading-indicator">Loading...</div>}
        {!loading && results && results.map((item, index) => (
          <ResultCard key={index} item={item} />
        ))}
      </div>
      </div>
      <div className="right-filters">
      <div className="filter-title">Parties Involved</div>
      {uniqueParties.map(party => (
      <button 
        key={party} 
        onClick={() => setSelectedParty(party === selectedParty ? null : party)}
        className={`filter-button ${selectedParty === party ? 'active' : ''}`}
        title={party} // Tooltip on hover
      >
        {party.length > 15 ? `${party.substring(0, 15)}...` : party} {/* Truncate long text */}
      </button>
    ))}
      {/* ...other right-side filters if any... */}
    </div>
      </div>
    
  );
}

export default App;
