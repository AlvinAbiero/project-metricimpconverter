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

  suite("Function convertHandler.getUnit(input)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      const input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];

      const expected = [
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
      ];

      input.forEach(function (ele, index) {
        assert.equal(convertHandler.getUnit(ele), expected[index]);
      });
      done();
    });

    test("Unknown Unit Input", function (done) {
      const input = "32gram";
      assert.isNull(convertHandler.getUnit(input));
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function () {
    test("For each Valid Unit Inputs", function (done) {
      const input = ["gal", "L", "mi", "km", "lbs", "kg"];
      const expected = ["L", "gal", "km", "mi", "kg", "lbs"];

      input.forEach(function (ele, index) {
        assert.equal(convertHandler.getReturnUnit(ele), expected[index]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      const input = ["gal", "L", "mi", "km", "lbs", "kg"];
      const expected = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
      ];
      input.forEach(function (ele, index) {
        assert.equal(convertHandler.spellOutUnit(ele), expected[index]);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function () {
    test("Gal to L", function (done) {
      const input = [5, "gal"];
      const expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("L to Gal", function (done) {
      const input = [5, "L"];
      const expected = 1.32086;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Mi to Km", function (done) {
      const input = [5, "mi"];
      const expected = 8.0467;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Km to Mi", function (done) {
      const input = [5, "km"];
      const expected = 3.10686;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Lbs to Kg", function (done) {
      const input = [5, "lbs"];
      const expected = 2.26796;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Kg to Lbs", function (done) {
      const input = [5, "kg"];
      const expected = 11.02312;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
  });
});
