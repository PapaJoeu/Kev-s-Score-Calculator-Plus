// UI: handles DOM updates and table building

let lastScorePositions = [];       // Original calculated score positions
let currentAdjustedScores = [];    // Current state of adjusted scores

/**
 * Displays the main results: N-up, document starts, score positions
 * @param {number} nUp - number of documents that fit
 * @param {number[]} docStarts - document start positions
 * @param {number[]} scorePositions - original score positions
 */
function displayResults(nUp, docStarts, scorePositions) {
  lastScorePositions = [...scorePositions];
  currentAdjustedScores = [...scorePositions];  // Reset adjustments
  clearAdjustedResults();

  const container = document.getElementById("results");
  let html = `<div><strong>N-up:</strong> ${nUp}</div>`;
  html += buildDocStartTable(docStarts);
  html += buildScoreTable(scorePositions);
  container.innerHTML = html;
}

/**
 * Displays adjusted score positions
 * @param {number[]} adjustedScores - adjusted positions
 */
function displayAdjustedResults(adjustedScores) {
  const container = document.getElementById("adjusted-results");
  let html = `<div><strong>Adjusted Scores</strong></div>`;
  html += buildAdjustedTable(adjustedScores);
  container.innerHTML = html;
}

/**
 * Builds a table for document start positions
 * @param {number[]} docStarts 
 * @returns {string} HTML string
 */
function buildDocStartTable(docStarts) {
  let rows = `<table>
    <tr><th>#</th><th>Document Start (in)</th></tr>`;
  docStarts.forEach((pos, i) => {
    rows += `<tr><td>${i + 1}</td><td>${pos.toFixed(3)}</td></tr>`;
  });
  rows += `</table>`;
  return rows;
}

/**
 * Builds a table for score positions
 * @param {number[]} scorePositions 
 * @returns {string} HTML string
 */
function buildScoreTable(scorePositions) {
  let rows = `<table>
    <tr><th>#</th><th>Score Position (in)</th></tr>`;
  scorePositions.forEach((pos, i) => {
    rows += `<tr><td>${i + 1}</td><td>${pos.toFixed(3)}</td></tr>`;
  });
  rows += `</table>`;
  return rows;
}

/**
 * Builds a table for adjusted score positions
 * @param {number[]} adjustedScores 
 * @returns {string} HTML string
 */
function buildAdjustedTable(adjustedScores) {
  let rows = `<table>
    <tr><th>Adjusted #</th><th>Measurement (in)</th></tr>`;
  adjustedScores.forEach((pos, i) => {
    rows += `<tr><td>${i + 1}</td><td>${pos.toFixed(3)}</td></tr>`;
  });
  rows += `</table>`;
  return rows;
}

/**
 * Clears the adjusted results section
 */
function clearAdjustedResults() {
  document.getElementById("adjusted-results").innerHTML = "";
}
