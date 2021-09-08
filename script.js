const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');
const percentButton = document.getElementById('percent');
const historyText = document.querySelector('.historical-text');
const outputText = document.querySelector('.output-text');
const numbers = Array.from(document.querySelectorAll('[data-number]'));
const operators = Array.from(document.querySelectorAll('[data-operator]'));
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

// Operate function for evaluation
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
	
	// Display operation to historyWindow and clear tempNum2 and num2
	// This assigns resultVal as the new first operand for the next calculation
	historyText.textContent = `${tempNum1} ${operatorVal} ${tempNum2} =`;
	outputText.textContent = `${resultVal.toString()}`;
	num1 = resultVal;
	tempNum1 = resultVal.toString();
	num2 = null;
	tempNum2 = '';
};

// Functionality for all of the number buttons
numbers.forEach((button) => {
	button.addEventListener('click', () => {
		// Allows the end user to enter a fresh set of values after running equalsButton
		if (operatorVal === null) {
			num1 = null;
			resultVal = null;
			historyText.textContent = '';
		}
		
		// Determines if input is going towards first operand or second
		if (num1 === null) {
			tempNum1 += button.textContent;
			outputText.textContent = `${tempNum1}`;
		} else if (num1 !== null && num2 === null) {
			tempNum2 += button.textContent;
			outputText.textContent = `${tempNum2}`;
		}
	});
});

// Functionality for all operator buttons except percentButton
operators.forEach((button) => {
	button.addEventListener('click', () => {
		if (num1 === null && tempNum1.length > 0) {
			num1 = Number(tempNum1);
		} else if (num1 !== null && tempNum2.length > 0) {
			num2 = Number(tempNum2);
			
			// Prevent users from dividing a number by zero
			if (operatorVal === '÷' && num2 === 0) {
				outputText.textContent = 'Cannot divide by 0';
				num2 = null;
				tempNum2 = '';
				return;
			} else {
				operate(operatorVal, num1, num2);
			}
		// This is for when users execute equalsButton and their tempNum1 clears
		} else if (num1 !== null && tempNum1.length === 0) {
			tempNum1 = resultVal.toString();
		}
		
		// Assigns new operatorVal and displays the values for the new calculation
		operatorVal = button.textContent;
		historyText.textContent = `${tempNum1} ${operatorVal}`;
	});
});

// Functionality for clearButton
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

// Functionality for backspaceButton
backspaceButton.addEventListener('click', () => {
	if (num1 === null && tempNum1.length > 0) {
		tempNum1 = '';
		outputText.textContent = '0';
	} else if (num2 === null &  tempNum2.length > 0) {
		tempNum2 = '';
		outputText.textContent = '0';
	}
});

// Functionality for percentButton
// Users will have to manually click the button to utilize its functionality
percentButton.addEventListener('click', () => {
	if (num1 !== null && tempNum2.length > 0) {
		tempNum2 = (Number(tempNum2) * num1) / 100;
		tempNum2 = tempNum2.toString();
		outputText.textContent = tempNum2;
	}
});

// Functionality for the equalsButton
equalsButton.addEventListener('click', () => {
	// Can only execute if there is operatorVal and tempNum2 values present
	if (tempNum2.length > 0 && operatorVal !== null) {
		num2 = Number(tempNum2);
		
		// Prevent users from dividing a number by zero
		if (operatorVal === '÷' && num2 === 0) {
			outputText.textContent = 'Cannot divide by 0';
			num2 = null;
			tempNum2 = '';
			return;
		} else {
			/*
				This gives the user the option to continue with resultVal as
				the new first operand num1 or start over with a brand new num1
				operand.
			*/
			operate(operatorVal, num1, num2);
			operatorVal = null;
			tempNum1 = '';
		}
	}
});

// Function for the plusMinusButton functionality
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

// Functionality for plusMinusButton, works as a toggle
// Users will have to manually click the button to utilize its functionality
plusMinusButton.addEventListener('click',  () => {
	if (num1 === null && tempNum1.length > 0) {
		// This applies plusMinus() on tempNum1
		tempNum = tempNum1;
		plusMinus();
		tempNum1 = tempNum;
		outputText.textContent = `${tempNum1}`;
	} else if (num1 !== null && tempNum2.length > 0) {
		// This applies plusMinus() on tempNum2
		tempNum = tempNum2;
		plusMinus();
		tempNum2 = tempNum;
		outputText.textContent = `${tempNum2}`;
	} else if (num1 !== null && tempNum1.length === 0) {
		// This applies plusMinus() on resultVal value when equalsButton is executed
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

// Functionality for decimalButton
decimalButton.addEventListener('click', () => {
	if (num1 === null && tempNum1.length > 0 && (!tempNum1.includes('.'))) {
		tempNum1 += decimalButton.textContent;
		outputText.textContent = `${tempNum1}`;
	} else if (num2 === null &  tempNum2.length > 0 && (!tempNum2.includes('.'))) {
		tempNum2 += decimalButton.textContent;
		outputText.textContent = `${tempNum2}`;
	}
});

// Functionality for keyboard support, except percentButton and plusMinusButton
window.addEventListener('keydown', (event) => {
	const button = document.querySelector(`[data-key="${event.keyCode}"]`);
	button.click();
});
