# Play with Docker
A project to research about docker by me.
Using resource from https://docs.docker.com/ and some image about Internet.
### Table of contents

1.  [What is Docker?](#what-is-docker)
2.  [Architechture](#architechture)
3.  [Why is using Docker?](#why-is-using-docker)
4.  [Basic concepts, command lines and common objects](#basic-concepts-command-lines-and-common-objects)
5.  [How to using Docker in basically?](#how-to-using-docker-in-basically)
6.  [What next?](#what-next)

### What is Docker?
![image](https://user-images.githubusercontent.com/15383075/171147109-8bff0707-be72-45ae-9c54-aaedf5578f2a.png)

-	Docker is an open platform for developing, shipping, and running apps – from desktop, to the cloud (local -> dev, production).
-	Docker based on "Container Technology" -> you can solve the “it works on my machine” headache.
-	With Docker, you can manage your infrastructure in the same ways you manage your applications.


### Architechture
	
- 	Architechture:
	![image](https://user-images.githubusercontent.com/15383075/170934097-435dd734-491c-4666-8703-42f8654e79d9.png)


### Why is using Docker?
-	**Keep it Simple**
	- Docker’s friendly, CLI-based workflow makes building, sharing, and running containerized applications accessible to developers of all skill levels.
	
-	**Fast, lightweight and consistent delivery of your applications**
	- Install from a single package to get up and running in minutes. Code and test locally while ensuring consistency between development and production. So saving your setup and config time between defferent environments.
	
	![image](https://user-images.githubusercontent.com/15383075/170947710-b9f8514d-cc60-4c17-a6e0-5717272521ab.png)
	
	- Running more workloads on the same hardware. So optimize resouces.
	- Containers can be easy to create in needed or remove in no needed right at the moment. So suitable for systems with many modules or microservices.
	
	![image](https://user-images.githubusercontent.com/15383075/172748823-ab2fb79f-f133-4b02-ad60-50f6c7a424f4.png)
	<p align="center"><b>Traditional Deployment VS Virtualization VS Container</b></p>

-	**Collaborate**
	- Use Certified and community-provided images in your project. Push to a cloud-based application registry and collaborate with team members.


### Basic concepts, command lines and common objects
-	Basic concepts:
	- Docker Deamon
	- Docker Client
	- Docker Registry(Hub)
	- Dockerfile
	- Docker Layers
	- Docker Container
	- Docker Compose
	- Docker Volumn
	- Docker Network
	- ...

-	Basic commands:
	- docker image
	- docker rmi
	- docker container
	- docker rm
	- docker build
	- docker run 
	- docker logs
	- docker volumn
	- docker network
	- ...

-	Docker layers

![image](https://user-images.githubusercontent.com/15383075/172755517-5d5428b1-82f6-433e-9f87-611995f9f597.png)

-	Docker networking
	- Docker networking is primarily used to establish communication between Docker containers and the outside world via the host machine where the Docker daemon is running.
	- Docker supports different types of networks, each fit for certain use cases `bridge` `host` `overlay` `ipvlan` `macvlan`.
		- Bridge network: are best when you need multiple containers to communicate on the same Docker host. <br>
		![image](https://user-images.githubusercontent.com/15383075/172403798-c4245ed0-8137-47c0-900c-54311d881d3d.png)
		- Host network: are best when the network stack should not be isolated from the Docker host, but you want other aspects of the container to be isolated. <br>
		![image](https://user-images.githubusercontent.com/15383075/172404700-c405156e-09ea-41c6-9c64-80d607e8aebb.png)
		
-	Manage data in Docker
	- Docker has two options for containers to store files on the host machine, so that the files are persisted even after the container stops: *volumes*, and *bind mounts*. <br>
	![image](https://user-images.githubusercontent.com/15383075/172640756-a9dd4401-dfb4-468a-a8c8-a05a36bfdd07.png)
	- Docker provide the *-v or --volume or --mount* flag to setting volumns or bind mounts


### How to using Docker in basically?
-	### Following some demo below to see, how it's works and how to uses. Let's get started!
	1. Simple using docker for containerizing an application
		1. Containerizing a simple html page
		2. Deploy to server using Docker Hub
		(follow this repo https://github.com/vietnama10/SimpleDockerDemo)
	2. Development apps use Docker Volumes/Docker Network/Docker Compose
		1. Create network: `docker network create playwithdocker`
		2. Setup container Mysql
			1. Pull offical image from docker hub: `docker pull mysql`
			2. Run mysql: `docker run --rm -dit --name mysql-server -e MYSQL_ROOT_PASSWORD=12345 -e MYSQL_DATABASE=playwithdocker --network playwithdocker mysql` <br> Or run with volume `docker run --rm -dit --name mysql-server -v mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=12345 -e MYSQL_DATABASE=playwithdocker --network playwithdocker mysql`
			3. Access to mysql-server for create table: `docker exec -it mysql-server mysql -u root -p` -> password 12345
		3. Setup simple nodejs app connect to Mysql container
			1. Build own image from Dockerfile: `docker build -t node-app:v1.0 .` (explain Dockerfile)
			2. Run own app: `docker run --rm  -dit -p 8080:3000 --name customer-service --network playwithdocker node-app:v1.0` <br> Or run with bind mount `docker run --rm  -dit -p 8080:3000 --name customer-service -v "$(pwd)":/app -v /app/node_modules --network playwithdocker node-app:v1.0`
			3. See result
		4. Setup docker-compose.yml to start multiple containers
			1. Explain file: https://github.com/vietnama10/playwithdocker/blob/feature-add_nodemon_compose/docker-compose.yml
			2. `docker-compose up -d` 
			3. Access to mysql-service to create sample data for testing app at: http://localhost:8080/customers
			`CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255));` <br>
			`INSERT INTO customers (name, address) VALUES ('Dunzg Lukak', 'Thanh Khe, Da Nang');`
			4. `docker-compose ps -a` `docker-compose down --rmi local`
	
	

### What next?
-	CI/CD Pipeline with Jenkins or Github Actions.
