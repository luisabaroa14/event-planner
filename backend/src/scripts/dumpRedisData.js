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
  console.error("File name is required");
  process.exit(1);
}

async function dumpData() {
  try {
    await init();
    await connect();

    const keys = await redisClient.keys("*");
    const data = {};

    for (const key of keys) {
      const value = await redisClient.json.get(key);
      if (value) {
        data[key] = value;
      }
    }

    const filePath = path.join(__dirname, `../backups/${filename}`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log("Backup successful:", filePath);

    await redisClient.disconnect();
  } catch (err) {
    console.error("Error dumping data:", err);
  }
}

dumpData();
