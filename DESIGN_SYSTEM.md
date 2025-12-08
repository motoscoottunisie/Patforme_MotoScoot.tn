# Motoscoot.tn  Design System

## Brand Personality Summary

**Visual Identity:** Modern, trustworthy, and professional marketplace aesthetic
**Emotional Tone:** Confident, reliable, and approachable
**Style Keywords:** Clean, contemporary, action-oriented, transactional
**Target Audience:** Motorcycle enthusiasts, buyers and sellers seeking secure transactions

The design communicates trust and professionalism through strategic use of orange (energy, enthusiasm) balanced with neutral grays, complemented by semantic colors that guide user actions. The typography is clear and hierarchical, prioritizing readability and quick information scanning. The overall aesthetic is production-ready, market-appropriate, and conversion-focused.

---

## 🎨 1. Color System

### Primary Colors

| Token | Purpose | HEX | RGB | HSL | Usage |
|-------|---------|-----|-----|-----|-------|
| `primary-50` | Lightest tint | `#FFF7ED` | `rgb(255, 247, 237)` | `hsl(33, 100%, 97%)` | Backgrounds, light surfaces |
| `primary-100` | Very light | `#FBF1EC` | `rgb(251, 241, 236)` | `hsl(20, 60%, 95%)` | Hover states, badges |
| `primary-200` | Light | `#FFE4CC` | `rgb(255, 228, 204)` | `hsl(28, 100%, 90%)` | Soft backgrounds |
| `primary-300` | Light-medium | `#FBBF85` | `rgb(251, 191, 133)` | `hsl(29, 94%, 75%)` | Accents, highlights |
| `primary-400` | Medium | `#F59E42` | `rgb(245, 158, 66)` | `hsl(31, 90%, 61%)` | Secondary CTAs |
| `primary-500` | Base Orange | `#EA7C1E` | `rgb(234, 124, 30)` | `hsl(28, 83%, 52%)` | Primary brand color |
| `primary-600` | Primary CTA | `#E6580B` | `rgb(230, 88, 11)` | `hsl(21, 91%, 47%)` | Main buttons, links |
| `primary-700` | Hover state | `#C24A09` | `rgb(194, 74, 9)` | `hsl(21, 91%, 40%)` | Button hover, active |
| `primary-800` | Dark | `#9A3C07` | `rgb(154, 60, 7)` | `hsl(22, 91%, 32%)` | Pressed states |
| `primary-900` | Darkest | `#7C2F05` | `rgb(124, 47, 5)` | `hsl(21, 92%, 25%)` | Dark mode text |

### Secondary Colors (Green - Success/Action)

| Token | Purpose | HEX | RGB | HSL | Usage |
|-------|---------|-----|-----|-----|-------|
| `success-50` | Lightest | `#ECFDF5` | `rgb(236, 253, 245)` | `hsl(152, 81%, 96%)` | Success backgrounds |
| `success-100` | Very light | `#D1FAE5` | `rgb(209, 250, 229)` | `hsl(149, 80%, 90%)` | Light success states |
| `success-200` | Light | `#A7F3D0` | `rgb(167, 243, 208)` | `hsl(152, 76%, 80%)` | Badges, indicators |
| `success-300` | Medium-light | `#6EE7B7` | `rgb(110, 231, 183)` | `hsl(156, 72%, 67%)` | Highlights |
| `success-400` | Medium | `#34D399` | `rgb(52, 211, 153)` | `hsl(158, 64%, 52%)` | Active states |
| `success-500` | Base Green | `#10B981` | `rgb(16, 185, 129)` | `hsl(158, 84%, 39%)` | Success messages |
| `success-600` | Primary Green | `#059669` | `rgb(5, 150, 105)` | `hsl(158, 93%, 30%)` | Call/Payment buttons |
| `success-700` | Hover | `#047857` | `rgb(4, 120, 87)` | `hsl(158, 93%, 24%)` | Green button hover |
| `success-800` | Dark | `#065F46` | `rgb(6, 95, 70)` | `hsl(157, 88%, 20%)` | Pressed states |
| `success-900` | Darkest | `#064E3B` | `rgb(6, 78, 59)` | `hsl(158, 86%, 16%)` | Dark mode |

### Semantic Colors

#### Error/Danger
| Token | HEX | RGB | HSL | Usage |
|-------|-----|-----|-----|-------|
| `error-50` | `#FEF2F2` | `rgb(254, 242, 242)` | `hsl(0, 86%, 97%)` | Error backgrounds |
| `error-100` | `#FEE2E2` | `rgb(254, 226, 226)` | `hsl(0, 93%, 94%)` | Light error state |
| `error-500` | `#EF4444` | `rgb(239, 68, 68)` | `hsl(0, 84%, 60%)` | Error text |
| `error-600` | `#DC2626` | `rgb(220, 38, 38)` | `hsl(0, 72%, 51%)` | Primary error |
| `error-700` | `#B91C1C` | `rgb(185, 28, 28)` | `hsl(0, 74%, 42%)` | Error hover |

#### Warning
| Token | HEX | RGB | HSL | Usage |
|-------|-----|-----|-----|-------|
| `warning-50` | `#FEFCE8` | `rgb(254, 252, 232)` | `hsl(55, 92%, 95%)` | Warning backgrounds |
| `warning-100` | `#FEF9C3` | `rgb(254, 249, 195)` | `hsl(55, 97%, 88%)` | Light warning |
| `warning-400` | `#FACC15` | `rgb(250, 204, 21)` | `hsl(48, 96%, 53%)` | Star ratings |
| `warning-500` | `#EAB308` | `rgb(234, 179, 8)` | `hsl(45, 93%, 47%)` | Warning text |
| `warning-600` | `#CA8A04` | `rgb(202, 138, 4)` | `hsl(41, 96%, 40%)` | Warning CTA |
| `warning-700` | `#A16207` | `rgb(161, 98, 7)` | `hsl(35, 92%, 33%)` | Warning hover |

#### Info/Blue
| Token | HEX | RGB | HSL | Usage |
|-------|-----|-----|-----|-------|
| `info-50` | `#EFF6FF` | `rgb(239, 246, 255)` | `hsl(214, 100%, 97%)` | Info backgrounds |
| `info-100` | `#DBEAFE` | `rgb(219, 234, 254)` | `hsl(214, 95%, 93%)` | Light info |
| `info-500` | `#3B82F6` | `rgb(59, 130, 246)` | `hsl(217, 91%, 60%)` | Info text |
| `info-600` | `#2563EB` | `rgb(37, 99, 235)` | `hsl(221, 83%, 53%)` | Info primary |
| `info-700` | `#1D4ED8` | `rgb(29, 78, 216)` | `hsl(224, 76%, 48%)` | Info hover |

### Neutral/Gray Scale

| Token | HEX | RGB | HSL | Usage |
|-------|-----|-----|-----|-------|
| `neutral-50` | `#F9FAFB` | `rgb(249, 250, 251)` | `hsl(210, 20%, 98%)` | Page backgrounds |
| `neutral-100` | `#F3F4F6` | `rgb(243, 244, 246)` | `hsl(220, 14%, 96%)` | Card backgrounds, surfaces |
| `neutral-200` | `#E5E7EB` | `rgb(229, 231, 235)` | `hsl(220, 13%, 91%)` | Borders, dividers |
| `neutral-300` | `#D1D5DB` | `rgb(209, 213, 219)` | `hsl(214, 12%, 84%)` | Input borders, inactive |
| `neutral-400` | `#9CA3AF` | `rgb(156, 163, 175)` | `hsl(218, 11%, 65%)` | Icons, placeholders |
| `neutral-500` | `#6B7280` | `rgb(107, 114, 128)` | `hsl(220, 9%, 46%)` | Secondary text |
| `neutral-600` | `#4B5563` | `rgb(75, 85, 99)` | `hsl(215, 14%, 34%)` | Body text |
| `neutral-700` | `#374151` | `rgb(55, 65, 81)` | `hsl(217, 19%, 27%)` | Headings, primary text |
| `neutral-800` | `#1F2937` | `rgb(31, 41, 55)` | `hsl(215, 28%, 17%)` | Dark headings |
| `neutral-900` | `#111827` | `rgb(17, 24, 39)` | `hsl(221, 39%, 11%)` | Darkest text |
| `white` | `#FFFFFF` | `rgb(255, 255, 255)` | `hsl(0, 0%, 100%)` | Pure white |
| `black` | `#000000` | `rgb(0, 0, 0)` | `hsl(0, 0%, 0%)` | Pure black |

### Dark Mode Variants

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `background` | `neutral-50` | `neutral-900` | Page background |
| `surface` | `white` | `neutral-800` | Cards, panels |
| `surface-elevated` | `white` | `neutral-700` | Modals, dropdowns |
| `border` | `neutral-200` | `neutral-700` | Dividers, borders |
| `text-primary` | `neutral-900` | `neutral-50` | Headings, primary text |
| `text-secondary` | `neutral-600` | `neutral-400` | Body text, secondary |
| `text-tertiary` | `neutral-500` | `neutral-500` | Captions, meta |

---

## ✍️ 2. Typography

### Font Families
```css
--font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
--font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Menlo, Consolas, 'Liberation Mono', 'Courier New', monospace;
```

### Font Weights
| Token | Value | Usage |
|-------|-------|-------|
| `font-light` | 300 | Subtle text, large sizes |
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Subheadings, emphasis |
| `font-semibold` | 600 | Buttons, labels |
| `font-bold` | 700 | Headings, strong emphasis |
| `font-extrabold` | 800 | Display text, hero |

### Typographic Scale

| Level | Size | Line Height | Letter Spacing | Weight | Usage | Desktop Size |
|-------|------|-------------|----------------|--------|-------|--------------|
| **Display XL** | 3.75rem (60px) | 1.1 (110%) | -0.02em | 700-800 | Hero headlines | 4.5rem (72px) |
| **Display L** | 3rem (48px) | 1.1 (110%) | -0.02em | 700-800 | Large headers | 3.75rem (60px) |
| **H1** | 2.25rem (36px) | 1.2 (120%) | -0.01em | 700 | Page titles | 3rem (48px) |
| **H2** | 1.875rem (30px) | 1.2 (120%) | -0.01em | 700 | Section titles | 2.25rem (36px) |
| **H3** | 1.5rem (24px) | 1.3 (130%) | -0.01em | 600-700 | Subsection titles | 1.875rem (30px) |
| **H4** | 1.25rem (20px) | 1.4 (140%) | 0 | 600 | Card titles | 1.5rem (24px) |
| **H5** | 1.125rem (18px) | 1.4 (140%) | 0 | 600 | Small headings | 1.25rem (20px) |
| **H6** | 1rem (16px) | 1.4 (140%) | 0 | 600 | Smallest headings | 1.125rem (18px) |
| **Subtitle** | 1.25rem (20px) | 1.5 (150%) | 0 | 400 | Hero subtitles | 1.5rem (24px) |
| **Body Large** | 1.125rem (18px) | 1.6 (160%) | 0 | 400 | Emphasized body | 1.25rem (20px) |
| **Body** | 1rem (16px) | 1.5 (150%) | 0 | 400 | Default text | 1rem (16px) |
| **Body Small** | 0.875rem (14px) | 1.5 (150%) | 0 | 400 | Secondary text | 0.875rem (14px) |
| **Caption** | 0.75rem (12px) | 1.4 (140%) | 0.01em | 400-500 | Meta info, labels | 0.75rem (12px) |
| **Overline** | 0.75rem (12px) | 1.4 (140%) | 0.05em | 600 | Labels, tags (CAPS) | 0.75rem (12px) |
| **Button L** | 1rem (16px) | 1 (100%) | 0.01em | 600 | Large buttons | 1rem (16px) |
| **Button M** | 0.875rem (14px) | 1 (100%) | 0.01em | 600 | Default buttons | 0.875rem (14px) |
| **Button S** | 0.8125rem (13px) | 1 (100%) | 0.01em | 600 | Small buttons | 0.8125rem (13px) |

### Responsive Typography Rules
```css
/* Mobile-first approach */
html { font-size: 16px; }

/* Small tablets: 640px and up */
@media (min-width: 640px) { /* Scale up 6.25% */ }

/* Tablets: 768px and up */
@media (min-width: 768px) { /* Scale up 12.5% */ }

/* Desktop: 1024px and up */
@media (min-width: 1024px) { /* Full scale */ }
```

---

## 🧱 3. Spacing & Layout

### Spacing System (8px Base Unit)

| Token | Value | Rem | Usage |
|-------|-------|-----|-------|
| `spacing-0` | 0px | 0 | No spacing |
| `spacing-0.5` | 2px | 0.125rem | Tight spacing, borders |
| `spacing-1` | 4px | 0.25rem | Minimal gaps |
| `spacing-1.5` | 6px | 0.375rem | Small gaps |
| `spacing-2` | 8px | 0.5rem | Compact spacing |
| `spacing-2.5` | 10px | 0.625rem | Icon padding |
| `spacing-3` | 12px | 0.75rem | Small padding |
| `spacing-4` | 16px | 1rem | Default spacing |
| `spacing-5` | 20px | 1.25rem | Comfortable spacing |
| `spacing-6` | 24px | 1.5rem | Section spacing |
| `spacing-8` | 32px | 2rem | Large spacing |
| `spacing-10` | 40px | 2.5rem | XL spacing |
| `spacing-12` | 48px | 3rem | 2XL spacing |
| `spacing-16` | 64px | 4rem | 3XL spacing |
| `spacing-20` | 80px | 5rem | 4XL spacing |
| `spacing-24` | 96px | 6rem | Section dividers |
| `spacing-32` | 128px | 8rem | Page sections |

### Container Widths

| Breakpoint | Max Width | Usage |
|------------|-----------|-------|
| `container-sm` | 640px | Small screens |
| `container-md` | 768px | Medium screens |
| `container-lg` | 1024px | Large screens |
| `container-xl` | 1280px | Extra large |
| `container-2xl` | 1536px | 2X large |
| `container-content` | 1280px (7xl) | Main content area |

### Breakpoints

| Name | Min Width | Usage |
|------|-----------|-------|
| `xs` | 0px | Mobile (default) |
| `sm` | 640px | Large mobile / Small tablet |
| `md` | 768px | Tablet |
| `lg` | 1024px | Laptop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop |

### Grid System
```css
/* Default: 12-column grid */
--grid-columns: 12;
--grid-gap: var(--spacing-6); /* 24px */
--grid-gap-mobile: var(--spacing-4); /* 16px */
```

### Margin & Padding Conventions
- **Cards:** `padding: 1.5rem (24px)` to `2rem (32px)`
- **Sections:** `padding-y: 3rem (48px)` to `6rem (96px)`
- **Buttons:** `padding: 0.5rem 1rem` (sm), `0.75rem 1.5rem` (md), `1rem 2rem` (lg)
- **Stack Spacing:** `gap: 1rem` (default), `1.5rem` (comfortable), `2rem` (loose)

---

## 🧩 4. UI Components

### Buttons

#### Primary Button
```css
/* Default State */
background: #E6580B (primary-600)
color: #FFFFFF
padding: 0.75rem 1.5rem (12px 24px)
border-radius: 0.75rem (12px)
font-weight: 600
font-size: 0.875rem (14px)
border: 2px solid transparent
box-shadow: 0 1px 2px rgba(0,0,0,0.05)
transition: all 200ms ease

/* Hover */
background: #C24A09 (primary-700)
transform: translateY(-1px)
box-shadow: 0 4px 6px rgba(230,88,11,0.2)

/* Active/Pressed */
background: #9A3C07 (primary-800)
transform: translateY(0)

/* Focus */
outline: none
ring: 4px solid rgba(230,88,11,0.2)

/* Disabled */
background: #9CA3AF (neutral-400)
color: #FFFFFF
cursor: not-allowed
opacity: 0.6
```

#### Secondary Button
```css
/* Default State */
background: #FFFFFF
color: #374151 (neutral-700)
padding: 0.75rem 1.5rem
border-radius: 0.75rem
font-weight: 600
font-size: 0.875rem
border: 2px solid #D1D5DB (neutral-300)
transition: all 200ms ease

/* Hover */
background: #F3F4F6 (neutral-100)
border-color: #9CA3AF (neutral-400)

/* Active */
background: #E5E7EB (neutral-200)

/* Focus */
ring: 4px solid rgba(156,163,175,0.2)
```

#### Ghost/Outline Button
```css
/* Default */
background: transparent
color: #FFFFFF
border: 2px solid #FFFFFF
padding: 0.75rem 1.5rem
border-radius: 0.75rem
font-weight: 600

/* Hover */
background: #FFFFFF
color: #E6580B (primary-600)
```

#### Ghost Text Button
```css
/* Default */
background: transparent
color: #6B7280 (neutral-500)
padding: 0.5rem 1rem
border: none

/* Hover */
color: #E6580B (primary-600)
```

#### Button Sizes
| Size | Padding | Font Size | Icon Size |
|------|---------|-----------|-----------|
| Small | `0.375rem 0.75rem` (6px 12px) | 0.8125rem (13px) | 14px |
| Medium | `0.75rem 1.5rem` (12px 24px) | 0.875rem (14px) | 16px |
| Large | `1rem 2rem` (16px 32px) | 1rem (16px) | 20px |

---

### Input Fields

#### Text Input
```css
/* Default */
background: #FFFFFF
border: 1px solid #D1D5DB (neutral-300)
border-radius: 0.5rem (8px)
padding: 0.625rem 1rem (10px 16px)
font-size: 1rem (16px)
color: #374151 (neutral-700)
transition: border-color 200ms, ring 200ms

/* Focus */
border-color: #E6580B (primary-600)
ring: 2px solid rgba(230,88,11,0.2)
outline: none

/* Error */
border-color: #DC2626 (error-600)
ring: 2px solid rgba(220,38,38,0.2)

/* Disabled */
background: #F3F4F6 (neutral-100)
color: #9CA3AF (neutral-400)
cursor: not-allowed
```

#### Search Input
```css
/* Same as text input with icon */
padding-left: 2.5rem (40px)
padding-right: 1rem (16px)
/* Icon positioned absolute at left: 1rem */
```

#### Checkbox
```css
width: 1.25rem (20px)
height: 1.25rem (20px)
border: 2px solid #D1D5DB (neutral-300)
border-radius: 0.25rem (4px)
background: #FFFFFF

/* Checked */
background: #E6580B (primary-600)
border-color: #E6580B
/* Checkmark: white */

/* Focus */
ring: 2px solid rgba(230,88,11,0.2)
```

#### Toggle/Switch
```css
width: 2.5rem (40px)
height: 1.25rem (20px)
border-radius: 9999px (full)
background: #D1D5DB (neutral-300)
transition: background 200ms

/* Circle/Knob */
width: 1rem (16px)
height: 1rem (16px)
background: #FFFFFF
border-radius: 9999px
transform: translateX(2px)
transition: transform 200ms

/* Active/On */
background: #E6580B (primary-600)
/* Circle translates right */
transform: translateX(22px)
```

#### Select/Dropdown
```css
/* Same as text input with chevron icon */
padding-right: 2.5rem (40px)
appearance: none
/* Icon: ChevronDown, absolute right: 1rem */
```

---

### Cards

#### Standard Card
```css
background: #FFFFFF
border: 1px solid #E5E7EB (neutral-200)
border-radius: 1rem (16px)
padding: 1.5rem (24px)
box-shadow: 0 1px 3px rgba(0,0,0,0.05)
transition: all 300ms ease

/* Hover */
box-shadow: 0 4px 6px rgba(0,0,0,0.1)
transform: translateY(-2px)
```

#### Listing Card
```css
background: #FFFFFF
border: 1px solid #E5E7EB (neutral-200)
border-radius: 1.5rem (24px)
overflow: hidden
transition: all 300ms ease
display: flex
flex-direction: column

/* Image Container */
aspect-ratio: 4/3
overflow: hidden

/* Image Hover Effect */
transform: scale(1.1)
transition: transform 500ms ease-out

/* Card Hover */
box-shadow: 0 10px 25px rgba(0,0,0,0.1)
```

#### Elevated Card
```css
background: #FFFFFF
border: 1px solid #E5E7EB (neutral-200)
border-radius: 1.5rem (24px)
padding: 1.5rem (24px)
box-shadow: 0 4px 6px rgba(0,0,0,0.07)
```

---

### Badges

#### Badge (Default)
```css
background: #FBF1EC (primary-100)
color: #E6580B (primary-600)
border: 1px solid #E6580B
border-radius: 9999px (full)
padding: 0.25rem 0.625rem (4px 10px)
font-size: 0.75rem (12px)
font-weight: 500
display: inline-flex
align-items: center
gap: 0.25rem (4px)
```

#### Badge Variants
| Variant | Background | Text Color | Border |
|---------|------------|------------|--------|
| Default | `#FBF1EC` | `#E6580B` | `#E6580B` |
| Success | `#ECFDF5` | `#059669` | `#059669` |
| Warning | `#FEFCE8` | `#CA8A04` | `#CA8A04` |
| Error | `#FEF2F2` | `#DC2626` | `#DC2626` |
| Info | `#EFF6FF` | `#2563EB` | `#2563EB` |

---

### Navigation

#### Header
```css
background: #FFFFFF
border-bottom: 1px solid #E5E7EB (neutral-200)
box-shadow: 0 1px 2px rgba(0,0,0,0.05)
height: 4rem (64px)
position: sticky
top: 0
z-index: 50
```

#### Logo
```css
width: 2rem (32px)
height: 2rem (32px)
background: linear-gradient(135deg, #EA7C1E, #E6580B)
border-radius: 0.5rem (8px)
/* Icon/Text: white, centered */
```

#### Nav Link
```css
/* Default */
color: #6B7280 (neutral-500)
font-weight: 500
padding: 0.5rem 1rem
transition: color 200ms

/* Hover */
color: #E6580B (primary-600)

/* Active */
color: #E6580B (primary-600)
border-bottom: 2px solid #E6580B
```

#### Mobile Menu
```css
background: #FFFFFF
border-top: 1px solid #E5E7EB (neutral-200)
padding: 1rem (16px)
/* Display on mobile only (< 768px) */
```

---

### Modals

#### Modal Overlay
```css
background: rgba(0, 0, 0, 0.5)
backdrop-filter: blur(4px)
position: fixed
inset: 0
z-index: 50
display: flex
align-items: center
justify-content: center
```

#### Modal Content
```css
background: #FFFFFF
border-radius: 1.5rem (24px)
padding: 2rem (32px)
max-width: 32rem (512px)
width: 90%
box-shadow: 0 20px 25px rgba(0,0,0,0.15)
animation: slideIn 400ms cubic-bezier(0.16, 1, 0.3, 1)
```

---

### Alerts/Toasts

#### Alert (Success)
```css
background: #ECFDF5 (success-50)
border: 1px solid #10B981 (success-500)
border-left: 4px solid #10B981
border-radius: 0.5rem (8px)
padding: 1rem (16px)
display: flex
align-items: start
gap: 0.75rem (12px)
```

#### Alert (Error)
```css
background: #FEF2F2 (error-50)
border: 1px solid #EF4444 (error-500)
border-left: 4px solid #EF4444
border-radius: 0.5rem (8px)
padding: 1rem (16px)
```

#### Alert (Warning)
```css
background: #FEFCE8 (warning-50)
border: 1px solid #EAB308 (warning-500)
border-left: 4px solid #EAB308
border-radius: 0.5rem (8px)
padding: 1rem (16px)
```

#### Alert (Info)
```css
background: #EFF6FF (info-50)
border: 1px solid #3B82F6 (info-500)
border-left: 4px solid #3B82F6
border-radius: 0.5rem (8px)
padding: 1rem (16px)
```

#### Toast Notification
```css
background: #1F2937 (neutral-800)
color: #FFFFFF
border-radius: 0.75rem (12px)
padding: 1rem 1.25rem (16px 20px)
box-shadow: 0 10px 25px rgba(0,0,0,0.3)
position: fixed
bottom: 2rem (32px)
right: 2rem (32px)
max-width: 20rem (320px)
animation: slideIn 400ms cubic-bezier(0.16, 1, 0.3, 1)
z-index: 100
```

---

### Tabs

#### Tab List
```css
border-bottom: 2px solid #E5E7EB (neutral-200)
display: flex
gap: 0
```

#### Tab Button
```css
/* Default */
background: transparent
color: #6B7280 (neutral-500)
border-bottom: 2px solid transparent
padding: 0.75rem 1.5rem (12px 24px)
font-weight: 500
transition: all 200ms

/* Hover */
color: #374151 (neutral-700)

/* Active */
color: #E6580B (primary-600)
border-bottom-color: #E6580B (primary-600)
```

---

### Pagination

#### Pagination Container
```css
display: flex
align-items: center
justify-content: center
gap: 0.5rem (8px)
```

#### Page Button
```css
/* Default */
width: 2.5rem (40px)
height: 2.5rem (40px)
border: 1px solid #D1D5DB (neutral-300)
border-radius: 0.5rem (8px)
background: #FFFFFF
color: #6B7280 (neutral-500)
font-weight: 500
transition: all 200ms

/* Hover */
background: #F3F4F6 (neutral-100)
border-color: #9CA3AF (neutral-400)

/* Active/Current */
background: #E6580B (primary-600)
color: #FFFFFF
border-color: #E6580B
```

---

### Tooltips

#### Tooltip
```css
background: #1F2937 (neutral-800)
color: #FFFFFF
padding: 0.5rem 0.75rem (8px 12px)
border-radius: 0.5rem (8px)
font-size: 0.875rem (14px)
box-shadow: 0 4px 6px rgba(0,0,0,0.1)
position: absolute
z-index: 100
max-width: 12rem (192px)
/* Arrow via pseudo-element */
```

---

### Avatars

#### Avatar
```css
/* Default */
width: 2.5rem (40px)
height: 2.5rem (40px)
border-radius: 9999px (full)
background: linear-gradient(135deg, #EA7C1E, #E6580B)
color: #FFFFFF
font-weight: 600
display: flex
align-items: center
justify-content: center
font-size: 1rem (16px)
```

#### Avatar Sizes
| Size | Dimensions | Font Size |
|------|------------|-----------|
| xs | 1.5rem (24px) | 0.75rem (12px) |
| sm | 2rem (32px) | 0.875rem (14px) |
| md | 2.5rem (40px) | 1rem (16px) |
| lg | 3rem (48px) | 1.25rem (20px) |
| xl | 4rem (64px) | 1.5rem (24px) |

---

### Star Rating

#### Star
```css
/* Filled */
color: #FACC15 (warning-400)
fill: #FACC15

/* Empty */
color: #D1D5DB (neutral-300)
fill: none

width: 1rem (16px)
height: 1rem (16px)
```

---

### Favorite Button

#### Favorite Button
```css
/* Default (Unfavorited) */
background: rgba(255, 255, 255, 0.9)
backdrop-filter: blur(12px)
color: #374151 (neutral-700)
border: none
border-radius: 9999px (full)
padding: 0.625rem (10px)
box-shadow: 0 2px 4px rgba(0,0,0,0.1)
transition: all 200ms

/* Hover (Unfavorited) */
background: #FFFFFF
color: #DC2626 (error-600)
transform: scale(1.1)

/* Active (Favorited) */
background: #DC2626 (error-600)
color: #FFFFFF
box-shadow: 0 4px 6px rgba(220, 38, 38, 0.3)
transform: scale(1.1)

/* Icon: Heart (filled when active) */
```

---

## 🪄 5. Iconography & Imagery

### Icon Style
**Library:** Lucide React
**Style:** Outlined, rounded corners
**Weight:** 2px stroke width
**Cap:** Round
**Join:** Round

### Icon Sizes
| Usage | Size | Context |
|-------|------|---------|
| Small | 14px-16px | Inline text, compact UI |
| Default | 18px-20px | Buttons, navigation |
| Medium | 22px-24px | Section headers, features |
| Large | 28px-32px | Hero sections, empty states |

### Common Icons
- Search: `<Search />`
- Heart: `<Heart />` (favorite)
- Menu: `<Menu />` (mobile nav)
- User: `<User />` (profile)
- Mail: `<Mail />` (messages)
- Plus: `<Plus />` (create/add)
- MapPin: `<MapPin />` (location)
- Calendar: `<Calendar />` (date)
- Gauge: `<Gauge />` (mileage/speed)
- Shield: `<Shield />` (security/verification)
- Phone: Custom SVG (call)
- ChevronDown: `<ChevronDown />` (dropdown)
- ChevronRight: `<ChevronRight />` (navigation)
- Check: `<Check />` (success/confirmation)
- X: `<X />` (close/remove)
- Star: `<Star />` (ratings)

### Image Style
**Photography Tone:** High-quality, natural lighting, lifestyle shots
**Product Images:** Clean backgrounds, well-lit, multiple angles
**Aspect Ratios:**
- Listing cards: 4:3 (landscape)
- Hero images: 16:9 (wide)
- Profile/avatar: 1:1 (square)

**Image Treatment:**
- Border radius: 0.75rem-1.5rem (12px-24px)
- Hover effect: scale(1.1), duration 500ms ease-out
- Loading: Skeleton gray with shimmer animation

### Placeholder Strategy
**Color:** `#F3F4F6` (neutral-100)
**Pattern:** Centered icon (Image icon from Lucide) in `#D1D5DB` (neutral-300)
**Loading:** Animated gradient shimmer effect

---

## 🎭 6. Shadows & Effects

### Shadow System

| Level | CSS Shadow | Usage |
|-------|------------|-------|
| `shadow-xs` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle borders |
| `shadow-sm` | `0 1px 3px rgba(0,0,0,0.1)` | Cards (default) |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Hover states, elevated cards |
| `shadow-lg` | `0 10px 25px rgba(0,0,0,0.1)` | Dropdowns, popovers |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Modals, important elements |
| `shadow-2xl` | `0 25px 50px rgba(0,0,0,0.25)` | Drawers, full-screen overlays |

### Colored Shadows
```css
/* Primary (Orange) */
box-shadow: 0 4px 14px rgba(230, 88, 11, 0.2);

/* Success (Green) */
box-shadow: 0 4px 14px rgba(5, 150, 105, 0.2);

/* Error (Red) */
box-shadow: 0 4px 14px rgba(220, 38, 38, 0.2);
```

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-none` | 0 | Sharp corners |
| `rounded-sm` | 0.125rem (2px) | Minimal rounding |
| `rounded` | 0.25rem (4px) | Small elements |
| `rounded-md` | 0.375rem (6px) | Badges |
| `rounded-lg` | 0.5rem (8px) | Inputs, buttons |
| `rounded-xl` | 0.75rem (12px) | Cards (small) |
| `rounded-2xl` | 1rem (16px) | Cards (standard) |
| `rounded-3xl` | 1.5rem (24px) | Cards (large) |
| `rounded-full` | 9999px | Circular (badges, avatars) |

### Transitions

| Property | Duration | Easing | Usage |
|----------|----------|--------|-------|
| `colors` | 200ms | ease | Color changes |
| `all` | 200ms | ease | General transitions |
| `transform` | 300ms | ease-out | Hover effects |
| `transform` | 500ms | ease-out | Image zoom |
| `opacity` | 200ms | ease | Fade in/out |

### Animations

#### Slide In (Default)
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
animation: slideIn 400ms cubic-bezier(0.16, 1, 0.3, 1);
```

#### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
animation: fadeIn 300ms ease;
```

#### Scale In
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
animation: scaleIn 200ms cubic-bezier(0.16, 1, 0.3, 1);
```

#### Shimmer (Loading)
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
background: linear-gradient(90deg, #F3F4F6 0%, #E5E7EB 50%, #F3F4F6 100%);
background-size: 1000px 100%;
animation: shimmer 2s infinite linear;
```

---

## 🎯 7. Focus States & Accessibility

### Focus Ring
```css
outline: none;
ring: 4px solid rgba(230, 88, 11, 0.2); /* primary */
ring-offset: 2px;
border-radius: inherit;
```

### Color Contrast Ratios
- **Text on White:** Minimum 4.5:1 (WCAG AA)
- **Large Text:** Minimum 3:1
- **Interactive Elements:** Minimum 3:1
- **Primary Orange (#E6580B) on White:** 5.2:1 ✓
- **Neutral-700 (#374151) on White:** 10.8:1 ✓

### Keyboard Navigation
- **Visible focus indicators:** All interactive elements
- **Tab order:** Logical, left-to-right, top-to-bottom
- **Skip links:** Provided for main content
- **ARIA labels:** All icon-only buttons

---

## 💻 8. CSS Variables / Tailwind Tokens

### CSS Custom Properties
```css
:root {
  /* Colors - Primary */
  --color-primary-50: #FFF7ED;
  --color-primary-100: #FBF1EC;
  --color-primary-200: #FFE4CC;
  --color-primary-300: #FBBF85;
  --color-primary-400: #F59E42;
  --color-primary-500: #EA7C1E;
  --color-primary-600: #E6580B;
  --color-primary-700: #C24A09;
  --color-primary-800: #9A3C07;
  --color-primary-900: #7C2F05;

  /* Colors - Success */
  --color-success-50: #ECFDF5;
  --color-success-100: #D1FAE5;
  --color-success-500: #10B981;
  --color-success-600: #059669;
  --color-success-700: #047857;

  /* Colors - Error */
  --color-error-50: #FEF2F2;
  --color-error-100: #FEE2E2;
  --color-error-500: #EF4444;
  --color-error-600: #DC2626;
  --color-error-700: #B91C1C;

  /* Colors - Warning */
  --color-warning-50: #FEFCE8;
  --color-warning-100: #FEF9C3;
  --color-warning-400: #FACC15;
  --color-warning-500: #EAB308;
  --color-warning-600: #CA8A04;
  --color-warning-700: #A16207;

  /* Colors - Info */
  --color-info-50: #EFF6FF;
  --color-info-100: #DBEAFE;
  --color-info-500: #3B82F6;
  --color-info-600: #2563EB;
  --color-info-700: #1D4ED8;

  /* Colors - Neutral */
  --color-neutral-50: #F9FAFB;
  --color-neutral-100: #F3F4F6;
  --color-neutral-200: #E5E7EB;
  --color-neutral-300: #D1D5DB;
  --color-neutral-400: #9CA3AF;
  --color-neutral-500: #6B7280;
  --color-neutral-600: #4B5563;
  --color-neutral-700: #374151;
  --color-neutral-800: #1F2937;
  --color-neutral-900: #111827;

  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;

  /* Border Radius */
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 25px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.15);

  /* Transitions */
  --transition-fast: 200ms ease;
  --transition-base: 300ms ease-out;
  --transition-slow: 500ms ease-out;
}
```

### Tailwind Config Extension
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF7ED',
          100: '#FBF1EC',
          200: '#FFE4CC',
          300: '#FBBF85',
          400: '#F59E42',
          500: '#EA7C1E',
          600: '#E6580B',
          700: '#C24A09',
          800: '#9A3C07',
          900: '#7C2F05',
        },
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        // ... additional colors
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
}
```

---

## 📐 9. Component State Matrix

### Interactive States Summary

| Component | Default | Hover | Active | Focus | Disabled |
|-----------|---------|-------|--------|-------|----------|
| **Primary Button** | Orange bg | Darker orange | Darkest orange | Orange ring | Gray, opacity 60% |
| **Secondary Button** | White bg | Light gray bg | Gray bg | Gray ring | Gray, opacity 60% |
| **Input** | White, gray border | Same | Same | Orange border + ring | Gray bg, gray text |
| **Card** | White, subtle shadow | Elevated shadow, lift | Same as hover | Blue ring | N/A |
| **Link** | Gray text | Orange text | Orange text | Orange ring | Gray, no hover |
| **Checkbox** | White, gray border | Same | Orange bg | Orange ring | Gray, opacity 60% |
| **Toggle** | Gray bg | Same | Orange bg | Orange ring | Gray, opacity 60% |

---

## 🚀 10. Improvements & Recommendations

### Suggested Enhancements

1. **Color Consistency**
   - Consider unifying the exact orange shades (currently using multiple variations)
   - Define clear primary/secondary hierarchy
   - Document when to use #E6580B vs #EA7C1E

2. **Component Library**
   - Create a Storybook or similar documentation for all components
   - Add more form components (radio buttons, range sliders, file upload)
   - Create loading states for all interactive elements

3. **Accessibility**
   - Add skip navigation links
   - Ensure all images have alt text
   - Implement reduced motion preferences
   - Add ARIA live regions for dynamic content

4. **Responsive Refinements**
   - Define clearer mobile-specific components
   - Create mobile-optimized navigation patterns
   - Optimize touch targets (minimum 44x44px)

5. **Micro-interactions**
   - Add subtle animations for state changes
   - Include loading spinners
   - Create success/error animations
   - Add page transition effects

6. **Dark Mode**
   - Implement full dark mode support
   - Create dark mode variants for all components
   - Add theme toggle component

7. **Documentation**
   - Create component usage examples
   - Add do's and don'ts for each component
   - Include code snippets for common patterns

---

## 📦 Quick Reference

### Most Used Colors
- Primary CTA: `#E6580B`
- Primary Hover: `#C24A09`
- Success/Call: `#059669`
- Background: `#F9FAFB`
- Text: `#374151`
- Border: `#E5E7EB`

### Most Used Spacing
- Card padding: `1.5rem` (24px)
- Section padding: `3rem` (48px)
- Button padding: `0.75rem 1.5rem` (12px 24px)
- Stack gap: `1rem` (16px)

### Most Used Border Radius
- Buttons: `0.75rem` (12px)
- Cards: `1.5rem` (24px)
- Inputs: `0.5rem` (8px)
- Badges: `9999px` (full)

### Most Used Shadows
- Default card: `0 1px 3px rgba(0,0,0,0.1)`
- Hover card: `0 4px 6px rgba(0,0,0,0.1)`
- Modal: `0 20px 25px rgba(0,0,0,0.15)`

---

**Design System Version:** 1.0
**Last Updated:** 2025-10-06
**Maintained By:** MotoMarket Design Team