import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function BuildingMapLogin() {
  const [selectedBuilding, setSelectedBuilding] = useState("宏昌閣");
  const [householdId, setHouseholdId] = useState("");
  const router = useRouter();

  const buildings = ["宏昌閣", "宏福閣", "宏輝閣", "宏樂閣", "宏寧閣"];

  const handleSeatClick = (building, floor, unit) => {
    const id = `${building}-${floor}${unit}`;
    setHouseholdId(id);
    sessionStorage.setItem("householdId", id);
    sessionStorage.setItem("building", building);
    router.push("/report");
  };

  // 獲取單位狀態（模擬）
  const getUnitStatus = (building, floor, unit) => {
    const seatId = `${building}-${floor}${unit}`;
    // 這裡可以從API獲取真實狀態
    return "unknown";
  };

  return (
    <div style={{ 
      padding: "1rem", 
      maxWidth: "100vw", 
      margin: "0 auto",
      minHeight: "100vh",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* ✅ iPhone 優化：響應式標題 */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem", padding: "0 1rem" }}>
        <h1 style={{ 
          fontSize: "clamp(20px, 5vw, 28px)", 
          color: "#d32f2f", 
          margin: "0.5rem 0",
          lineHeight: 1.2 
        }}>🛑 宏福苑火災報平安系統</h1>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>請選擇您的住戶位置</p>
      </div>
      
      {/* 大廈選擇 */}
      <div style={{ marginBottom: "1.5rem", padding: "0 1rem", textAlign: "center" }}>
        <label style={{ fontSize: "16px", marginRight: "0.5rem" }}>🏢 大廈：</label>
        <select 
          value={selectedBuilding} 
          onChange={(e) => setSelectedBuilding(e.target.value)}
          style={{ 
            padding: "0.8rem", 
            fontSize: "16px", 
            borderRadius: "8px",
            border: "2px solid #ddd",
            minWidth: "140px",
            background: "white"
          }}
        >
          {buildings.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* 樓層地圖 */}
      <div style={{ display: "grid", gap: "1rem", justifyContent: "center", padding: "0 1rem" }}>
        {[30, 20, 10, 1].map(floor => (
          <FloorMap 
            key={floor}
            floor={floor}
            building={selectedBuilding}
            onSeatClick={handleSeatClick}
            getUnitStatus={getUnitStatus}
          />
        ))}
      </div>
      
      {/* 圖例 - iPhone 優化 */}
      <div style={{ 
        marginTop: "1.5rem", 
        padding: "1rem", 
        textAlign: "center", 
        fontSize: "14px",
        background: "#f8f9fa",
        borderRadius: "12px"
      }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", minWidth: "100px" }}>
            <div style={{ width: "20px", height: "20px", background: "#4CAF50", marginRight: "0.5rem", borderRadius: "4px" }}></div>
            ✅ 已報平安
          </div>
          <div style={{ display: "flex", alignItems: "center", minWidth: "100px" }}>
            <div style={{ width: "20px", height: "20px", background: "#f44336", marginRight: "0.5rem", borderRadius: "4px" }}></div>
            🚨 需要求助
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "20px", height: "20px", background: "#9e9e9e", marginRight: "0.5rem", borderRadius: "4px" }}></div>
            ❓ 未回報
          </div>
        </div>
      </div>

      {/* 管理員入口 */}
      <div style={{ 
        marginTop: "2rem", 
        padding: "1rem", 
        textAlign: "center",
        borderTop: "1px solid #eee"
      }}>
        <a href="/admin" style={{ 
          color: "#1976d2", 
          textDecoration: "none", 
          fontSize: "14px",
          fontWeight: "500"
        }}>
          🔧 管理後台登入
        </a>
      </div>
    </div>
  );
}

function FloorMap({ floor, building, onSeatClick, getUnitStatus }) {
  const unitsPerFloor = floor === 30 || floor === 20 ? 8 : 10;
  
  return (
    <div style={{ maxWidth: "100%" }}>
      <h3 style={{ 
        textAlign: "center", 
        marginBottom: "1rem", 
        fontSize: "clamp(16px, 4vw, 20px)",
        color: "#333"
      }}>{building} {floor}樓</h3>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: `repeat(${unitsPerFloor}, 48px)`, 
        gap: "3px", 
        justifyContent: "center",
        background: "#f0f0f0",
        padding: "12px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        maxWidth: "100%",
        overflowX: "auto"
      }}>
        {Array.from({ length: unitsPerFloor }, (_, unit) => {
          const seatId = `${building}-${floor.toString().padStart(2, '0')}${unit.toString().padStart(2, '0')}`;
          const status = getUnitStatus(building, floor, unit + 1);
          return (
            <AnimatedSeat 
              key={seatId}
              id={seatId}
              status={status}
              onClick={() => onSeatClick(building, floor, unit + 1)}
            />
          );
        })}
      </div>
    </div>
  );
}

// ✅ 新增動畫效果的 Seat 組件
function AnimatedSeat({ id, status, onClick }) {
  const getColor = () => {
    if (status === "SAFE") return "#4CAF50";
    if (status === "NEED_HELP") return "#f44336";
    return "#9e9e9e";
  };

  return (
    <div
      style={{
        width: "42px",
        height: "42px",
        background: getColor(),
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "11px",
        fontWeight: "bold",
        color: "white",
        cursor: "pointer",
        border: "2px solid #fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: "translateY(0)",
        userSelect: "none",
        position: "relative",
        overflow: "hidden"
      }}
      title={`點擊進入 ${id}`}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.transform = "scale(1.1) translateY(-4px)";
        e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
      }}
      onTouchStart={(e) => {
        e.target.style.transform = "scale(1.05)";
      }}
      onTouchEnd={(e) => {
        e.target.style.transform = "scale(1.1) translateY(-4px)";
      }}
    >
      <div style={{
        position: "absolute",
        top: "2px",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "10px",
        animation: "pulse 2s infinite"
      }}>
        ✨
      </div>
      <span>{id.split('-').pop()}</span>
    </div>
  );
}
