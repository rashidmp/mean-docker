import { Router } from 'express';
import {
  createBook,
  deleteBook,
  getAllBook,
  getBook,
  updateBook,
} from '../../controllers/book.controller';
import { schema, validateJoi } from '../../middleware/ValidateSchema';

const app: Router = Router();

app.post('/create', validateJoi(schema.book.create), createBook);
app.get('/get', getAllBook);
app.get('/get/:bookId', getBook);
app.patch('/update/:bookId', validateJoi(schema.book.update), updateBook);
app.delete('/delete/:bookId', deleteBook);

export const bookRouter = app;
