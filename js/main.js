// MAIN: handles app control flow, event triggers

/**
 * Runs the entire calculator:
 * - Reads inputs
 * - Performs calculations
 * - Displays results
 * - Draws visualization
 */
function runCalculator() {
  // --- LAYMAN'S: Get the sheet and document sizes the user entered ---
  // TECH: Parse values from input fields, convert to float
  const pageLength = parseFloat(document.getElementById("page-length").value.trim());
  const docLength = parseFloat(document.getElementById("doc-length").value.trim());

  // --- LAYMAN'S: Check if the numbers make sense ---
  // TECH: Validate positive numbers
  if (isNaN(pageLength) || pageLength <= 0 || isNaN(docLength) || docLength <= 0) {
    alert("Please enter valid positive numbers for page length and document length.");
    return;
  }

  // --- LAYMAN'S: Find out how many documents fit ---
  const maxDocs = calculateMaxDocuments(pageLength, docLength);

  // --- LAYMAN'S: Find out where each document starts ---
  const docStarts = calculateDocumentStartPositions(pageLength, docLength, maxDocs);

  // --- LAYMAN'S: Decide where the score lines go ---
  // TECH: Call appropriate scoring function based on user selection
  const scoreType = document.getElementById("score-type").value;
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

  // --- LAYMAN'S: Show results in a table ---
  displayResults(maxDocs, docStarts, scorePositions);

  // --- LAYMAN'S: Draw the sheet, documents, and scores ---
  drawVisualization(pageLength, docStarts, docLength, scorePositions);

  // --- LAYMAN'S: Clear any old adjusted results ---
  clearAdjustedResults();
}

/**
 * Adjusts score positions left or right and displays adjusted table
 * @param {number} delta - how much to shift scores (positive = right, negative = left)
 */
function adjustScores(delta) {
  // --- LAYMAN'S: Make sure there's something to adjust ---
  if (!lastScorePositions || lastScorePositions.length === 0) {
    alert("Please calculate first before adjusting.");
    return;
  }

  // --- LAYMAN'S: Move all scores by delta ---
  // TECH: Shift and round each score
  const adjusted = lastScorePositions.map(p => roundTo3(p + delta));

  // --- LAYMAN'S: Show the adjusted numbers in a table ---
  displayAdjustedResults(adjusted);
}

/**
 * Quick set page length
 * @param {number} value
 */
function quickSelectPageLength(value) {
  document.getElementById("page-length").value = value;
}

/**
 * Quick set document length
 * @param {number} value
 */
function quickSelectDocLength(value) {
  document.getElementById("doc-length").value = value;
}

/**
 * Handles display of custom score input based on dropdown
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
