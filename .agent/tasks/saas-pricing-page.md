# Task: SaaS Pricing Page Implementation

## Overview

Implement a premium, fully interactive, and responsive SaaS Pricing Page for the Sentient-Retention Engine. The page will fit the Brutalist Cyber-SOC HUD aesthetic of the application, featuring a billing toggle (monthly/annual), a dynamic interactive cost calculator, a detailed features comparison matrix, and an animated FAQ accordion.

## Objectives

1. Create a new pricing route (`/pricing`) in `AppRouter`.
2. Implement a stunning Pricing Page component (`d:\Hackathon\Sentient-Retention Engine\frontend\src\pages\PricingPage.jsx`).
3. Add navigation link in `Nav.jsx` pointing to the new pricing page.
4. Integrate an interactive slider-based calculator showing cost-saving estimates based on user metrics (number of active users & retention improvement).
5. Build a comprehensive features comparison table and an interactive FAQ accordion section.
6. Verify design compliance with the Brutalist Cyber-SOC styling (Acid Green accents, sharp geometry, GPU-accelerated micro-animations).

## Design System Integration

- **Aesthetic**: Brutalist Cyber-SOC HUD.
- **Colors**: Acid Green (`#C5F82A`), Cyan (`#00E0FF`), Deep Dark (`#050505`), Zinc accents.
- **Radius**: `2px` (sharp edges).
- **Typography**: Space Grotesk (headers), Plus Jakarta Sans (body), JetBrains Mono (monospaced logs/stats).

## Implementation Checklist

### Phase 1: Routing & Nav Integration

- [ ] Add `/pricing` Route in `frontend/src/app/router.jsx`.
- [ ] Add `Pricing` navigation link in `frontend/src/components/landing/Nav.jsx`.

### Phase 2: Pricing Page Structure & Core Grid

- [ ] Build Page Layout with sticky/floating cyber borders.
- [ ] Implement Billing Cycle Toggle (Monthly vs. Annual) with custom spring animation.
- [ ] Implement Three Tiers:
  - **Developer Node** ($0/mo) - Sandbox access
  - **Sentinel Node** ($99/mo / $79/mo annual) - Scaled retention optimization
  - **Sentient Overlord** (Enterprise / Custom) - Custom models & SLAs
- [ ] Add hover glow effects and micro-interactions (`translate-y`, scale, border glow).

### Phase 3: Interactive Cost Calculator

- [ ] Add metric sliders:
  - Active Users (1k to 1M)
  - Current Churn Rate (1% to 20%)
  - Estimated Retention Improvement (5% to 50%)
- [ ] Calculate & animate financial savings:
  - User Churn cost = Users * Churn * LTV
  - Saved Revenue = Churn cost * Improvement
  - Recommend best plan based on the inputs.

### Phase 4: Feature Matrix & FAQ

- [ ] Create detailed comparison matrix with custom bullet/checkmark visual icons.
- [ ] Create FAQ Accordion with smooth height transitions and rotating chevrons.

### Phase 5: Verification & Audits

- [ ] Check responsive layout on Mobile, Tablet, and Desktop.
- [ ] Run typescript/lint verification.
- [ ] Ensure `prefers-reduced-motion` compatibility.
