import { useState, useRef } from "react";
import "../styles/admin-view.css";
import { sendEmbeddings } from "../api/embeddings";

function Admin() {
  const [pdfTitle, setPdfTitle] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploadRes, setUploadRes] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    setUploadRes("Uploading...");

    if (!pdfFile) {
      setUploadRes("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("title", pdfTitle);
    formData.append("file", pdfFile);

    try {
      const res = await sendEmbeddings(formData);
      console.log(res);
      setUploadRes("Upload successful!");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setPdfTitle("");
    } catch (error) {
      console.log(error);
      setUploadRes("Upload failed. Please try again.");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <form className="admin-form">
          <div className="admin-header">
            <h1>PDF Upload</h1>
          </div>
          <div className="input-group">
            <label htmlFor="pdfTitle">PDF Title</label>
            <input
              type="text"
              id="pdfTitle"
              className="admin-input"
              placeholder="Enter document title..."
              value={pdfTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPdfTitle(e.target.value)
              }
            />
          </div>
          <div className="input-group">
            <label htmlFor="pdfFile">File Upload</label>
            <input
              type="file"
              id="pdfFile"
              className="admin-file-input"
              accept=".pdf"
              ref={fileInputRef}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0) {
                  setPdfFile(e.target.files[0]);
                }
              }}
            />
          </div>
          <button
            type="submit"
            className="admin-submit-btn"
            onClick={handleSubmit}
          >
            Upload Document
          </button>

          {uploadRes && (
            <div
              style={{
                marginTop: "15px",
                textAlign: "center",
                fontWeight: "bold",
                color: uploadRes.includes("successful")
                  ? "green"
                  : uploadRes === "Uploading..."
                    ? "blue"
                    : "red",
              }}
            >
              {uploadRes}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Admin;
