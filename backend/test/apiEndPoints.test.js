const request = require("supertest");
const { expect } = require("chai");
const app = require("../server");

describe("Pawmise API Endpoints", () => {

  // -------------------------
  // 1. Register
  // -------------------------
  describe("POST /api/register", () => {
    it("should create a new user", async () => {
      const res = await request(app)
        .post("/api/register")
        .send({
          email: "testuser@example.com",
          password: "123456",
          name: "Test User"
        });

      expect(res.status).to.equal(201); // adjust according to your route
      expect(res.body).to.have.property("message");
    });
  });

  // -------------------------
  // 2. Login
  // -------------------------
  describe("POST /api/login", () => {
    it("should login user and return token", async () => {
      const res = await request(app)
        .post("/api/login")
        .send({
          email: "testuser@example.com",
          password: "123456"
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("token");
    });
  });

  // -------------------------
  // 3. Board
  // -------------------------
  describe("GET /api/board", () => {
    it("should return board items", async () => {
      const res = await request(app)
        .get("/api/board");

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array"); // adjust to your schema
    });
  });

  // -------------------------
  // 4. Visits
  // -------------------------
  describe("GET /api/visits", () => {
    it("should return visit logs", async () => {
      const res = await request(app)
        .get("/api/visits");

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array"); // adjust to your schema
    });
  });

});
