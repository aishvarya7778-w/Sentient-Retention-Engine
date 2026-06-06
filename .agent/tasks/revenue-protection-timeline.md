# Task: Revenue Protection Timeline Implementation

## Overview

Implement a premium, interactive "Revenue Protection Timeline" in the Customer Success Command Center. When a user selects or clicks on an at-risk customer, the timeline will render in a detailed side panel (using a split-pane layout). It will show the complete lifecycle from initial churn risk detection to final customer retention, emphasizing business outcomes, financial impact, and automated AI coordination.

## Objectives

1. **Split-Screen Layout**: Restructure `CustomerSuccessView.jsx` to feature a main table (width 7/12) and a Customer Success Telemetry & Timeline side-panel (width 5/12). If no customer is explicitly clicked, show a high-fidelity visual summary / instructions panel.
2. **Interactive Event Nodes**: For the selected customer, display a vertical timeline representing their retention workflow lifecycle:
   - **09:12** - Customer Risk Detected
   - **09:13** - AI Churn Analysis Completed
   - **09:14** - Retention Strategy Generated
   - **09:15** - Simulation Completed
   - **09:16** - Intervention Approved
   - **09:18** - Customer Retained
3. **Telemetry & Business Metrics**: Ensure each event displays:
   - Timestamp (e.g., `09:12`)
   - Agent/Coordinating Node responsible (e.g., `AI Churn Analyst Agent`, `Success Planner Bot`, `Admin System Override`)
   - Confidence Score (e.g., `92%`, `87%`, `96%`)
   - Business Impact (e.g., "Identified license saturation decrease of 14% across engineering division")
   - Revenue Outcome / Target (e.g., "$12,400 ARR at risk")
4. **Live Execution Sync**: Integrate the bulk action execution logs (e.g., Launch Campaign, outreach call) with the timeline. When a user runs a bulk action, the timeline should dynamically update its current status, changing nodes from "Pending" to "In Progress" or "Resolved" with glowing HUD micro-animations.
5. **Outcome Failure Scenario**: Support rendering failed/neutral outcomes (e.g., if a customer is lost or requires immediate developer intervention), coloring outcomes appropriately (glowing Crimson warnings vs. Acid Green successes).

## Design System Integration

- **Aesthetic**: SRE Cyber-SOC HUD aesthetic (Acid Green accents, sharp 2px corners, dark glass elements, high-contrast layout).
- **Colors**: Acid Green (`#C5F82A`), Crimson alerts (`#EF4444`), Deep Dark (`#060c08`/`#0a110b`), Amber warnings (`#F97316`).
- **Typography**: Space Grotesk (headers), JetBrains Mono (monospaced logs/stats).

## Implementation Checklist

### Phase 1: Layout & State Preparation
- [ ] Refactor `CustomerSuccessView.jsx`'s layout to a split-screen layout (`grid grid-cols-12 gap-6`).
- [ ] Add state for `selectedCustomer` (defaults to first customer in list).
- [ ] Define comprehensive mock timeline data for each customer in `csCustomers`.

### Phase 2: Timeline Rendering
- [ ] Implement the `RevenueProtectionTimeline` panel component inside `CustomerSuccessView.jsx`.
- [ ] Render the vertical stepper with connector lines using Tailwind and CSS properties.
- [ ] Add interactive tooltips or toggles for each step to drill down into the business details.

### Phase 3: Action & Status Sync
- [ ] Modify the bulk action execution simulation to dynamically advance the selected customer's timeline state and show live status transitions in the sidebar.
- [ ] Display the total ARR protected in the success outcome node.

### Phase 4: Verification
- [ ] Perform manual verification.
- [ ] Run the lint and TypeScript validation scripts to check for zero compile errors.
