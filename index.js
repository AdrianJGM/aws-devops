const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔗 Mongo connection string
const url = "mongodb://mongo:27017";
const client = new MongoClient(url);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("devops-db");
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

connectDB();

app.get("/", async (req, res) => {
  if (!db) {
    return res.send("DB not connected yet...");
  }

  const collection = db.collection("visits");

  await collection.insertOne({ time: new Date() });

  const count = await collection.countDocuments();

  res.send(`🚀 App running + Mongo connected! Visits: ${count}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
