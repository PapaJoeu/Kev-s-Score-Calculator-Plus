// DRAW: handles canvas visualizer

/**
 * Draws the sheet, documents, and scores on the canvas
 * @param {number} pageLength - total length of the sheet
 * @param {number[]} docStarts - starting positions of each document
 * @param {number} docLength - length of each document
 * @param {number[]} scorePositions - positions of score lines
 */
function drawVisualization(pageLength, docStarts, docLength, scorePositions) {
  const canvas = document.getElementById("visualizer");
  const ctx = canvas.getContext("2d");
  const W = CONFIG.canvas.width;
  const H = CONFIG.canvas.height;

  // --- LAYMAN'S: Clear whatever was drawn before ---
  // TECH: Wipe canvas clean before drawing new content
  ctx.clearRect(0, 0, W, H);

  // --- LAYMAN'S: Calculate how many pixels = 1 inch ---
  // TECH: Determine scale so entire pageLength fits canvas width
  const scale = W / pageLength;
  if (!isFinite(scale) || scale <= 0) {
    alert("Page length too large or invalid for visualization.");
    return;
  }

  ctx.save();

  // --- LAYMAN'S: Draw a black rectangle representing the full sheet ---
  // TECH: Page outline from (0, height/4) to (W, height/2)
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, H / 4, W, H / 2);

  // --- LAYMAN'S: Draw each document as a blue rectangle ---
  // TECH: Each document's start and width scaled by scale factor
  ctx.fillStyle = "#87cefa";
  docStarts.forEach(start => {
    const x = start * scale;
    const w = docLength * scale;
    ctx.fillRect(x, H / 4, w, H / 2);
  });

  // --- LAYMAN'S: Draw each score as a vertical red line ---
  // TECH: Draw score lines from top to bottom of the page rectangle
  ctx.strokeStyle = "red";
  scorePositions.forEach(pos => {
    const x = pos * scale;
    ctx.beginPath();
    ctx.moveTo(x, H / 4);
    ctx.lineTo(x, 3 * H / 4);
    ctx.stroke();
  });

  ctx.restore();
}
