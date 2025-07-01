// UI logic for Kev's Scoring Calculator

// show main results
function displayResults(nUp, docStarts, scorePositions) {
  window.lastScorePositions = [...scorePositions];
  window.currentAdjustedScores = [...scorePositions];
  clearAdjustedResults();

  const container = document.getElementById("results");
  let html = `<div><strong>N-up:</strong> ${nUp}</div>`;
  html += buildDocStartTable(docStarts);
  html += buildScoreTable(scorePositions);
  container.innerHTML = html;
}

// show adjusted scores
function displayAdjustedResults(adjustedScores) {
  const container = document.getElementById("adjusted-results");
  let html = `<div><strong>Adjusted Scores</strong></div>`;
  html += buildAdjustedTable(adjustedScores);
  container.innerHTML = html;
}

// clear adjusted area
function clearAdjustedResults() {
  document.getElementById("adjusted-results").innerHTML = "";
}

// table builders
function buildDocStartTable(docStarts) {
  let rows = `<table>
    <tr><th>#</th><th>Doc Start (in)</th></tr>`;
  docStarts.forEach((pos, i) => {
    rows += `<tr><td>${i + 1}</td><td>${pos.toFixed(3)}</td></tr>`;
  });
  rows += `</table>`;
  return rows;
}

function buildScoreTable(scorePositions) {
  let rows = `<table>
    <tr><th>#</th><th>Score Pos (in)</th></tr>`;
  scorePositions.forEach((pos, i) => {
    rows += `<tr><td>${i + 1}</td><td>${pos.toFixed(3)}</td></tr>`;
  });
  rows += `</table>`;
  return rows;
}

function buildAdjustedTable(adjustedScores) {
  let rows = `<table>
    <tr><th>#</th><th>Adjusted (in)</th></tr>`;
  adjustedScores.forEach((pos, i) => {
    rows += `<tr><td>${i + 1}</td><td>${pos.toFixed(3)}</td></tr>`;
  });
  rows += `</table>`;
  return rows;
}

// generic picker: buttons + custom input
function createPicker(containerId, presets, defaultValue, onSelect) {
  const container = document.getElementById(containerId);
  const presetsEl = container.querySelector(".picker-presets");
  const customContainer = container.querySelector(".picker-custom");
  const inputEl = customContainer ? customContainer.querySelector("input") : null;

  presetsEl.innerHTML = "";
  let buttons = [];

  // update UI and callback
  function selectValue(val) {
    buttons.forEach(btn => btn.classList.toggle("active", parseFloat(btn.dataset.value) === val));
    const isPreset = buttons.some(btn => parseFloat(btn.dataset.value) === val);
    if (inputEl) {
      inputEl.value = isPreset ? "" : val;
    }
    onSelect(val);
  }

  // make preset buttons
  presets.forEach(val => {
    const btn = document.createElement("button");
    btn.textContent = val;
    btn.dataset.value = val;
    btn.className = "picker-btn";
    btn.addEventListener("click", () => selectValue(val));
    presetsEl.appendChild(btn);
    buttons.push(btn);
  });

  // custom input listener
  if (inputEl) {
    if (inputEl._listener) inputEl.removeEventListener("input", inputEl._listener);
    const listener = () => {
      const v = parseFloat(inputEl.value);
      if (!isNaN(v)) selectValue(v);
    };
    inputEl.addEventListener("input", listener);
    inputEl._listener = listener;
  }

  // initialize
  selectValue(defaultValue);
}

// setup pickers
document.addEventListener("DOMContentLoaded", () => {
  window.lastScorePositions = [];
  window.currentAdjustedScores = [];

  createPicker("sheet-picker", CONFIG.sheetPresets, CONFIG.pageLength, val => {
    CONFIG.pageLength = val;
    runCalculator();
  });

  createPicker("doc-picker", CONFIG.docPresets, CONFIG.docLength, val => {
    CONFIG.docLength = val;
    runCalculator();
  });

  createPicker("gutter-picker", CONFIG.gutterPresets, CONFIG.gutterSize, val => {
    CONFIG.gutterSize = val;
    runCalculator();
  });

  createPicker(
    "score-picker",
    CONFIG.scoreTypes.map(opt => opt.value),
    CONFIG.scoreType,
    val => {
      CONFIG.scoreType = val;
      selectScoreType(val);
      runCalculator();
    }
  );
});