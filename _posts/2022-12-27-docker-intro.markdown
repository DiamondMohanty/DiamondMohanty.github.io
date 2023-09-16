---
layout: post
title:  "Docker"
date:   2022-12-27
categories: "deployment-and-infrastructure"
tags: Deployment Infrastructure
author: Diamond Mohanty
excerpt: getting started.
---

## Where Docker Fits In
Consider we have for microservices running serving multiple business logics. These microservices uses different technology stack like JAVA, Node, Flask to achieve the tasks. There could be dependencies for each of the apps. For example, Node app may need Node, Express and Mongoose to run while Java app may need Spring Boot, Oracle and Flyway to run. The diagram below shows a high level view of what docker is trying to do.

![Sample Docker Architecture](/assets/docker/why-docker.jpg "Fig 1: Sample Docker Architecture"){: .img-fluid .mx-auto .d-block}

With docker we can specify the requirements to run a service in a file called as **Dockerfile**. The app and the docker file forms a **Docker Image**. When we want to run the app new can start a new instance of the app using the docker image and docker provides us with a **Container**. This container is a actual service which we can send requests to.

## Why Docker
Docker containers are fully isolated. That means they do not depend on the environment where docker is running. This feature enables the following benefits

### Version Management

![Version Management](/assets/docker/Docker-Benefit-1.jpg "Fig 2: Version Management"){: .img-fluid .mx-auto .d-block}

Suppose we have two Flask applicaitons. One of the application needs Python 2 to run and another need Python 3 to run. To deploy both of them at the same time we need to do a lot of configuration with our environment. We can virtual environments but other languages like Java does not have it. In this kind of scenario, we can create a different docker image for each of the app and they will run independently of each other.

### Working in Teams

![Team Management](/assets/docker/Docker-Benefit-2.jpg "Fig 3: Team Management"){: .img-fluid .mx-auto .d-block}

Consider a Node app developed by the lead developer which he wants to share with the junior developers in the team. The Node app uses Node version 14 while the junior developers have different version of node installed in there workstations. When the lead provides them the node app, they need to configure node version correctly to run the app. With docker, the lead can instead provide the docker image to the developers and the developers can then simply create a docker container and start using the app.

### Operating System Management

![Operating System Management](/assets/docker/Docker-Benefit-3.jpg "Fig 4: Operating System Management "){: .img-fluid .mx-auto .d-block}

We have a application which uses Oracle database to persist data. This application is being developed by multiple developers who are on various operating systems. In development environment, the team does not have a centralized database setup and the developers need to work with local version of Oracle. While it is possible to install Oracle database in linux and windows, Oracle does not provide a solution for macOS. In this case, we can use docker to install Oracle and it will allow us to use it in macOS.

## Software Development Lifecycle

![SDLC](/assets/docker/Docker-Benefit-4.jpg "Fig 5: SDLC "){: .img-fluid .mx-auto .d-block}

We have a Java app which is developed in DEV environment. Now we want to migrate it to TEST environment and later to PROD environment. We can face challenges if all the environments are not in sync. To avoid configuration issues related to environments we can share a docker image accross environments and it will take care of the environment related configurations.

## Continuous Development and Continuous Integration

![CI/CD](/assets/docker/Docker-Benefit-5.jpg "Fig 6: CI/CD "){: .img-fluid .mx-auto .d-block}

Docker integrates nicely with CI/CD practices. When any code is pushed to the central respository we can create container for test stage to run our tests. Once the tests are done, we can create a container for build stage and once all sanity checks are passed we can deploy a container to our actual production server.

## First Dockerized Application


