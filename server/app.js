import path from "path";
import express from "express";
import { port } from "./config/config.js";
import chalk from "chalk";
import connectToDatabase from "./config/db.js";
import userRouter from "./routers/users.js";
import cookieParser from "cookie-parser";
import postRouter from "./routers/posts.js";
import { customError } from "./utils/customError.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import helmet from "helmet";
connectToDatabase();
const app = express();
const PORT = port || 5000;

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
var whitelist = ["http://localhost:4000", "http://localhost:5173"];
var corsOptionsDelegate = function(req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};
// app.use(cors(corsOptionsDelegate))
app.use(cookieParser());

var apiRateLimit = rateLimit({
    windowMsg: 1 * 60 * 60 * 1000, // 1 minute
    max: 10, // max request
    message: {
        status: false,
        message: "Rate limit exceeded. please try again after 1 minute.",
    },
});
app.use(apiRateLimit);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "/client/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });
} else {
    app.get("/api", (req, res) => {
        res.send("API is running");
    });
}

app.use((req, res, next) => {
    next(
        customError(404, `${req.originalUrl} The requested URL is not available!`)
    );
});

app.use((error, req, res, next) => {
    const status = error.status || 5000;
    const message = error.message || "Internal Server Error";
    res.status(status).send(message);
});

app.listen(PORT, () =>
    console.log(
        `${chalk.green.bold("Server")} is ${chalk.whiteBright.italic.bold(
      "listening"
    )} on port ${chalk.green.bold(PORT)} 🚀`
    )
);