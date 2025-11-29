import { useState } from "react";

export const dynamic = "force-dynamic";

export default function AdminLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [config, setConfig] = useState({
    buildings: ["宏昌閣", "宏福閣", "宏輝閣", "宏樂閣", "宏寧閣"],
    floors: { "宏昌閣": [30, 20, 10, 1], "宏福閣": [30, 20, 10, 1] }
  });

  const handleLogin = () => {
    // 簡單密碼：admin123（生產環境請改用真實認證）
    if (password === "admin123") {
      setIsLoggedIn(true);
    } else {
      alert("❌ 密碼錯誤");
    }
  };

  const updateBuildingConfig = (building, floors) => {
    setConfig(prev => ({
      ...prev,
      floors: { ...prev.floors, [building]: floors }
    }));
    alert("✅ 配置已更新");
  };

  if (!isLoggedIn) {
    return (
      <div style={{ 
        padding: "4rem 2rem", 
        maxWidth: "400px", 
        margin: "auto",
        textAlign: "center"
      }}>
        <h2 style={{ color: "#1976d2", marginBottom: "2rem" }}>🔐 管理員登入</h2>
        <input
          type="password"
          placeholder="輸入管理密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "1rem",
            fontSize: "18px",
            borderRadius: "12px",
            border: "2px solid #ddd",
            marginBottom: "1rem",
            boxSizing: "border-box"
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "1rem",
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          登入後台
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "#1976d2" }}>⚙️ 大廈配置管理</h1>
        <button
          onClick={() => {
            setIsLoggedIn(false);
            setPassword("");
          }}
          style={{
            padding: "0.5rem 1rem",
            background: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          登出
        </button>
      </div>

      <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))" }}>
        {/* 大廈列表管理 */}
        <div style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h3>🏢 大廈管理</h3>
          {config.buildings.map((building, index) => (
            <div key={index} style={{ marginBottom: "1.5rem", padding: "1rem", border: "1px solid #eee", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontWeight: "bold" }}>{building}</span>
                <button style={{ padding: "0.3rem 0.8rem", background: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}>
                  刪除
                </button>
              </div>
              <input
                type="text"
                value={building}
                placeholder="大廈名稱"
                style={{ width: "70%", padding: "0.5rem", marginRight: "0.5rem", borderRadius: "4px", border: "1px solid #ddd" }}
              />
              <button style={{ padding: "0.5rem 1rem", background: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                更新
              </button>
            </div>
          ))}
          <div style={{ padding: "1rem", border: "2px dashed #ddd", borderRadius: "8px", textAlign: "center" }}>
            <button style={{ padding: "0.8rem 1.5rem", background: "#1976d2", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
              ➕ 新增大廈
            </button>
          </div>
        </div>

        {/* 樓層配置 */}
        <div style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h3>📋 樓層配置</h3>
          <select 
            style={{ width: "100%", padding: "0.8rem", marginBottom: "1rem", borderRadius: "6px", border: "1px solid #ddd" }}
          >
            {config.buildings.map(b => <option key={b}>{b}</option>)}
          </select>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {[30, 25, 20, 15, 10, 5, 1].map(floor => (
              <label key={floor} style={{ 
                padding: "0.5rem 1rem", 
                borderRadius: "20px", 
                border: "1px solid #ddd", 
                cursor: "pointer",
                background: config.floors?.[selectedBuilding]?.includes(floor) ? "#e3f2fd" : "white"
              }}>
                <input
                  type="checkbox"
                  checked={config.floors?.[selectedBuilding]?.includes(floor) || false}
                  style={{ marginRight: "0.5rem" }}
                />
                {floor}樓
              </label>
            ))}
          </div>
          <button style={{ 
            width: "100%", 
            padding: "1rem", 
            background: "#4CAF50", 
            color: "white", 
            border: "none", 
            borderRadius: "8px", 
            marginTop: "1rem",
            cursor: "pointer",
            fontSize: "16px"
          }}>
            💾 保存樓層配置
          </button>
        </div>
      </div>
    </div>
  );
}
