# Play with Docker
A project to research about Docker.  
Using resource from https://docs.docker.com/ and some image from Internet.

### Table of contents

1.  [What is Docker?](#what-is-docker)
2.  [Docker architecture and basic concepts](#docker-architecture-and-basic-concepts)
3.  [Why is using Docker?](#why-is-using-docker)
4.  [The most common command lines and objects](#the-most-common-command-lines-and-objects)
5.  [How to using Docker in basically?](#how-to-using-docker-in-basically)
	1. [Basic using concept with dockerizing simple app](#basic-using-concept-with-dockerizing-simple-app)
	2. [Development with multiple services use Docker Volumes/Docker Network/Docker Compose](#development-with-multiple-services-use-docker-volumesdocker-networkdocker-compose)
7.  [What futher?](#what-futher)

### What is Docker?
![image](https://user-images.githubusercontent.com/15383075/171147109-8bff0707-be72-45ae-9c54-aaedf5578f2a.png)

- Docker is an open platform for developing, shipping, and running applications (local -> dev, production).
- Docker based on "Container Technology" -> you can solve the "it works on my machine" headache.
- With Docker, you can manage your infrastructure in the same ways you manage your applications.
- Tech: Docker is written in the Go programming language and takes advantage of several features of the Linux kernel (resource isolation) to deliver its functionality.

### Docker architecture and basic concepts
	
- Architecture:
![image](https://user-images.githubusercontent.com/15383075/170934097-435dd734-491c-4666-8703-42f8654e79d9.png)

- Basic concepts:
	- Docker Deamon
		- Listens for Docker API requests and manages Docker objects such as images, containers, networks, and volumes. A daemon can also communicate with other daemons to manage Docker services.
	- Docker Client
		- Provide the primary primary way that many Docker users interact with Docker (Docker command line)
	- Docker Registry
		- Store and sharing docker images like Docker Hub, gci..
	- Docker Compose
		- A tool that was developed to help define and share multi-container applications. 

### Why is using Docker?
- **Keep it Simple**
	- Docker’s friendly, CLI-based workflow makes building, sharing, and running containerized applications accessible to developers of all skill levels.
	
- **Fast, lightweight and consistent delivery of your applications**
	- Install from a single package to get up and running in minutes. Code and test locally while ensuring consistency between development and production. So saving your setup and config time between defferent environments.
	
	![image](https://user-images.githubusercontent.com/15383075/170947710-b9f8514d-cc60-4c17-a6e0-5717272521ab.png)
	<p align="center"><a href="https://accesto.com/blog/static/b4950fbfb56324ada87c9064046769b1/3c492/docker-explained-5.png">Source Image</a></p>
	
	- Docker’s portability and lightweight nature also make it easy to dynamically manage workloads, scaling up or tearing down applications and services as business needs dictate, in near real time. So suitable for microservices system.
	- Running more workloads on the same hardware. So optimize resouces.
	
	![image](https://user-images.githubusercontent.com/15383075/173300244-71608f7a-9438-4225-827f-6d01562a1212.png)
	<p align="center"><b>Traditional Deployment VS Virtualization VS Container</b></p>

- **Collaborate**
	- Use Certified and community-provided images in your project. Push to a cloud-based application registry and collaborate with team members.


### The most common command lines and objects
- Basic commands:
	- docker image
	- docker container
	- docker build
	- docker run
	- docker stop
	- docker start
	- docker restart
	- docker exec
	- docker logs
	- docker volumn
	- docker network
	- docker-compose up
	- docker-compose down
	- docker-compose stop
	- docker-compose start
	- ...

- Docker common objects
	- Dockerfile
		- A text file define instruction for building an Image
	- Docker Images
		- An image is a read-only template with instructions for creating a Docker container. Often, an image is based on another image, with some additional customization.
	- Docker Containers
		- A container is a runnable instance of an image.
	- Docker Layers
		- Images consist of layers
		- Each layer stores the changes compared to the image it’s based on
		- Layers are used to avoid transferring redundant information and skip build steps which have not changed (Layer cache)
		- All changes made to the running container, such as writing new files, modifying existing files, and deleting files, are written to this thin writable container layer
	![image](https://user-images.githubusercontent.com/15383075/173273962-7e09c389-3056-4b38-a9dd-c0b4400c1ad5.png)

	- Docker Networking
		- Docker networking is primarily used to establish communication between Docker containers and the outside world via the host machine where the Docker daemon is running.
		- Docker supports different types of networks, each fit for certain use cases `bridge` `host` `overlay` `ipvlan` `macvlan`.
		- Bridge network: are best when you need multiple containers to communicate on the same Docker host. <br><br>
		![image](https://user-images.githubusercontent.com/15383075/172403798-c4245ed0-8137-47c0-900c-54311d881d3d.png)
		- Host network: are best when the network stack should not be isolated from the Docker host, but you want other aspects of the container to be isolated. <br><br>
		![image](https://user-images.githubusercontent.com/15383075/172404700-c405156e-09ea-41c6-9c64-80d607e8aebb.png)
		
	- Docker Volumes and Bind Mounts
		- Docker has two options for containers to store files on the host machine (connect specific filesystem paths of the container back to the host machine). so that the files are persisted even after the container stops: *volumes*, and *bind mounts*.
		- Docker provide the *-v or --volume or --mount* flag to setting volumns or bind mounts <br><br>
		![image](https://user-images.githubusercontent.com/15383075/172640756-a9dd4401-dfb4-468a-a8c8-a05a36bfdd07.png)


### How to using Docker in basically?
- **Following some demo below to see how to works with Docker. Let's get started!**
	1. #### Basic using concept with dockerizing simple app
		1. Build an Image form Dockerfile
		2. Run a Container from Image
		3. Share app to server using Docker Hub
		<br>(follow this repo https://github.com/vietnama10/SimpleDockerDemo)
	2. #### Development with multiple services use Docker Volumes/Docker Network/Docker Compose
		1. Clone souce code of this project
		2. Create network: `docker network create playwithdocker`, create volume: `docker create volume mysql-data`
		3. Setup container Mysql
			- Pull offical image from docker hub: `docker pull mysql`
			- Run mysql: `docker run --rm -dit --name mysql-server -e MYSQL_ROOT_PASSWORD=12345 -e MYSQL_DATABASE=playwithdocker --network playwithdocker mysql` <br> Or run with volume `docker run --rm -dit --name mysql-server -v mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=12345 -e MYSQL_DATABASE=playwithdocker --network playwithdocker mysql`
			- Access to mysql-server for create table: `docker exec -it mysql-server mysql -u root -p` -> password 12345  
			`CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255));`  
			`INSERT INTO customers (name, address) VALUES ('Dunzg Lukak', 'Thanh Khe, Da Nang');`
		4. Setup simple NodeJs app connect to MySQL container
			- Explain Dockerfile: https://github.com/vietnama10/playwithdocker/blob/master/Dockerfile
			- Build own image from Dockerfile: `docker build -t node-app:v1.0 .` 
			- Run own app: `docker run --rm  -dit -p 8080:3000 --name customer-service --network playwithdocker node-app:v1.0` <br> Or run with bind mount `docker run --rm  -dit -p 8080:3000 --name customer-service -v "$(pwd)":/app -v /app/node_modules --network playwithdocker node-app:v1.0`
			- Application at: : List -> http://localhost:8080/customers || Create -> http://localhost:8080/customers/create
		5. Setup docker compose to start app in one step (package step 2~4 into one config)
			- Checkout to branch `feature-nodemon_docker_compose`
			- Explain Dockerfile update: https://github.com/vietnama10/playwithdocker/blob/feature-nodemon_docker_compose/Dockerfile
			- Explain file: https://github.com/vietnama10/playwithdocker/blob/feature-nodemon_docker_compose/docker-compose.yml
			- Run `docker-compose up -d` to start up project
			- Application at: : List -> http://localhost:8080/customers  || Create -> http://localhost:8080/customers/create
			- Others command `docker-compose ps -a` , `docker-compose down --rmi local`
	

### What futher?
- CI/CD Pipeline with Jenkins or Github Actions.
- Or Kubernetes
