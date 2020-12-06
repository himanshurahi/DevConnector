const express = require("express");

const app = express();
const mongoose = require("mongoose");
const db = require("./db/db");
const cors = require("cors");

const port = process.env.PORT || 8001;

const UserRoutes = require("./routes/users.routes");
const AuthRoutes = require("./routes/auth.routes");
const ProfileRoutes = require("./routes/profile.routes");
const PostRoutes = require("./routes/post.routes");
const path = require("path");

app.use(cors());

//db connection
db();

app.use(express.json());

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

// app.get("/", (req, res) => {
//   res.send("API Dev Connector");
// });

if (process.env.NODE_ENV == "production") {
  console.log(process.env.NODE_ENV);
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.use("/api/users", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/profile", ProfileRoutes);
app.use("/api/post", PostRoutes);
