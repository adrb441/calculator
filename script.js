function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, op, num2) {
    if (num2 === null) return num1;
    if (op === '+') {
        return add(num1, num2);
    } else if (op === '-') {
        return subtract(num1, num2);
    } else if (op === '*') {
        return multiply(num1, num2);
    } else if (op === '/') {
        return divide(num1, num2);
    }
}

function getScreenData() {
    const data = document.querySelector('.output');
    return parseFloat(data.textContent);
}

function clearScreen() {
    const screen = document.querySelector('.output');
    screen.textContent = '';
}

function fullClear() {
    clearScreen();
    firstNumber = '';
    secondNumber = '';
    currentNumber = '';
    operator = '';
    nextOperator = '';
    lastButtonPressed = '';
}

function evaluate(input) {
    secondNumber = currentNumber;
    if (divideByZeroCheck(input)) {
        return;
    } else {
        const result = operate(firstNumber, operator, secondNumber);
        clearScreen();
        printToScreen(result);
        firstNumber = result;
        secondNumber = '';
    }
    if (input === '=') {
        operator = '';
    } else {
        operator = nextOperator;
    }
    nextOperator = '';
}

function divideByZeroCheck(input) {
    if (secondNumber === 0 && operator === '/') {
        fullClear();
        printToScreen("ERROR '/' by '0'");
        lastButtonPressed = input;
        return true;
    }

    return false;
}

function handleOperation(input) {
    enableButton('decimal');
    if (input === 'C') {
        fullClear();
    } else if (input === '=') {
        if (!firstNumber || !operator || isNaN(lastButtonPressed)) {
            lastButtonPressed = input;
            return;
        }
        evaluate(input);
    } else {
        if (!operator) {
            operator = input;
        } else {
            nextOperator = input;
        }
        if (!firstNumber) {
            firstNumber = currentNumber;
        } else if (nextOperator) {
            evaluate(input);
        }
    }
    lastButtonPressed = input;
}

function handleNumber(input) {
    if (isNaN(lastButtonPressed) && lastButtonPressed != '.') {
        clearScreen();
        if (lastButtonPressed === '=') {
            firstNumber = '';
        }
    }
    printToScreen(input);
    currentNumber = getScreenData();
    if (input === '.') {
        lastButtonPressed = 0;
    } else {
        lastButtonPressed = input;
    }
}

function buttonPressed(e) {
    const input = e.target.textContent;
    if (input === '.') {
        disableButton('decimal');
    }
    if (isNaN(input) && input !== '.') {
        handleOperation(input);
    } else {
        handleNumber(input);
    }
}

function disableButton(button) {
    const btn = document.querySelector('.' + button);
    btn.disabled = true;
}

function enableButton(button) {
    const btn = document.querySelector('.' + button);
    btn.disabled = false;
}

function printToScreen(output) {
    const outputBox = document.querySelector('.output');
    if (outputBox.textContent === "Calculator" || output === "") {
        outputBox.textContent = output;
    } else {
        outputBox.textContent += output;
    }
}

let currentNumber = '';
let firstNumber = '';
let secondNumber = '';
let operator = '';
let nextOperator = '';
let lastButtonPressed = '';
let needToClear = false;

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', buttonPressed);
});