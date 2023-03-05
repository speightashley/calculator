//*******************DOM ELEMENTS *******************************************

const result = document.getElementById("results");
const digits = document.getElementsByClassName("digit");
const operators = document.getElementsByClassName("op");
const calfunc = document.getElementsByClassName("calfunction");
const eq = document.getElementById("=");

//*******************GLOBAL VARIABLES ****************************************
let displayValue = 0;
let value1 = 0;
let value2 = 0;
let finalResult = 0;
let lastOp = "";
let equalsPressed = false;

result.innerText = displayValue;

/* TODO:
1. Handle Negative numbers
2. Handle being able to have a zero before a 0. number
3. Better handling of numbers too big
4. Add Keyboard functionality

*/

/*

Without pressing =
1. enter a number - Store as displayValue, show on results inner text
2. push an operator - Move display value into value1 -> store operator in lastOp, Change display value to lastOp, result inner text becomes operator
3. reset display value to 0
4. enter another number - store in display value
4. push another operator - store display value in value2, reset display value to 0, calculate the result
    
*/
// ***********************EVENT LISTENERS *********************************

// Digit button listeners
for (const digit of digits) {
  digit.addEventListener("click", (e) => {
    if (displayValue == 0) {
      displayValue = e.target.id;
      result.innerText = displayValue;
    } else {
      displayValue += e.target.id;
      result.innerText = cleanDisplay(displayValue);
    }
  });
}

// Calcutlator Function button listeners - Only AC works and acts as reset
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

// Operation button listeners
for (const op of operators) {
  op.addEventListener("click", (e) => {
    handleOperators(e);
  });
}

// Equals button listener
eq.addEventListener("click", (e) => {
  handleEquals();
});

// *****************FUNCTIONS ****************************************

function getResult(value1, operator, value2) {
  /* Get results from values and an operation
Returns a cleaned up answer to an equation
value1: int / float
operator: Takes "+", "-", "/", "*" which is handled by handleOperators()
Cleaned return handled by cleanDisplay()

*/ let result = 0;
  switch (operator) {
    case "+":
      result = +value1 + +value2;
      return cleanDisplay(result.toString());
    case "-":
      result = +value1 - +value2;
      return cleanDisplay(result.toString());
    case "/":
      if (value1 == 0 || value2 == 0) {
        return "Zero Error";
      }
      result = +value1 / +value2;
      return cleanDisplay(result.toString());
    case "*":
      result = +value1 * +value2;
      return cleanDisplay(result.toString());
  }
}

function cleanDisplay(displayValue) {
  /* 
Trim the numbers down if they are too bit for display
displayValue: Int which is converted to string and returned to 9 digits
*/

  if (displayValue.length > 10) {
    reset();
    return `Number Too Long`;
  }
  return displayValue;
}

function handleEquals() {
  /* 
Handle operations when = is used to calculate it
Doesn't use params because we are not handling the event here
Sets global variables of value1, value2 and final result
*/
  if (value1 == 0 && value2 == 0) {
    reset();
    result.innerText = 0;
  } else if (value2 == 0) {
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
}

function handleOperators(e) {
  // Handle Event and Results when chained together
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
}

function reset() {
  // Resets all numbers back to Zero
  displayValue = 0;
  value1 = 0;
  value2 = 0;
  finalResult = 0;
  lastOp = "";
  equalsPressed = false;
}
