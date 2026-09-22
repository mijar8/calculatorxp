// --- ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ---
let displayValue = '0';
let firstNum = null;
let operator = null;
let resetNext = false;
let historyList = JSON.parse(localStorage.getItem('calc_history') || '[]');

// DOM ЭЛЕМЕНТЫ
const resultEl = document.getElementById('result');
const exprEl = document.getElementById('expr');
const historyListEl = document.getElementById('history-list');
const errorModal = document.getElementById('xp-error-modal');
const infoModal = document.getElementById('xp-info-modal');
const bsodOverlay = document.getElementById('bsod-overlay');

// --- 0. AUDIO SYNTHESIZER (WEB AUDIO API) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playXpErrorSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  // Windows XP Critical Error Chord
  const notes = [440, 330, 220]; // A4, E4, A3
  notes.forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(audioCtx.currentTime + idx * 0.02);
    osc.stop(audioCtx.currentTime + 0.45);
  });
}

function playClickSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}

// --- 1. ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ---
document.getElementById('tab-calc').addEventListener('click', () => {
  playClickSound();
  document.getElementById('calc-mode').classList.remove('hidden');
  document.getElementById('tip-mode').classList.add('hidden');
  document.getElementById('tab-calc').classList.add('active');
  document.getElementById('tab-tip').classList.remove('active');
});

document.getElementById('tab-tip').addEventListener('click', () => {
  playClickSound();
  document.getElementById('tip-mode').classList.remove('hidden');
  document.getElementById('calc-mode').classList.add('hidden');
  document.getElementById('tab-tip').classList.add('active');
  document.getElementById('tab-calc').classList.remove('active');
});

// --- 2. ЛОГИКА КАЛЬКУЛЯТОРА ---
function updateDisplay() {
  resultEl.textContent = displayValue;
}

function handleNum(num) {
  playClickSound();
  if (displayValue === '0' || resetNext) {
    displayValue = num;
    resetNext = false;
  } else {
    if (displayValue.length < 10) displayValue += num;
  }
  updateDisplay();
}

function handleDecimal() {
  playClickSound();
  if (resetNext) {
    displayValue = '0.';
    resetNext = false;
  } else if (!displayValue.includes('.')) {
    displayValue += '.';
  }
  updateDisplay();
}

function handleBackspace() {
  playClickSound();
  if (resetNext || displayValue.length <= 1) {
    displayValue = '0';
    resetNext = false;
  } else {
    displayValue = displayValue.slice(0, -1);
  }
  updateDisplay();
}

function handleOp(op) {
  playClickSound();
  if (operator !== null && !resetNext) {
    calculate();
  }
  firstNum = parseFloat(displayValue);
  operator = op;
  resetNext = true;
  exprEl.textContent = `${firstNum} ${op}`;
}

function triggerBSOD() {
  playXpErrorSound();
  bsodOverlay.classList.remove('hidden');
}

function calculate() {
  playClickSound();
  if (operator === null || firstNum === null) return;
  const secondNum = parseFloat(displayValue);
  let res = 0;

  if (operator === '+') res = firstNum + secondNum;
  if (operator === '-') res = firstNum - secondNum;
  if (operator === '*') res = firstNum * secondNum;
  if (operator === '/') {
    if (secondNum === 0) {
      triggerBSOD();
      clearCalc();
      return;
    }
    res = firstNum / secondNum;
  }

  res = Math.round(res * 100000) / 100000;
  
  // Сохраняем в историю
  const entry = `${firstNum} ${operator} ${secondNum} = ${res}`;
  historyList.unshift({ entry, res });
  if (historyList.length > 20) historyList.pop();
  localStorage.setItem('calc_history', JSON.stringify(historyList));

  exprEl.textContent = `${firstNum} ${operator} ${secondNum} =`;
  displayValue = String(res);
  firstNum = null;
  operator = null;
  resetNext = true;
  updateDisplay();
  renderHistory();
}

function clearCalc() {
  playClickSound();
  displayValue = '0';
  firstNum = null;
  operator = null;
  resetNext = false;
  exprEl.textContent = '';
  updateDisplay();
}

// КЛИКИ ПО КНОПКАМ КАЛЬКУЛЯТОРА
document.querySelector('.xp-keys').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const action = btn.dataset.action;
  const val = btn.dataset.value;

  if (action === 'num') handleNum(val);
  if (action === 'decimal') handleDecimal();
  if (action === 'backspace') handleBackspace();
  if (action === 'op') handleOp(val);
  if (action === 'equals') calculate();
  if (action === 'clear') clearCalc();
  if (action === 'toggle') {
    displayValue = String(parseFloat(displayValue) * -1);
    updateDisplay();
  }
  if (action === 'percent') {
    displayValue = String(parseFloat(displayValue) / 100);
    updateDisplay();
  }
});

// КЛАВИАТУРА
document.addEventListener('keydown', (e) => {
  if (!bsodOverlay.classList.contains('hidden')) {
    bsodOverlay.classList.add('hidden');
    return;
  }
  if (e.key >= '0' && e.key <= '9') handleNum(e.key);
  if (e.key === '.' || e.key === ',') handleDecimal();
  if (e.key === 'Backspace') handleBackspace();
  if (['+', '-', '*', '/'].includes(e.key)) handleOp(e.key);
  if (e.key === 'Enter' || e.key === '=') calculate();
  if (e.key === 'Escape') clearCalc();
});

// --- 3. ИСТОРИЯ ---
function renderHistory() {
  if (!historyListEl) return;
  if (historyList.length === 0) {
    historyListEl.innerHTML = '<div class="empty">Kein Verlauf vorhanden</div>';
    return;
  }
  historyListEl.innerHTML = historyList.map(item => `
    <div class="history-item" data-val="${item.res}">
      <span>${item.entry.split('=')[0]}</span>
      <span class="res">= ${item.res}</span>
    </div>
  `).join('');
}

if (historyListEl) {
  historyListEl.addEventListener('click', (e) => {
    const item = e.target.closest('.history-item');
    if (item) {
      displayValue = item.dataset.val;
      resetNext = true;
      updateDisplay();
    }
  });
}

document.getElementById('clear-history').addEventListener('click', () => {
  historyList = [];
  localStorage.removeItem('calc_history');
  renderHistory();
});

// --- 4. КАЛЬКУЛЯТОР ЧАЕВЫХ (SPLIT BILL) ---
const billInput = document.getElementById('bill-input');
const peopleInput = document.getElementById('people-input');
const peopleCountEl = document.getElementById('people-count');
const tipTotalEl = document.getElementById('tip-total');
const tipPerPersonEl = document.getElementById('tip-per-person');
let currentTip = 10;

function calculateTip() {
  const bill = parseFloat(billInput.value) || 0;
  const people = parseInt(peopleInput.value) || 1;
  peopleCountEl.textContent = people;

  const tipAmount = bill * (currentTip / 100);
  const total = bill + tipAmount;
  const perPerson = total / people;

  tipTotalEl.textContent = total.toFixed(2) + ' €';
  tipPerPersonEl.textContent = perPerson.toFixed(2) + ' €';
}

if (billInput && peopleInput) {
  billInput.addEventListener('input', calculateTip);
  peopleInput.addEventListener('input', calculateTip);

  document.querySelectorAll('.tip-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tip-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentTip = parseInt(e.target.dataset.tip);
      calculateTip();
    });
  });
}

// --- 5. EASTER EGGS И ОКНА ИНФО ---
function showErrorModal() {
  playXpErrorSound();
  errorModal.classList.remove('hidden');
}

function showInfoModal() {
  playClickSound();
  infoModal.classList.remove('hidden');
}

// Крестик ✕ закрытия окна -> вызов ошибки
document.getElementById('btn-close-window').addEventListener('click', showErrorModal);
document.querySelectorAll('.xp-btn-ctrl.min, .xp-btn-ctrl.max').forEach(el => {
  el.addEventListener('click', showErrorModal);
});

// Клик по меню
const menuHelp = document.getElementById('menu-help');
if (menuHelp) {
  menuHelp.addEventListener('click', showInfoModal);
}

// Закрытие модалок
document.getElementById('close-modal-x').addEventListener('click', () => errorModal.classList.add('hidden'));
document.getElementById('close-modal-btn').addEventListener('click', () => errorModal.classList.add('hidden'));

document.getElementById('close-info-x').addEventListener('click', () => infoModal.classList.add('hidden'));
document.getElementById('close-info-btn').addEventListener('click', () => infoModal.classList.add('hidden'));

// Клик по синему экрану смерти (BSOD)
bsodOverlay.addEventListener('click', () => {
  bsodOverlay.classList.add('hidden');
});

// Инициализация
renderHistory();
