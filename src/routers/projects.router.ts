import { Router } from "express";
import { projectsControllers } from "../controllers";
import { developerIdExists, projectsIdExists } from "../middlewares";

const projectsRouter: Router = Router();

projectsRouter.post("/", developerIdExists, projectsControllers.create);

projectsRouter.use("/:id", projectsIdExists);

projectsRouter.get("/:id", projectsControllers.retrieve) 

projectsRouter.patch("/:id", developerIdExists ,projectsControllers.partialUpdate);

export default projectsRouter;