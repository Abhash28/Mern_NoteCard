const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbconnect");
const postRouter = require("./Router/cardRouter");
const authRouter = require("./Router/authRouter");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const _dirname = path.resolve();
//app main midleware that export everthing in express like listen
app.use(express.json());
app.use(cookieParser());

//enable cros for all origin

//config the dot env file data
dotenv.config();

//connect db
dbConnect();

//routers
app.use("/api/post", postRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server runing on ${PORT}`);
});

//global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "something wenr wrong";
  res.status(status).json({ success: false, message });
});
