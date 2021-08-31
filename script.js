let displayNum1 = '';
let displayNum2 = '';
let num1 = null;
let num2 = null;
let displayText;
let operatorVal = null;
const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');
const outputText = document.querySelector('.output-text');
const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const absoluteValue = document.getElementById('absolute-value');
const decimal = document.getElementById('decimal');
const equals = document.getElementById('equals');


const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const multiply = function(a, b) {
	return a * b;
};

const divide = function(a, b) {
	return a / b;
};

const operate = function(operator, a, b) {
	switch(operator) {
		case '÷':
			num1 = divide(a, b);
			break;
		case '×':
			num1 = multiple(a, b);
			break;
		case '-':
			num1 = subtract(a, b);
			break;
		case '+':
			num1 = add(a, b);
			break;
	}
	
	operatorVal = null;
	displayNum1 = num1.toString();
	displayNum2 = '';
	num2 = null;
};

numbers.forEach((button) => {
	button.addEventListener('click', () => {
		if (num1 === null) {
			displayNum1 += button.textContent;
			outputText.textContent = `${displayNum1}`;
		} else if (num1 !== null && num2 === null) {
			displayNum2 += button.textContent;
			outputText.textContent = `${displayNum1} ${operatorVal} ${displayNum2}`;
		}
	});
});

operators.forEach((button) => {
	button.addEventListener('click', () => {
		if (num1 === null) {
			num1 = Number(displayNum1);
		} else if (num2 === null && displayNum2.length > 0) {
			num2 = Number(displayNum2);
			operate(operatorVal, num1, num2);
		}
		
		operatorVal = button.textContent;
		outputText.textContent = `${displayNum1} ${operatorVal}`;
	});
});
