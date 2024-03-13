import { Request, Response } from "express";
import { DeveloperRead, Developers } from "../interfaces";
import { developerServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const developer: Developers = await developerServices.create(req.body);
  return res.status(201).json(developer);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const developers: DeveloperRead = await developerServices.read();
  return res.status(200).json(developers);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const developer: Developers = await developerServices.retrieve(req.params.id);
  return res.status(200).json(developer);
};

const partialUpdate = async (req: Request, res: Response): Promise<Response> => {
  const { body } = req;
  const { id } = req.params;

  const developer: Developers = await developerServices.partialUpdate(id, body);
  return res.status(200).json(developer);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  await developerServices.destroy(req.params.id);
  return res.status(204).json();
};

export default { create, read, retrieve, partialUpdate, destroy };
