# FandomVerse

> **Portal for Fandom World**

FandomVerse is a cinematic, interactive fandom discovery platform built for **Aptech Techwiz 7 – Web Innovation Unleashed**.

It brings multiple fandom worlds into one place, allowing users to explore anime, gaming, movies, TV shows, K-Pop, comics, and manga through articles, characters, events, trailers, releases, merchandise, and interactive fandom experiences.

---

## Overview

Fandom information is often scattered across fan wikis, streaming platforms, social media, news websites, event platforms, and merchandise stores.

**FandomVerse** brings these experiences together into a single, visually rich platform designed around discovery and exploration.

The project combines a cinematic editorial interface with interactive fandom-focused features to create a centralized **Fandom Universe**.

---

## Fandom Categories

FandomVerse currently includes seven major categories:

- Anime
- Gaming
- Movies
- TV Shows
- K-Pop
- Comics
- Manga

Each category provides its own collection of fandom content, characters, events, releases, articles, and related media.

---

## Features

### Content Discovery

- Global search
- Category-based browsing
- Content filtering
- Sorting and discovery controls
- Featured content
- Related content suggestions
- Breadcrumb navigation

### Articles

- Featured articles
- Article detail pages
- Related content
- Bookmark support

### Characters

- Character discovery
- Character detail pages
- Character biographies and information
- Character collections
- Character bookmarking
- Character image downloads

### Events

- Fandom events
- Event detail pages
- Event discovery and filtering
- Bookmark support

### Trailers & Media

- Trailer discovery
- Trailer filtering
- Responsive video playback
- Trailer detail pages
- Media bookmarking
- Image galleries and lightboxes

### Merchandise

- Merchandise catalog
- Product discovery
- Add-to-cart functionality
- Quantity management
- Cart persistence
- Merchandise removal
- Frontend-only cart with no real checkout or payment processing

### Upcoming Releases

- Release discovery
- Category-based releases
- Release information
- Responsive release presentation

### Bookmarks & Collection

Users can save fandom content locally, including:

- Articles
- Events
- Trailers/media
- Characters

Bookmarks persist using browser local storage.

The platform also supports notes and exporting saved information where implemented.

---

## Signature FandomVerse Features

### Fandom Clash

A dedicated interactive fandom experience that allows users to engage with different fandoms through a head-to-head clash experience.

### Fandom DNA

An interactive fandom experience designed to explore a user's fandom identity and interests.

### Summon

A fandom discovery experience that allows users to summon and explore fandom-related content.

These features were created specifically for FandomVerse to make the platform more interactive than a conventional content archive.

---

## Chatbot

FandomVerse includes a scripted, rule-based chatbot that provides an interactive way for users to navigate and discover content across the platform.

The chatbot is frontend-only and does not require a backend service.

---

## Authentication

The project includes a frontend demonstration authentication system with:

- Sign Up
- Login
- Logout
- Local session persistence

Authentication is implemented as a **demo frontend experience** and does not provide real server-side authentication.

---

## Navigation

The final navigation system is organized around two main discovery areas:

### Explore

Provides access to the seven fandom categories:

- Anime
- Gaming
- Movies
- TV Shows
- K-Pop
- Comics
- Manga

### Discover

Provides access to:

- Articles
- Trailers
- Events
- Characters
- Merchandise
- Releases

Additional navigation includes:

- Search
- Bookmarks
- Cart
- About
- Contact
- Sign Up / Logout

---

## Design

FandomVerse follows a **Cinematic Editorial × Fandom Archive** visual direction.

The interface combines:

- Dark cinematic backgrounds
- Editorial typography
- Large visual compositions
- Category-specific accents
- Responsive layouts
- Animated transitions
- Interactive cards
- 3D visual elements
- Ambient visual effects
- Responsive galleries and detail pages

The design was created to make fandom discovery feel like an immersive digital archive rather than a traditional dashboard.

---

## Interactive & Visual Experience

The platform includes several visual interaction systems, including:

- Homepage 3D Fandom Universe experience
- Character visual treatments
- Animated route transitions
- Interactive content cards
- Animated navigation dropdowns
- Ambient background visuals
- Responsive image galleries
- Lightbox interactions
- Hover and micro-interactions
- Reduced-motion support

---

## Tech Stack

The project is built as a frontend React application using:

- **React**
- **Vite**
- **JavaScript**
- **React Router**
- **CSS**
- **Lucide React**
- **Motion / animation libraries**
- **React Three Fiber / Three.js** for selected 3D experiences
- **Local JSON/static data**
- **localStorage** for client-side persistence

No backend server or database is required for the core application.

---

## Project Structure

```text
FandomVerse/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── context/
│   └── ...
├── docs/
├── index.html
├── package.json
├── vite.config.*
├── vercel.json
└── README.md