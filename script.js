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
let pressedEquals = false;

result.innerText = displayValue;

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

// operator actions
for (const op of operators) {
  op.addEventListener("click", (e) => {
    if (value1 == 0) {
      value1 = displayValue;
      displayValue = 0;
      result.innerText = e.target.id;
      lastOp = e.target.id;
    } else {
      lastOp = e.target.id;
      result.innerText = lastOp;
      displayValue = 0;
    }
  });
}

eq.addEventListener("click", (e) => {
  if (value2 == 0) {
    value2 = displayValue;
    displayValue = 0;
    finalResult = getResult(value1, lastOp, value2);
    value1 = finalResult;
    value2 = 0;
    result.innerText = finalResult;
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
      return value1 / value2;
    case "*":
      return value1 * value2;
  }
}
