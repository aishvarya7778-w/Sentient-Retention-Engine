# Task: Customer Success Command Center Implementation

## Overview

Implement a premium, fully interactive, and responsive Customer Success Command Center for the Sentient-Retention Engine admin dashboard. The UI will fit the SRE Cyber-SOC HUD aesthetic (Acid Green accents, sharp 2px corners, dark glass elements) while delivering powerful Gainsight/ChurnZero-level telemetry tracking for high-risk customer accounts.

## Objectives

1. Create a dedicated view component `CustomerSuccessView.jsx` in `frontend/src/pages/Customers/`.
2. Add a new sidebar navigation tab `'cs'` for "CS Command Center" in `AdminManagementDashboard.jsx`.
3. Render live metrics for high-risk accounts: Health Score, Revenue Exposure, Churn Probability, Recommended Actions, Intervention Status.
4. Add multi-select checkboxes for accounts to enable bulk operations:
   - Launch Campaign
   - Schedule Outreach
   - Escalate to Specialist
   - Create Success Plan
5. Provide a terminal-like command status execution drawer at the bottom of the screen to simulate bulk action execution with glowing micro-animations.
6. Support sorting, searching, and filtering by priority levels (Critical, High, Medium, Low) and intervention status.
7. Dynamically recalculate HUD KPIs (Total Revenue Exposure, Average Churn Risk, At-Risk Accounts count) based on active filters and selections.

## Design System Integration

- **Aesthetic**: Brutalist Cyber-SOC HUD / Enterprise observability.
- **Colors**: Acid Green (`#C5F82A`), Amber/Orange alerts (`#F97316`), Crimson warnings (`#EF4444`), Deep Dark (`#060c08`/`#0a110b`).
- **Radius**: `2px` for buttons, cards, and input fields.
- **Typography**: Space Grotesk (headers), JetBrains Mono (monospaced logs/stats).

## Implementation Checklist

### Phase 1: Create View Component
- [ ] Create `frontend/src/pages/Customers/CustomerSuccessView.jsx`.
- [ ] Implement layout structure matching the SRE Cyber-SOC styling.
- [ ] Define mock customer state and bulk action logic.
- [ ] Implement search filtering and sorting logic.

### Phase 2: Navigation Integration
- [ ] Add the `'cs'` option to navigation sidebar in `AdminManagementDashboard.jsx`.
- [ ] Render `CustomerSuccessView` conditionally based on the active tab.
- [ ] Integrate aggregate state from the parent component or local state.

### Phase 3: Bulk Actions Drawer & Logic
- [ ] Design custom checkbox components for row selections.
- [ ] Implement a command drawer/terminal feed showing execution progress when bulk actions are triggered.
- [ ] Simulate status updates (`interventionStatus`, `healthScore`) on action completion.

### Phase 4: Verification & Final Audit
- [ ] Run typescript/eslint checks to verify code validity.
- [ ] Test the responsive design across mobile/desktop screen ratios.
- [ ] Verify that all buttons, search queries, and filters update properly.
