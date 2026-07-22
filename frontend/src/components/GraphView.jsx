import React, { useState } from "react";

function GraphView({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      setResponse(data);

      // 🔥 CRITICAL SYNC: Update global application metrics right away!
      if (onUploadSuccess) {
        await onUploadSuccess();
      }

    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ background: "#1e293b", padding: "25px", borderRadius: "8px" }}>
      <h2>Upload Document</h2>
      <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />
      
      <button 
        onClick={handleUpload} 
        disabled={loading} 
        style={{ padding: "8px 16px", background: "#2563eb", border: "none", color: "#fff", borderRadius: "4px", cursor: "pointer" }}
      >
        {loading ? "Analyzing Document..." : "Upload"}
      </button>

      {response && response.entities && (
        <div style={{ marginTop: "30px" }}>
          <h3>Extracted Entities</h3>
          <ul style={{ background: "#0f172a", padding: "15px", borderRadius: "6px", maxHeight: "250px", overflowY: "auto" }}>
            {response.entities.map((entity, index) => (
              <li key={index} style={{ marginBottom: "6px" }}>
                {entity.text} — <span style={{ color: "#60a5fa" }}>{entity.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GraphView;