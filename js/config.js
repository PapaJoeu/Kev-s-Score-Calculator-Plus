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
  },
  // preset values for dynamic UI generators
  sheetPresets: [8.5, 11, 12, 13, 17, 18, 19, 26],
  docPresets: [3.5, 4, 5, 5.5, 6, 8.5, 9, 11],
  gutterPresets: [0.125, 0.25],
  scoreTypes: [
    { value: 'bifold',   label: 'Bifold'   },
    { value: 'trifold',  label: 'Trifold'  },
    { value: 'gatefold', label: 'Gate Fold'},
    { value: 'custom',   label: 'Custom'   }
  ],
  // control metadata for free-form inputs
  controls: {
    pageLength: { label: 'Sheet Length',   id: 'page-length',   step: 0.001 },
    docLength:  { label: 'Document Length', id: 'doc-length',    step: 0.001 },
    gutter:     { label: 'Custom Gutter',   id: 'gutter-custom', step: 0.001 }
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
