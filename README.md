# Calculator for step‑down DCDC converter

A lightweight, **mobile-friendly web calculator** for designing the feedback voltage divider and estimating output ripple for **step‑down (buck) DC/DC converters**.

It computes:
- Optimal feedback resistors (R1/R2) based on standard E24/E96 values
- Output voltage error relative to your target
- Expected output ripple (ΔV) based on the selected output capacitor

---

## ✅ What It Does

This tool helps you choose resistor values for the feedback network of a buck converter (the R1/R2 divider that sets Vout). It also estimates output voltage ripple using a capacitor from the built-in capacitor database.

It is designed for one topology only: **step‑down (buck) converters**.

---

## ⚡ Key Features

- **Feedback resistor calculator** (R1/R2) for a given Vout and reference voltage (Vref)
- **Standard resistor series support**: E24 (5%) and E96 (1%)
- **Automatic best-match resistor selection** based on allowable error and resistor range
- **Real-time output ripple estimate** using selected capacitor (Cout) and inductor current ripple
- **Responsive UI**: Works on desktop and mobile
- **Simple UI**: Single topology, single page, instant results

---

## 🧮 How to Use

1. Enter your converter's **reference voltage (Vref)** (e.g., 0.8 V or 0.6 V)
2. Enter your desired **output voltage (Vout)**
3. Choose the **resistor tolerance series** (E24 / E96)
4. Pick **output capacitor (Cout)** from the dropdown
5. Optionally set a **maximum ripple voltage** target
6. Review the calculated:
   - R1/R2 resistor pair (and nearest standard values)
   - Expected output voltage error
   - Estimated output ripple voltage

---

## 🧾 Formula Used

The feedback divider uses the standard formula:

```
Vout = Vref × (1 + R1/R2)
```

And output ripple is estimated using: (simplified for buck operation)

```
ΔVout ≈ ΔI_L / (8 × Cout × f_sw)
```

Where ΔI_L is the inductor ripple current.

---

## 📁 Files

- `index.html` — The full calculator app (HTML/CSS/JS in one file)
- `capacitors.json` — Capacitor database used for ripple estimates
- `test/calculator.test.js` — Unit tests (jsdom)
- `check_syntax.js` — Script to verify embedded JS syntax

---

## 🚀 Run Locally

No build tools required. Just open `index.html` in a browser.

If you want to run the test suite:

```sh
npm test
```

---

## 🔎 Notes

- This is **not** a general-purpose resistor calculator (it is specific to buck converter feedback networks).
- The ripple estimate is a simplified model; use it for quick sizing and sanity checks.

## 🔧 Installation

No installation required! Simply:
1. Download the HTML file
2. Open in any modern web browser
3. Start calculating resistor values

Or visit the live version at: https://serbinov.github.io/Feedback-resistor-calculator-for-DC-DC/

## 📱 Browser Support

- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)  
- ✅ Safari (Desktop & Mobile)
- ✅ Edge (Desktop & Mobile)
- ✅ Opera (Desktop & Mobile)

## 🎨 Screenshots

The calculator features a clean, intuitive interface with:
- Clear input fields for all parameters
- Tabbed interface for different calculation modes
- Visual circuit diagram for reference
- Responsive design that works on all screen sizes

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 👨‍💻 Author

**Oleg Serbinov**
- Website: [serbinov.github.io](https://serbinov.github.io/)
- GitHub: [github.com/serbinov](https://github.com/serbinov)

## 📄 License

This project is open source and available under the MIT License.

## 🏷️ Keywords

`feedback resistor calculator` `DC/DC converter` `voltage divider` `power supply design` `switching regulator` `buck converter` `boost converter` `electronics calculator` `power electronics` `resistor calculator` `voltage regulator` `SMPS design` `PWM controller` `feedback network`