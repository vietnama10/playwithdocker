# Play with Docker

### Table of contents

1.  [What is Docker?](#what-is-docker)
2.  [Architechture and basic concepts](#architechture-and-basic-concepts)
3.  [Why is using Docker?](#why-is-using-docker)
4.  [How to using Docker in basically?](#how-to-using-docker-in-basically)
5.  [What next?](#what-next)

### What is Docker?
![image](https://user-images.githubusercontent.com/15383075/171147109-8bff0707-be72-45ae-9c54-aaedf5578f2a.png)

-	Docker is an open platform for developing, shipping, and running apps.
-	Docker is the de facto standard to build and share containerized apps – from desktop, to the cloud (local -> dev, prod).
-	With Docker, you can manage your infrastructure in the same ways you manage your applications.
-	With Docker, you can solve the “it works on my machine” headache.
### Architechture and basic concepts:
	
- 	Architechture:
	![image](https://user-images.githubusercontent.com/15383075/170934097-435dd734-491c-4666-8703-42f8654e79d9.png)
	
-	Basic concepts:
	- Dockerfile
	- Docker Image
	- Docker Image layer
	- Docker Container
	- Docker Deamon
	- Docker Engine
	- Docker Client
	- Docker Compose
	- Docker Registry(Hub)

-	Basic commands:
	- docker images
	- docker rmi <image_id>
	- docker ps
	- docker rm <container_id>
	- docker build
	- docker run 
	- docker pull
	- docker push

### Why is using Docker?
-	Keep it Simple
	- Docker’s friendly, CLI-based workflow makes building, sharing, and running containerized applications accessible to developers of all skill levels.
-	Fast, lightweight and consistent delivery of your applications
	- Install from a single package to get up and running in minutes. Code and test locally while ensuring consistency between development and production.
	- Running more workloads on the same hardware

	![image](https://user-images.githubusercontent.com/15383075/170949147-a5e9fe7b-c936-455c-99b0-ad22b3147161.png)
	
	![image](https://user-images.githubusercontent.com/15383075/170947710-b9f8514d-cc60-4c17-a6e0-5717272521ab.png)

-	Collaborate
	- Use Certified and community-provided images in your project. Push to a cloud-based application registry and collaborate with team members.

### How to using Docker in basically?
-	### Following some demo below to see, how it's works and how to uses. Let's get started!
	1. Simple using docker for containerizing an application
		1. Containerizing a simple html page
		2. Deploy to server using Docker Hub
		(follow this repo https://github.com/vietnama10/SimpleDockerDemo)
	2. Development multiple apps use Docker Compose
		1. Setup container Mysql
			1. Create network: `docker network create playwithdocker`
			2. Pull offical image from docker hub: `docker pull mysql`
			3. Run mysql: `docker run --name mysql-server -e MYSQL_ROOT_PASSWORD=12345 -e MYSQL_DATABASE=playwithdocker --network playwithdocker mysql`
			4. Access to mysql-server for create table: `docker exec -it mysql-server mysql -u root -p 12345`
			5. Create table `CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))`
		3. Setup simple nodejs app connect to Mysql container
			1. Build own image from Dockerfile: `docker build -t node-app:v1.0 .` (explain Dockerfile)
			2. Run own app: `docker run -p 80:3000 --name customer-service --network playwithdocker node-app:v1.0`
			3. See result
		5. Setup docker-compose.yml to start multiple containers
			1. Explain file: https://github.com/vietnama10/playwithdocker/blob/master/docker-compose.yml
		
### What next?
-	CI/CD with Jenkins or Github Actions
