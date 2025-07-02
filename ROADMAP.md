# Score Calculator Enhancement Roadmap

## Philosophy: Incremental Improvements Only
Each task should be completed, tested, and committed individually. No massive refactors. No changing working code unless there's a clear user benefit.

## Quick Wins (Low Risk, High Value)

### Task 0: Break Up Larger Functions by Functionality
**Goal**: Make the code more modular and maintainable
**Files**: js/calc.js, js/ui.js, js/draw.js, js/main.js
**Action**: Identify large functions and break them into smaller, focused functions (1 FILE AT A TIME WITH COMMITS AT EACH POINT)
**Why**: I have a bunch of functions that calculate stuff, manage DOM, and draw on the canvas all mixed together. This makes it hard to read and maintain.
**Time**: 1 hour per file
**Risk**: Low - only restructuring code, no functional changes 

### Task 1: Add Better Comments to Existing Code
**Goal**: Make the current working code easier to understand
**Files**: js/calc.js, js/ui.js, js/draw.js, js/main.js
**Action**: Add function documentation and inline comments
**Why**: Helps future maintenance without changing functionality
**Time**: 30 minutes per file
**Risk**: Minimal - only adding comments

### Task 2: Fix CSS Duplication 
**Goal**: Clean up the duplicate CSS definitions
**Files**: styles.css
**Action**: Remove duplicate styles, consolidate similar rules
**Why**: File is currently 600+ lines with lots of repetition
**Time**: 1 hour
**Risk**: Low - visual changes only, easy to revert

### Task 3: Add Input Validation Messages
**Goal**: Show helpful error messages to users
**Files**: js/main.js (add validation before calculations)
**Action**: Add simple checks for empty/invalid inputs with user-friendly messages
**Why**: Current app fails silently with bad inputs
**Time**: 45 minutes
**Risk**: Low - only adding new functionality

## Medium Priority Features (Moderate Risk, Good Value)

### Task 4: Improve Calculation Results Display
**Goal**: Make results more readable and comprehensive
**Files**: js/calc.js, styles.css
**Action**: Format numbers consistently, add units, improve table styling
**Why**: Current results could be clearer for users
**Time**: 1 hour
**Risk**: Medium - changes display logic

### Task 5: Add Canvas Drawing Improvements
**Goal**: Make visualization more informative
**Files**: js/draw.js
**Action**: Add labels, better colors, scale indicators
**Why**: Current canvas is basic and hard to interpret
**Time**: 1.5 hours  
**Risk**: Medium - changes visualization logic

### Task 6: Mobile Responsiveness Improvements
**Goal**: Better experience on phones/tablets
**Files**: styles.css, possibly HTML structure
**Action**: Improve button sizing, text scaling, layout on small screens
**Why**: Current design could be more mobile-friendly
**Time**: 2 hours
**Risk**: Medium - affects layout across all screen sizes

## Advanced Features (Higher Risk, Nice to Have)

### Task 7: Add Custom Score Validation
**Goal**: Prevent invalid custom score inputs
**Files**: js/main.js or new validation module
**Action**: Validate custom scores are within document bounds, sorted correctly
**Why**: Users can currently enter nonsensical custom scores
**Time**: 1 hour
**Risk**: Medium - adds complexity to custom score logic

### Task 8: Add Calculation History/Undo
**Goal**: Let users see previous calculations or undo changes
**Files**: New state management, UI updates
**Action**: Store last 5 calculations, add "Previous" button
**Why**: Users might want to compare different configurations
**Time**: 2-3 hours
**Risk**: High - requires state management changes

### Task 9: Add Keyboard Shortcuts
**Goal**: Power users can calculate with Enter key, adjust with arrow keys
**Files**: js/main.js, add event listeners
**Action**: Add keyboard event handlers for common actions
**Why**: Could improve workflow for frequent users
**Time**: 1 hour
**Risk**: Low - only adds new functionality

### Task 10: Export/Print Functionality
**Goal**: Users can save or print their calculations
**Files**: New export module, CSS print styles
**Action**: Add "Print Results" button, format for printing
**Why**: Users might want to save calculations for reference
**Time**: 2-3 hours
**Risk**: Medium - new feature with cross-browser considerations

## Future Possibilities (Research Needed)

### Task 11: Multiple Document Types
**Goal**: Support different document configurations in one calculation
**Research**: How do users actually use this? What's the workflow?
**Risk**: High - major feature addition

### Task 12: Save/Load Presets
**Goal**: Users can save their common configurations
**Research**: Local storage vs server storage? How many presets?
**Risk**: High - data persistence complexity

### Task 13: Unit Conversion (Inches/CM/MM)
**Goal**: Support metric measurements
**Research**: Are there users who need this? What units?
**Risk**: Medium - affects all calculations

## Implementation Rules

### Before Starting Any Task:
1. Create a branch: `git checkout -b task/descriptive-name`
2. Read the current code to understand what you're changing
3. Write down what success looks like
4. Set a time limit (if not done in estimated time, reconsider)

### While Working:
1. Test after every small change
2. Commit working states frequently
3. Don't expand scope ("while I'm here" is forbidden)
4. If you break something, stop and fix it before continuing

### Before Merging:
1. Test the specific feature you changed
2. Test the whole application end-to-end
3. Check on different screen sizes if UI changes
4. Write a clear commit message explaining what and why

### Emergency Brake:
If any task takes more than 2x the estimated time, STOP. Create an issue to discuss the complexity rather than pushing through.

## Success Metrics
- Application always works after each task
- Each improvement has clear user benefit
- Code remains readable and maintainable
- No regressions in existing functionality

Remember: Working code that ships > Perfect code that doesn't exist
