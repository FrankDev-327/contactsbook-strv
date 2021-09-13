FROM node:latest
WORKDIR /app
COPY ./srtv-project/package.json ./
RUN npm install
COPY . /app
CMD ["npm", "start"]
EXPOSE 3000