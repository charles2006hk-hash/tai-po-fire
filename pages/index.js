import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [householdId, setHouseholdId] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    // 模擬登入
    if (householdId.trim() === "") return alert("請輸入戶號");
    // 記錄 session
    sessionStorage.setItem("householdId", householdId);
    router.push("/report");
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '3rem' }}>
      <h1>宏福苑火災報平安系統登入</h1>
      <input
        type="text"
        placeholder="輸入戶號 (如 A0101)"
        value={householdId}
        onChange={e => setHouseholdId(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
      />
      <button onClick={handleLogin} style={{ marginTop: "1rem", width: "100%" }}>
        登入
      </button>
    </div>
  );
}
