const puppeteer = require("puppeteer");
const { expect } = require("chai");

describe("UI Test", function () {
    this.timeout(10000);

    it("should open homepage", async () => {
        
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto("http://localhost:3000");

        const title = await page.title();

        expect(title).to.not.be.null;

        await browser.close();
    });
});