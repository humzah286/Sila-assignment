# Use the official Node.js latest image as a parent image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Bundle the app source inside the Docker image
COPY . .

# Install project dependencies
RUN npm install

# Your app binds to port 3000, so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8000

# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "build/src/index" ]
