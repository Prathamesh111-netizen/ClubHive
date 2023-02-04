FROM node:16-bullseye
RUN apt update && \ 
    apt install -y npm
WORKDIR /app
COPY . .
RUN npm i
EXPOSE 3001
ENTRYPOINT ["npm", "run", "dev"]