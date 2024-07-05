import express from "express";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Event Scheduler API");
});

app.use("/api/events", eventRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
