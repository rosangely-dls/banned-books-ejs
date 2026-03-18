const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../app.cjs");

chai.use(chaiHttp);
const { expect } = chai;

describe("Books Routes", () => {

    it("should redirect if not authenticated", async () => {
        const res = await chai.request(app).get("/books");
        expect(res).to.have.status(200);
    });
});