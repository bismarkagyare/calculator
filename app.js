
let currentValue = "";
let previousValue = "";
let operator = "";

const previousScreen = document.querySelector(".previous-screen");
const currentScreen = document.querySelector(".current-screen");

const equals = document.getElementById("equals");
const decimal = document.getElementById("decimal");

const clearBtn = document.querySelector(".clear-btn");
const deleteBtn = document.querySelector(".delete-btn");

const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");

document.addEventListener("DOMContentLoaded", () => {
  digits.forEach(digit => {
    digit.addEventListener("click", (e) => {
      handleDigit(e.target.textContent);
      currentScreen.textContent = currentValue;
    });
  });

  operators.forEach(op => {
    op.addEventListener("click", (e) => {
      handleOperator(e.target.textContent);
      previousScreen.textContent = previousValue + " " + operator;
      currentScreen.textContent = currentValue;
    });
  });

  clearBtn.addEventListener("click", () => {
    currentValue = "";
    previousValue = "";
    operator = "";
    previousScreen.textContent = currentValue;
    currentScreen.textContent = currentValue;
  });

  equals.addEventListener("click", () => {
    operate();
    previousScreen.textContent = "";
    if (previousValue.length <= 5) {
        currentScreen.textContent = previousValue;
    } else {
      currentScreen.textContent = previousValue.slice(0, 5) + " ...";
    }
  });

  decimal.addEventListener("click", () => {
    handleDecimal();
  });
});

function handleDigit(num) {
  if (currentValue.length <= 5) {
    currentValue += num;
  }
}

function handleOperator(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

function operate(){
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  if (operator === "/") {
    previousValue /= currentValue;
  } else if (operator === "-") {
    previousValue -= currentValue;
  } else if (operator === "+") {
    previousValue += currentValue;
  } else {
    previousValue *= currentValue;
  }

  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
}

function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}

function handleDecimal() {
  if(!currentValue.includes(".")) {
    currentValue += ".";
  }
}
