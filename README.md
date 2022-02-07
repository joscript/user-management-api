## Setup and installation

1. Clone the repo

```
https://github.com/joscript/user-management-api.git
```

2. Create a database

- Database name: userManagement
- If ever your MySql does or doesn't have a password, go to config folder -> config.json then modify the password value. The current password is “12345678”

3. Install npm packages

```
npm install
```

4. Run the server

```
npm run dev

// After running this it will also automatically create the database tables.
```

5. Run the seeder to populate users' table.

```
npx sequelize-cli db:seed:all
```

## API endpoints

- POST - localhost:9001/api/users/login (Login)
- GET - localhost:9001/api/users (Fetch)
- POST - localhost:9001/api/users (Create new user)
- PUT - localhost:9001/api/users (Edit/Update user)
- DELETE - localhost:9001/api/users/:id (Delete single user)
- DELETE - localhost:9001/api/users (Delete multiple user)

## Tesing API's

1. To run API test

```
npm run test
```

2. Testing using Postman

- Login

```
URL = (POST) localhost:9001/api/users/login
Body = {
"userName": "joscript",
"password": "password"
}

```

- Fetch all data

```
URL = (GET) localhost:9001/api/users
```

- Create new user

```
URL = (POST) localhost:9001/api/users
Body = {
    "firstName": "jose",
    "lastName": "rizal",
    "email": "rizal@gmail.com",
    "userName": "rizal",
    "address": "Philippines, Earth",
    "postCode": "3315",
    "contactNumber": "09151975418",
    "password": "password"
}

```

- Edit/Update user

```
URL = (PUT) localhost:9001/api/users
Body = {
    "id": 10,
    "firstName": "Edited_firstName",
    "lastName": "Edited_lastName",
    "email": “edited_email@gmail.com",
    "userName": "edited_email",
    "address": "edited address",
    "postCode": 12345,
    "contactNumber": "09123456789"
}

```

- Delete single user

```
URL = (DELETE) localhost:9001/api/users/:id
```

- Delete multiple user

```
URL = (DELETE) localhost:9001/api/users
Body = {  "userIds" : [71, 72, 73] }

```
