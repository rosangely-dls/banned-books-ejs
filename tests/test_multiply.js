const multiply = require("../utils/multiply")
const { expect } = require("chai");

describe("Multiply function", () => {
    it("should return 42", () => {
        expect(multiply(7,6)).to.equal(42);
    });
});