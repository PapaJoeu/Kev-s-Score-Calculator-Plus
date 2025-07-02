/**
 * Professional canvas visualizer for print production scoring
 */

// ===========================================
// CANVAS SETUP
// ===========================================

/**
 * Setup canvas with responsive sizing
 */
function setupCanvas(canvas) {
  const container = canvas.parentElement;
  const containerWidth = container.offsetWidth;
  const viewportHeight = window.innerHeight;
  
  // Mobile-first: Much larger visualizer on small screens
  const isMobile = window.innerWidth <= 430;
  const heightPercentage = isMobile ? 0.65 : 0.25; // 65% on mobile, 25% on desktop
  const minHeight = isMobile ? 400 : 200; // Higher minimum on mobile
  
  canvas.width = containerWidth;
  canvas.height = Math.max(minHeight, viewportHeight * heightPercentage);
  
  console.log(`Canvas sized for ${isMobile ? 'mobile' : 'desktop'}: ${canvas.width}x${canvas.height}`);
  
  return {
    width: canvas.width,
    height: canvas.height,
    isMobile: isMobile
  };
}

/**
 * Calculate drawing scale: pixels per inch
 */
function calculateScale(canvasWidth, pageLength) {
  const scale = canvasWidth / pageLength;
  if (scale <= 0 || !isFinite(scale)) {
    console.error("Invalid page length for visualization:", pageLength);
    return 0;
  }
  return scale;
}

// ===========================================
// DRAWING COMPONENTS  
// ===========================================

/**
 * Draw ruler with tick marks and measurements
 */
function drawRuler(ctx, pageLength, scale, canvasHeight, isMobile) {
  const rulerY = canvasHeight - 40; // Position near bottom
  const tickHeight = isMobile ? 20 : 15; // Larger ticks on mobile
  
  ctx.strokeStyle = "#666";
  ctx.fillStyle = "#666";
  ctx.font = `${getResponsiveFontSize(12, isMobile)}px Arial`;
  ctx.textAlign = "center";
  ctx.lineWidth = getResponsiveLineWidth(1, isMobile);
  
  // Draw ruler baseline
  ctx.beginPath();
  ctx.moveTo(0, rulerY);
  ctx.lineTo(pageLength * scale, rulerY);
  ctx.stroke();
  
  // Draw tick marks and labels
  for (let inch = 0; inch <= pageLength; inch++) {
    const x = inch * scale;
    
    // Major tick every inch
    ctx.beginPath();
    ctx.moveTo(x, rulerY);
    ctx.lineTo(x, rulerY + tickHeight);
    ctx.stroke();
    
    // Label every inch (larger on mobile)
    ctx.fillText(inch + '"', x, rulerY + tickHeight + (isMobile ? 18 : 15));
    
    // Minor tick at half inch
    if (inch < pageLength) {
      const halfX = (inch + 0.5) * scale;
      ctx.beginPath();
      ctx.moveTo(halfX, rulerY);
      ctx.lineTo(halfX, rulerY + tickHeight * 0.6);
      ctx.stroke();
    }
  }
}

/**
 * Draw sheet outline with dimensions
 */
function drawSheet(ctx, pageLength, scale, canvasHeight, isMobile) {
  const sheetY = canvasHeight * 0.3;
  const sheetHeight = canvasHeight * 0.4;
  const sheetWidth = pageLength * scale;
  
  // Sheet outline
  ctx.strokeStyle = "#333";
  ctx.lineWidth = getResponsiveLineWidth(2, isMobile);
  ctx.strokeRect(0, sheetY, sheetWidth, sheetHeight);
  
  return { y: sheetY, height: sheetHeight, width: sheetWidth };
}

/**
 * Draw documents with subtle borders
 */
function drawDocuments(ctx, docStarts, docLength, scale, sheetBounds, isMobile) {
  ctx.fillStyle = "#e3f2fd"; // Light blue
  ctx.strokeStyle = "#1976d2"; // Darker blue border
  ctx.lineWidth = getResponsiveLineWidth(1, isMobile);
  
  docStarts.forEach((start, index) => {
    const x = start * scale;
    const width = docLength * scale;
    
    // Document rectangle
    ctx.fillRect(x, sheetBounds.y, width, sheetBounds.height);
    ctx.strokeRect(x, sheetBounds.y, width, sheetBounds.height);
    
    // Document label positioned above the document area
    ctx.fillStyle = "#1976d2";
    ctx.font = isMobile ? "14px Arial" : "12px Arial"; // Conservative mobile increase
    ctx.textAlign = "center";
    ctx.fillText(
      `Doc ${index + 1}`, 
      x + width / 2, 
      sheetBounds.y - 15 // Position above the sheet
    );
    ctx.fillStyle = "#e3f2fd"; // Reset fill for next doc
  });
}

/**
 * Draw purple score lines with labels and adjustment indicators
 */
function drawScoreLines(ctx, scorePositions, scale, sheetBounds, adjustments = {}, isMobile, canvasHeight) {
  ctx.strokeStyle = "#7b1fa2"; // Professional purple
  ctx.lineWidth = getResponsiveLineWidth(2, isMobile);
  ctx.fillStyle = "#7b1fa2";
  ctx.font = isMobile ? "13px Arial" : "11px Arial"; // Conservative mobile increase
  ctx.textAlign = "center";
  
  // Set up dotted line pattern
  ctx.setLineDash([5, 5]); // 5px dash, 5px gap
  
  const rulerY = canvasHeight - 40; // Match ruler position
  
  scorePositions.forEach(pos => {
    const x = pos * scale;
    
    // Dotted score line extending from above sheet down to ruler
    ctx.beginPath();
    ctx.moveTo(x, sheetBounds.y - 30);
    ctx.lineTo(x, rulerY);
    ctx.stroke();
    
    // Score position label above the line
    ctx.fillText(
      pos.toFixed(3) + '"', 
      x, 
      sheetBounds.y - 35
    );
  });
  
  // Reset line dash for other drawings
  ctx.setLineDash([]);
  
  // Show adjustment indicator if any adjustments are active
  if (adjustments.netAdjustment && adjustments.netAdjustment !== 0) {
    ctx.fillStyle = "#ff5722"; // Orange for adjustments
    ctx.font = isMobile ? "14px Arial" : "12px Arial"; // Conservative mobile increase
    ctx.textAlign = "right";
    const adjustmentValue = (adjustments.netAdjustment * 0.001).toFixed(3);
    ctx.fillText(
      `Adjustment: ${adjustmentValue > 0 ? '+' : ''}${adjustmentValue}"`, 
      sheetBounds.width - 10, 
      sheetBounds.y - 45
    );
  }
}

/**
 * Draw measurement labels
 */
function drawLabels(ctx, pageLength, docLength, gutterSize, scale, isMobile) {
  ctx.fillStyle = "#333";
  ctx.font = isMobile ? "14px Arial" : "12px Arial";
  ctx.textAlign = "left";
  
  // Sheet and document measurements only
  ctx.fillText(`Sheet Length: ${pageLength}"`, 10, 25);
  ctx.fillText(`Document Length: ${docLength}"`, 10, 42);
}

/**
 * Draw gutter areas between documents
 */
function drawGutters(ctx, docStarts, docLength, gutterSize, scale, sheetBounds) {
  if (gutterSize <= 0 || docStarts.length <= 1) return;
  
  ctx.fillStyle = "#ffecb3"; // Light amber for gutters
  ctx.strokeStyle = "#ff8f00"; // Darker amber border
  ctx.lineWidth = 1;
  
  // Draw gutter between each pair of documents
  for (let i = 0; i < docStarts.length - 1; i++) {
    const docEnd = (docStarts[i] + docLength) * scale;
    const gutterWidth = gutterSize * scale;
    
    ctx.fillRect(docEnd, sheetBounds.y, gutterWidth, sheetBounds.height);
    ctx.strokeRect(docEnd, sheetBounds.y, gutterWidth, sheetBounds.height);
  }
}

// ===========================================
// MAIN DRAWING FUNCTION
// ===========================================

/**
 * Draw complete visualization with professional print production layout
 */
function drawVisualization(pageLength, docStarts, docLength, scorePositions, gutterSize = 0, adjustments = {}) {
  const canvas = document.getElementById("visualizer");
  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }
  
  const ctx = canvas.getContext("2d");
  const dimensions = setupCanvas(canvas);
  const scale = calculateScale(dimensions.width, pageLength);
  
  if (scale <= 0) {
    alert("Invalid page length for visualization.");
    return;
  }
  
  // Clear previous drawing
  ctx.clearRect(0, 0, dimensions.width, dimensions.height);
  
  // Draw all components in proper layering order
  ctx.save();
  
  const sheetBounds = drawSheet(ctx, pageLength, scale, dimensions.height);
  drawGutters(ctx, docStarts, docLength, gutterSize, scale, sheetBounds); // Draw gutters first
  drawDocuments(ctx, docStarts, docLength, scale, sheetBounds, dimensions.isMobile);
  drawScoreLines(ctx, scorePositions, scale, sheetBounds, adjustments, dimensions.isMobile, dimensions.height);
  drawRuler(ctx, pageLength, scale, dimensions.height, dimensions.isMobile);
  drawLabels(ctx, pageLength, docLength, gutterSize, scale, dimensions.isMobile);
  
  ctx.restore();
  
  console.log("Professional visualization rendered with responsive scaling");
}

/**
 * Get responsive font size based on screen size
 */
function getResponsiveFontSize(baseSizeDesktop, isMobile) {
  // Conservative mobile scaling for better readability without breaking layout
  const mobileMultiplier = 1.3; // 30% larger on mobile - more conservative
  return isMobile ? Math.round(baseSizeDesktop * mobileMultiplier) : baseSizeDesktop;
}

/**
 * Get responsive line width based on screen size
 */
function getResponsiveLineWidth(baseWidth, isMobile) {
  // Thicker lines on mobile for better visibility
  const mobileMultiplier = 1.5;
  return isMobile ? Math.round(baseWidth * mobileMultiplier) : baseWidth;
}
