const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { JSDOM } = require('jsdom');

function loadCalculator() {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
  return new Promise((resolve) => {
    dom.window.document.addEventListener('DOMContentLoaded', () => resolve(dom));
  });
}

async function runTest() {
  const dom = await loadCalculator();
  const doc = dom.window.document;

  // Set inputs for a known case (buck, 12V->5V, 1A)
  doc.getElementById('vin').value = '12';
  doc.getElementById('vout').value = '5';
  doc.getElementById('iout').value = '1000';
  doc.getElementById('fsw').value = '300';

  // Trigger calculation
  dom.window.calculateAll();

  const lcData = dom.window.calculateLC();
  assert.ok(lcData && lcData.ok, 'Expected LC calculation to succeed');

  // Verify core computed values (buck converter, 12V->5V, 1A, 300kHz, 30% ripple, 10mV ΔVout)
  assert.ok(Math.abs(lcData.Lmin_uH - 16.2) < 0.8, `Expected Lmin ≈ 16.2 µH, got ${lcData.Lmin_uH}`);
  assert.ok(Math.abs(lcData.Cmin_uF - 2.5) < 0.3, `Expected Cout min ≈ 2.5 µF, got ${lcData.Cmin_uF}`);
  assert.ok(Math.abs(lcData.Cin_min_uF - 16.2) < 1.0, `Expected Cin min ≈ 16.2 µF, got ${lcData.Cin_min_uF}`);

  const summary = doc.getElementById('calc_result_summary').textContent;

  assert.ok(summary.includes('Target Vout: 5.000 V'), 'Expected Target Vout line');
  assert.ok(summary.includes('Actual Vout: 5.000 V'), 'Expected Actual Vout line');
  assert.ok(summary.match(/R1 \(upper\):/), 'Expected R1 output line');
  assert.ok(summary.match(/R2 \(lower\):/), 'Expected R2 output line');
  assert.ok(summary.includes('Cout min:'), 'Expected Cout min line');
  assert.ok(summary.includes('Cin min:'), 'Expected Cin min line');

  console.log('[PASS] Basic calculator output contains expected lines and values');
}

runTest().catch(err => {
  console.error('[FAIL]', err && err.message ? err.message : err);
  process.exit(1);
});
