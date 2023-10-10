FROM --platform=linux/x86_64 nginx:1.17-alpine

EXPOSE 80

VOLUME /tmp

ARG DIST_DIR=dist/frontend
COPY ${DIST_DIR} /usr/share/nginx/html


