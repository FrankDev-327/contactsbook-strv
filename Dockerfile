FROM node:latest
WORKDIR /app
COPY ./strv-project/package.json ./
RUN npm install
COPY . /app
CMD ["npm", "start"]
EXPOSE 3000