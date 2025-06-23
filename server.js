const express = require("express");
const path = require("path");
const app = express();

// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Serve static files from React build with caching
app.use(
  express.static(path.join(__dirname, "build"), {
    maxAge: "1y",
    etag: false,
  })
);

// Handle React routing - must be last
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
