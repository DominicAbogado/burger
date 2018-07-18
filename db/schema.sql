CREATE DATABASE bugers_db;

USE bugers_db;

CREATE TABLE burgers (
    id PRIMARY KEY NOT NULL,
    burger_name VARCHAR(100),
    devoured BOOLEAN
)