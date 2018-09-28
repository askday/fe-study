-- brew install mysql
-- mysql.server start
-- 重置密码
mysqladmin -u root -p'' password 123
use mysql;
select host,user from user;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123'
create database nsip;
show databases;
use mysql;
create table net_culture_licence_user(
	 userid int(4) primary key not null auto_increment,
     name varchar(100) not null,
     pwd varchar(100) not null
);