function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function buttonPressed(e) {
    const input = e.target.textContent;
    if (isNaN(input)) {
        outputToScreen("");
    } else {
        outputToScreen(e.target.textContent);
    }
}

function outputToScreen(output) {
    const outputBox = document.querySelector('.output-box');
    if (outputBox.textContent === "Calculator" || output === "") {
        outputBox.textContent = output;
    } else {
        outputBox.textContent += output;
    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', buttonPressed);
});

/*const x = 9;
const y = 4;
console.log(add(x,y));
console.log(subtract(x,y));
console.log(multiply(x,y));
console.log(divide(x,y));*/