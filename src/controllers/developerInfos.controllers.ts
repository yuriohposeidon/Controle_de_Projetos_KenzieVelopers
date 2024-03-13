import { Request, Response } from "express";
import { DeveloperInfos, InfoCreate } from "../interfaces";
import { developerInfoServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const payload: InfoCreate = {
    ...req.body,
    developerId: req.params.id,
    
  };
  const developerInfo: DeveloperInfos = await developerInfoServices.create(payload);
  return res.status(201).json(developerInfo);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const developerInfos: Array<DeveloperInfos> = await developerInfoServices.read();
  return res.status(200).json(developerInfos);
};

export default { create, read };