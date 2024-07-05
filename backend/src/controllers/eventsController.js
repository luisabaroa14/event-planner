const events = ["event1", "event2", "event3"];

// Get all events
export const getEvents = (req, res) => {
  res.json(events);
};

// Create a new event
export const createEvent = (req, res) => {
  const event = req.body;
  events.push(event);
  res.status(201).json(event);
};
