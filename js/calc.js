/**
 * Core calculation functions for document imposition and scoring
 */

// ===========================================
// MATH UTILITIES
// ===========================================

/**
 * Round to 3 decimal places for precise measurements
 */
function roundTo3(value) {
  if (typeof value !== 'number' || isNaN(value)) return 0;
  return Math.round(value * 1000) / 1000;
}

/**
 * Validate positive number inputs
 */
function isValidPositiveNumber(value, name = 'value') {
  if (typeof value !== 'number' || isNaN(value) || value <= 0) {
    console.warn(`Invalid ${name}:`, value);
    return false;
  }
  return true;
}

// ===========================================
// DOCUMENT LAYOUT
// ===========================================

/**
 * Calculate max documents that fit on sheet
 */
function calculateMaxDocuments(pageLength, docLength, gutterSize = CONFIG.gutterSize) {
  if (!isValidPositiveNumber(pageLength, 'pageLength') || 
      !isValidPositiveNumber(docLength, 'docLength')) {
    return 0;
  }
  
  const gutterSizeValue = gutterSize || 0;
  // Floor division: fit as many complete doc+gutter units as possible
  const maxDocs = Math.floor((pageLength + gutterSizeValue) / (docLength + gutterSizeValue));
  
  console.log(`${maxDocs} documents fit on ${pageLength}" sheet`);
  return maxDocs;
}

/**
 * Calculate total space used by docs and gutters
 */
function calculateOccupiedSpace(docLength, numDocs, gutterSize) {
  const docSpace = numDocs * docLength;
  const gutterSpace = (numDocs - 1) * gutterSize; // n-1 gutters for n docs
  return docSpace + gutterSpace;
}

/**
 * Calculate starting offset to center documents on sheet
 */
function calculateCenteringOffset(pageLength, occupiedSpace) {
  const remainingSpace = pageLength - occupiedSpace;
  return Math.max(0, remainingSpace / 2); // Never negative offset
}

/**
 * Calculate starting positions for each document (centered on sheet)
 */
function calculateDocumentStartPositions(pageLength, docLength, maxDocs, gutterSize = CONFIG.gutterSize) {
  if (!isValidPositiveNumber(pageLength, 'pageLength') || 
      !isValidPositiveNumber(docLength, 'docLength') ||
      !Number.isInteger(maxDocs) || maxDocs <= 0) {
    return [];
  }

  const gutterSizeValue = gutterSize || 0;
  const occupiedSpace = calculateOccupiedSpace(docLength, maxDocs, gutterSizeValue);
  const startOffset = calculateCenteringOffset(pageLength, occupiedSpace);
  
  const positions = [];
  for (let i = 0; i < maxDocs; i++) {
    const position = startOffset + i * (docLength + gutterSizeValue);
    positions.push(roundTo3(position));
  }
  
  console.log(`Positioned ${maxDocs} documents:`, positions);
  return positions;
}

// ===========================================
// SCORE CALCULATIONS
// ===========================================

/**
 * Convert relative offsets to absolute positions across all documents
 */
function calculateScorePositions(docStarts, relativeOffsets) {
  const positions = [];
  
  // For each document, add each score offset to its start position
  docStarts.forEach(start => {
    relativeOffsets.forEach(offset => {
      positions.push(roundTo3(start + offset));
    });
  });
  
  return positions.sort((a, b) => a - b);
}

/**
 * Get score offsets for each fold type
 */
function getBifoldOffsets(docLength) {
  return [docLength / 2]; // Single center fold
}

function getTrifoldOffsets(docLength) {
  return [docLength / 3, (2 * docLength) / 3]; // Two equal folds
}

function getGatefoldOffsets(docLength) {
  return [docLength / 4, (3 * docLength) / 4]; // Outer panels fold in
}

/**
 * Parse custom score input and validate against document bounds
 */
function parseCustomScoreOffsets(input, docLength) {
  if (!input || typeof input !== 'string') return [];
  
  const offsets = input.split(',')
    .map(x => parseFloat(x.trim()))
    .filter(offset => {
      if (isNaN(offset)) return false;
      if (offset < 0 || offset > docLength) {
        console.warn(`Score ${offset} outside document bounds (0-${docLength})`);
        return false;
      }
      return true;
    });
  
  return offsets.sort((a, b) => a - b);
}

// ===========================================
// MAIN SCORE FUNCTIONS
// ===========================================

/**
 * Calculate bifold scoring positions
 */
function calculateBifoldScores(docStarts, docLength) {
  if (!isValidPositiveNumber(docLength, 'docLength')) return [];
  
  const offsets = getBifoldOffsets(docLength);
  const scores = calculateScorePositions(docStarts, offsets);
  
  console.log(`Generated ${scores.length} bifold scores`);
  return scores;
}

/**
 * Calculate trifold scoring positions
 */
function calculateTrifoldScores(docStarts, docLength) {
  if (!isValidPositiveNumber(docLength, 'docLength')) return [];
  
  const offsets = getTrifoldOffsets(docLength);
  const scores = calculateScorePositions(docStarts, offsets);
  
  console.log(`Generated ${scores.length} trifold scores`);
  return scores;
}

/**
 * Calculate gatefold scoring positions
 */
function calculateGatefoldScores(docStarts, docLength) {
  if (!isValidPositiveNumber(docLength, 'docLength')) return [];
  
  const offsets = getGatefoldOffsets(docLength);
  const scores = calculateScorePositions(docStarts, offsets);
  
  console.log(`Generated ${scores.length} gatefold scores`);
  return scores;
}

/**
 * Calculate custom scoring positions from user input
 */
function calculateCustomDocScores(docStarts, docLength, input) {
  if (!isValidPositiveNumber(docLength, 'docLength')) return [];
  
  const offsets = parseCustomScoreOffsets(input, docLength);
  if (offsets.length === 0) {
    console.log('No valid custom scores provided');
    return [];
  }
  
  const scores = calculateScorePositions(docStarts, offsets);
  
  console.log(`Generated ${scores.length} custom scores from: "${input}"`);
  return scores;
}
