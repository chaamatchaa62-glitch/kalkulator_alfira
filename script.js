
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aesthetic Calculator</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="app">
    <div class="calculator">
      <header class="calc-header">
        <div class="brand">
          <span class="brand-icon">✳</span>
          <div>
            <h1>calcula</h1>
            <p>Simple things, beautifully done.</p>
          </div>
        </div>
        <span class="status-dot"></span>
      </header>

      <section class="display">
        <div class="display-label">YOUR CALCULATION</div>
        <div id="history" class="history"></div>
        <input
          type="text"
          id="display"
          value="0"
          aria-label="Layar kalkulator"
          readonly
        >
      </section>

      <section class="keypad" aria-label="Tombol kalkulator">
        <button class="key function" data-action="clear">AC</button>
        <button class="key function" data-action="delete">DEL</button>
        <button class="key function" data-action="percent">%</button>
        <button class="key operator" data-value="/">÷</button>

        <button class="key" data-value="7">7</button>
        <button class="key" data-value="8">8</button>
        <button class="key" data-value="9">9</button>
        <button class="key operator" data-value="*">×</button>

        <button class="key" data-value="4">4</button>
        <button class="key" data-value="5">5</button>
        <button class="key" data-value="6">6</button>
        <button class="key operator" data-value="-">−</button>

        <button class="key" data-value="1">1</button>
        <button class="key" data-value="2">2</button>
        <button class="key" data-value="3">3</button>
        <button class="key operator" data-value="+">+</button>

        <button class="key double-zero" data-value="00">00</button>
        <button class="key" data-value="0">0</button>
        <button class="key" data-action="decimal">.</button>
        <button class="key equals" data-action="equals">=</button>
      </section>

      <footer class="calc-footer">
        <span>MADE FOR YOUR EVERYDAY</span>
        <span>✦ 01</span>
      </footer>
    </div>
    <p class="page-caption">A little space for clear thinking.</p>
  </main>

  <script src="script.js"></script>
</body>
</html>
