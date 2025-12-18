FROM node:18 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ENV PUBLIC_URL=/kittygram
RUN npm run build

FROM node:18
WORKDIR /app

COPY --from=build /app/build /app/build
CMD ["sh", "-c", "cp -r /app/build/* /static/ && tail -f /dev/null"]
