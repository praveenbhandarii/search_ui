import React, { useState } from "react";

function TagInput() {
  const predefinedTags = ["apple", "banana", "cherry", "date", "elderberry"];
  const [tags, setTags] = useState("");
  const [tagList, setTagList] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [tagSuggestions, setTagSuggestions] = useState([...predefinedTags]);
  // const languages = ["English", "Hindi", "Spanish", "French", "German"];

  const handleTagInputChange = (e) => {
    const inputText = e.target.value;
    setTags(inputText);

    // Filter suggestions based on user input
    const suggestions = predefinedTags.filter((tag) =>
      tag.toLowerCase().includes(inputText.toLowerCase())
    );
    setTagSuggestions(suggestions);
  };

  const handleTagSelection = (e) => {
    setSelectedSuggestion(e.target.value);
  };

  const addTag = () => {
    const selectedTag = selectedSuggestion.trim();
    if (selectedTag) {
      setTagList([...tagList, selectedTag]);
      setSelectedSuggestion("");
      setTagSuggestions((prevSuggestions) =>
        prevSuggestions.filter((suggestion) => suggestion !== selectedTag)
      );
    }
  };

  const removeTag = (tag) => {
    const updatedTagList = tagList.filter((t) => t !== tag);
    setTagList(updatedTagList);
    setTagSuggestions([...tagSuggestions, tag]);
  };

  const handleTagSubmit = () => {
    const tagsJson = JSON.stringify(tagList);
    console.log(tagsJson);
  };

  return (
    <div>
      <select value={selectedSuggestion} onChange={handleTagSelection}>
        <option value="">Select a tag</option>
        {tagSuggestions.map((suggestion, index) => (
          <option key={index} value={suggestion}>
            {suggestion}
          </option>
        ))}
      </select>
      <button onClick={addTag}>Add Tag</button>
      <button onClick={handleTagSubmit}>Submit</button>

      <div>
        <h2>Tags:</h2>
        <div className="tag-pills">
          {tagList.map((tag, index) => (
            <span key={index} className="tag-pill">
              {tag}
              <button className="remove-tag" onClick={() => removeTag(tag)}>
                x
              </button>
            </span>
          ))}
        </div>
      </div>
      {/* <div>
        <h1>Languages Page</h1>
        <div>
          <h2>Languages:</h2>
          <ul>
            {languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>
      </div> */}
    </div>
  );
}

export default TagInput;
