FROM node:20 AS base

WORKDIR /app

# Copy the entire project structure
COPY . .

# Install dependencies for all workspaces
RUN npm install

FROM base AS development
CMD ["npm", "run", "start:server:dev"]

FROM base AS production
RUN npm run build:server
CMD ["sh", "-c", "npm run start:shared && npm run start:server"]