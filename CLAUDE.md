# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Language

**Always communicate in Chinese** for all user-facing messages, explanations, and responses. Code comments should be in Chinese.

## Project Overview

A single-file HTML implementation of Minesweeper with two visual themes (modern and Windows XP classic), three difficulty levels, and a victory fireworks animation.

## Architecture

**Single-file structure** - All game logic, styling, and markup in `minesweeper.html`:
- CSS sections are clearly marked with comments for global, modern skin, classic skin, and fireworks styles
- JavaScript is divided into: constants, state, DOM references, utilities, theme handling, core game logic, click handling, event delegation, and initialization

**Core game data structure:**
```javascript
board[r][c] = { mine, revealed, flagged, adjacentMines }
```

**Key game flow:**
1. First click is always safe - mines are placed after initial click via `placeMines(excludeR, excludeC)` using Fisher-Yates shuffle
2. Left click on unrevealed cell → `reveal()` with flood-fill for empty cells
3. Right click → toggle flag, update mine counter
4. Double-click (chord) on revealed number → if surrounding flag count equals cell number, auto-reveal neighbors
5. Victory when `safeRevealed === totalSafe`

**Event handling:**
- Event delegation on `.board` element for performance
- 300ms delay for distinguishing single-click from double-click on revealed cells
- `renderGeneration` counter prevents stale setTimeout callbacks from executing after game reset

**Theme system:**
- Two CSS themes via `.classic` class on `.game` and `.classic-theme` on body
- Theme preference persisted in `localStorage` key `'minesweeper-theme'`
- Toggle via 🎨 button

**Memory management:**
- Fireworks use `fireworkTimeouts` array to track and cleanup all setTimeouts
- `fireworksActive` flag prevents stacking animations
- All timers cleared on `clearFireworks()` called during game reset

## Local Development

**Running the game:** Open `minesweeper.html` directly in a browser (no build step required).

**Testing changes:** Refresh browser after editing `minesweeper.html`. Theme persistence is in localStorage, so clearing browser data resets theme preference.

## Project Configuration

**StatusLine** (`.claude/settings.local.json`):
- Configured as command type using Node.js script at `.claude/statusline.js`
- Displays: `cwd | model.display_name | context_window.remaining_percentage`
- Uses optional chaining (`?.`) and nullish coalescing (`??`) for safe field access

**Git:** Remote is `github.com:Eirka-Wu/minesweeper.git` on branch `master`.

## Code Style

- Comments in Chinese (matching the UI language)
- CSS classes follow BEM-like naming (`.cell`, `.cell.revealed`, `.n1`, `.diff-btn.active`)
- No external dependencies - pure vanilla HTML/CSS/JS
- Emoji used for face表情 and theme toggle (😊, 😮, 😵, 😎, 🎨)
- Mines flagged with 🚩, mines revealed with 💣