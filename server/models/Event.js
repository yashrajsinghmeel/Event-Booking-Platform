// server/models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    date: {
      type: Date,
    },
    price: {
      type: Number,
      required: true,
    },
    location: String,
    image: String,
  },
  { timestamps: true, collection: "Event" }
); // custom collection name in mongoDB database.

const Event = mongoose.model("Event", eventSchema);
export default Event;
