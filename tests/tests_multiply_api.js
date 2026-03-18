const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../app.cjs");

chai.use(chaiHttp);
const { expect } = chai;

describe("API Test Example", () => {
    it("should load homepage via API", async () => {
        const res = await chai.request(app).get("/");
        expect(res).to.have.status(200);
    });
});