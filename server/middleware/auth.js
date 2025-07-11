// server/middleware/auth.js
export const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next(); // move on if logged in
  } else {
    res.status(401).json({ message: "Unauthorized. Please log in." });
  }
};
