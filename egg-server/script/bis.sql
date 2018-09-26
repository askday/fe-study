-- brew install mysql
-- mysql.server start
-- 重置密码
mysqladmin -u root -p'' password 123
use mysql;
select host,user from user;
Grant all privileges on *.* to 'root'@'%'  with grant option;
create database nsip;
show databases;