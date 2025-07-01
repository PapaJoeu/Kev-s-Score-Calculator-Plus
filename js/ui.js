// UI module for Kev's Scoring Calculator

// -- Display Results ------------------------------------------------
// Show main results: N-up, start positions, score positions
function displayResults(nUp, docStarts, scorePositions) {
  lastScorePositions = [...scorePositions];
  currentAdjustedScores = [...scorePositions];
  clearAdjustedResults();

  const container = document.getElementById("results");
  let html = `<div><strong>N-up:</strong> ${nUp}</div>`;
  html += buildDocStartTable(docStarts);
  html += buildScoreTable(scorePositions);
  container.innerHTML = html;
}

// Show adjusted score positions
function displayAdjustedResults(adjustedScores) {
  const container = document.getElementById("adjusted-results");
  let html = `<div><strong>Adjusted Scores</strong></div>`;
  html += buildAdjustedTable(adjustedScores);
  container.innerHTML = html;
}

// Clear adjusted results
function clearAdjustedResults() {
  document.getElementById("adjusted-results").innerHTML = "";
}

// -- Table Builders -------------------------------------------------
// Build table for document start positions
function buildDocStartTable(docStarts) {
  let rows = `<table>
    <tr><th>#</th><th>Document Start (in)</th></tr>`;
  docStarts.forEach((pos, i) => {
    rows += `<tr><td>${i + 1}</td><td>${pos.toFixed(3)}</td></tr>`;
  });
  rows += `</table>`;
  return rows;
}

// Build table for score positions
function buildScoreTable(scorePositions) {
  let rows = `<table>
    <tr><th>#</th><th>Score Position (in)</th></tr>`;
  scorePositions.forEach((pos, i) => {
    rows += `<tr><td>${i + 1}</td><td>${pos.toFixed(3)}</td></tr>`;
  });
  rows += `</table>`;
  return rows;
}

// Build table for adjusted scores
function buildAdjustedTable(adjustedScores) {
  let rows = `<table>
    <tr><th>Adjusted #</th><th>Measurement (in)</th></tr>`;
  adjustedScores.forEach((pos, i) => {
    rows += `<tr><td>${i + 1}</td><td>${pos.toFixed(3)}</td></tr>`;
  });
  rows += `</table>`;
  return rows;
}

// -- Picker and Input Generators -----------------------------------
// Create a group of preset buttons with optional custom input
function createPicker(containerId, presets, defaultValue, onSelect) {
  const container = document.getElementById(containerId);
  const presetsContainer = container.querySelector('.picker-presets');
  const customContainer = container.querySelector('.picker-custom');
  const input = customContainer.querySelector('input');

  // clear existing
  presetsContainer.innerHTML = '';
  let buttons = [];

  // helper to update UI and call onSelect
  function selectValue(val) {
    // toggle button active states
    buttons.forEach(btn => {
      btn.classList.toggle('active', parseFloat(btn.dataset.value) === val);
    });
    // update custom input: clear if preset, else show value
    const isPreset = buttons.some(btn => parseFloat(btn.dataset.value) === val);
    input.value = isPreset ? '' : val;
    // invoke callback
    onSelect(val);
  }

  // create preset buttons
  presets.forEach(val => {
    const btn = document.createElement('button');
    btn.textContent = val;
    btn.dataset.value = val;
    btn.className = 'picker-btn';
    btn.addEventListener('click', () => selectValue(val));
    presetsContainer.appendChild(btn);
    buttons.push(btn);
  });

  // wire custom input
  if (input._listener) input.removeEventListener('input', input._listener);
  const listener = () => {
    const v = parseFloat(input.value);
    if (!isNaN(v)) selectValue(v);
  };
  input.addEventListener('input', listener);
  input._listener = listener;

  // initialize with default
  selectValue(defaultValue);
}

// Fill a dropdown <select> element
function createDropdown(selectId, options, defaultValue, onChange) {
  const select = document.getElementById(selectId);
  select.innerHTML = '';
  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.text = opt.label;
    select.appendChild(option);
  });
  select.value = defaultValue;
  select.addEventListener('change', () => onChange(select.value));
}

// Generate labeled inputs for free-form values
function createInputs(containerId, controlsMap, onInput) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  Object.keys(controlsMap).forEach(key => {
    const cfg = controlsMap[key];
    const label = document.createElement('label');
    label.textContent = cfg.label;
    const input = document.createElement('input');
    input.id = cfg.id;
    input.type = 'number';
    input.step = cfg.step;
    input.value = CONFIG[key];
    input.addEventListener('input', () => {
      const v = parseFloat(input.value);
      if (!isNaN(v)) onInput(key, v);
    });
    label.appendChild(input);
    container.appendChild(label);
  });
}

// -- Initialization ------------------------------------------------- 
document.addEventListener('DOMContentLoaded', () => {
  // result state vars
  window.lastScorePositions = [];
  window.currentAdjustedScores = [];

  // generate pickers and inputs
  createPicker('sheet-picker', CONFIG.sheetPresets, CONFIG.pageLength, val => {
    CONFIG.pageLength = val;
    runCalculator();
  });
  createPicker('doc-picker', CONFIG.docPresets, CONFIG.docLength, val => {
    CONFIG.docLength = val;
    runCalculator();
  });
  createPicker('gutter-picker', CONFIG.gutterPresets, CONFIG.gutterSize, val => {
    CONFIG.gutterSize = val;
    runCalculator();
  });
  createDropdown('score-type', CONFIG.scoreTypes, CONFIG.scoreType, val => {
    selectScoreType(val);
    runCalculator();
  });
  createInputs('controls-container', CONFIG.controls, (key, val) => {
    CONFIG[key] = val;
    runCalculator();
  });
});
