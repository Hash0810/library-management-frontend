import React, { useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import "../styles/GenerateReceipt.css"; // ✅ Add this line

const GenerateReceipt = () => {
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem("username");
  const userRole = localStorage.getItem("role");

  const handleGenerate = async () => {
    setLoading(true);

    try {
      await axios.get(`/librarian/sendReceipt/${username}`);

      const pdfResponse = await api.get(`/librarian/receipt/${username}`, {
        responseType: "blob",
      });

      const file = new Blob([pdfResponse.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } catch (error) {
      console.error("Error generating/sending receipt:", error);
      alert("Failed to generate or send the receipt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generate-receipt">
      <Navbar role={userRole} />
      <div className="receipt-container">
        <h2 className="title">Generate and Send Book Receipt</h2>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`generate-btn ${loading ? "loading" : ""}`}
        >
          {loading ? "Processing..." : "Generate Receipt"}
        </button>
      </div>
    </div>
  );
};

export default GenerateReceipt;