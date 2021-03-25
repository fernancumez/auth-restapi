import { Request, Response } from "express";

export const welcome = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    return res.status(200).json({ message: "Hello world!" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
