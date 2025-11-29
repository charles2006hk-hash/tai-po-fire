import { useState, useEffect } from "react";

export default function ReportDetail() {
  const [status, setStatus] = useState("SAFE");
  const [helpTypes, setHelpTypes] = useState([]);
  const [description, setDescription] = useState("");
  const [householdId, setHouseholdId] = useState("");
  const [building, setBuilding] = useState("");

  useEffect(() => {
    const id = sessionStorage.getItem("householdId");
    const bldg = sessionStorage.getItem("building");
    if (!id || !bldg) {
      alert("請先從地圖選擇住戶");
      window.location.href = "/";
      return;
    }
    setHouseholdId(id);
    setBuilding(bldg);
  }, []);

  const helpOptions = [
    { key: "medical", label: "🚑 醫療／藥物" },
    { key: "emotion", label: "💙 情緒支援" },
    { key: "accommodation", label: "🏠 臨時住宿" },
    { key: "supplies", label: "🛒 生活用品" },
    { key: "documents", label: "📄 文件補領" }
  ];

  const toggleHelpType = (key) => {
    setHelpTypes(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const submitReport = async () => {
    const res = await fetch("/api/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        householdId,
        building,
        status,
        helpTypes,
        description,
        timeSubmitted: new Date().toISOString(),
      }),
    });
    if (res.ok) {
      alert("✅ 提交成功！感謝配合");
      window.location.href = "/";
    } else {
      alert("❌ 提交失敗，請重試");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>📍 {building} - {householdId}</h2>
        <button 
          onClick={() => window.location.href = "/"} 
          style={{ marginBottom: "1rem" }}
        >
          ← 返回地圖
        </button>
      </div>

      <div style={{ background: "#f5f5f5", padding: "1.5rem", borderRadius: "12px", marginBottom: "1.5rem" }}>
        <h3>📋 狀態登記</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <label style={status === "SAFE" ? { background: "#4CAF50", color: "white", padding: "0.8rem 1.5rem", borderRadius: "25px" } : {}}>
            <input
              type="radio"
              value="SAFE"
              checked={status === "SAFE"}
              onChange={() => setStatus("SAFE")}
              style={{ marginRight: "0.5rem" }}
            />
            ✅ 本人平安
          </label>
          <label style={status === "MISSING_PERSON" ? { background: "#FF9800", color: "white", padding: "0.8rem 1.5rem", borderRadius: "25px" } : {}}>
            <input
              type="radio"
              value="MISSING_PERSON"
              checked={status === "MISSING_PERSON"}
              onChange={() => setStatus("MISSING_PERSON")}
              style={{ marginRight: "0.5rem" }}
            />
            ⚠️ 有人失聯
          </label>
          <label style={status === "NEED_HELP" ? { background: "#f44336", color: "white", padding: "0.8rem 1.5rem", borderRadius: "25px" } : {}}>
            <input
              type="radio"
              value="NEED_HELP"
              checked={status === "NEED_HELP"}
              onChange={() => setStatus("NEED_HELP")}
              style={{ marginRight: "0.5rem" }}
            />
            🚨 需要協助
          </label>
        </div>
      </div>

      {status === "NEED_HELP" && (
        <div style={{ background: "#fff3cd", padding: "1.5rem", borderRadius: "12px", marginBottom: "1.5rem" }}>
          <h4>幫助類別（可多選）：</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {helpOptions.map(option => (
              <label key={option.key} style={{ 
                padding: "0.8rem 1.2rem", 
                borderRadius: "25px", 
                border: helpTypes.includes(option.key) ? "2px solid #f44336" : "1px solid #ddd",
                cursor: "pointer",
                background: helpTypes.includes(option.key) ? "#fff2f2" : "white"
              }}>
                <input
                  type="checkbox"
                  checked={helpTypes.includes(option.key)}
                  onChange={() => toggleHelpType(option.key)}
                  style={{ marginRight: "0.5rem" }}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginBottom: "2rem" }}>
        <textarea
          rows={4}
          placeholder="補充說明（選填）..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ 
            width: "100%", 
            padding: "1rem", 
            borderRadius: "8px", 
            border: "2px solid #ddd",
            fontSize: "16px",
            resize: "vertical"
          }}
        />
      </div>

      <button 
        onClick={submitReport}
        style={{
          width: "100%",
          padding: "1.2rem",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "12px",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        🚀 提交報平安／求助資料
      </button>
    </div>
  );
}
