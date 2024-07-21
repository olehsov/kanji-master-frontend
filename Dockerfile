FROM node:latest AS ngbuilder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
#RUN npm run test
RUN npm run build


FROM nginx:1.16.0-alpine
COPY --from=ngbuilder /app/dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

