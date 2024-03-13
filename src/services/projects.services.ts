import format from "pg-format";
import { Projects } from "../interfaces";
import { client } from "../database";
import { ProjectCreate, ProjectUpdate, ProjectResult } from "../interfaces";

const create = async (payload: ProjectCreate): Promise<Projects> => {
  const queryFormat: string = format(
    'INSERT INTO "projects" (%I) VALUES (%L) RETURNING *',
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: ProjectResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

const retrieve = async (projectId: string): Promise<Projects> => {
  const queryResult: ProjectResult = await client.query(
    `SELECT
    "p"."id" AS "projectId",
    "p"."name" AS "projectName",
    "p"."description" AS "projectDescription",
    "p"."repository" AS "projectRepository",
    "p"."startDate" AS "projectStartDate",
    "p"."endDate" AS "projectEndDate",
    "d"."id" AS "developerId",
    "d"."name" AS "projectDeveloperName"
FROM "projects" AS "p"
LEFT JOIN "developers" AS "d"
    ON "p"."developerId" = "d"."id"
WHERE "p"."id" = $1
`,
    [projectId]
  );
  return queryResult.rows[0];
};

const partialUpdate = async (projectId: string, payload: ProjectUpdate): Promise<Projects> => {
  const queryFormat: string = format(
    'UPDATE "projects" SET (%I) = ROW(%L) WHERE "id" = $1 RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult: ProjectResult = await client.query(queryFormat, [projectId]);

  return queryResult.rows[0];
};

export default { create, retrieve, partialUpdate };
