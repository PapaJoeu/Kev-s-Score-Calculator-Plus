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

  console.log('[runCalculator] Starting with config:', { pageLength, docLength, gutterSize, scoreType });

  // input validation
  if (isNaN(pageLength) || pageLength <= 0 ||
      isNaN(docLength)  || docLength  <= 0) {
    console.log('[runCalculator] Validation failed:', { pageLength, docLength });
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

  console.log('[runCalculator] Calculated scorePositions:', scorePositions);

  // store last inputs for adjustments
  window._lastNup = nUp;
  window._lastDocStarts = [...docStarts];

  // initialize adjusted positions
  window.currentAdjustedScores = [...scorePositions];
  window.lastScorePositions     = [...scorePositions];

  console.log('[runCalculator] Initialized adjusted scores:', window.currentAdjustedScores);

  // display results and visualization
  displayResults(nUp, docStarts, scorePositions);
  drawVisualization(pageLength, docStarts, docLength, scorePositions);
}

/**
 * Adjusts current scores by delta and re-renders table/visuals.
 * @param {number} delta amount to shift each score position
 */
function adjustScores(delta) {
  // Debug logging to understand the state
  console.log('[adjustScores] checking state:', {
    currentAdjustedScores: window.currentAdjustedScores,
    length: window.currentAdjustedScores?.length,
    lastNup: window._lastNup,
    lastDocStarts: window._lastDocStarts
  });

  // Check if we have valid adjusted scores to work with
  if (!window.currentAdjustedScores || window.currentAdjustedScores.length === 0) {
    console.log('[adjustScores] No adjusted scores available, trying to run calculator first');
    // Try to run calculator first to initialize the scores
    runCalculator();
    // Check again after running calculator
    if (!window.currentAdjustedScores || window.currentAdjustedScores.length === 0) {
      alert("Please calculate first before adjusting. Make sure sheet and document lengths are valid positive numbers.");
      return;
    }
  }
  
  console.log('[adjustScores] Applying delta:', delta);
  // update adjusted scores
  window.currentAdjustedScores = window.currentAdjustedScores.map(p => roundTo3(p + delta));
  // re-display using last inputs and adjusted scores
  displayResults(window._lastNup, window._lastDocStarts, window.currentAdjustedScores);
  // redraw visualization with adjusted scores
  const pageLength = CONFIG.pageLength;
  const docLength = CONFIG.docLength;
  drawVisualization(pageLength, window._lastDocStarts, docLength, window.currentAdjustedScores);
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
