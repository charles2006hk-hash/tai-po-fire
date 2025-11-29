import { useState } from "react";

export const dynamic = "force-dynamic";

export default function AdminLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("宏昌閣"); // ✅ 新增
  const [config, setConfig] = useState({
    buildings: ["宏昌閣", "宏福閣", "宏輝閣", "宏樂閣", "宏寧閣"],
    floors: { 
      "宏昌閣": [30, 20, 10, 1], 
      "宏福閣": [30, 20, 10, 1],
      "宏輝閣": [30, 20, 10, 1],
      "宏樂閣": [30, 20, 10, 1],
      "宏寧閣": [30, 20, 10, 1]
    }
  });

  const handleLogin = () => {
    if (password === "admin123") {
      setIsLoggedIn(true);
    } else {
      alert("❌ 密碼錯誤");
    }
  };

  const addBuilding = () => {
    const newBuilding = prompt("輸入新大廈名稱：");
    if (newBuilding && !config.buildings.includes(newBuilding)) {
      setConfig(prev => ({
        ...prev,
        buildings: [...prev.buildings, newBuilding],
        floors: { ...prev.floors, [newBuilding]: [30, 20, 10, 1] }
      }));
      alert("✅ 新大廈已新增");
    }
  };

  const updateBuildingName = (oldName, newName) => {
    if (newName && newName !== oldName && !config.buildings.includes(newName)) {
      setConfig(prev => {
        const newFloors = { ...prev.floors };
        newFloors[newName] = newFloors[oldName];
        delete newFloors[oldName];
        
        return {
          ...prev,
          buildings: prev.buildings.map(b => b === oldName ? newName : b),
          floors: newFloors
        };
      });
      alert("✅ 大廈名稱已更新");
    }
  };

  const updateFloors = () => {
    const currentFloors = config.floors[selectedBuilding] || [];
    setConfig(prev => ({
      ...prev,
      floors: { ...prev.floors, [selectedBuilding]: currentFloors }
    }));
    alert("✅ 樓層配置已保存");
  };

  const toggleFloor = (floor) => {
    setConfig(prev => {
      const buildingFloors = prev.floors[selectedBuilding] || [];
      const newFloors = buildingFloors.includes(floor)
        ? buildingFloors.filter(f => f !== floor)
        : [...buildingFloors, floor];
      return {
        ...prev,
        floors: { ...prev.floors, [selectedBuilding]: newFloors }
      };
    });
  };

  if (!isLoggedIn) {
    return (
      <div style={{ 
        padding: "4rem 2rem", 
        maxWidth: "400px", 
        margin: "auto",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}>
        <h2 style={{ color: "#1976d2", marginBottom: "2rem", fontSize: "clamp(24px, 6vw, 32px)" }}>🔐 管理員登入</h2>
        <div style={{ background: "white", padding: "2rem", borderRadius: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
          <input
            type="password"
            placeholder="輸入管理密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "1.2rem",
              fontSize: "18px",
              borderRadius: "12px",
              border: "2px solid #ddd",
              marginBottom: "1.5rem",
              boxSizing: "border-box",
              fontFamily: "inherit"
            }}
          />
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "1.2rem",
              background: "linear-gradient(45deg, #1976d2, #1565c0)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(25,118,210,0.4)"
            }}
          >
            🚀 進入管理後台
          </button>
        </div>
        <p style={{ marginTop: "2rem", fontSize: "14px", color: "#666" }}>預設密碼：admin123</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ 
        textAlign: "center", 
        marginBottom: "2rem", 
        background: "white", 
        padding: "1.5rem", 
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ color: "#1976d2", margin: "0 0 1rem 0", fontSize: "clamp(22px, 5vw, 28px)" }}>⚙️ 大廈配置管理系統</h1>
        <button
          onClick={() => {
            setIsLoggedIn(false);
            setPassword("");
          }}
          style={{
            padding: "0.8rem 1.5rem",
            background: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "500"
          }}
        >
          🚪 登出後台
        </button>
      </div>

      <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr 1fr" }}>
        {/* 大廈列表管理 */}
        <div style={{ 
          background: "white", 
          padding: "2rem", 
          borderRadius: "16px", 
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)" 
        }}>
          <h3 style={{ marginTop: 0, color: "#333" }}>🏢 大廈管理 ({config.buildings.length} 座)</h3>
          <div style={{ maxHeight: "400px", overflowY: "auto", marginBottom: "1.5rem" }}>
            {config.buildings.map((building, index) => (
              <div key={index} style={{ 
                marginBottom: "1rem", 
                padding: "1.2rem", 
                border: "2px solid #e0e0e0", 
                borderRadius: "12px",
                background: "#f8f9fa"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
                  <span style={{ fontWeight: "bold", fontSize: "16px" }}>#{index + 1} {building}</span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    defaultValue={building}
                    placeholder="新名稱"
                    style={{ 
                      flex: 1, 
                      padding: "0.6rem", 
                      borderRadius: "6px", 
                      border: "1px solid #ddd",
                      fontSize: "14px"
                    }}
                    onBlur={(e) => updateBuildingName(building, e.target.value)}
                  />
                  <button 
                    onClick={() => {
                      if (confirm("確定刪除此大廈？")) {
                        setConfig(prev => {
                          const newBuildings = prev.buildings.filter(b => b !== building);
                          const newFloors = { ...prev.floors };
                          delete newFloors[building];
                          return { ...prev, buildings: newBuildings, floors: newFloors };
                        });
                      }
                    }}
                    style={{ 
                      padding: "0.6rem 1rem", 
                      background: "#f44336", 
                      color: "white", 
                      border: "none", 
                      borderRadius: "6px", 
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    🗑️ 刪除
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={addBuilding}
            style={{ 
              width: "100%", 
              padding: "1rem", 
              background: "#4CAF50", 
              color: "white", 
              border: "none", 
              borderRadius: "12px", 
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            ➕ 新增大廈
          </button>
        </div>

        {/* 樓層配置 */}
        <div style={{ 
          background: "white", 
          padding: "2rem", 
          borderRadius: "16px", 
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)" 
        }}>
          <h3 style={{ marginTop: 0, color: "#333" }}>📋 樓層配置 - {selectedBuilding}</h3>
          <select 
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "1rem", 
              marginBottom: "1.5rem", 
              borderRadius: "8px", 
              border: "2px solid #ddd",
              fontSize: "16px"
            }}
          >
            {config.buildings.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "0.8rem", marginBottom: "2rem" }}>
            {[30, 25, 20, 15, 10, 5, 1].map(floor => (
              <label key={floor} style={{ 
                padding: "1rem 0.5rem", 
                borderRadius: "12px", 
                border: `2px solid ${config.floors[selectedBuilding]?.includes(floor) ? "#1976d2" : "#ddd"}`, 
                cursor: "pointer",
                textAlign: "center",
                background: config.floors[selectedBuilding]?.includes(floor) ? "#e3f2fd" : "white",
                transition: "all 0.2s"
              }}
                onClick={() => toggleFloor(floor)}
              >
                <input
                  type="checkbox"
                  checked={config.floors[selectedBuilding]?.includes(floor) || false}
                  onChange={() => toggleFloor(floor)}
                  style={{ 
                    marginRight: "0.5rem", 
                    width: "18px", 
                    height: "18px",
                    accentColor: "#1976d2"
                  }}
                />
                <div>{floor}樓</div>
              </label>
            ))}
          </div>
          
          <button 
            onClick={updateFloors}
            style={{ 
              width: "100%", 
              padding: "1.2rem", 
              background: "linear-gradient(45deg, #4CAF50, #45a049)", 
              color: "white", 
              border: "none", 
              borderRadius: "12px", 
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(76,175,80,0.4)"
            }}
          >
            💾 保存樓層配置
          </button>
          
          <div style={{ marginTop: "1rem", padding: "1rem", background: "#e8f5e8", borderRadius: "8px", fontSize: "14px" }}>
            目前配置：{config.floors[selectedBuilding]?.length || 0} 層
          </div>
        </div>
      </div>

      {/* 統計資訊 */}
      <div style={{ 
        marginTop: "2rem", 
        padding: "1.5rem", 
        background: "#f8f9fa", 
        borderRadius: "12px",
        textAlign: "center"
      }}>
        <h4>📈 系統統計</h4>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
          <div>大廈數量：{config.buildings.length}</div>
          <div>總樓層數：{Object.values(config.floors).reduce((sum, floors) => sum + floors.length, 0)}</div>
        </div>
      </div>
    </div>
  );
}
