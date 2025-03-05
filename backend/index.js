import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
dotenv.config({});
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extented: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http//localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


//api 


app.listen(PORT, () => {
    connectDB();
  console.log(`server is running  ${PORT}`);
});
