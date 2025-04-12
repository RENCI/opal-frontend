#############
#  builder  #
#############

FROM node:20.11.1-alpine3.18 AS builder

# create and set working directory
RUN mkdir /app
WORKDIR /app

# env vars
ARG APP_VERSION=latest
ENV APP_VERSION=$APP_VERSION
ENV PATH /app/node_modules/.bin:$PATH

# install deps
COPY package*.json ./
RUN npm ci

# copy in source files
COPY . /app

# build app
RUN npm run build

############
#  server  #
############

FROM nginx:latest
EXPOSE 80
EXPOSE 443
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./server.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
