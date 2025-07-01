// Shared settings for Kev's Scoring Calculator
// All configurable values for dynamic UI and calculations live here

const CONFIG = {
  // default values for controls
  pageLength: 18,             // default sheet length (inches)
  docLength: 4,               // default document length (inches)
  gutterSize: 0.125,          // default gutter size (inches)
  adjustStep: 0.0625,         // manual adjustment step (1/16 in)

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

  // table headers for result and adjusted score tables
  tableHeaders: {
    results: ['Type', '#', 'Measurement (in)'],
    adjusted: ['Adjusted #', 'Measurement (in)']
  },

  // dimensions for the visualization canvas
  canvas: {
    width: 600,
    height: 100
  }
};

// Expose CONFIG globally
window.CONFIG = CONFIG;
