import express from "express";
import cors from "cors";
import * as redisClient from "./clients/redisClient.js";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();
const port = process.env.SERVER_PORT || 3300;

// Setup CORS policy
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//   })
// );

app.use(cors());

startRedis();

async function startRedis() {
  await redisClient.init();
  await redisClient.connect();
  console.log(
    `Connected to redis on http://localhost:${process.env.REDIS_PORT}`
  );
}

app.use(express.json());

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Event Scheduler API");
});

app.use("/api/events", eventRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
