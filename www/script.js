let display = document.getElementById('display');
let rawInput = "";
let displayInput = "";

function append(value) {
 
    if (value === '%') {
    rawInput += '/100';
    displayInput += '%';
  }
  else if (value === '*') {
    rawInput += '*';
    displayInput += '×';
  }
  else if (value === '/') {
    rawInput += '/';
    displayInput += '÷';
  }
  else {
    rawInput += value;
    displayInput += value;
  }

  display.innerText = displayInput;
}

function clearDisplay() {
   display.innerText = '';
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

function toggleLargeMode() {
  document.body.classList.toggle("large-mode");

  let btn = document.getElementById("toggleLarge");

  if (document.body.classList.contains("large-mode")) {
    btn.innerText = "🔎";
  } else {
    btn.innerText = "🔍";
  }
}

function toggleContrastMode() {
  document.body.classList.toggle("light-mode");

  let btn = document.getElementById("toggleContrast");

  if (document.body.classList.contains("light-mode")) {
    btn.innerText = "🌙";
  } else {
    btn.innerText = "☀️";
  }
}