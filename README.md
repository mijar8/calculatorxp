# 🧮 Windows XP Rechner & Tip Calculator

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/de/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/de/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/de/docs/Web/JavaScript)
[![Windows XP](https://img.shields.io/badge/Design-Windows_XP_Retro-0055EA?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/mijar8/calculatorxp)

Ein retro-inspirierter, interaktiver **Windows XP Rechner** mit integriertem **Trinkgeld- & Split-Bill-Rechner**, Verlaufshistorie, клавиатурным управлением и встроенными пасхалками!

🌐 **Live Demo:** [mijar8.github.io/calculatorxp](https://mijar8.github.io/calculatorxp/)

---

## ✨ Features

- 🖥️ **Authentisches Windows XP Design**: Иконичный интерфейс Luna Blue, градиентные заглавные плашки, ретро-обои «Bliss» и 3D-кнопки.
- 🧮 **Стандартный калькулятор**: Вычисление базовых математических операций (`+`, `-`, `*`, `/`), сброс (`AC`), стирание цифр (`⌫`), процент (`%`), смена знака (`±`).
- 🍕 **Trinkgeld & Split Bill Mode**: Быстрый расчёт чаевых (0%, 10%, 15%, 20%) и автоматическое деление счета на компанию (1–10 человек) с выводом суммы на человека.
- 📜 **Verlauf (История вычислений)**: Сохранение операций в `localStorage`. Клик по любой прошлой записи мгновенно подставляет результат в экран калькулятора.
- ⌨️ **Полное управление с клавиатуры**: Поддержка клавиш `0-9`, `+ - * /`, `Enter`, `Backspace`, `Escape`.
- 🔊 **Звуковые эффекты на Web Audio API**: Синтезирование оригинального звука ошибки Windows XP без внешних `.mp3` файлов.
- 🎭 **Интерактивные пасхалки**:
  - 🚨 *Ошибка 0x80004005* при попытке закрыть окно приложения.
  - 💻 *BSOD (Синий экран смерти)* при делении на ноль.

---

## 📂 Struktur des Projekts (Project Structure)

```text
minimal-calculator/
├── index.html          # Главная HTML-разметка
├── css/
│   └── styles.css      # Стилистика Windows XP Luna, Bliss backdrop, 3D кнопки
├── js/
│   └── script.js       # Логика калькулятора, Web Audio API, история, пасхалки
└── README.md           # Документация проекта
```

---

## 🚀 Сборка и запуск локально (Local Setup)

Никаких сложных зависимостей или `npm install` не требуется! Проект полностью работает на чистом Vanilla JS.

1. **Клонируйте репозиторий**:
   ```bash
   git clone https://github.com/mijar8/calculatorxp.git
   ```
2. **Откройте файл `index.html`** в любом современном браузере.

---

## 👨‍💻 Entwickler (Developer)

**Michael** — Frontend & Web Developer  
- 💼 **Status**: Offen für Ausbildung / Junior Stellen  
- 🔗 **GitHub**: [@mijar8](https://github.com/mijar8)

---

*Made with ❤️ & Retro Nostalgia*
