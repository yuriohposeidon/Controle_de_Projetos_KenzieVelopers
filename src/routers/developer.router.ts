import { Router } from "express";
import { developerControllers, developerInfosControllers } from "../controllers";
import { developerId, developerIdExists, developerInfoExists, uniqueEmail } from "../middlewares";
import { preferredOSExists } from "../middlewares/developerOsExists.middleware";

const developerRouter: Router = Router();

developerRouter.use("/:id", developerId);

developerRouter.post("", uniqueEmail, developerControllers.create);

developerRouter.get("/:id", developerControllers.retrieve);
developerRouter.patch("/:id", uniqueEmail, developerControllers.partialUpdate);
developerRouter.delete("/:id", developerControllers.destroy);

developerRouter.post(
  "/:id/infos",
  developerId,
  developerInfoExists,
  preferredOSExists,
  developerInfosControllers.create
);

export default developerRouter;
