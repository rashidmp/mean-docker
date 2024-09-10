import { NextFunction, Request, Response } from 'express';
import { AuthorModel } from '../models/author.model';
import mongoose from 'mongoose';

export const createAuthor = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  const author = new AuthorModel({
    _id: new mongoose.Types.ObjectId(),
    name,
  });

  return author
    .save()
    .then((author) => res.status(201).json({ author }))
    .catch((error) => res.status(500).json({ error }));
};

export const getAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;

  return AuthorModel.findById(authorId)
    .then((author) =>
      author ? res.status(200).json({ author }) : res.status(404).json({ message: 'Not Found' })
    )
    .catch((error) => res.status(500).json({ error }));
};

export const getAllAuthor = (req: Request, res: Response, next: NextFunction) => {
  return AuthorModel.find()
    .then((authors) => res.status(200).json({ authors }))
    .catch((error) => res.status(500).json({ error }));
};

export const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;

  return AuthorModel.findById(authorId)
    .then((author) => {
      if (!author) return res.status(404).json({ message: 'Not Found' });

      author.set(req.body);
      return author
        .save()
        .then((author) => res.status(201).json({ author }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

export const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;

  return AuthorModel.findByIdAndDelete(authorId)
    .then((author) =>
      author
        ? res.status(201).json({ message: 'Deleted' })
        : res.status(404).json({ message: 'Not Found' })
    )
    .catch((error) => res.status(500).json({ error }));
};
