DROP DATABASE IF exists employee_trackerdb;

CREATE DATABASE employee_trackerdb;

USE employee_trackerdb;

CREATE TABLE department(
id INT(50) not null auto_increment,
name VARCHAR(30) not null,
PRIMARY KEY(id)
);

CREATE TABLE role(
id INT(50) not null auto_increment,
title VARCHAR(30) not null,
salary FLOAT(10,4) not null,
department_id INT(50) not null,
PRIMARY KEY(id)
);

CREATE TABLE employee(
id INT(50) not null auto_increment,
first_name VARCHAR(30) not null,
last_name VARCHAR(30) not null,
role_id INT(50) not null,
manager_id INT(50) null,
PRIMARY KEY(id)
);