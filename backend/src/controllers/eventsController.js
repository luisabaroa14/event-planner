import { client as redisClient } from "../clients/redisClient.js";

// Get all events
export const getEvents = async (req, res) => {
  try {
    const reply = await redisClient.json.get("events");

    if (reply) {
      res.json(reply);
    } else {
      res.json({ message: "No events found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const newEvent = req.body;

    // Retrieve existing events
    const response = await redisClient.json.get("events");

    const events = response || [];

    // Add the new event to the list
    events.push(newEvent);

    // Save the updated events list back to Redis
    await redisClient.json.set("events", ".", events);

    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
