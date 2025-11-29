// ✅ 關鍵：加入這行避免預渲染錯誤
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/status");
      if (res.ok) {
        const data = await res.json();
        setReports(data);
      } else {
        setError("載入資料失敗");
      }
    } catch (err) {
      setError("網絡錯誤");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "SAFE": return "#4CAF50";
      case "NEED_HELP": return "#f44336";
      case "MISSING_PERSON": return "#FF9800";
      default: return "#9e9e9e";
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h1>管理後台 - 住戶狀況</h1>
        <div style={{ fontSize: "24px", color: "#1976d2" }}>載入中...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1400px", margin: "auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "#1976d2", fontSize: "28px" }}>📊 宏福苑火災管理後台</h1>
        <button 
          onClick={fetchReports}
          style={{
            padding: "0.8rem 1.5rem",
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "1rem"
          }}
        >
          🔄 刷新資料
        </button>
        {error && <div style={{ color: "#f44336", marginBottom: "1rem" }}>{error}</div>}
      </div>

      <div style={{ 
        background: "white", 
        borderRadius: "16px", 
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        overflow: "hidden"
      }}>
        <table style={{ 
          width: "100%", 
          borderCollapse: "collapse",
          fontSize: "14px"
        }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>戶號</th>
              <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>大廈</th>
              <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>狀態</th>
              <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>協助類別</th>
              <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>補充說明</th>
              <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid #ddd" }}>提交時間</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: "3rem", textAlign: "center", color: "#666" }}>
                  暫無報平安／求助記錄
                </td>
              </tr>
            ) : (
              reports.map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "1rem", fontWeight: "bold" }}>{r.householdId}</td>
                  <td style={{ padding: "1rem" }}>{r.building || "-"}</td>
                  <td style={{ padding: "1rem" }}>
                    <span style={{
                      background: getStatusColor(r.status),
                      color: "white",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}>
                      {r.status === "SAFE" ? "✅平安" : 
                       r.status === "NEED_HELP" ? "🚨求助" : 
                       r.status === "MISSING_PERSON" ? "⚠️失聯" : "❓未知"}
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>{r.helpTypes?.join(", ") || "-"}</td>
                  <td style={{ padding: "1rem" }}>{r.description || "-"}</td>
                  <td style={{ padding: "1rem" }}>
                    {r.timeSubmitted ? new Date(r.timeSubmitted).toLocaleString("zh-HK") : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
