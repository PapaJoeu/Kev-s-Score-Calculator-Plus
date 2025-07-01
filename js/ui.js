// UI logic for Kev's Scoring Calculator

// build combined scores table with original and adjusted values
function buildCombinedScoreTable(orig, adjusted) {
  let html = `<table><tr><th>#</th><th>Score Pos (in)</th><th>Adjusted Score (in)</th></tr>`;
  orig.forEach((pos, i) => {
    const adj = adjusted[i] !== undefined ? adjusted[i].toFixed(3) : '';
    html += `<tr><td>${i + 1}</td><td>${pos.toFixed(3)}</td><td>${adj}</td></tr>`;
  });
  html += `</table>`;
  return html;
}

/* ======== RESULTS DISPLAY FUNCTIONS ======== */
// show main results
function displayResults(nUp, docStarts, scorePositions) {
  window.lastScorePositions = [...scorePositions];
  // render combined scores table
  const resultsEl = document.getElementById("results");
  let html = `<div><strong>N-up:</strong> ${nUp}</div>`;
  html += buildCombinedScoreTable(scorePositions, window.currentAdjustedScores);
  resultsEl.innerHTML = html;
  // render doc start positions below
  const docEl = document.getElementById("doc-starts");
  docEl.innerHTML = buildDocStartTable(docStarts);
}

/* ======== TABLE BUILDERS ======== */
// generic table generator
function buildTable(headers, dataRows) {
  let html = `<table><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
  dataRows.forEach((val, i) => {
    html += `<tr><td>${i + 1}</td><td>${val.toFixed(3)}</td></tr>`;
  });
  html += `</table>`;
  return html;
}

// specialized table wrappers
function buildDocStartTable(data) {
  return buildTable(['#', 'Doc Start (in)'], data);
}

/* ======== PICKER GENERATOR ======== */
// generic picker: buttons + optional custom input
function createPicker(containerId, presets, defaultValue, onSelect) {
  const container = document.getElementById(containerId);
  const presetsEl = container.querySelector(".picker-presets");
  const customContainer = container.querySelector(".picker-custom");
  const inputEl = customContainer ? customContainer.querySelector("input") : null;
  
  // Determine if this is a scoring picker (has custom-scores-container)
  const isScorePicker = containerId === "score-picker";

  presetsEl.innerHTML = "";
  let buttons = [];

  // update UI and callback
  function selectValue(val) {
    // Handle custom button selection differently for score picker vs dimension pickers
    if (val === 'custom') {
      buttons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.value === 'custom');
      });
      
      if (isScorePicker) {
        // For score picker, just call onSelect immediately (it will handle showing custom input)
        onSelect(val);
      } else {
        // For dimension pickers, show the custom input field
        if (customContainer) {
          customContainer.classList.add("show");
          if (inputEl) inputEl.focus();
        }
        return; // Don't call onSelect yet, wait for input
      }
    } else {
      // Hide custom input and update buttons
      if (customContainer && !isScorePicker) {
        customContainer.classList.remove("show");
      }
      buttons.forEach(btn =>
        btn.classList.toggle("active", btn.dataset.value === val || parseFloat(btn.dataset.value) === val)
      );
      if (inputEl && !isScorePicker) inputEl.value = "";
      onSelect(val);
    }
  }

  // create preset buttons
  presets.forEach(val => {
    const btn = document.createElement("button");
    
    // Handle button text and styling
    if (val === 'custom') {
      btn.textContent = isScorePicker ? 'Custom Score' : 'Custom Size';
      btn.className = isScorePicker ? "picker-btn" : "picker-btn custom-btn";
    } else {
      btn.textContent = val;
      btn.className = "picker-btn";
    }
    
    btn.dataset.value = val;
    btn.addEventListener("click", () => selectValue(val));
    presetsEl.appendChild(btn);
    buttons.push(btn);
  });

  // wire custom input if present (only for dimension pickers)
  if (inputEl && !isScorePicker) {
    if (inputEl._listener) inputEl.removeEventListener("input", inputEl._listener);
    const listener = () => {
      const v = parseFloat(inputEl.value);
      if (!isNaN(v)) {
        // Mark custom button as active and call onSelect
        buttons.forEach(btn => {
          btn.classList.toggle("active", btn.dataset.value === 'custom');
        });
        onSelect(v);
      }
    };
    inputEl.addEventListener("input", listener);
    inputEl._listener = listener;
  }

  // initialize with default
  selectValue(defaultValue);
}

/* ======== INITIALIZATION ======== */
document.addEventListener("DOMContentLoaded", () => {
  window.lastScorePositions = [];
  window.currentAdjustedScores = [];

  createPicker(
    "sheet-picker",
    CONFIG.sheetPresets,
    CONFIG.pageLength,
    val => {
      CONFIG.pageLength = val;
      runCalculator();
    }
  );

  createPicker(
    "doc-picker",
    CONFIG.docPresets,
    CONFIG.docLength,
    val => {
      CONFIG.docLength = val;
      runCalculator();
    }
  );

  createPicker(
    "gutter-picker",
    CONFIG.gutterPresets,
    CONFIG.gutterSize,
    val => {
      CONFIG.gutterSize = val;
      runCalculator();
    }
  );

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