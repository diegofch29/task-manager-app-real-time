const express = require("express");
const path = require("path");
const app = express();

// Serve static files from React build
app.use(express.static(path.join(__dirname, "build")));

// Handle React routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
