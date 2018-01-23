FROM node:9.4.0

WORKDIR /app
COPY . /app
RUN docker/build.sh

FROM nginx:1.13.8

COPY docker/fission-ui.conf.template /etc/nginx/conf.d/default.conf.template
COPY docker/run.sh /run.sh
COPY --from=0 /app/build /fission-ui
