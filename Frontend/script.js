let display = document.getElementById('display');

function append(value) {
    if (value === '(' && /\d$/.test(display.innerText)) {
        display.innerText += '*(';
        return;
    }

   if (display.innerText === '0') {
       display.innerText = value;
   } else {
       display.innerText += value;
   }
}

function clearDisplay() {
   display.innerText = '0';
}

function deleteLast() {
   if (display.innerText.length > 1) {
       display.innerText = display.innerText.slice(0, -1) || '0';
   } else {
       display.innerText = '0';
   }
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

    // % → (x/100)
    expression = expression.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

    // sqrt → Math.sqrt
    expression = expression.replace(/sqrt\(/g, "Math.sqrt(");

    let result = Function('"use strict"; return (' + expression + ')')();

    rawInput = result.toString();
    display.innerText = formatNumber(rawInput);

  } catch (e) {
    display.innerText = 'Error';
    rawInput = "";
  }
}