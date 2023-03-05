const result = document.getElementById("results");
const digits = document.getElementsByClassName("digit");
const operators = document.getElementsByClassName("op");
const calfunc = document.getElementsByClassName("calfunction");
const eq = document.getElementById("=");

let displayValue = 0;
let value1 = 0;
let value2 = 0;
let finalResult = 0;
let lastOp = "";
let equalsPressed = false;

result.innerText = displayValue;
// TODO : Handle chaining of values

/*

Without pressing =
1. enter a number - Store as displayValue, show on results inner text
2. push an operator - Move display value into value1 -> store operator in lastOp, Change display value to lastOp, result inner text becomes operator
3. reset display value to 0
4. enter another number - store in display value
4. push another operator - store display value in value2, reset display value to 0, calculate the result
    


*/

// Get digits
for (const digit of digits) {
  digit.addEventListener("click", (e) => {
    if (displayValue == 0) {
      displayValue = e.target.id;
      result.innerText = displayValue;
    } else {
      displayValue += e.target.id;
      result.innerText = displayValue;
    }
  });
}

// Function buttons
for (const fun of calfunc) {
  fun.addEventListener("click", (e) => {
    if (e.target.id == "clear") {
      displayValue = 0;
      lastOp = "";
      value1 = 0;
      value2 = 0;
      finalResult = 0;
      result.innerText = displayValue;
    }
  });
}

// operator actions
for (const op of operators) {
  op.addEventListener("click", (e) => {
    if (equalsPressed == false) {
      if (value1 == 0) {
        value1 = displayValue;
        displayValue = e.target.id;
        lastOp = displayValue;
        result.innerText = displayValue;
        displayValue = 0;
      } else if (value1 != 0) {
        value2 = displayValue;
        displayValue = 0;
        result.innerText = value2;
        finalResult = getResult(value1, lastOp, value2);
        lastOp = e.target.id;
        displayValue = finalResult;
        result.innerText = displayValue;
        value2 = 0;
        value1 = displayValue;
        displayValue = 0;
      }
    }
  });
}

eq.addEventListener("click", (e) => {
  if (value2 == 0) {
    value2 = displayValue;
    displayValue = 0;
    finalResult = getResult(value1, lastOp, value2);
    displayValue = finalResult;
    value1 = 0;
    value2 = 0;
    finalResult = 0;

    result.innerText = displayValue;
  } else {
    finalResult = getResult(value1, lastOp, value2);
    result.innerText = finalResult;
    value2 = 0;
    value1 = finalResult;
    displayValue = 0;
    finalResult = 0;
  }
});

// Get results when we have two numbers and an operation
function getResult(value1, operator, value2) {
  switch (operator) {
    case "+":
      return +value1 + +value2;
    case "-":
      return value1 - value2;
    case "/":
      if (value1 == 0 || value2 == 0) {
        return "Zero Error";
      }
      return value1 / value2;
    case "*":
      return value1 * value2;
  }
}
