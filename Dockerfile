#Tutorial for Dockerfile
#https://www.youtube.com/watch?v=qp2pgLtb2Cw

#Docs:
#https://docs.docker.com/engine/reference/builder/


#The FROM instruction initializes a new build stage and sets the Base Image for subsequent instructions.
FROM node:alpine

#The WORKDIR instruction sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile.
WORKDIR /usr/src/app

#Copies package json files to ./
COPY package*.json ./

RUN npm install

#Copies from current dir to current dir
COPY . .

#Runs "node index.js"
CMD ["node", "index.js"]

#Commands:

#To build
#docker build . -t itkbot

#To run
#docker run -d --rm itkbot

#Info
#docker ps

#To stop
#docker stop <containerid>