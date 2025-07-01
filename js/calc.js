/**
 * calc.js
 * Core functions for calculating document imposition and scoring.
 * Provides helpers to compute positions and score values for different fold types.
 * Adds console.log tracing for easy debugging.
 */


function calculateMaxDocuments(pageLength, docLength, gutterSize = CONFIG.gutterSize) {
  console.log('[calculateMaxDocuments] called with', { pageLength, docLength, gutterSize });
  const max = Math.floor((pageLength + gutterSize) / (docLength + gutterSize));
  console.log('[calculateMaxDocuments] result', max);
  return max;
}

/**
 * Compute starting positions for each document on a page.
 * Centers the group by distributing remaining space evenly.
 * @param {number} pageLength - Total page length.
 * @param {number} docLength - Single document length.
 * @param {number} maxDocs - Number of documents to position.
 * @param {number} gutterSize - Space between docs.
 * @returns {number[]} Array of start positions.
 */
function calculateDocumentStartPositions(pageLength, docLength, maxDocs, gutterSize = CONFIG.gutterSize) {
  console.log('[calculateDocumentStartPositions] called with', { pageLength, docLength, maxDocs, gutterSize });
  const totalOccupied = (maxDocs * docLength) + ((maxDocs - 1) * gutterSize);
  const remainingSpace = pageLength - totalOccupied;
  const startOffset = remainingSpace / 2;
  console.log('[calculateDocumentStartPositions] totalOccupied', totalOccupied, 'remainingSpace', remainingSpace, 'startOffset', startOffset);

  const starts = [];
  for (let i = 0; i < maxDocs; i++) {
    const pos = startOffset + i * (docLength + gutterSize);
    starts.push(roundTo3(pos));
  }
  console.log('[calculateDocumentStartPositions] result', starts);
  return starts;
}

/**
 * Calculate scoring positions for bifold documents.
 * @param {number[]} docStarts - Array of document start positions.
 * @param {number} docLength - Length of a single document.
 * @returns {number[]} Array of bifold score positions.
 */
function calculateBifoldScores(docStarts, docLength) {
  console.log('[calculateBifoldScores] called with', { docStarts, docLength });
  const scores = docStarts.map(start => roundTo3(start + (docLength / 2)));
  console.log('[calculateBifoldScores] result', scores);
  return scores;
}

/**
 * Calculate scoring positions for trifold documents.
 * @param {number[]} docStarts - Array of document start positions.
 * @param {number} docLength - Length of a single document.
 * @returns {number[]} Array of trifold score positions.
 */
function calculateTrifoldScores(docStarts, docLength) {
  console.log('[calculateTrifoldScores] called with', { docStarts, docLength });
  const scores = [];
  docStarts.forEach(start => {
    scores.push(roundTo3(start + (docLength / 3)));
    scores.push(roundTo3(start + (2 * docLength / 3)));
  });
  console.log('[calculateTrifoldScores] result', scores);
  return scores;
}

/**
 * Calculate scoring positions for gatefold documents.
 * @param {number[]} docStarts - Array of document start positions.
 * @param {number} docLength - Length of a single document.
 * @returns {number[]} Array of gatefold score positions.
 */
function calculateGatefoldScores(docStarts, docLength) {
  console.log('[calculateGatefoldScores] called with', { docStarts, docLength });
  const scores = [];
  docStarts.forEach(start => {
    scores.push(roundTo3(start + (docLength / 4)));
    scores.push(roundTo3(start + (3 * docLength / 4)));
  });
  console.log('[calculateGatefoldScores] result', scores);
  return scores;
}

/**
 * Calculate custom scoring positions based on input offsets.
 * @param {number[]} docStarts - Array of document start positions.
 * @param {number} docLength - Length of a single document.
 * @param {string} input - Comma-separated offsets within the document.
 * @returns {number[]} Sorted array of custom score positions.
 */
function calculateCustomDocScores(docStarts, docLength, input) {
  console.log('[calculateCustomDocScores] called with', { docStarts, docLength, input });
  if (!input) {
    console.log('[calculateCustomDocScores] result', []);
    return [];
  }
  const offsets = input.split(",").map(x => parseFloat(x.trim()));
  const validOffsets = offsets.filter(o => !isNaN(o) && o >= 0 && o <= docLength);

  const positions = [];
  docStarts.forEach(start => {
    validOffsets.forEach(offset => {
      positions.push(roundTo3(start + offset));
    });
  });
  const sortedPositions = positions.sort((a, b) => a - b);
  console.log('[calculateCustomDocScores] result', sortedPositions);
  return sortedPositions;
}

/**
 * Round a number to three decimal places.
 * @param {number} value - The value to round.
 * @returns {number} Rounded result.
 */
function roundTo3(value) {
  console.log('[roundTo3] called with', value);
  const rounded = Math.round(value * 1000) / 1000;
  console.log('[roundTo3] result', rounded);
  return rounded;
}
