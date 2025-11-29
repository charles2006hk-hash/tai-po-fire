import { useState } from "react";
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

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "auto" }}>
      <h1>🛑 宏福苑火災報平安系統</h1>
      
      {/* 大廈選擇 */}
      <div style={{ marginBottom: "2rem" }}>
        <label>選擇大廈：</label>
        <select 
          value={selectedBuilding} 
          onChange={(e) => setSelectedBuilding(e.target.value)}
          style={{ marginLeft: "1rem", padding: "0.5rem" }}
        >
          {buildings.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* 樓層地圖 */}
      <div style={{ display: "grid", gap: "1rem", justifyContent: "center" }}>
        {[30, 20, 10, 1].map(floor => (
          <FloorMap 
            key={floor}
            floor={floor}
            building={selectedBuilding}
            onSeatClick={handleSeatClick}
          />
        ))}
      </div>
      
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <div style={{ display: "inline-block", width: "20px", height: "20px", background: "#4CAF50", marginRight: "1rem", borderRadius: "3px" }}></div>
        <span>已報平安</span>
        <div style={{ display: "inline-block", width: "20px", height: "20px", background: "#f44336", margin: "0 1rem", borderRadius: "3px" }}></div>
        <span>需要求助</span>
        <div style={{ display: "inline-block", width: "20px", height: "20px", background: "#ccc", margin: "0 1rem", borderRadius: "3px" }}></div>
        <span>未回報</span>
      </div>
    </div>
  );
}

// 單層樓地圖組件
function FloorMap({ floor, building, onSeatClick }) {
  const unitsPerFloor = floor === 30 || floor === 20 ? 8 : 10;
  
  return (
    <div>
      <h3>{building} {floor}樓</h3>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: `repeat(${unitsPerFloor}, 45px)`, 
        gap: "2px", 
        justifyContent: "center",
        background: "#eee",
        padding: "10px",
        borderRadius: "8px"
      }}>
        {Array.from({ length: unitsPerFloor }, (_, unit) => {
          const seatId = `${building}-${floor.toString().padStart(2, '0')}${unit.toString().padStart(2, '0')}`;
          return (
            <Seat 
              key={seatId}
              id={seatId}
              status="unknown" // 實際應從API取得
              onClick={() => onSeatClick(building, floor, unit)}
            />
          );
        })}
      </div>
    </div>
  );
}

// 單元格組件
function Seat({ id, status, onClick }) {
  const getColor = () => {
    if (status === "SAFE") return "#4CAF50";
    if (status === "NEED_HELP") return "#f44336";
    return "#ccc";
  };

  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        background: getColor(),
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "bold",
        color: "white",
        cursor: "pointer",
        border: "2px solid #ddd",
        transition: "all 0.2s"
      }}
      title={`點擊進入 ${id}`}
      onClick={onClick}
    >
      {id.split('-').pop()}
    </div>
  );
}
