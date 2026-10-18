CREATE DATABASE employee_management_2;

USE employee_management_2;

CREATE TABLE employees(
id  INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(100) NOT NULL ,
email VARCHAR(100)  UNIQUE  NOT NULL ,
department  VARCHAR(100) NOT NULL ,
salary INT  NOT NULL  ,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks(
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT  NOT NULL  ,
  title  VARCHAR(255) NOT NULL ,
  status ENUM("TODO","IN_PROGRESS","COMPLETED") NOT NULL DEFAULT "TODO" ,
  priority ENUM("LOW","MEDIUM","HIGH") NOT NULL DEFAULT "MEDIUM" ,
  due_date DATE  NOT NULL ,
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);



