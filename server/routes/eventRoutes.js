// server/routes/eventRoutes.js
import express from "express";
import { getEvents, createEvent } from "../controllers/eventController.js";

const router = express.Router();

router.get("/getEvents", getEvents);
router.post("/createEvent", createEvent);

export default router;
