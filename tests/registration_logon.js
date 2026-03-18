const chai = require("chai");
const chaiHttp = require("chai-http");
const { faker } = require("@faker-js/faker");
const { app } = require("../app.cjs");

chai.use(chaiHttp);
const { expect } = chai;

describe("Auth Pages", () => {

    it("should load register page", async () => {
        const res = await chai.request(app).get("/sessions/register");
        expect(res).to.have.status(200);
    });

    it("should load logon page", async () => {
        const res = await chai.request(app).get("/sessions/logon");
        expect(res).to.have.status(200);
    });
});