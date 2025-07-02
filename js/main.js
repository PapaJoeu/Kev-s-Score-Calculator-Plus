// MAIN: controls the app's logic flow and event bindings

// track last inputs for re-rendering on adjustments
window._lastNup = 0;
window._lastDocStarts = [];

// track adjustment state
window.netAdjustment = 0;  // integer multiplier for adjustments
window.originalScores = []; // store original scores before any adjustments

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

  // reset adjustment tracking
  window.netAdjustment = 0;
  updateAdjustDisplay();

  // store last inputs for adjustments
  window._lastNup = nUp;
  window._lastDocStarts = [...docStarts];

  // store original and current scores
  window.originalScores = [...scorePositions];
  window.currentAdjustedScores = [...scorePositions];
  window.lastScorePositions     = [...scorePositions];

  console.log('[runCalculator] Initialized adjusted scores:', window.currentAdjustedScores);

  // display results and visualization
  displayResults(nUp, docStarts, scorePositions);
  drawVisualization(pageLength, docStarts, docLength, scorePositions, gutterSize);
}

/**
 * Adjusts current scores by incrementing/decrementing the net adjustment multiplier.
 * @param {number} direction +1 for right, -1 for left
 */
function adjustScores(direction) {
  // Check if we have valid original scores to work with
  if (!window.originalScores || window.originalScores.length === 0) {
    console.log('[adjustScores] No original scores available, trying to run calculator first');
    runCalculator();
    if (!window.originalScores || window.originalScores.length === 0) {
      alert("Please calculate first before adjusting. Make sure sheet and document lengths are valid positive numbers.");
      return;
    }
  }
  
  // Update net adjustment multiplier
  window.netAdjustment += direction;
  
  // Calculate total adjustment
  const totalAdjustment = window.netAdjustment * CONFIG.adjustmentIncrement;
  
  console.log('[adjustScores] Net adjustment:', window.netAdjustment, 'Total:', totalAdjustment);
  
  // Apply adjustment to original scores
  window.currentAdjustedScores = window.originalScores.map(p => roundTo3(p + totalAdjustment));
  
  // Update display
  updateAdjustDisplay();
  
  // Re-display results and visualization
  displayResults(window._lastNup, window._lastDocStarts, window.currentAdjustedScores);
  const pageLength = CONFIG.pageLength;
  const docLength = CONFIG.docLength;
  const gutterSize = CONFIG.gutterSize;
  const adjustmentInfo = { netAdjustment: window.netAdjustment };
  drawVisualization(pageLength, window._lastDocStarts, docLength, window.currentAdjustedScores, gutterSize, adjustmentInfo);
}

/**
 * Toggles visibility of custom-scores input.
 * @param {string} value selected score type
 */
function selectScoreType(value) {
  const customContainer = document.getElementById("custom-scores-container");
  const customBtn = document.querySelector('#score-picker .picker-btn[data-value="custom"]');
  
  if (value === "custom") {
    // Check if it's currently active/visible to implement toggle
    const isCurrentlyVisible = customContainer.classList.contains("show");
    
    if (isCurrentlyVisible) {
      // Hide it (toggle off)
      customContainer.classList.remove("show");
      if (customBtn) customBtn.classList.remove("active");
    } else {
      // Show it (toggle on)
      customContainer.classList.add("show");
      if (customBtn) customBtn.classList.add("active");
      document.getElementById("custom-scores").focus();
    }
  } else {
    // Hide custom input when other score types are selected
    customContainer.classList.remove("show");
    if (customBtn) customBtn.classList.remove("active");
  }
}

/**
 * Updates the adjustment display with current net adjustment value.
 */
function updateAdjustDisplay() {
  const totalAdjustment = window.netAdjustment * CONFIG.adjustmentIncrement;
  const displayValue = totalAdjustment >= 0 ? `+${totalAdjustment.toFixed(3)}` : totalAdjustment.toFixed(3);
  
  const adjustDisplay = document.getElementById("adjust-display");
  if (adjustDisplay) {
    adjustDisplay.textContent = displayValue;
  }
}

/**
 * Resets adjustment tracking when inputs change.
 */
function resetAdjustments() {
  window.netAdjustment = 0;
  updateAdjustDisplay();
}
