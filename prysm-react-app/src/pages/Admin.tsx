import { useState } from "react";
import "../styles/admin-view.css";
import { sendEmbeddings } from "../api/embeddings";

function Admin() {
  const [pdfTitle, setPdfTitle] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploadRes, setUploadRes] = useState("");
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    console.log("Title Entered:", pdfTitle);
    console.log("File Selected:", pdfFile ? pdfFile.name : "No file chosen");

    try {
      const res = sendEmbeddings({ pdfTitle, pdfFile });
      console.log(res);
    } catch (error) {
      console.log(error);
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
            <label htmlFor="">PDF Title</label>
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
        </form>
      </div>
    </div>
  );
}

export default Admin;
