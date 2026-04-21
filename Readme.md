This is for future use of the project because I am about to simplify the code instead of expanding it due to my purpose. My purpose for this current calculator is to make it as simple as possible while still being functional. I will be removing some features that I think are not necessary for a basic calculator, such as the ability to calculate square roots and cube roots. I will also be simplifying the code by removing some of the functions that are not essential for the basic functionality of the calculator. I will also be changing the design of the calculator to make it more user-friendly and visually appealing for seniors.

<html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digitra Calc</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <main>
        <div class="calculator">
            <div class="display" id="display">0</div>
                <div class="buttons">
                    <button class="clearDisplay" onclick="clearDisplay()">CE</button>
                    <button class="operators" onclick="handleBracket()">()</button>
                    
                    <button class="operators" onclick="append('%')">%</button>
                    <button class="delete" onclick="deleteLast()">⌫</button>

                    <button class="operators" onclick="append('sqrt(')">√</button>
                    <button class="operators" onclick="append('**2')">x²</button>
                    <button class="operators" onclick="append('cbrt(')">∛</button>
                    <button class="operators" onclick="append('**')">xʸ</button>

                    <button class="numbers" onclick="append('7')">7</button>
                    <button class="numbers" onclick="append('8')">8</button>   
                    <button class="numbers" onclick="append('9')">9</button>
                    <button class="operators" onclick="append('*')">×</button>

                    <button class="numbers" onclick="append('4')">4</button>
                    <button class="numbers" onclick="append('5')">5</button>
                    <button class="numbers" onclick="append('6')">6</button>
                    <button class="operators" onclick="append('-')">-</button>

                    <button class="numbers" onclick="append('1')">1</button>
                    <button class="numbers" onclick="append('2')">2</button>
                    <button class="numbers" onclick="append('3')">3</button>
                    <button class="operators" onclick="append('+')">+</button>
                    

                    <button class="zero" onclick="append('0')">0</button>
                    <button class="numbers" onclick="append('.')">.</button>
                    <button class="operators" onclick="append('/')">÷</button>
                    <button class="equals" onclick="calculate()">=</button>
                </div>
        </div>

        <script src="script.js"></script>
    </main>
</body>
</html>
<style>
    body {
    background-color: #0F172A;
    color: #FFFFFF;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.calculator {
    background-color: #1E293B;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    width: 300px;
}

.display {
    background-color: #020617;
    color: #FFFFFF;
    font-size: 2.5em;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 15px;
    text-align: right;
    height: 100px;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

button {
    background-color: #3730A3;
    color: #FFFFFF;
    font-size: 1.5em;
    padding: 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
button:hover {
    background-color: #4F46E5;
    box-shadow: 0 6px 12px rgba(0,0,0,0.4);
}

.operators {
    background-color: #6366F1;
}
.operators:hover {
    background-color: #4F46E5;
}


.delete {
    background-color: #EF4444;
}
.delete:hover {
    background-color: #DC2626;
}
.equals {
    background-color: #8B5CF6;
}
.equals:hover {
    background-color: #7C3AED;
}
.clearDisplay {
    background-color: #475569;
}
.clearDisplay:hover {
    background-color: #374151;
}
</style>
<script>
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
</script>