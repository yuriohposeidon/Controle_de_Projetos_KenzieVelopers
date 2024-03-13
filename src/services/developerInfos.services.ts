import format from "pg-format";
import { DeveloperInfos } from "../interfaces";
import { client } from "../database";
import { InfoCreate, InfoRead, InfoResult } from "../interfaces";

const create = async (payload: InfoCreate, ): Promise<DeveloperInfos> => {
  const queryFormat: string = format(
    'INSERT INTO "developerInfos" (%I) VALUES (%L) RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: InfoResult = await client.query(queryFormat);

  return queryResult.rows[0];
};

const read = async (): Promise<InfoRead> => {
  const query: string = 'SELECT * FROM "developerInfos";';
  const queryResult: InfoResult = await client.query(query);
  
  return queryResult.rows;
};

export default { create, read };
