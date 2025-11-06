import express from "express";
import errorHandler from "./middleware/errorHandler";
import logger from "./middleware/logger";

const app = express();

app.use(express.json());
app.use(logger);

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use(errorHandler);

export default app;
