import mongoose from 'mongoose';
import { config } from './config/config';
import { Logging } from './lib/logging';
import express from 'express';
import cors from 'cors';
import { v1 } from './routes/v1';
import { hello } from '@mean-docker/shared';

hello();
const app = express();

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => (Logging.info('Mongo connected successfully.'), startServer()))
  .catch((error) => Logging.error(error));

const startServer = () => {
  app.use((req, res, next) => {
    Logging.info(
      `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );
    res.on('finish', () => {
      Logging.info(
        `Result -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });
    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    cors({
      origin: '*',
      methods: 'PUT, POST, PATCH, DELETE, GET',
    })
  );

  // Routes
  app.use('/api/v1', v1);

  // Health check
  app.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

  // error handling
  app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} - Not found`);
    Logging.error(error);
    res.status(404).json({ message: error.message });
  });

  app.listen(config.server.port, () => {
    Logging.info(`Server is running at http://localhost:${config.server.port}`);
  });
};
