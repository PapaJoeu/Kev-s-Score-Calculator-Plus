// MAIN: controls the app's logic flow and event bindings

/**
 * Runs the calculator:
 * - Validates inputs
 * - Calculates positions
 * - Displays results + draws visualization
 */
function runCalculator() {
  const pageLength = CONFIG.pageLength;
  const docLength = CONFIG.docLength;

  // Validate inputs
  if (isNaN(pageLength) || pageLength <= 0 || isNaN(docLength) || docLength <= 0) {
    alert("Please enter valid positive numbers for page length and document length.");
    return;
  }

  // Calculate how many documents fit
  const maxDocs = calculateMaxDocuments(pageLength, docLength, CONFIG.gutterSize);

  // Get document start positions
  const docStarts = calculateDocumentStartPositions(pageLength, docLength, maxDocs, CONFIG.gutterSize);

  // Determine score positions based on scoring type
  const scoreType = CONFIG.scoreType;
  const customScoresInput = document.getElementById("custom-scores").value.trim();
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

  // Display results and reset adjustments
  displayResults(maxDocs, docStarts, scorePositions);

  // Draw canvas visualizer
  drawVisualization(pageLength, docStarts, docLength, scorePositions);
}

/**
 * Adjusts scores by adding delta to current adjusted positions
 * @param {number} delta - amount to adjust (positive = right, negative = left)
 */
function adjustScores(delta) {
  if (!currentAdjustedScores || currentAdjustedScores.length === 0) {
    alert("Please calculate first before adjusting.");
    return;
  }

  currentAdjustedScores = currentAdjustedScores.map(p => roundTo3(p + delta));
  displayAdjustedResults(currentAdjustedScores);
}

/**
 * Show/hide custom score input field
 * @param {string} value 
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
