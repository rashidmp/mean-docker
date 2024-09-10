import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';
import { Logging } from '../lib/logging';
import { IAuthor } from '../models/author.model';
import { IBook } from '../models/book.model';
export const validateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      Logging.error(error);
      return res.status(422).json({ error });
    }
  };
};

export const schema = {
  author: {
    create: Joi.object<IAuthor>({
      name: Joi.string().required(),
    }),
    update: Joi.object<IAuthor>({
      name: Joi.string().required(),
    }),
  },
  book: {
    create: Joi.object<IBook>({
      author: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      title: Joi.string().required(),
    }),
    update: Joi.object<IBook>({
      author: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      title: Joi.string().required(),
    }),
  },
};
