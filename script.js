const display = document.getElementById("display");
const history = document.getElementById("history");
const buttons = document.querySelectorAll(".key");

let expression = "";
let finished = false;

function refresh() {
  display.value = expression || "0";
}

function pressNumber(value) {
  if (finished) {
    expression = "";
    finished = false;
  }

  expression += value;
  refresh();
}

function pressOperator(value) {
  if (finished) finished = false;

  if (!expression) {
    if (value === "-") expression = "-";
    refresh();
    return;
  }

  const last = expression.slice(-1);

  if ("+-*/".includes(last)) {
    expression = expression.slice(0, -1) + value;
  } else {
    expression += value;
  }

  refresh();
}

function clearAll() {
  expression = "";
  history.textContent = "";
  finished = false;
  refresh();
}

function deleteLast() {
  if (finished) {
    clearAll();
    return;
  }

  expression = expression.slice(0, -1);
  refresh();
}

function decimal() {
  if (finished) {
    expression = "";
    finished = false;
  }

  const part = expression.split(/[+\-*/]/).pop();

  if (part.includes(".")) return;

  if (!part) expression += "0.";
  else expression += ".";

  refresh();
}

function percent() {
  if (!expression || finished) return;

  const match = expression.match(/(\d+\.?\d*|\.\d+)$/);

  if (!match) return;

  const result = Number(match[0]) / 100;

  expression =
    expression.slice(0, -match[0].length) + result;

  refresh();
}

function calculate() {
  if (!expression) return;

  try {
    if (!/^[0-9+\-*/.()\s]+$/.test(expression)) {
      throw new Error("Input salah");
    }

    if (/[+\-*/.]$/.test(expression)) {
      throw new Error("Hitungan belum selesai");
    }

    const result = Function(
      '"use strict"; return (' + expression + ')'
    )();

    if (!Number.isFinite(result)) {
      throw new Error("Hasil tidak valid");
    }

    history.textContent =
      expression.replace(/\*/g, "×").replace(/\//g, "÷") + " =";

    expression = String(Number(result.toPrecision(12)));
    finished = true;
    refresh();
  } catch {
    display.value = "Error";
    expression = "";
    finished = false;
  }
}

// Klik tombol kalkulator
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (action === "clear") clearAll();
    else if (action === "delete") deleteLast();
    else if (action === "decimal") decimal();
    else if (action === "percent") percent();
    else if (action === "equals") calculate();
    else if (value !== undefined) {
      if ("+-*/".includes(value)) {
        pressOperator(value);
      } else {
        pressNumber(value);
      }
    }
  });
});

// Bisa menggunakan keyboard juga
document.addEventListener("keydown", event => {
  const key = event.key;

  if (/^[0-9]$/.test(key)) {
    pressNumber(key);
  } else if ("+-*/".includes(key)) {
    pressOperator(key);
  } else if (key === ".") {
    decimal();
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape" || key === "Delete") {
    clearAll();
  } else if (key === "%") {
    percent();
  }
});

refresh();
