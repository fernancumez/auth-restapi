import { Request, Response } from "express";

export const special = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
