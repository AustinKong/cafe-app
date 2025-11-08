import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import errorHandler from "./middleware/errorHandler";
import logger from "./middleware/logger";
import { createCafeRouter } from "./routes/cafeRoutes";
import { createEmployeeRouter } from "./routes/employeeRoutes";
import { container } from './container';
import { CafeController } from './controllers/cafeController';
import { EmployeeController } from './controllers/employeeController';

const app = express();

app.set('trust proxy', true);

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}));
app.use(express.json());
app.use(logger);

const dataPath = process.env.DATA_PATH || path.join(__dirname, '../data');
fs.mkdirSync(path.resolve(dataPath), { recursive: true });
app.use('/data', express.static(path.resolve(dataPath)));
app.use(express.static(path.resolve(__dirname, '../public')));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Need to manually do DI because we are not using inversify-express-utils
// Which would more tightly couple us to Inversify
const cafeController = container.get(CafeController);
const employeeController = container.get(EmployeeController);

app.use('/api/cafes', createCafeRouter(cafeController));
app.use('/api/employees', createEmployeeRouter(employeeController));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(errorHandler);

export default app;
