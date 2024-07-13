// scripts/loadRedisData.js
import {
  client as redisClient,
  init,
  connect,
} from "../clients/redisClient.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filename = process.argv[2];
if (!filename) {
  console.error("Filename is required");
  process.exit(1);
}

async function loadData() {
  try {
    await init();
    await connect();

    const filePath = path.join(__dirname, `../backups/${filename}`);
    if (!fs.existsSync(filePath)) {
      console.error("File not found:", filePath);
      process.exit(1);
    }

    const data = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(data);

    for (const [key, value] of Object.entries(jsonData)) {
      await redisClient.json.set(key, ".", value);
    }

    console.log("Data loaded successfully");

    await redisClient.disconnect();
  } catch (err) {
    console.error("Error loading data:", err);
  }
}

loadData();
