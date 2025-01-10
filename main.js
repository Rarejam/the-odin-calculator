let operator = '';
let currentValue = '';
let previousValue = '';
document.addEventListener('DOMContentLoaded', function () {
  // let display = document.getElementById('display');
  let currentScreen = document.querySelector('.current-screen');
  let previousScreen = document.querySelector('.previous-screen');
  let numbers = document.querySelectorAll('#num');
  let operators = document.querySelectorAll('#opr');
  let equals = document.querySelector('#equals');
  let clear = document.querySelector('#clear');
  let decimal = document.querySelector('#decimal');
  equals.addEventListener('click', () => {
    if (currentValue != '' && previousValue != '') {
      calculate();
      previousScreen.textContent = '';
      if (previousValue.length <= 5) {
        currentScreen.textContent = previousValue;
      } else {
        currentScreen.textContent = previousValue.slice(0, 5) + '...';
      }
    } else {
      previousScreen.textContent = '';
      currentScreen.textContent = 'SYNTAX ERROR';
    }
  });
  decimal.addEventListener('click', () => {
    addDecimal();
  });
  clear.addEventListener('click', () => {
    currentScreen.textContent = '';
    previousScreen.textContent = '';
    previousValue = '';
    currentValue = '';
    operator = '';
  });
  numbers.forEach((number) =>
    number.addEventListener('click', function (e) {
      handleNum(e.target.textContent);
      currentScreen.textContent = currentValue;
      // currentScreen = parseInt(currentScreen);
      // display.value = Number(display.value);
    })
  );

  operators.forEach((opr) => {
    opr.addEventListener('click', function (e) {
      handleOpr(e.target.textContent);
      previousScreen.textContent = previousValue + '' + operator;
      currentScreen.textContent = currentValue;
      // currentScreen = previousScreen;
    });
  });
});
function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);
  if (operator == '+') {
    previousValue += currentValue;
  } else if (operator == '-') {
    previousValue -= currentValue;
  } else if (operator == '*') {
    previousValue *= currentValue;
  } else if (operator == '/') {
    previousValue /= currentValue;
  }
  previousValue = roundNum(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
  // console.log(previousValue);
}
function handleOpr(opr) {
  operator = opr;
  previousValue = currentValue;
  currentValue = '';
}
function handleNum(num) {
  if (currentValue.length <= 5) {
    currentValue += num;
  }
}
function roundNum(num) {
  return Math.round(num * 1000) / 1000;
}
function addDecimal() {
  if (!currentValue.includes('.')) {
    return (currentValue += '.');
  }
}
