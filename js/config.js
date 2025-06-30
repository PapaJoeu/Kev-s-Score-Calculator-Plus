// CONFIG: central settings for Kev's Scoring Calculator
const CONFIG = {
  gutterSize: 0.125,
  adjustStep: 0.0625,  // 1/16 inch
  tableHeaders: {
    results: ["Type", "#", "Measurement (in)"],
    adjusted: ["Adjusted #", "Measurement (in)"]
  },
  canvas: {
    width: 600,
    height: 100
  }
};

// Set gutter display at load
document.addEventListener("DOMContentLoaded", () => {
  const gutterDisplay = document.getElementById("gutter-display");
  if (gutterDisplay) {
    gutterDisplay.value = CONFIG.gutterSize;
  }
});
