import mongoose, { Document, Schema } from 'mongoose';

export interface IBook {
  title: string;
  author: string;
}

export interface IBookModel extends IBook, Document {}

export const BookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' },
  },
  {
    versionKey: false,
  }
);

export const BookModel = mongoose.model<IBookModel>('Book', BookSchema);
