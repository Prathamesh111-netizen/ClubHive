FROM node:16-bullseye
RUN apt update && \ 
    apt install -y npm
WORKDIR /app
COPY . .
RUN npm i
EXPOSE 8000
RUN npm i -g pm2
ENTRYPOINT ["pm2", "start", "server.js", "--no-daemon"]
