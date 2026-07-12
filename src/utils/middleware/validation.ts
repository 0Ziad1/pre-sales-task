
import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodSchema } from "zod";


export const validate = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {

    const data = {
      ...req.body,
      ...req.params,
      ...req.query,
      ...req.file,
    };
    
    const result = schema.safeParse(data);
    
    if (!result.success) {
      return next(result.error);
    }
    next();

  };  