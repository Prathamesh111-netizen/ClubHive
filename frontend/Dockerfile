FROM node:16-bullseye as user_builder
WORKDIR /app
COPY . .

RUN apt-get update --fix-missing && \
    apt install -y npm && \
    npm i && \
    npm run build

FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=user_builder /app/out .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
