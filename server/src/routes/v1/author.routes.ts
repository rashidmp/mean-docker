import { Router } from 'express';
import {
  createAuthor,
  deleteAuthor,
  getAllAuthor,
  getAuthor,
  updateAuthor,
} from '../../controllers/author.controller';
import { schema, validateJoi } from '../../middleware/ValidateSchema';

const app: Router = Router();

app.post('/create', validateJoi(schema.author.create), createAuthor);
app.get('/get', getAllAuthor);
app.get('/get/:authorId', getAuthor);
app.patch('/update/:authorId', validateJoi(schema.author.update), updateAuthor);
app.delete('/delete/:authorId', deleteAuthor);

export const authorRouter = app;
