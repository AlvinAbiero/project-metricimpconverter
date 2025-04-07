const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Function convertHandler.getNum(input)", function () {
    test("Whole number input", function (done) {
      const input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", function (done) {
      const input = "3.2L";
      assert.equal(convertHandler.getNum(input), 3.2);
      done();
    });

    test("Fractional Input", function (done) {
      const input = "1/2L";
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test("Fractional Input w/ decimal", function (done) {
      const input = "1.5/3L";
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test("Invalid Input (double fraction)", function (done) {
      const input = "3/2/3L";
      assert.isNull(convertHandler.getNum(input));
      done();
    });

    test("No Numerical Input", function (done) {
      const input = "L";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });
});
