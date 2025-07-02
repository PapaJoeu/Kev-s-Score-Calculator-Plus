# Mobile Visualizer Enhancement Project

## PROBLEM STATEMENT
Current mobile experience prioritizes input controls over the visualizer, which is backwards:
- Input sections (sheet, doc, gutter, score type) consume ~60% of screen height
- Visualizer gets cramped into small remaining space
- Text in visualizer is too small to read on mobile
- Tables below visualizer add more clutter
- Users can't properly see the most valuable part: the visual layout

## VISION: Visualizer-First Mobile Experience
**Primary Goal**: Make the visualizer the hero element on mobile
**Secondary Goal**: Streamline input controls to be compact but functional

## DESIGN STRATEGY

### Mobile Layout Hierarchy (Priority Order):
1. **Visualizer** - 50% of screen height, large readable text
2. **Essential Inputs** - Compact, horizontal layout where possible
3. **Calculate Button** - Prominent and accessible
4. **Results Table** - Compact summary only
5. **Adjustment Controls** - Always visible, maybe floating

### Responsive Breakpoints:
- **Desktop** (>768px): Current layout is fine
- **Tablet** (768px-430px): Modest compacting
- **Mobile** (<430px): Aggressive space optimization

## IMPLEMENTATION PLAN

### Phase 1: Compact Input Controls (30 min)
**Target**: Reduce input section height by 50% on mobile
- Combine sheet/doc/gutter into horizontal layout
- Smaller buttons, tighter spacing
- Score type as dropdown instead of buttons
- Remove excessive padding/margins

**Files**: styles.css
**Risk**: Low - visual only
**Test**: Verify all inputs still work on mobile

### Phase 2: Enhance Visualizer (45 min)  
**Target**: Increase visualizer height to 50vh on mobile, larger text
- Increase canvas height on mobile (25vh → 50vh)
- Scale up all text sizes in visualizer (11px → 16px+)
- Bigger score lines and measurements
- Ensure ruler stays readable

**Files**: js/draw.js, styles.css
**Risk**: Medium - affects visualization logic
**Test**: Check text readability and layout on phone

### Phase 3: Streamline Results (20 min)
**Target**: Show only essential info, compact format
- Condense table into single-line summary
- Hide detailed tables on mobile (or collapse)
- Show key metrics only: docs per sheet, score positions

**Files**: js/ui.js, styles.css  
**Risk**: Low - information architecture change
**Test**: Ensure critical info still available

### Phase 4: Polish & Test (15 min)
**Target**: Perfect the mobile experience
- Fine-tune text sizes and spacing
- Ensure touch targets are adequate (44px min)
- Test calculation flow end-to-end
- Verify adjustment controls work

**Files**: styles.css
**Risk**: Low - polish only
**Test**: Full mobile workflow testing

## SUCCESS METRICS
- [ ] Visualizer takes 50% of mobile screen height
- [ ] All text in visualizer readable without zooming
- [ ] Input controls fit in <25% of screen height  
- [ ] Calculate button easily tappable
- [ ] Score positions clearly visible and labeled
- [ ] Adjustment controls accessible and functional

## MOBILE-FIRST DESIGN PRINCIPLES
1. **Touch-first**: All buttons 44px minimum
2. **Thumb-friendly**: Critical actions in reach
3. **Visual hierarchy**: Visualizer dominates
4. **Information density**: More visual, less text
5. **Progressive disclosure**: Hide complexity on small screens

## NOTES & DISCOVERIES
- Current canvas text (11px) unreadable on mobile
- Button groups could be dropdowns to save space
- Preset buttons take too much vertical space
- Results table adds little value vs visualizer
- Users primarily need: calculate → see visual → adjust
- Desktop experience should remain unchanged

## COMMIT TRACKING
- [ ] Phase 1: Compact input controls
- [ ] Phase 2: Enhanced visualizer sizing/text
- [ ] Phase 3: Streamlined results display  
- [ ] Phase 4: Mobile polish and testing
- [ ] Final: Mobile-first experience complete

## ROLLBACK PLAN
If mobile changes break desktop:
1. Use CSS media queries to isolate mobile changes
2. Test desktop after each phase
3. Keep desktop styles untouched
4. Mobile-specific classes for different behavior

---
**Project Start**: July 2, 2025
**Estimated Time**: 2 hours total  
**Risk Level**: Medium (affects core user experience)
**Success Criteria**: Professional mobile experience matching desktop quality
