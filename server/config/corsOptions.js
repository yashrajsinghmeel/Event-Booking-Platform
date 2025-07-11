
// const allowedOrigins = [process.env.CLIENT_URL, process.env.ADMIN_URL];


const allowedOrigins = [
  "http://localhost:5174", // User Panel
  "http://localhost:5173", // Admin Panel
];

export const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy violation"));
    }
  },
  credentials: true,
};
