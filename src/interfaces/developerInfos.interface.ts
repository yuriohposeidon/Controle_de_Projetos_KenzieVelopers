import { QueryResult } from "pg";

interface DeveloperInfos {
  id: number;
  developerSince: Date | null;
  preferredOS: string | null;
  developerId: number;
}

type InfoCreate = Omit<DeveloperInfos, "id">;
type InfoResult = QueryResult<DeveloperInfos>;
type InfoRead = Array<DeveloperInfos>;
type InfoUpdate = Partial<InfoCreate>;

export { DeveloperInfos, InfoCreate, InfoResult, InfoRead, InfoUpdate };
