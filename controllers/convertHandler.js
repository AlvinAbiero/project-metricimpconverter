function ConvertHandler() {
  this.getNum = function (input) {
    // Extract the numeric part from the input
    let result;
    let numRegex = /[^a-zA-Z]+/;
    let numMatch = input.match(numRegex);

    if (!numMatch) return 1;

    let numStr = numMatch[0];

    // Check for invalid fractions (multiple slashes)
    if ((numStr.match(/\//g) || []).length > 1) return null;

    // Evaluate the number (could be whole number, decimal, or fraction)
    try {
      if (numStr.includes("/")) {
        const [numerator, denominator] = numStr.split("/");
        result = parseFloat(numerator) / parseFloat(denominator);
      } else {
        result = parseFloat(numStr);
      }

      return isNaN(result) ? null : result;
    } catch (error) {
      return null;
    }
  };

  this.getUnit = function (input) {
    // Extract the unit part from the input
    let result;
    let unitRegex = /[a-zA-Z]+$/;
    let unitMatch = input.match(unitRegex);

    if (!unitMatch) return null;

    result = unitMatch[0].toLowerCase();

    // List of valid units
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];

    // Check if unit is valid
    if (!validUnits.includes(result)) return null;

    // Special case for liters (should be returned as 'L')
    return result === "l" ? "L" : result;
  };

  this.getReturnUnit = function (initUnit) {
    // Convert initUnit to lowercase for comparison (except 'L')
    const unit = initUnit.toLowerCase();

    // Define return units for each input unit
    const returnUnits = {
      gal: "L",
      l: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };

    return returnUnits[unit] || null;
  };

  this.spellOutUnit = function (unit) {
    // Convert initUnit to lowercase for comparison (except 'L')
    const unitLower = unit.toLowerCase();

    // Define spelled-out units
    const spelledOut = {
      gal: "gallons",
      l: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };

    return spelledOut[unitLower] || null;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    // Convert unit to lowercase for comparison (except 'L')
    const unit = initUnit.toLowerCase();

    let result;

    // Perform the conversion based on the unit
    switch (unit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        return null;
    }

    // Round to 5 decimal places
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    // Get spelled-out versions of units
    const initUnitSpelled = this.spellOutUnit(initUnit);
    const returnUnitSpelled = this.spellOutUnit(returnUnit);

    // Construct the result string
    return `${initNum} ${initUnitSpelled} converts to ${returnNum} ${returnUnitSpelled}`;
  };
}

module.exports = ConvertHandler;
