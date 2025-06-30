// Shared settings for the scoring calculator
// All configurable values live here
const CONFIG = {
  gutterSize: 0.125,  // space between documents (inches)
  adjustStep: 0.0625,  // manual adjustment step (1/16 in)
  // column titles for results tables
  tableHeaders: {
    results: ["Type", "#", "Measurement (in)"],
    adjusted: ["Adjusted #", "Measurement (in)"]
  },
  // dimensions for the drawing canvas
  canvas: {
    width: 600,
    height: 100
  }
};

// on page load, populate gutter input with default
document.addEventListener("DOMContentLoaded", () => {
  // find the gutter-size input element
  const gutterDisplay = document.getElementById("gutter-display");
  if (gutterDisplay) {
    // apply the default gutter size to UI
    gutterDisplay.value = CONFIG.gutterSize;
  }
});
