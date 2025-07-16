let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetScreen = false;
const themeSelect = document.getElementById("theme-select");
themeSelect.addEventListener("change", (e) => {
  document.body.className = e.target.value;
});
const display = document.getElementById("display");
const numButtons = document.querySelectorAll("[data-num]");
const opButtons = document.querySelectorAll("[data-op]");
const equalsButton = document.querySelector(".equals");

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) return "Erreur : 0";
  return a / b;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
    default: return null;
  }
}

numButtons.forEach(button =>
  button.addEventListener("click", () => appendNumber(button.dataset.num))
);

opButtons.forEach(button =>
  button.addEventListener("click", () => handleOperator(button.dataset.op))
);

equalsButton.addEventListener("click", evaluate);

function appendNumber(number) {
  if (display.textContent === "0" || shouldResetScreen) resetDisplay();
  if (number === "." && display.textContent.includes(".")) return;
  display.textContent += number;
}

function resetDisplay() {
  display.textContent = "";
  shouldResetScreen = false;
}

function clear() {
  display.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  shouldResetScreen = false;
}

function handleOperator(op) {
  if (op === "clear") return clear();
  if (op === "backspace") return backspace();

  if (currentOperator && shouldResetScreen === false) {
    evaluate();
  }

  firstNumber = display.textContent;
  currentOperator = op;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetScreen) return;

  secondNumber = display.textContent;
  const result = operate(currentOperator, firstNumber, secondNumber);

  display.textContent =
    typeof result === "number" ? Math.round(result * 1000) / 1000 : result;

  firstNumber = display.textContent;
  currentOperator = null;
  shouldResetScreen = true;
}

function backspace() {
  if (shouldResetScreen) return;
  display.textContent = display.textContent.slice(0, -1) || "0";
}

// Bonus : clavier
window.addEventListener("keydown", handleKeyboardInput);
function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendNumber(".");
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") backspace();
  if (e.key === "Escape") clear();
  if (["+", "-", "*", "/"].includes(e.key)) handleOperator(e.key);
}

