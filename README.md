## Setup and installation

1. Clone the repo 
```
https://github.com/joscript/user-management-api.git
```
2. Install npm packages 
```
npm install
```
3. Run the server
```
npm run dev
```
* you should see this after 
```
> nodemon server.js

[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` BIGINT NOT NULL auto_increment , `firstName` VARCHAR(255) NOT NULL, `lastName` VARCHAR(255) NOT NULL, `email` VARCHAR(255) NOT NULL, `userName` VARCHAR(255) NOT NULL, `address` VARCHAR(255) NOT NULL, `postCode` INTEGER NOT NULL, `contactNumber` VARCHAR(255) NOT NULL, `password` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `users` FROM `userManagement`
listening on: http://localhost:9001, Server running in development mode
```
4. Then you can test the api endpoints using something like Postman
