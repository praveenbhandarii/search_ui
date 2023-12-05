import { useState } from "react";
import axios from "axios";

function ImageUpload() {
  const [fileData, setFileData] = useState({
    file: null,
    base64: "",
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setFileData({ file, base64: base64String });
      };

      // Determine the file type (image or PDF)
      if (file.type.startsWith("image/")) {
        // For image files, use readAsDataURL
        reader.readAsDataURL(file);
      } else if (file.type === "application/pdf") {
        // For PDF files, use readAsArrayBuffer and convert to Base64
        reader.readAsArrayBuffer(file);
      }
    }
  };

  function imageupload() {
    let config = {
      method: "post",

      maxBodyLength: Infinity,
      url: "https://9f8e-110-226-179-81.ngrok-free.app/generate_image",
      headers: {
        "Content-Type": "application/json",
        "X-Pinggy-No-Screen": "1",
      },
      data: {
        data: fileData.base64,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSubmit = () => {
    if (fileData.base64) {
      console.log(fileData.base64); // Log the Base64 string to the console
      imageupload();
    } else {
      console.log("No file uploaded.");
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFileUpload}
      />
      {fileData.base64 && (
        <div>
          <h2>Uploaded File:</h2>
          {fileData.file.type.startsWith("image/") ? (
            <img src={fileData.base64} alt="Uploaded" />
          ) : (
            <p>PDF File</p>
          )}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
