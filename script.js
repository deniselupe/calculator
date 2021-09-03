const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');
const historyText = document.querySelector('.historical-text');
const outputText = document.querySelector('.output-text');
const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const absoluteValue = document.getElementById('absolute-value');
const decimal = document.getElementById('decimal');
const equals = document.getElementById('equals');
let num1 = null;
let num2 = null;
let tempNum1 = '';
let tempNum2 = '';
let resultVal = null;
let operatorVal = null;


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
			resultVal = divide(a, b);
			break;
		case '×':
			resultVal = multiple(a, b);
			break;
		case '-':
			resultVal = subtract(a, b);
			break;
		case '+':
			resultVal = add(a, b);
			break;
	}
	
	historyText.textContent = `${tempNum1} ${operatorVal} ${tempNum2} =`;
	outputText.textContent = `${resultVal.toString()}`;
	num1 = resultVal;
	tempNum1 = resultVal.toString();
	num2 = null;
	tempNum2 = '';
};

numbers.forEach((button) => {
	button.addEventListener('click', () => {
		if (operatorVal === null) {
			num1 = null;
			tempNum1 = '';
			resultVal = null;
			historyText.textContent = '';
		}
		
		if (num1 === null) {
			tempNum1 += button.textContent;
			outputText.textContent = `${tempNum1}`;
		} else if (num1 !== null && num2 === null) {
			tempNum2 += button.textContent;
			outputText.textContent = `${tempNum2}`;
		}
	});
});

operators.forEach((button) => {
	button.addEventListener('click', () => {
		if (num1 === null && tempNum1.length > 0) {
			num1 = Number(tempNum1);
		} else if (num1 !== null && tempNum2.length > 0) {
			num2 = Number(tempNum2);
			operate(operatorVal, num1, num2);
		}
		
		operatorVal = button.textContent;
		historyText.textContent = `${tempNum1} ${operatorVal}`;
	});
});

equals.addEventListener('click', () => {
	if (tempNum2.length > 0 && operatorVal !== null) {
		num2 = Number(tempNum2);
		operate(operatorVal, num1, num2);
		operatorVal = null;
	}
});
