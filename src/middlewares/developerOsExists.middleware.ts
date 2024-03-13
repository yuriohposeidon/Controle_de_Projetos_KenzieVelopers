import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const preferredOSExists = async (
  request: Request,
  Response: Response,
  next: NextFunction
): Promise<void> => {
  const preferredOS: string = request.body.preferredOS;

  if (preferredOS !== "Windows" && preferredOS !== "Linux" && preferredOS !== "MacOS") {
    throw new AppError("Invalid OS option.", 400);
  }

  return next();
};

export { preferredOSExists }