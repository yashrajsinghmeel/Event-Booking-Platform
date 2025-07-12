// server/controllers/eventController.js
import Event from "../models/Event.js";

// @desc    Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all documents
    
    

    res.status(200).json(events); // Return them in the response
    // res.send("API is running...");
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events", error });
  }
};

// @desc    Create a new event
export const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body); // Create a new Event document
    await newEvent.save(); // Save it to MongoDB
    res.status(201).json(newEvent); // Send back the saved event
  } catch (error) {
    res.status(400).json({ message: "Event creation failed", error });
  }
};

/**
 * You cannot send more than one response per request {only one among [res.send(),res.json(),res.end(),etc.]}
 */ 