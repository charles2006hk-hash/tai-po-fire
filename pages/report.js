import { useState, useEffect } from "react";

export default function Report() {
  const [status, setStatus] = useState("SAFE");
  const [helpTypes, setHelpTypes] = useState([]);
  const [description, setDescription] = useState("");
  const [householdId, setHouseholdId] = useState("");

  useEffect(() => {
    const id = sessionStorage.getItem("householdId");
    if (!id) {
      alert("請先登入");
      window.location.href = "/";
      return;
    }
    setHouseholdId(id);
  }, []);

  const helpOptions = [
    { key: "medical", label: "醫療／藥物" },
    { key: "emotion", label: "情緒支援" },
    { key: "accommodation", label: "臨時住宿" },
    { key: "supplies", label: "生活用品" },
    { key: "documents", label: "文件補領" }
  ];

  const toggleHelpType = (key) => {
    setHelpTypes((prev) =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const submitReport = async () => {
    const res = await fetch("/api/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        householdId,
        status,
        helpTypes,
        description,
        timeSubmitted: new Date().toISOString(),
      }),
    });
    if (res.ok) {
      alert("已提交，謝謝配合");
    } else {
      alert("提交失敗");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>住戶狀態登記 - 戶號：{householdId}</h2>
      <div>
        <label>
          <input
            type="radio"
            value="SAFE"
            checked={status === "SAFE"}
            onChange={() => setStatus("SAFE")}
          /> 本人平安
        </label>
        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            value="MISSING_PERSON"
            checked={status === "MISSING_PERSON"}
            onChange={() => setStatus("MISSING_PERSON")}
          /> 有人失聯
        </label>
        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            value="NEED_HELP"
            checked={status === "NEED_HELP"}
            onChange={() => setStatus("NEED_HELP")}
          /> 需要協助
        </label>
      </div>
      {status === "NEED_HELP" && (
        <div style={{ marginTop: "1rem" }}>
          <p>協助類別：</p>
          {helpOptions.map((option) => (
            <label key={option.key} style={{ marginRight: "1rem" }}>
              <input
                type="checkbox"
                checked={helpTypes.includes(option.key)}
                onChange={() => toggleHelpType(option.key)}
              /> {option.label}
            </label>
          ))}
        </div>
      )}
      <div style={{ marginTop: "1rem" }}>
        <textarea
          rows={4}
          placeholder="補充說明"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>
      <button onClick={submitReport} style={{ marginTop: "1rem" }}>
        提交
      </button>
    </div>
  );
}
