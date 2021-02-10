# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY dist /usr/share/nginx/html

# expose port
EXPOSE $PORT

# run nginx
CMD ["nginx", "-g", "daemon off;"]