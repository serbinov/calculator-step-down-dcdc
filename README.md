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

## 🧾 Formulas Used (Resistors, Inductor, Capacitors)

### 1) Feedback resistors (R1 / R2)
The tool selects standard resistor values (E24 / E96) that make the divider output closest to the desired Vout.

```
Vout = Vref × (1 + R1 / R2)
```

From this, the ideal ratio is:

```
R1 / R2 = (Vout / Vref) - 1
```

The calculator then finds the nearest standard resistor values (E24/E96 series) in the range 1 kΩ…250 kΩ and reports the resulting Vout error.

Resistor power dissipation is also estimated as:

```
I_div = Vout / (R1 + R2)
P_R1 = I_div² × R1
P_R2 = I_div² × R2
```

### 2) Inductor (L)
For a buck converter, the inductor ripple current is assumed as a fixed fraction of load current (≈30%).

```
ΔI_L = ripple_pct × Iout  (ripple_pct = 0.3)
```

Using a simplified buck ripple approximation, the minimum inductance is calculated as:

```
L_min = Vout × (1 − D) / (8 × f_sw² × Cout × ΔVout)
```

where:
- D = Vout / Vin (duty cycle)
- f_sw = switching frequency (Hz)
- Cout = selected output capacitance (F)
- ΔVout = target output ripple (V)

The calculator rounds L up to the nearest E12 inductor standard value and reports peak/rms currents:

```
I_L,peak = Iout + ΔI_L/2
I_L,rms  = √(Iout² + ΔI_L²/12)
```

### 3) Output capacitor (Cout)
The output capacitance is estimated from the desired ripple and the inductor ripple current:

```
Cout ≈ ΔI_L / (8 × f_sw × ΔVout)
```

The calculator then selects a standard E12 capacitor value and recommends realistic ceramic capacitor options (X5R/X7R) with derating for DC bias and rated voltage.

It also estimates maximum allowable ESR based on the ripple current:

```
ESR_max ≈ ΔVout / ΔI_L
```

### 4) Input capacitor (Cin) (guidance)
A simple guideline used in the tool is:

```
Cin_min ≈ Iout × D × (1 − D) / (f_sw × ΔVout)
```

This is a rough sizing rule to keep input ripple in check.

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

##  License

This project is open source and available under the MIT License.

## 🏷️ Keywords

`feedback resistor calculator` `DC/DC converter` `voltage divider` `power supply design` `switching regulator` `buck converter` `boost converter` `electronics calculator` `power electronics` `resistor calculator` `voltage regulator` `SMPS design` `PWM controller` `feedback network`

---

## 🔐 Secure API key usage (recommended)

This repository is a static site (GitHub Pages), so **any secret embedded in the frontend is visible to users**. To keep API keys safe, the recommended approach is to:

1. **Create a small server-side proxy** (server / serverless function) that holds the secret in an environment variable.
2. The browser calls the proxy endpoint (e.g., `/api/secure`), and the proxy forwards requests to the real API using the secret.

### Example (Netlify serverless function)

This repo includes an example function in `netlify/functions/secure-proxy.js`.

To use it:

1. Deploy to Netlify (or a similar platform that supports serverless functions).
2. In Netlify settings, set the environment variable:
   - `SECURE_API_KEY` = your secret key (set this securely in your hosting platform, do not commit it)
3. Call the function from the frontend, e.g.:

```js
fetch('/.netlify/functions/secure-proxy')
  .then(r => r.json())
  .then(data => console.log(data));
```

### Important
- Never commit the secret key into the repository.
- Rotate (regenerate) the key if it was ever exposed.
