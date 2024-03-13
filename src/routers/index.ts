import developerRouter from "./developer.router";
import projectsRouter from "./projects.router";
import { preferredOSExists } from "../middlewares/developerOsExists.middleware";

export { developerRouter, projectsRouter, preferredOSExists };
