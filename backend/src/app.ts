import express from "express";
import errorHandler from "./middleware/errorHandler";
import logger from "./middleware/logger";
import cafeRoutes from "./routes/cafeRoutes";
import employeeRoutes from "./routes/employeeRoutes";

const app = express();

app.use(express.json());
app.use(logger);

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use('/cafes', cafeRoutes);
app.use('/employees', employeeRoutes);

app.use(errorHandler);

export default app;
