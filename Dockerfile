
FROM node:18 AS builder-web
WORKDIR /app
COPY . .
WORKDIR /app/apps/web
RUN npm install
RUN npm run build


FROM node:18 AS builder-api
WORKDIR /app
COPY . .
WORKDIR /app/apps/api
RUN npm install
RUN npm run build


FROM node:18 AS production
WORKDIR /app


COPY --from=builder-web /app/apps/web/dist /app/apps/web/dist  


COPY --from=builder-api /app/apps/api /app/apps/api
WORKDIR /app/apps/api
RUN npm install --production


EXPOSE 3000


CMD ["node", "dist/index.js"] 