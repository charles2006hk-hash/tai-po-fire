// 在生產環境需用真正DB，這裡用臨時記憶體
let database = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { householdId, status, helpTypes, description, timeSubmitted } = req.body;
    if (!householdId || !status || !timeSubmitted) {
      return res.status(400).json({ error: "缺少必填欄位" });
    }
    database.push({ householdId, status, helpTypes, description, timeSubmitted });
    return res.status(200).json({ message: "成功登記狀態" });
  } else if (req.method === "GET") {
    return res.status(200).json(database);
  } else {
    return res.status(405).json({ error: "方法不被允許" });
  }
}
