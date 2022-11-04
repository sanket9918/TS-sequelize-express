# Express + Sequelize + Postgres (Typescript) Template

This repo can serve as a reference to initialize an Express + Sequelize + Postgres (Typescript) Template.

This particular branch of the project is having an implementation of Kafka. This implementation takes the same params of the create user but instead of user directly creating the user, the Kafka consumer creates the user by taking the data received via the topic (suscribed) and it is invoked using a Publisher.

```/users/produce``` is the concerned route for this.

### To run Postgres (Docker)
```sh
docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=boilerplate --name=postgres -it -d --rm  postgres
```

### To run the Kafka instance 
```sh
docker-compose up
```

### To setup env

A sample env file has bee provided as ```.env.sample``` in the folder.

