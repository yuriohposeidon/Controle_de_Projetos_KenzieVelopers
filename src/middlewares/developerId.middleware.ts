import { NextFunction, Request, Response } from "express";
import { Developers, DevelopersResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

export const developerId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const queryResult: DevelopersResult = await client.query(
    'SELECT * FROM "developers" WHERE "id" = $1',
    [ id ]
  );

  if (!queryResult.rowCount) {
    throw new AppError("Developer not found.", 404);
  }

  const foundDeveloper: Developers = queryResult.rows[0];
  res.locals = { ...res.locals, foundDeveloper };

  return next();
};