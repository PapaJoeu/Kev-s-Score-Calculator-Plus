// MAIN: controls the app's logic flow and event bindings

// track last inputs for re-rendering on adjustments
window._lastNup = 0;
window._lastDocStarts = [];

/**
 * Runs the calculator:
 * 1. Validates inputs
 * 2. Calculates positions
 * 3. Initializes adjusted scores
 * 4. Displays results + draws visualization
 */
function runCalculator() {
  // read configured values
  const pageLength = CONFIG.pageLength;
  const docLength = CONFIG.docLength;
  const gutterSize = CONFIG.gutterSize;
  const scoreType = CONFIG.scoreType;
  const customScoresInput = document.getElementById("custom-scores").value.trim();

  // input validation
  if (isNaN(pageLength) || pageLength <= 0 ||
      isNaN(docLength)  || docLength  <= 0) {
    alert("Please enter valid positive numbers for sheet and document lengths.");
    return;
  }

  // calculate how many docs fit per sheet
  const nUp = calculateMaxDocuments(pageLength, docLength, gutterSize);

  // calculate document start positions
  const docStarts = calculateDocumentStartPositions(pageLength, docLength, nUp, gutterSize);

  // determine score positions based on scoring type
  let scorePositions = [];
  if (scoreType === "bifold") {
    scorePositions = calculateBifoldScores(docStarts, docLength);
  } else if (scoreType === "trifold") {
    scorePositions = calculateTrifoldScores(docStarts, docLength);
  } else if (scoreType === "gatefold") {
    scorePositions = calculateGatefoldScores(docStarts, docLength);
  } else if (scoreType === "custom") {
    scorePositions = calculateCustomDocScores(docStarts, docLength, customScoresInput);
  }

  // store last inputs for adjustments
  window._lastNup = nUp;
  window._lastDocStarts = [...docStarts];

  // initialize adjusted positions
  window.currentAdjustedScores = [...scorePositions];
  window.lastScorePositions     = [...scorePositions];

  // display results and visualization
  displayResults(nUp, docStarts, scorePositions);
  drawVisualization(pageLength, docStarts, docLength, scorePositions);
}

/**
 * Adjusts current scores by delta and re-renders table/visuals.
 * @param {number} delta amount to shift each score position
 */
function adjustScores(delta) {
  if (!window.currentAdjustedScores?.length) {
    alert("Please calculate first before adjusting.");
    return;
  }
  // update adjusted scores
  window.currentAdjustedScores = window.currentAdjustedScores.map(p => roundTo3(p + delta));
  // re-display using last inputs
  displayResults(window._lastNup, window._lastDocStarts, window.lastScorePositions);
  // redraw visualization with new adjusted scores does not change viz positions
}

/**
 * Toggles visibility of custom-scores input.
 * @param {string} value selected score type
 */
function selectScoreType(value) {
  const customContainer = document.getElementById("custom-scores-container");
  if (value === "custom") {
    customContainer.style.display = "block";
    document.getElementById("custom-scores").focus();
  } else {
    customContainer.style.display = "none";
  }
}
