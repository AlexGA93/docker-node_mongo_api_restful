# Docker-node_mongo_api_restful
## A simple API restful based in Node.js and Mongodb powered by Docker
This project is a simple API restful built with doocker & docker-compose suporting Node.js and MongoDB images 
## Installation
### First of all, you need to choose if you are going to run it on Windows or Linux
Windows
- Install [Docker Desktop](https://docs.docker.com/docker-for-windows/install/) for Windows
- Verify if Docker is installed checking it version
    ```
    PS C:\Users\username> docker --version
    ```
- ✨Magic  with commands✨ at the wiki (You must read the entire document against read the wiki of the project)

Linux
- Install [Docker Engine](https://docs.docker.com/engine/install/ubuntu/) for Ubuntu/Debian
- You need to uninstall old version (recommendable)
    ```
    sudo apt-get remove docker docker-engine docker.io containerd runc
    ```
- Set up the repository
    ```
    sudo apt-get update -y \
    sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
    ```
- Adding Docker's official GPG key
    ```
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    ```
- Verify if Docker is installed checking it version
    ```
    docker --version
    ```
    or
    ```
    sudo docker --version
    ```
## Steps
1. First of all you need to create your workspace
    ```
    sudo mkdir ~/Desktop/Programming/<project_name>
    ```
2. Access to the new folder
    ```
    cd ~/Desktop/Programming/<project_name>
    ```
    
    -  It's possible that you'll need to change folder's permissions
        ```
        sudo chown -R <user-name> <directory-name>
        ```
3. Create our package.json (it will allow us to install all our dependencies)
    ```
    npm init -y
    ```
    We can specify a single script to init our project with nodemon
    ```
    "scripts": {
    "dev": "nodemon src/server.js"
    }
    ```
4. Let's install our dependencies ( in this case we need a couple of them)
    ```
    npm i express express-validator mongoose dotenv
    npm i nodemon -D
    ```
5. Creating our [Dockerfile](https://docs.docker.com/engine/reference/builder/)
    - If we want a single image we can choose it from 'Docker Hub'. In tis case we need a Node.js Image choosing a single version (in tis case we choose v.14)
    (https://hub.docker.com/_/node)
    ```
    FROM node:14
    ```
    - We need to create inside the container's system our workdir path
    ```
    RUN mkdir -p /usr/src/app
    ```
    - We need to specify the future container's workdir(where our code will be copied inside container's folder's system)
    ```
    WORKDIR /usr/src/app
    ```
    - Copy our package.json and package-lock.json into our container in our current workdir
    ```
    COPY package*.json ./
    ```
    - Run npm command to install our dependencies at once
    ```
    RUN npm install
    ```
    - To group your application source code within the Dockerfile image
    ```
    COPY . ./
    ```
    - Specify our Docker's port(in our case we choose the port 3000)
    ```
    EXPOSE 3000
    ```
    - Define a CMD command to init our app (script in our package.json)
    ```
    CMD ["npm","run","dev"]
    ```
    In the end we'll create a single document with these commands: 
    ```
    FROM node:14
    RUN mkdir -p /usr/src/app
    WORKDIR /usr/src/app
    COPY package*.json ./
    RUN npm install
    COPY . . 
    EXPOSE 3000
    CMD ["npm","run","dev"]
    ```
6. It's neccessary to create our files **'.env'**, **'.gitignore'** and **'.dockerignore'** for a great workflow
7. We have a short docker commands to learn how to deal with a Docker's project:
    - Docker commands
