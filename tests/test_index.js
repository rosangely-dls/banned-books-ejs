const { app } = require("../app.cjs");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const { expect } = chai;

describe("Index Page", () => {
    it("should load homepage", async () => {
        const res = await chai.request(app).get("/");
        expect(res).to.have.status(200);
        expect(res.text).to.include("Banned Books");
    });
});

describe("Register Page", () => {
    it("should load register form", async () => {
        const res = await chai.request(app).get("/sessions/register");
    });
});