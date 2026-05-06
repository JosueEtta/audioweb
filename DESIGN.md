---
name: High-Fidelity Audio System
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#e9bcb5'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#b08781'
  outline-variant: '#5f3f3a'
  surface-tint: '#ffb4a8'
  primary: '#ffb4a8'
  on-primary: '#690000'
  primary-container: '#e60000'
  on-primary-container: '#fff7f5'
  inverse-primary: '#c00000'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#c8c6c5'
  on-tertiary: '#303030'
  tertiary-container: '#737272'
  on-tertiary-container: '#fbf8f8'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#930100'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  h1:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: 40px
---

## Brand & Style

This design system is engineered to evoke a cinematic and immersive atmosphere, tailored for audiophiles who value precision and depth. The aesthetic merges **Minimalism** with **Glassmorphism**, utilizing high-contrast visuals to spotlight content while maintaining a sophisticated, low-light environment. 

The emotional response should be one of "focused luxury"—where the interface disappears to prioritize the album art and the listening experience. Key visual pillars include fluid transitions, translucent layering to imply depth, and a "glowing" interactive state that feels alive against the deep black canvas.

## Colors

The palette is anchored by a true black (#000000) background to achieve infinite contrast on OLED displays and minimize visual fatigue. The primary accent is a vibrant, high-energy red, used exclusively for critical actions and active states to guide the eye instantly. 

Depth is achieved through a tiered gray scale. Secondary and tertiary grays are used for "surface" levels—cards and containers that appear to float above the base. Interaction states utilize a slightly desaturated red or a glow effect of the primary color to signify hover and press.

## Typography

This design system utilizes **Inter** for its exceptional legibility and systematic weights. The typographic hierarchy is aggressive: large, bold headlines create clear entry points, while secondary labels use increased letter spacing and uppercase styling to provide metadata without clutter. 

Weight is used as the primary tool for hierarchy. Titles should always feel heavy and grounded, while body copy remains light to preserve the minimalist aesthetic.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a sidebar-main configuration. The content area utilizes a 12-column system designed for desktop viewing. 

Spacing is governed by an 8px rhythmic grid. Generous margins (40px+) are used at the edges of the viewport to create a "gallery" feel for the music covers. Elements within the main view should feel airy, while controls in the sidebar or bottom player are more densely packed for utility.

## Elevation & Depth

Depth is communicated through **Glassmorphism** and **Tonal Layers**. 

1.  **Base Layer:** Solid #000000.
2.  **Surface Layer:** Dark gray (#121212) with a 1px subtle border (#FFFFFF at 5% opacity).
3.  **Floating Elements:** Use a backdrop-blur (20px to 40px) with a semi-transparent black fill (60% opacity). This is reserved for persistent players, menus, and overlays.
4.  **Shadows:** Shadows are rarely used; instead, "inner glows" or thin, low-opacity borders are preferred to define boundaries without adding visual weight.

## Shapes

The shape language is consistently **Rounded**. Album art and cards should feature a 1rem (16px) radius to feel approachable and modern. Smaller elements like chips or badges utilize a **Pill-shaped** (3rem+) radius to contrast against the structured grid. 

Interactive elements like buttons should never have sharp corners; they must align with the fluid, organic feel of the imagery used throughout the app.

## Components

**Buttons:** Primary buttons are solid Red (#E60000) with white text. Secondary buttons use a glass effect with a white border. All buttons utilize a subtle scaling effect on hover (1.02x).

**Chips:** Used for genre tags or filters. They should be pill-shaped with a dark gray background and white text, switching to a red background when active.

**Playback Sliders:** The "track" of the slider should be a dark gray (#282828), while the "progress" is the primary Red. The thumb/handle should only appear on hover to maintain a clean aesthetic.

**Cards:** Album and artist cards should have no visible border until hovered. On hover, a subtle scale increase and a soft red outer glow should be applied.

**Lists:** Tracklists use a alternating transparent/subtle-gray background on hover. The active track should be indicated by a red "playing" icon or high-contrast red text.

**Glass Overlays:** Modals and context menus must use the glassmorphism style (heavy blur, semi-transparent background) to maintain the sense of a continuous, singular environment.