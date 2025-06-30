// UI: handles DOM updates, table rendering

let lastScorePositions = []; // Tracks unadjusted scores for adjustments

function displayResults(nUp, docStarts, scorePositions) {
  lastScorePositions = [...scorePositions];
  const container = document.getElementById("results");
  let html = `<div><strong>N-up:</strong> ${nUp}</div>`;
  html += buildResultsTable(docStarts, scorePositions);
  container.innerHTML = html;
}

function displayAdjustedResults(adjustedScores) {
  const container = document.getElementById("adjusted-results");
  let html = `<div><strong>Adjusted Scores</strong></div>`;
  html += buildAdjustedTable(adjustedScores);
  container.innerHTML = html;
}

function buildResultsTable(docStarts, scorePositions) {
  let rows = `<table>
    <tr>${CONFIG.tableHeaders.results.map(h => `<th>${h}</th>`).join("")}</tr>`;
  docStarts.forEach((pos, i) => {
    rows += `<tr><td>Document Start</td><td>${i + 1}</td><td>${pos.toFixed(3)}</td></tr>`;
  });
  scorePositions.forEach((pos, i) => {
    rows += `<tr><td>Score Position</td><td>${i + 1}</td><td>${pos.toFixed(3)}</td></tr>`;
  });
  rows += `</table>`;
  return rows;
}

function buildAdjustedTable(adjustedScores) {
  let rows = `<table>
    <tr>${CONFIG.tableHeaders.adjusted.map(h => `<th>${h}</th>`).join("")}</tr>`;
  adjustedScores.forEach((pos, i) => {
    rows += `<tr><td>${i + 1}</td><td>${pos.toFixed(3)}</td></tr>`;
  });
  rows += `</table>`;
  return rows;
}

function clearAdjustedResults() {
  document.getElementById("adjusted-results").innerHTML = "";
}
