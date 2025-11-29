let database = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { householdId, building, status, helpTypes, description, timeSubmitted } = req.body;
    database.push({ 
      householdId, 
      building, 
      status, 
      helpTypes, 
      description, 
      timeSubmitted 
    });
    res.status(200).json({ message: "成功登記狀態" });
  } else if (req.method === "GET") {
    res.status(200).json(database);
  } else {
    res.status(405).json({ error: "方法不被允許" });
  }
}
