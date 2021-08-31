let displayNum1;
let displayNum2;
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
