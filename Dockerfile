# uses a base image from node.js
FROM node:14

# creates a work directory
WORKDIR /app

# copies the files package.json & package-lock.json(if exists)
COPY package*.json ./

# installs the dependencies 
RUN npm install

# copies the rest of the application code
COPY . .

# shows which PORT is hearing the app
EXPOSE 8080

# defines the run command
CMD [ "node", "app.js" ]