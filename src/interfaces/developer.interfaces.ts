import { QueryResult } from "pg";

interface Developers {
  id: number;
  name: string;
  email: string;
}

type DeveloperCreate = Omit<Developers, "id">;
type DevelopersResult = QueryResult<Developers>;
type DeveloperRead = Array<Developers>;
type DeveloperUpdate = Partial<DeveloperCreate>;

export { Developers, DeveloperCreate, DevelopersResult, DeveloperRead, DeveloperUpdate };
