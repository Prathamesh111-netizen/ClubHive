FROM node:16-bullseye
RUN apt update && \ 
    apt install -y npm
WORKDIR /app
COPY . .
RUN npm i
EXPOSE 8000
ENTRYPOINT ["npm", "start"]
