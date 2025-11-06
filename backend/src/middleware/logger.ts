import type { Request, Response, NextFunction } from "express";

function logger(req: Request, _: Response, next: NextFunction) {
  console.log(
    `[${new Date().toLocaleString()} ${req.ip} ${req.method} @ ${req.url}]`
  );
  next();
}

export default logger;