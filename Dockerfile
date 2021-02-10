# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY dist /usr/share/nginx/html

# expose port
EXPOSE $PORT

COPY --from=build-stage /usr/src/app/_site/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'