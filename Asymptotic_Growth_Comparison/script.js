const canvas = document.getElementById('growthChart');
const ctx = canvas.getContext('2d');
const nSelect = document.getElementById('nSelect');
const valuesBox = document.getElementById('growthValues');

const functionsList = [
  { name: '1 (constant)', color: '#0ca678', fn: n => 1 },
  { name: 'log₂ n', color: '#4263eb', fn: n => Math.log2(n) },
  { name: 'n (linear)', color: '#7048e8', fn: n => n },
  { name: 'n log₂ n', color: '#f08c00', fn: n => n * Math.log2(n) },
  { name: 'n² (quadratic)', color: '#e03131', fn: n => n * n }
];

function drawChart() {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  const w = rect.width, h = rect.height;
  ctx.clearRect(0, 0, w, h);
  const left = 48, right = 18, top = 20, bottom = 36;
  const cw = w - left - right, ch = h - top - bottom;
  const maxN = Number(nSelect.value);
  const maxVal = maxN * maxN;
  const y = v => top + ch - (Math.log10(v + 1) / Math.log10(maxVal + 1)) * ch;
  const x = n => left + ((n - 1) / (maxN - 1 || 1)) * cw;

  ctx.font = '11px Inter, Arial';
  ctx.strokeStyle = '#e8edf5'; ctx.fillStyle = '#64748b'; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const yy = top + ch * i / 4;
    ctx.beginPath(); ctx.moveTo(left, yy); ctx.lineTo(w - right, yy); ctx.stroke();
    const value = Math.round(maxVal * (1 - i / 4));
    ctx.fillText(value.toLocaleString(), 3, yy + 4);
  }
  ctx.strokeStyle = '#94a3b8';
  ctx.beginPath(); ctx.moveTo(left, top); ctx.lineTo(left, top + ch); ctx.lineTo(w - right, top + ch); ctx.stroke();
  for (const f of functionsList) {
    ctx.strokeStyle = f.color; ctx.lineWidth = 2.5; ctx.beginPath();
    for (let n = 1; n <= maxN; n++) {
      const xx = x(n), yy = y(f.fn(n));
      if (n === 1) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
    }
    ctx.stroke();
  }
  ctx.fillStyle = '#64748b';
  ctx.fillText('Input size n →', Math.max(left, w - 100), h - 8);
  ctx.fillText('1', left - 3, h - 14);
  ctx.fillText(String(maxN), w - right - 14, h - 14);

  valuesBox.innerHTML = '';
  functionsList.forEach(f => {
    const value = f.fn(maxN);
    const card = document.createElement('div');
    card.className = 'value-card';
    card.innerHTML = `<span style="color:${f.color}">● ${f.name}</span><strong>${Number(value.toFixed(2)).toLocaleString()}</strong>`;
    valuesBox.appendChild(card);
  });
}
nSelect.addEventListener('change', drawChart);
window.addEventListener('resize', drawChart);
drawChart();
