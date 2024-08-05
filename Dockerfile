FROM node

WORKDIR /app

COPY . .

RUN npm i -g pnpm 

RUN pnpm install

EXPOSE 3000




# RUN pnpm run start:dev

CMD ["pnpm", "run", "start", ":", "dev"]

