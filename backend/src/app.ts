import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import logger from "./middleware/logger";
import cafeRoutes from "./routes/cafeRoutes";
import employeeRoutes from "./routes/employeeRoutes";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}));
app.use(express.json());
app.use(logger);

app.use('/data', express.static('data'));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use('/api/cafes', cafeRoutes);
app.use('/api/employees', employeeRoutes);

app.use(errorHandler);

export default app;
