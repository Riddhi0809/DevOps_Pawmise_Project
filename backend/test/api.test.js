const request = require("supertest");
const { expect } = require("chai");
const app = require("../server");

describe("API Health Check", () => {
  it("GET / should return 200", async () => {
    const res = await request(app).get("/");

    expect(res.status).to.equal(200);
  });
});
