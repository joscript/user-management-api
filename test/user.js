const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

// Assertion style
chai.should();

chai.use(chaiHttp);

const randomString = Math.random().toString(36).substr(2, 3);
const randomId = Math.floor(Math.random() * (20 - 10 + 1)) + 10; // between 10 to 20 id

const randomIds = () => {
  let Ids = [];
  for (let index = 0; index < 5; index++) {
    // between 50 to 60 id's
    Ids = [...Ids, Math.floor(Math.random() * (60 - 50 + 1)) + 50];
  }
  return Ids.filter(function (item, position) {
    return Ids.indexOf(item) == position;
  });
};

const userData = {
  firstName: "testFirstName-" + randomString,
  lastName: "testLastName-" + randomString,
  email: "testMail-" + randomString + "@gmail.com",
  userName: "testUserName-" + randomString,
  address: "Earth, MilkyWay Galaxy",
  postCode: "3315",
  contactNumber: "09151975418",
  password: "password",
};
const existingUserData = {
  firstName: "Josua",
  lastName: "Lagat",
  email: "josua.lagat@gmail.com",
  userName: "joscript",
  address: "Isabela, Philippines",
  postCode: 3315,
  contactNumber: "09151975418",
  password: "password",
};

describe("Users API", () => {
  // Test the AUTHENTICATION route
  describe("POST /api/users/login (AUTHENTICATION)", () => {
    it(`It should login user: username = ${existingUserData.userName}, password: ${existingUserData.password} with 200 status code  `, (done) => {
      const credentials = {
        userName: existingUserData.userName,
        password: existingUserData.password,
      };
      chai
        .request(server)
        .post("/api/users/login")
        .send(credentials)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
  });

  // Test the GET route
  describe("GET /api/users (GET ALL USERS)", () => {
    it("It should get all the users with status code 200", (done) => {
      chai
        .request(server)
        .get("/api/users")
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });
    it("It should not get all the users (with wrong URI '/api/users123')", (done) => {
      chai
        .request(server)
        .get("/api/users123")
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  // Test the POST route
  describe("POST /api/users (ADD NEW USER)", () => {
    it(
      "It should create new user with 201 status code | User data: " +
        JSON.stringify(userData),
      (done) => {
        chai
          .request(server)
          .post("/api/users")
          .send(userData)
          .end((error, response) => {
            response.should.have.status(201);
            response.body.should.be.a("object");
            response.body.should.have.property("id");
            response.body.should.have.property("email");
            response.body.should.have.property("password");
            done();
          });
      }
    );
    it(
      "It should not duplicate existing user. | Existing user data: " +
        JSON.stringify(existingUserData),
      (done) => {
        chai
          .request(server)
          .post("/api/users")
          .send(existingUserData)
          .end((error, response) => {
            response.should.have.status(400);
            response.text.should.be.eq("User Already Exists");
            done();
          });
      }
    );
  });

  // Test the PUT route
  describe("PUT /api/users (EDIT/UPDATE A USER)", () => {
    it(
      "It should update user data where 'id = 2' into: " +
        JSON.stringify(userData),
      (done) => {
        chai
          .request(server)
          .put("/api/users")
          .send({ ...userData, id: 2 })
          .end((error, response) => {
            response.should.have.status(200);
            response.body.should.be.a("object");
            response.body.should.have.property("id");
            response.body.should.have.property("email");
            done();
          });
      }
    );
  });

  // Test the DELETE SINGLE route
  describe("DELETE /api/users/:id (DELETE A USER)", () => {
    it(`It should delete user data where 'id = ${randomId}'`, (done) => {
      chai
        .request(server)
        .delete("/api/users/" + randomId)
        .end((error, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  // Test the DELETE MULTIPLE route
  describe("DELETE /api/users (DELETE MULTIPLE USERS)", () => {
    it(`It should delete multiple user data where "id's = ${JSON.stringify(
      randomIds()
    )}"`, (done) => {
      chai
        .request(server)
        .delete("/api/users")
        .send({ userIds: randomIds() })
        .end((error, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
});
