FROM node:20 AS base

WORKDIR /app

# Copy the entire project structure
COPY . .

# Install dependencies for all workspaces
RUN npm install

FROM base AS development
CMD ["npm", "run", "start:client:dev"]

FROM base AS production
RUN npm run build:client


FROM nginx:alpine AS production-serve
COPY --from=production /app/client/dist/client/browser/ /usr/share/nginx/html

#copying nginx config from local to image
COPY /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
