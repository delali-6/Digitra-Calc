let display = document.getElementById('display');
let rawInput = "";
let displayInput = "";

function append(value) {

  if (value === '**2') {
    rawInput += '**2';
    displayInput += '²';
  } 
  else if (value === '**') {
    rawInput += '**';
    displayInput += '^';
  } 
  else if (value === 'sqrt(') {
    rawInput += 'sqrt(';
    displayInput += '√(';
  }
  else if (value === 'cbrt(') {
    rawInput += 'cbrt(';
    displayInput += '∛(';
  }
  else if (value === '%') {
    rawInput += '/100';
    displayInput += '%';
  }
  else {
    rawInput += value;
    displayInput += value;
  }

  display.innerText = displayInput;
}

function clearDisplay() {
   display.innerText = '0';
   rawInput = "";
   displayInput = "";
}

function deleteLast() {
  rawInput = rawInput.slice(0, -1);
  displayInput = displayInput.slice(0, -1);

  display.innerText = displayInput || "0";
}

function handleBracket() {
   const text = display.innerText;
   const openBrackets = (text.match(/\(/g) || []).length;
   const closeBrackets = (text.match(/\)/g) || []).length;
   if (openBrackets === closeBrackets || text.endsWith('(')) {
       append('(');
   } else if (openBrackets > closeBrackets && !text.endsWith('(')) {
       append(')');
   }
}


function calculate() {
  try {
    let expression = rawInput;

    // Square root
    expression = expression.replace(/sqrt\(/g, "Math.sqrt(");

    // Cube root (if you used **(1/3), this already works)
    // No need to replace if you're appending correctly
    expression = expression.replace(/cbrt\(/g, "Math.cbrt(");

    // Evaluate
    let result = Function('"use strict"; return (' + expression + ')')();

    rawInput = result.toString();
    displayInput = result.toString();

    display.innerText = displayInput;

  } catch (e) {
    display.innerText = 'Error';
    rawInput = "";
    displayInput = "";
  }
}