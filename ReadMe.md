# System Design Capstone
Question and Answers API

<!-- Tech Stack -->
## Tech Stack
Node || Express || PostgreSQL || NGINX || JEST || DOCKER

<!-- ABOUT THE PROJECT -->
## About The Project

The objective of the System Design Capstone was to build out the API to support an existing Atelier e-commerce application. The goal is to replace the existing API with a back end system that can support the full data set for the project in the correct data format and can scale to meet the demands of production traffic, transforming a monolithic architecture project to a scalable microservice architecture.

I was in charge of one of the services, Questions and Answers, that make up the full API. The database was designed using PostgreSQL and server was designed using Express. The application was then deployed using Docker and Amazon Web Services and scaled to support (a minimum of) 100 requests per second, error rate of less than 1%, and latency of less than 2000 ms, on EC2 using a t2.micro instance.

Objectives
* Design and multiple database options (PostgreSQL and MongoDB) to analyze and compare, selecting one database option
* Transform the existing application data and load it into the database by performing an ETL Process
* Design and build an API server to provide data to the client in the format specified by the API documentation
* Optimize your individual service by analyzing query times and server responses by stress testing with k6
* Deploy your service and integrate it successfully with the e-commerce web application
* Measure and improve the performance of your service at scale by stress testing with loader.io
* Work as a team and scale your application's architecture to support loads up to tens of thousands of requests per second.
### Built With
* [Node](https://nodejs.org/en/) - Node.js provides an asynchronous event-driven runtime environment for building scalable network applications
* [Express](https://expressjs.com/) - Express for routing and server building
* [PostgreSQL](https://www.postgresql.org/) - PostgreSQL for open source database
* [NGINX](https://www.nginx.com/) - NGINX for load balancing
* [loader.io](https://loader.io/) - Loader.io for stress testing

## Endpoints
GET /qa/questions - Retrieves a list of questions for a particular product.

GET /qa/questions/:question_id/answers - Returns answers for a given question.

POST /qa/questions - Adds a question for the given product

POST /qa/questions/:question_id/answers - Adds an answer for the given question

## System Architecture
![System Architecture][system_arch]

## Contact
* Jae Park Lee https://www.linkedin.com/in/jaeparklee/

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[system_arch]: system_arch2.png![system_arch2]
