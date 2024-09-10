import { NextFunction, Request, Response } from 'express';
import { BookModel, IBook } from '../models/book.model';
import mongoose from 'mongoose';

export const createBook = (req: Request, res: Response, next: NextFunction) => {
  const { title, author }: IBook = req.body;

  const book = new BookModel({
    _id: new mongoose.Types.ObjectId(),
    title,
    author,
  });

  return book
    .save()
    .then((book) => res.status(201).json({ book }))
    .catch((error) => res.status(500).json({ error }));
};

export const getBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return BookModel.findById(bookId)
    .populate('author')
    .then((book) =>
      book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not Found' })
    )
    .catch((error) => res.status(500).json({ error }));
};

export const getAllBook = (req: Request, res: Response, next: NextFunction) => {
  return BookModel.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(500).json({ error }));
};

export const updateBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return BookModel.findById(bookId)
    .then((book) => {
      if (!book) return res.status(404).json({ message: 'Not Found' });

      book.set(req.body);
      return book
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

export const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return BookModel.findByIdAndDelete(bookId)
    .then((book) =>
      book
        ? res.status(201).json({ message: 'Deleted' })
        : res.status(404).json({ message: 'Not Found' })
    )
    .catch((error) => res.status(500).json({ error }));
};
