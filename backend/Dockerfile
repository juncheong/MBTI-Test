FROM node:11.12
WORKDIR /app/backend
COPY package.json .
RUN npm install
RUN apt-get update && apt-get install -y \
  nano
COPY . .
EXPOSE 5000
CMD [ "npm", "start" ]