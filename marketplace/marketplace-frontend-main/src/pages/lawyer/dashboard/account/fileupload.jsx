import React, { useState } from "react";
import axios from "axios";

const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      console.error("Please select a file");
      return;
    }

    setIsLoading(true);

    const data = new FormData();
    data.append("file", file);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8000/accept_file",
      headers: {
        Authorization: "Token 09ca10be2cffc9f2ee90dbfa593c71653a6cf164",
        "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
};

export default UploadComponent;
