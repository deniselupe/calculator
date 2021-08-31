let operator;
let displayVal = '';
let num1 = 0;
let num2 = 0;
const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');
const outputText = document.querySelector('.output-text');
const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const absoluteValue = document.getElementById('absolute-value');
const decimal = document.getElementById('decimal');
const equals = document.getElementById('equals');


numbers.forEach((number) => {
	number.addEventListener('click', () => {
		displayVal += number.textContent;
		outputText.textContent = displayVal;
		num1 = Number(displayVal);
	});
});

operators.forEach((button) => {
    button.addEventListener('click', () => {
        displayVal += ` ${button.textContent} `;
        outputText.textContent = displayVal;
    });
});
