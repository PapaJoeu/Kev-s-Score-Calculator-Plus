// Canvas visualizer for Kev's Scoring Calculator

// Draw sheet, documents, and score lines
function drawVisualization(pageLength, docStarts, docLength, scorePositions) {
  const canvas = document.getElementById("visualizer");
  const ctx = canvas.getContext("2d");

  // set canvas size from config
  canvas.width = CONFIG.canvas.width;
  canvas.height = CONFIG.canvas.height;

  const W = canvas.width;
  const H = canvas.height;

  // clear previous drawing
  ctx.clearRect(0, 0, W, H);

  // calculate scale: pixels per inch
  const scale = W / pageLength;
  if (scale <= 0 || !isFinite(scale)) {
    alert("Invalid page length for visualization.");
    return;
  }

  ctx.save();

  // draw sheet outline
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, H / 4, W, H / 2);

  // draw documents
  ctx.fillStyle = "#87cefa";
  docStarts.forEach(start => {
    const x = start * scale;
    const w = docLength * scale;
    ctx.fillRect(x, H / 4, w, H / 2);
  });

  // draw score lines
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
