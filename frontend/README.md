# SkinOps Frontend — Cinematic Diagnostic Shell

**Men's Skin Performance Decision Engine**

A clinical decision support system with a cinematic, game-like diagnostic interface.

---

## 🎬 About Phase 2

This is the **Cinematic UX Shell** — the visual and motion framework for the SkinOps diagnostic platform.

### What's Included
- Boot sequence initialization
- Cinematic loading screens
- Tactical HUD panel system
- Diagnostic meter animations
- Motion framework library
- Theme system (clinical steel/graphite palette)

### What's NOT Included (Yet)
- Backend API integration
- Assessment logic
- User authentication
- 3D face model
- Machine learning processing

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Dev Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
app/
├── page.tsx           # Main demo page with all Phase 2 components
├── layout.tsx         # Root layout (cinematic theme)
└── globals.css        # Tailwind setup + custom styles

components/
├── shell/
│   ├── BootSequenceLoader.tsx       # Initial boot animation (3s)
│   ├── CinematicLoadingScreen.tsx   # Scan animation + progress
│   └── RootShell.tsx                # Wrapper with grid background
└── hud/
    ├── HUDPanel.tsx         # Reusable tactical panel component
    └── DiagnosticMeter.tsx  # Animated meter bars

lib/
├── motion/
│   └── animations.ts    # 14 Framer Motion animation presets
└── theme/
    └── hudTheme.ts      # Color palette + messages
```

---

## 🎨 Design System

### Color Palette
All colors defined in `lib/theme/hudTheme.ts`:

- **Background**: `#0a0e27` (deep dark)
- **Surfaces**: `#1a1f3a` (panel bases)
- **Borders**: `#2d3561` (grid lines)
- **Text**: `#e0e2ff` (readable white)
- **Accent**: `#4f79d4` (scan blue)
- **Status**: Amber (warning), muted green (success), red (danger)

### Animation Framework
All reusable animation variants in `lib/motion/animations.ts`:

- `bootSequenceVariants` - Fade in + scale
- `scanSweepVariants` - Horizontal sweep
- `hudPanelVariants` - Slide from left
- `staggerContainerVariants` + `staggerItemVariants` - Staggered appearance
- Plus 10+ more presets

---

## 🧩 Component Guide

### HUDPanel
Reusable tactical panel component.

```tsx
<HUDPanel 
  title="System Status"
  subtitle="v0.1.0"
  variant="success"  // 'default' | 'warning' | 'success'
>
  <p>Your content here</p>
</HUDPanel>
```

### DiagnosticMeter
Animated progress meter.

```tsx
<DiagnosticMeter 
  label="System Health"
  value={92}
  variant="success"   // 'primary' | 'warning' | 'success'
/>
```

---

## 🛑 Golden Lock Constraints

**Non-Negotiable**:
- ❌ NO purple gradients
- ❌ NO AI neon theme
- ❌ NO chatbot bubbles
- ✅ Steel/graphite palette only
- ✅ Cinematic tactical HUD style
- ✅ Clinical messaging

---

**Status**: Phase 2 Complete ✅

See `PHASE_2_SUMMARY.md` for full documentation.
