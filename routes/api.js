"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function (req, res) {
    const input = req.query.input;

    if (!input) {
      return res.status(400).send("Invalid input");
    }

    // Get the number and unit from the input
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    // Check for invalid number or unit
    if (initNum === null && initUnit === null) {
      return res.json({ error: "invalid number and unit" });
    }

    if (initNum === null) {
      return res.json({ error: "invalid number" });
    }

    if (initUnit === null) {
      return res.json({ error: "invalid unit" });
    }

    // Get the return unit and perform the conversion
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);

    // Get the string representation of the conversion
    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    // Return the result as JSON
    return res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    });
  });
};
