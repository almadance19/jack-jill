"use client";

import { useState } from "react";


export default function ScannerInput() {
  const [subjectID, setSubjectID] = useState("");
  const [response, setResponse] = useState("");

  const handleScan = async () => {
    const res = await fetch("/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subjectID, className: "Bachata Beginners" }),
    });
    const data = await res.json();
    setResponse(data.message);
    setSubjectID("");
  };

  return (
    <div>
      <input
        autoFocus
        value={subjectID}
        onChange={(e) => setSubjectID(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleScan()}
        placeholder="Scan QR or enter ID"
        className="border p-2 w-full"
      />
      <p className="mt-2">{response}</p>
    </div>
  );
}
