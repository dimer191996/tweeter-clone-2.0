const express = require("express");

const cookieParser = require("cookie-parser");

require("dotenv").config({ path: "./config/.env" });

//monngo db connect
require("./config/db");

//auth middleware
const { checkUser, checkAuth } = require("./middleware/auth.middleware");

const cors = require("cors");
//express
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//cookies
app.use(cookieParser());

//jwt
app.get("*", checkUser);
app.get("/jwtid", checkAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// connect to the express server
app.listen(process.env.PORT, () => {
  console.log(`lestening port ${process.env.PORT}`);
});
