// server/config/session.js
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

dotenv.config();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "keyboard_cat", // secret used to sign the session ID cookie
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // session stored in MongoDB
    ttl: 7 * 24 * 60 * 60, // session expires in 7 days
    collectionName: "sessions",
  }),
  cookie: {
    secure: false, // set to true in production with HTTPS
    httpOnly: true,
    sameSite:"lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // same as ttl in ms
  },
});

export default sessionMiddleware;
