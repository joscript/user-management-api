const express = require("express");
const db = require("./models");
const app = express();
const dotenv = require("dotenv");

// routes
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const PORT = process.env.PORT || 9001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// user routes
app.use("/api/users", userRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      `listening on: http://localhost:${PORT}, Server running in ${process.env.NODE_ENV} mode`
    );
  });
});

module.exports = app;
