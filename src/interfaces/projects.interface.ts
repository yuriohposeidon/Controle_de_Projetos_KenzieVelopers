import { QueryResult } from "pg";

interface Projects {
  id: number;
  name: string;
  description: string;
  repository: string;
  startDate: Date;
  endDate: Date;
  developerId: number;
}

type ProjectCreate = Omit<Projects, "id">;
type ProjectResult = QueryResult<Projects>;
type ProjectRead = Array<Projects>;
type ProjectUpdate = Partial<ProjectCreate>;

export { Projects, ProjectCreate, ProjectResult, ProjectRead, ProjectUpdate };
