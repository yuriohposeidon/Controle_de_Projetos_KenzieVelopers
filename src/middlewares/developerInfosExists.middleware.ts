import { NextFunction, Request, Response } from "express";
import { Developers, DevelopersResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

export const developerInfoExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const queryResult: DevelopersResult = await client.query(
    'SELECT * FROM "developerInfos" WHERE "id" = $1',
    [ id ]
  );

  if (queryResult.rowCount) {
    throw new AppError("Developer infos already exists.", 409);
  }

  const foundDeveloper: Developers = queryResult.rows[0];
  res.locals = { ...res.locals, foundDeveloper };

  return next();
};