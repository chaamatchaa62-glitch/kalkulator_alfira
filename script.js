const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");

let output = "";
let finished = false;

function show() {
  display.value = output || "0";
}

function calculate() {
  if (!output) return;

  try {
    // Ubah persen menjadi operasi pembagian 100.
    let expression = output.replace(
      /(\d+(?:\.\d+)?|\.\d+)%/g,
      "($1/100)"
    );

    // Hanya izinkan karakter matematika.
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
      throw new Error("Input tidak valid");
    }

    // Tolak operator yang tidak lengkap.
    if (/[+\-*/.]$/.test(expression)) {
      throw new Error("Hitungan belum lengkap");
    }

    const result = Function(
      '"use strict"; return (' + expression + ')'
    )();

    if (!Number.isFinite(result)) {
      throw new Error("Hasil tidak valid");
    }

    output = String(Number(result.toPrecision(12)));
    finished = true;
    show();
  } catch {
    display.value = "Error";
    output = "";
    finished = false;
  }
}

function press(value) {
  // Tombol hapus semua.
  if (value === "AC") {
    output = "";
    finished = false;
    show();
    return;
  }

  // Tombol hapus satu karakter.
  if (value === "DEL") {
    if (finished) {
      output = "";
      finished = false;
    } else {
      output = output.slice(0, -1);
    }

    show();
    return;
  }

  // Tombol sama dengan.
  if (value === "=") {
    calculate();
    return;
  }

  // Setelah hasil muncul, angka baru memulai hitungan baru.
  if (finished) {
    if ("+-*/%".includes(value)) {
      finished = false;
    } else {
      output = "";
      finished = false;
    }
  }

  // Cegah operator berulang di akhir ekspresi.
  if ("+-*/".includes(value)) {
    if (!output) {
      if (value === "-") output = "-";
      show();
      return;
    }

    if (/[+\-*/]$/.test(output)) {
      output = output.slice(0, -1);
    }

    output += value;
    show();
    return;
  }

  // Cegah dua titik desimal dalam satu angka.
  if (value === ".") {
    const current = output.split(/[+\-*/]/).pop();

    if (current.includes(".") || current.includes("%")) return;

    output += current === "" ? "0." : ".";
    show();
    return;
  }

  // Tambahkan angka atau persen.
  if (value === "%") {
    if (!output || /[+\-*/.(%]$/.test(output)) return;
  }

  output += value;
  show();
}

// Event klik tombol.
buttons.addEventListener("click", function(event) {
  const button = event.target.closest("button");

  if (!button) return;

  press(button.dataset.value);
});

// Dukungan keyboard.
document.addEventListener("keydown", function(event) {
  const key = event.key;

  if (/^[0-9]$/.test(key)) {
    press(key);
  } else if ("+-*/".includes(key)) {
    press(key);
  } else if (key === ".") {
    press(".");
  } else if (key === "%") {
    press("%");
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    press("=");
  } else if (key === "Backspace") {
    press("DEL");
  } else if (key === "Escape" || key === "Delete") {
    press("AC");
  }
});

show();
