# 🧮 Windows XP Rechner & Trinkgeld-Rechner

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/de/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/de/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/de/docs/Web/JavaScript)
[![Windows XP](https://img.shields.io/badge/Design-Windows_XP_Retro-0055EA?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/mijar8/calculatorxp)

Ein retro-inspirierter, interaktiver **Windows XP Rechner** mit integriertem **Trinkgeld- & Split-Bill-Rechner**, Verlaufshistorie, vollständiger Tastatursteuerung und interaktiven Easter Eggs.

🌐 **Live-Demo:** [calculatorxp.pages.dev](https://calculatorxp.pages.dev/)

---

## ✨ Hauptfunktionen (Features)

- 🖥️ **Authentisches Windows XP Design**: Nostalgische Oberfläche im Luna-Blue-Stil mit 3D-Buttons, Titelleiste und dem legendären „Bliss“-Hintergrund.
- 🧮 **Standard-Rechner**: Berechnung der grundlegenden mathematischen Operationen (`+`, `-`, `*`, `/`), Alles-Löschen (`AC`), Rücktaste (`⌫`), Prozent (`%`) und Vorzeichenwechsel (`±`).
- 🍕 **Trinkgeld- & Split-Bill-Modus**: Schnelle Berechnung von Trinkgeldern (0%, 10%, 15%, 20%) und automatisches Aufteilen der Rechnung auf mehrere Personen (1–10 Personen).
- 📜 **Verlaufshistorie**: Speicherung der Berechnungen im `localStorage`. Ein Klick auf einen früheren Eintrag übernimmt das Ergebnis direkt in das Display.
- ⌨️ **Vollständige Tastatursteuerung**: Unterstützung der Tasten `0-9`, `+ - * /`, `Enter`, `Backspace` und `Escape`.
- 🔊 **Soundeffekte per Web Audio API**: Synthetisierte Wiedergabe des originalen Windows XP Fehler-Sounds ohne externe Audiodateien.
- 🎭 **Interaktive Easter Eggs**:
  - 🚨 *Systemfehler 0x80004005* beim Versuch, das Fenster zu schließen.
  - 💻 *BSOD (Blue Screen of Death)* bei Division durch Null.

---

## 📂 Projektstruktur

```text
minimal-calculator/
├── index.html          # Haupt-HTML-Struktur
├── css/
│   └── styles.css      # Windows XP Luna-Design & Bliss-Hintergrund
├── js/
│   └── script.js       # Rechner-Logik, Web Audio API, Verlauf & Easter Eggs
└── README.md           # Projektdokumentation
```

---

## 🚀 Lokale Ausführung

Es werden keine externen Abhängigkeiten oder Build-Tools benötigt. Das Projekt läuft direkt auf nativem Vanilla JavaScript.

1. **Repository klonen**:
   ```bash
   git clone https://github.com/mijar8/calculatorxp.git
   ```
2. **Datei `index.html`** im Browser öffnen.

---

## 👨‍💻 Entwickler

**Michael** — Frontend & Web-Entwickler  
- 💼 **Status**: Offen für Ausbildung / Junior-Stellen  
- 🔗 **GitHub**: [@mijar8](https://github.com/mijar8)

---

*Erstellt mit ❤️ und Retro-Nostalgie.*
