// CALC: handles all position + scoring calculations

function calculateMaxDocuments(pageLength, docLength, gutterSize = CONFIG.gutterSize) {
  return Math.floor((pageLength + gutterSize) / (docLength + gutterSize));
}

function calculateDocumentStartPositions(pageLength, docLength, maxDocs, gutterSize = CONFIG.gutterSize) {
  const totalOccupied = (maxDocs * docLength) + ((maxDocs - 1) * gutterSize);
  const remainingSpace = pageLength - totalOccupied;
  const startOffset = remainingSpace / 2;

  const starts = [];
  for (let i = 0; i < maxDocs; i++) {
    const pos = startOffset + i * (docLength + gutterSize);
    starts.push(roundTo3(pos));
  }
  return starts;
}

function calculateBifoldScores(docStarts, docLength) {
  return docStarts.map(start => roundTo3(start + (docLength / 2)));
}

function calculateTrifoldScores(docStarts, docLength) {
  const scores = [];
  docStarts.forEach(start => {
    scores.push(roundTo3(start + (docLength / 3)));
    scores.push(roundTo3(start + (2 * docLength / 3)));
  });
  return scores;
}

function calculateGatefoldScores(docStarts, docLength) {
  const scores = [];
  docStarts.forEach(start => {
    scores.push(roundTo3(start + (docLength / 4)));
    scores.push(roundTo3(start + (3 * docLength / 4)));
  });
  return scores;
}

function calculateCustomDocScores(docStarts, docLength, input) {
  if (!input) return [];
  const offsets = input.split(",").map(x => parseFloat(x.trim()));
  const validOffsets = offsets.filter(o => !isNaN(o) && o >= 0 && o <= docLength);

  const positions = [];
  docStarts.forEach(start => {
    validOffsets.forEach(offset => {
      positions.push(roundTo3(start + offset));
    });
  });
  return positions.sort((a, b) => a - b);
}

// Utility
function roundTo3(value) {
  return Math.round(value * 1000) / 1000;
}
