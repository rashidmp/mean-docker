import { Router } from 'express';
import { authorRouter } from './author.routes';
import { bookRouter } from './book.routes';

const app: Router = Router();

app.use('/author', authorRouter);
app.use('/book', bookRouter);

export const v1 = app;
