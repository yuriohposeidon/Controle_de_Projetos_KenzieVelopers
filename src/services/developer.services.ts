import format from "pg-format";
import { Developers } from "../interfaces";
import { client } from "../database";
import { DeveloperCreate, DeveloperRead, DeveloperUpdate, DevelopersResult } from "../interfaces";

const create = async (payload: DeveloperCreate): Promise<Developers> => {
  const queryFormat: string = format(
    'INSERT INTO "developers" (%I) VALUES (%L) RETURNING *',
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: DevelopersResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

const read = async (): Promise<DeveloperRead> => {
  const query: string = 'SELECT * FROM "developers";';
  const queryResult: DevelopersResult = await client.query(query);

  return queryResult.rows;
};

const retrieve = async (id: string): Promise<Developers> => {
  const query: string = `
  SELECT
    "d"."id" AS "developerId",
    "d"."name" AS "developerName",
    "d"."email" AS "developerEmail",
    "i"."id" AS "infosId",
    "i"."developerSince" AS "developerInfoDeveloperSince",
    "i"."preferredOS" AS "developerInfoPreferredOS"
  FROM "developers" AS "d"
  LEFT JOIN "developerInfos" AS "i"
    ON "i"."developerId" = "d"."id"
  WHERE "d"."id" = $1;
  `;

  const queryResult: DevelopersResult = await client.query(query, [id]);

  return queryResult.rows[0];
};

const partialUpdate = async (id: string, payload: DeveloperUpdate): Promise<Developers> => {
  const queryFormat: string = format(
    'UPDATE "developers" SET (%I) = ROW(%L) WHERE "id" = $1 RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult: DevelopersResult = await client.query(queryFormat, [id]);

  return queryResult.rows[0];
};

const destroy = async (id: string): Promise<void> => {
  await client.query('DELETE FROM "developers" WHERE "id" = $1;', [id]);
};

export default { create, read, retrieve, partialUpdate, destroy };