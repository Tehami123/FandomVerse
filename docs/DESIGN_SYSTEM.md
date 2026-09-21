# FandomVerse Design System

This document serves as the single source of truth for the visual and interaction design of the FandomVerse application.

## 1. DESIGN IDENTITY
- **Visual Personality:** Premium, cinematic, and editorial. FandomVerse feels like a high-end digital magazine mixed with a modern streaming platform.
- **Design Philosophy:** Image-first. The content artwork should provide the majority of the color and energy. The UI itself should recede, providing a structured, elegant frame for the content.
- **Emotional Experience:** Immersive, sleek, and authoritative. It should feel like a curated sanctuary for fandom enthusiasts across Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga.
- **Guiding Principles:** 
  - *Contrast & Hierarchy:* Use stark contrasts in typography and lighting to guide the eye.
  - *Restraint:* Avoid chaotic layouts. Embrace negative space to create a premium feel.
  - *Subtle Depth:* Use glassmorphism and soft glows to create depth without relying on heavy borders or flat panels.

## 2. COLOR SYSTEM
Derived from the cinematic dark-mode references, the palette relies on deep, atmospheric backgrounds with high-contrast text and subtle neon accents.

- **Background Colors:**
  - Base Background: `#0A0A0C` (Deep void black/charcoal)
  - Surface Background: `#121216` (Slightly elevated, for sidebars/panels)
  - Elevated Surface: `#1A1A20` (For cards and modals)
- **Text Colors:**
  - Primary Text: `#FFFFFF` (For high-emphasis headings)
  - Secondary Text: `#A0A0AB` (For body copy and metadata)
  - Muted Text: `#6E6E77` (For disabled states or subtle labels)
- **Borders & Dividers:**
  - Subtle Divider: `#2A2A32`
  - Focus Ring: `#4F46E5`
- **Accent Colors:**
  - Primary Accent: `#6366F1` (Indigo/Neon Blue) - Used for primary actions, active states.
  - Secondary Accent: `#EC4899` (Magenta) - Used sparingly for special tags or gradients.
  - Success: `#10B981`
  - Warning/Error: `#EF4444`
- **Gradients/Glass:**
  - Hero Overlay Gradient: `linear-gradient(to top, #0A0A0C 0%, transparent 100%)`
  - Glass Surface: `rgba(18, 18, 22, 0.6)` with `backdrop-filter: blur(12px)`

## 3. TYPOGRAPHY
The typography pairs a bold, expressive display font with a clean, readable sans-serif for body text, creating an editorial feel.

- **Primary Font (Headings/Display):** `Outfit` or `Space Grotesk` (Modern, geometric, slight sci-fi/cinematic edge).
- **Secondary Font (Body/UI):** `Inter` or `Roboto` (Highly legible, neutral).
- **Hierarchy:**
  - *Hero Title (h1):* 64px (Mobile: 40px), 800 (Extra Bold), -0.02em letter spacing, 1.1 line height. Uppercase or Title Case.
  - *Section Heading (h2):* 32px (Mobile: 24px), 700 (Bold), 1.2 line height.
  - *Card Title (h3):* 20px, 600 (Semi-Bold), 1.3 line height.
  - *Body Text (p):* 16px, 400 (Regular), 1.6 line height.
  - *Metadata/Small Text:* 14px, 500 (Medium), uppercase with 0.05em letter spacing.
- **Buttons/Labels:** 15px, 600, uppercase, 0.02em letter spacing.

## 4. SPACING SYSTEM
A strict 8px grid system ensures rhythmic and consistent layouts.

- **Base Unit:** 8px
- **Scale:** 
  - `xs`: 4px (tight grouping, e.g., icon and text)
  - `sm`: 8px (small spacing, between metadata items)
  - `md`: 16px (standard padding inside buttons, small cards)
  - `lg`: 24px (standard spacing between sibling components)
  - `xl`: 32px (spacing between sections in a sidebar)
  - `2xl`: 48px (spacing between major content blocks)
  - `3xl`: 80px (spacing between major page sections)
- **Page Padding:** 
  - Desktop: 48px horizontally
  - Tablet: 32px horizontally
  - Mobile: 16px horizontally

## 5. SHAPE / GEOMETRY
Shapes should lean towards sharp or slightly rounded to maintain a sleek, modern look.

- **Border Radius:**
  - Small (Tags, Checkboxes): `4px`
  - Medium (Buttons, Inputs, Small Cards): `8px`
  - Large (Hero Images, Large Modals, Content Cards): `12px`
- **Image Treatment:** Images should fill their containers (object-fit: cover) and often sit behind a subtle dark vignette or gradient overlay to ensure text readability.
- **Shadows/Glows:**
  - Subtle Shadow (Cards): `0 4px 20px rgba(0, 0, 0, 0.4)`
  - Active Glow: `0 0 15px rgba(99, 102, 241, 0.4)` (Used on hover for primary elements).
  - Borders: 1px solid `#2A2A32` on cards to separate them from the background.

## 6. GLOBAL NAVIGATION / APP SHELL
- **Desktop:** A sleek, transparent-to-solid top navigation bar. Links are centered or left-aligned next to the Logo. Right side houses Search, Bookmarks, and User/Login profile.
- **Mobile:** A bottom navigation bar for core routes (Home, Search, Bookmarks, Profile) or a collapsed hamburger menu for categories, ensuring easy thumb reach.
- **Logo Area:** Text-based typographic logo (e.g., FANDOMVERSE in bold tracking) or a sleek geometric icon.
- **Global Search:** Accessible via an icon in the header that expands into a full-width overlay or large modal with instant results.
- **Chatbot Access:** A persistent floating action button (FAB) in the bottom right corner (above mobile nav if present).

## 7. HERO SYSTEM
- **Composition:** Full-bleed or large-container edge-to-edge imagery. Asymmetric text placement (left-aligned) leaving the right side for the focal point of the artwork.
- **Overlays:** A heavy bottom-to-top gradient (`#0A0A0C` to transparent) to blend the image into the page background.
- **Content:** 
  - Eyebrow text (e.g., "Trending Now")
  - Massive Title
  - 1-2 lines of description
  - Primary CTA ("Explore", "Read More") + Secondary CTA ("Add to Bookmarks").
- **Motion:** Slow, cinematic scale-up (Ken Burns effect) on the background image upon load.

## 8. CARD SYSTEM
Cards are the primary building blocks for content discovery.
- **General Rules:** Consistent aspect ratios per category (e.g., 2:3 for movies/manga, 16:9 for trailers). Images use `cover`. Text sits either below the image or inside the image with a gradient overlay.
- **Interaction:** On hover, the image scales slightly (1.05x), and the card border or shadow subtly glows with the primary accent color.
- **Content Cards:** Poster image, Title (1 line truncate), Metadata (Year, Category).
- **Article Cards:** Editorial style. Landscape image, prominent headline, author, and reading time.
- **Character Cards:** Portrait or cut-out image on a gradient background, Name, and Franchise.
- **Merchandise Cards:** Square product image, Title, Price in primary accent color, "Add to Cart" ghost button on hover.

## 9. CATEGORY HUB DESIGN
Each of the 7 hubs (Anime, Gaming, Movies, TV Shows, K-Pop, Comics, Manga) shares the underlying structural DNA but adapts its content presentation:
- **Unified Structure:** A dedicated Hero banner for the category, followed by horizontal scrolling rows (carousels) for sub-genres or "Trending", and a masonry or grid layout for editorial articles.
- **Consistency:** The navigation, typography, and card geometry remain identical across all hubs to ensure it feels like FandomVerse, not fragmented sites.

## 10. SEARCH / FILTER / SORT UI
- **Search Interface:** A large, immersive, screen-takeover modal with a massive input field. Real-time visual results categorized by type (Characters, Articles, Movies).
- **Filters/Sort:** Presented as horizontal pill-shaped chips (`border-radius: 99px`) below section headers or in a collapsible sidebar.
- **Active States:** Chips change background from `#1A1A20` to `#6366F1` when active.
- **Empty States:** A sleek, minimal graphic with muted text ("No results found in this universe.").

## 11. CHARACTER PROFILE SYSTEM
- **Layout:** A split-screen or heavy asymmetric layout. A large, high-res portrait on the left/top.
- **Biography & Traits:** Clean, tabular data for stats (Class, Weapon, Affiliation) and legible prose for the biography.
- **Related Content:** A horizontal carousel at the bottom showing the franchises/movies the character appears in.

## 12. ARTICLE / EDITORIAL SYSTEM
- **Layout:** High-end digital magazine. A massive cover image taking up the top 50% of the screen.
- **Typography:** Body text max-width of `65ch` for optimal reading. Drop caps for the first letter. Blockquotes stylized with a heavy left border in the accent color.
- **Metadata:** Author avatar, name, date, and reading time sticky at the top or elegantly placed below the headline.

## 13. TRAILER / VIDEO SYSTEM
- **Thumbnails:** 16:9 aspect ratio. A prominent, glassmorphic play button centered on the thumbnail.
- **Presentation:** Clicking a trailer opens a cinematic, full-screen lightbox/modal with a backdrop blur (`backdrop-filter: blur(20px)`), dimming the rest of the UI.
- **Indicators:** "New", "Premiere", or "Live" badges in the top left corner of the thumbnail.

## 14. EVENTS SYSTEM
- **Cards:** Calendar-inspired layout. A prominent date block (e.g., "OCT 24") juxtaposed against an atmospheric background image of the event.
- **Details:** Location, time, and ticket status (e.g., "Upcoming", "Ongoing") displayed as colored tags.

## 15. MERCHANDISE SYSTEM
- **Product Cards:** Clean, distraction-free backgrounds (subtle grey/dark radial gradients) to make products pop.
- **Cart Interactions:** Since it's a temporary cart (per SRS), adding an item triggers a sleek toast notification or a slide-out side drawer showing the cart contents.
- **Quantity/Total:** Simple `+ / -` steppers. The total billing is prominently displayed at the bottom of the drawer.

## 16. CHATBOT SYSTEM
- **Button:** A persistent, circular glassmorphic FAB with a recognizable AI/Chat icon.
- **Panel:** Slides up from the bottom right. Uses the surface background color (`#121216`) with a 1px border (`#2A2A32`).
- **Bubbles:** 
  - User: Solid accent color (`#6366F1`), right-aligned.
  - Bot: Muted surface (`#1A1A20`), left-aligned.
- **Quick Replies:** Pill-shaped chips below the bot's message for easy navigation (e.g., "Recommend an Anime", "Latest Gaming News").

## 17. BUTTONS / FORM CONTROLS
- **Primary Button:** Solid `#6366F1` background, white text. Hover: brightens to `#818CF8`.
- **Secondary/Ghost Button:** Transparent background, 1px solid `#4F46E5` border, `#6366F1` text. Hover: Background becomes `rgba(99, 102, 241, 0.1)`.
- **Icon Button:** Circular or square with `8px` radius. Subtle hover background (`#1A1A20`).
- **Inputs:** Height `48px`. Background `#121216`, Border `#2A2A32`. Focus state outlines the input in `#6366F1` and adds a subtle glow.

## 18. MOTION / ANIMATION SYSTEM
- **Philosophy:** Premium and restrained. Never bouncy; always smooth and purposeful.
- **Durations:** 
  - Hovers: `200ms ease-out`
  - Page/Modal Transitions: `400ms cubic-bezier(0.16, 1, 0.3, 1)`
- **Hero/Page Reveals:** Subtle fade-in and slide-up (Y-axis translation of 20px) staggered for children elements.
- **Image Hovers:** Smooth scale from `1.0` to `1.05` over `400ms`.

## 19. RESPONSIVE DESIGN
- **Desktop (1024px+):** Full grids, expansive margins, sidebar navigation (if applicable), and multi-column layouts.
- **Tablet (768px - 1023px):** 2-3 column grids. Navigation transitions to a more compact header.
- **Mobile (<768px):** 1-2 column grids. Navigation moves to a bottom bar or hamburger menu. Typography scales down significantly (e.g., Hero from 64px to 40px). Touch targets minimum `44x44px`.

## 20. ACCESSIBILITY
- **Contrast:** Ensure all text passes WCAG AA contrast ratios against the dark backgrounds.
- **Focus States:** Every interactive element MUST have a visible focus ring (`#4F46E5`, 2px solid, offset by 2px) when navigated via keyboard.
- **Alt Text:** Required for all content images (posters, characters, articles).
- **Motion:** Respect `prefers-reduced-motion` media queries by disabling cinematic scaling and staggered reveals.

## 21. IMAGE / ASSET GUIDELINES
- Reference images stay in `design-references/` and are strictly for visual inspiration.
- Production assets (posters, icons, backgrounds) will be sourced locally and stored in `src/assets/`.
- All UI should be built assuming images might load slowly; use placeholder skeletons or subtle gradient backgrounds (`#1A1A20`) before images load.

## 22. DESIGN TOKENS
These tokens should be implemented via CSS Variables in `index.css`:
```css
:root {
  /* Colors */
  --color-bg-base: #0A0A0C;
  --color-bg-surface: #121216;
  --color-bg-elevated: #1A1A20;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #A0A0AB;
  --color-text-muted: #6E6E77;
  --color-border: #2A2A32;
  --color-accent-primary: #6366F1;
  --color-accent-secondary: #EC4899;

  /* Typography */
  --font-family-display: 'Space Grotesk', sans-serif;
  --font-family-body: 'Inter', sans-serif;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Transitions */
  --transition-fast: 200ms ease-out;
  --transition-smooth: 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

## 23. COMPONENT PRINCIPLES
The following patterns will become reusable React components:
- `Button` (Variants: primary, secondary, ghost, icon)
- `Card` (Variants: content, article, character, product)
- `HeroBanner` (Accepts image, title, description, CTAs)
- `SectionHeader` (Title + optional 'View All' link)
- `Carousel` / `HorizontalScroll` (For rows of content cards)
- `Tag` / `Chip` (For categories, filters, status)

## 24. PAGE-LEVEL VISUAL STRUCTURE
- **Landing/Home:** Massive Hero -> Trending Carousel -> Editor's Picks (Editorial Grid) -> Upcoming Releases.
- **Category Hubs:** Category Hero -> Top Rated -> New Releases -> Latest News/Articles.
- **Search:** Full-screen overlay. Prominent search bar -> Filter chips -> Masonry grid of results.
- **Character Profiles:** Split layout: Left static image, right scrolling details/stats/related media.
- **Merchandise:** Grid layout of product cards -> Slide-out cart drawer on the right.
- **Chatbot:** Floating action button -> bottom-right anchored chat panel.
