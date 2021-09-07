const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');
const percentButton = document.getElementById('percent');
const historyText = document.querySelector('.historical-text');
const outputText = document.querySelector('.output-text');
const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const plusMinusButton = document.getElementById('plus-minus');
const decimalButton = document.getElementById('decimal');
const equalsButton = document.getElementById('equals');
let num1 = null;
let num2 = null;
let tempNum1 = '';
let tempNum2 = '';
let tempNum;
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
			resultVal = Math.round(resultVal * 1000) / 1000;
			break;
		case '×':
			resultVal = multiply(a, b);
			resultVal = Math.round(resultVal * 1000) / 1000;
			break;
		case '-':
			resultVal = subtract(a, b);
			resultVal = Math.round(resultVal * 1000) / 1000;
			break;
		case '+':
			resultVal = add(a, b);
			resultVal = Math.round(resultVal * 1000) / 1000;
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
		} else if (num1 !== null && tempNum1.length === 0) {
			tempNum1 = resultVal.toString();
		}
		
		operatorVal = button.textContent;
		historyText.textContent = `${tempNum1} ${operatorVal}`;
	});
});

clearButton.addEventListener('click', () => {
	num1 = null;
	num2 = null;
	tempNum1 = '';
	tempNum2 = '';
	resultVal = null;
	operatorVal = null;
	historyText.textContent = '';
	outputText.textContent = '0';
});

backspaceButton.addEventListener('click', () => {
	if (num1 === null && tempNum1.length > 0) {
		tempNum1 = '';
		outputText.textContent = '0';
	} else if (num2 === null &  tempNum2.length > 0) {
		tempNum2 = '';
		outputText.textContent = '0';
	}
});

percentButton.addEventListener('click', () => {
	if (num1 !== null && tempNum2.length > 0) {
		tempNum2 = (Number(tempNum2) * num1) / 100;
		tempNum2 = tempNum2.toString();
		outputText.textContent = tempNum2;
	}
});

equalsButton.addEventListener('click', () => {
	if (tempNum2.length > 0 && operatorVal !== null) {
		num2 = Number(tempNum2);
		operate(operatorVal, num1, num2);
		operatorVal = null;
		tempNum1 = '';
	}
});

const plusMinus = function() {
	if (tempNum.includes('-')) {
		tempNum = tempNum.split('');
		tempNum.splice(0, 1);
	} else {
		tempNum = tempNum.split('');
		tempNum.unshift('-');
	}
	
	tempNum = tempNum.join('');
};

plusMinusButton.addEventListener('click',  () => {
	if (num1 === null && tempNum1.length > 0) {
		tempNum = tempNum1;
		plusMinus();
		tempNum1 = tempNum;
		outputText.textContent = `${tempNum1}`;
	} else if (num1 !== null && tempNum2.length > 0) {
		tempNum = tempNum2;
		plusMinus();
		tempNum2 = tempNum;
		outputText.textContent = `${tempNum2}`;
	} else if (num1 !== null && tempNum1.length === 0) {
		tempNum1 = resultVal.toString();
		tempNum = tempNum1;
		plusMinus();
		num1 = Number(tempNum);
		resultVal = Number(tempNum);
		tempNum1 = '';
		historyText.textContent = `${resultVal}`;
		outputText.textContent = `${resultVal}`;
	}
});

decimalButton.addEventListener('click', () => {
	if (num1 === null && tempNum1.length > 0 && (!tempNum1.includes('.'))) {
		tempNum1 += decimalButton.textContent;
		outputText.textContent = `${tempNum1}`;
	} else if (num2 === null &  tempNum2.length > 0 && (!tempNum2.includes('.'))) {
		tempNum2 += decimalButton.textContent;
		outputText.textContent = `${tempNum2}`;
	}
});
