import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}`, override: true });

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_HOST = process.env.MONGO_HOST || '';

const MONGO_URL =
  process.env.MONGO_URL || `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:27017`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

export const config = {
  mongo: {
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};
