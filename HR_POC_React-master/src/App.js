import "./styles.css";
import React, { useState } from "react";
import { RemoteRunnable } from "langchain/runnables/remote";
import PropTypes from 'prop-types';

function ResultCard({ item }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const { metadata } = item;
  const partiesInvolved = Array.isArray(metadata["Parties Involved"]) ? metadata["Parties Involved"].join(' vs. ') : metadata["Parties Involved"];
  
  return (
    <div className="result-card">
      <h3>{metadata["Case Name"]}</h3>
      <p><strong>Date:</strong> {metadata["Date"]}</p>
      <p><strong>Parties Involved:</strong> {partiesInvolved}</p>
      <p><strong>Court:</strong> {metadata["Court Name"]}</p>
      <p><strong>Document Type:</strong> {metadata["Document Type"]}</p>
      <p><strong>Case Summary:</strong> {metadata["Case Summary"]}</p>
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
    }).isRequired,
  }).isRequired,
};



function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    icj: false,
    un: false,
    hudoc: false,
  });
  const [yearFilter, setYearFilter] = useState("all");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
      setLoading(true);
    // Initialize the RemoteRunnable with your LangChain API endpoint
    const chain = new RemoteRunnable({
      // url: `https://yantra-api-gcp-image-fxhbdhovha-el.a.run.app/chat`, // Replace with your actual API endpoint http://localhost:8081/chat
        url: 'http://localhost:8080/chat'
    });
    
    try {
      // Invoke the LangChain API with the search query
      const result = await chain.invoke(
        searchQuery
      );
      setResults(result);

      console.log(result);
    } catch (error) {
      setResults(null); 
      console.error("Error fetching data: ", error); // Handle any errors
    }
    finally {
      setLoading(false); // Stop loading
    }
  };

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters({ ...filters, [name]: checked });
  };

  const handleYearFilterChange = (event) => {
    setYearFilter(event.target.value);
  };

  return (
    <div className="search-container">
      <h1>Human Rights Search</h1>
      <div className="filter-section">
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
      </div>

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

      {/* {loading && <div>Loading...</div>} Loading indicator */}
      
      <div className="search-results">
        {loading && <div className="loading-indicator">Loading...</div>}
        {!loading && results && results.map((item, index) => (
          <ResultCard key={index} item={item} />
        ))}
      </div>
      </div>
    
  );
}

export default App;
