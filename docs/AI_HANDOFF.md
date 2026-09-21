# FandomVerse AI Handoff Protocol

## IMPORTANT

This project is being developed using multiple AI tools.

Possible tools include:

- Antigravity
- ChatGPT
- Cursor
- GitHub Copilot
- Claude
- Other development assistants

The project must remain consistent when work moves between AI tools.

---

## BEFORE WORK

The AI MUST:

1. Read PROJECT_STATE.md
2. Inspect the repository
3. Inspect relevant existing components
4. Inspect DESIGN_SYSTEM.md before making visual changes
5. Understand the current task
6. Avoid recreating existing components

---

## DURING WORK

The AI SHOULD:

- Reuse existing components
- Reuse existing design tokens
- Follow established naming conventions
- Avoid unnecessary dependencies
- Avoid changing unrelated files
- Keep the implementation responsive
- Keep accessibility in mind
- Keep animations subtle and purposeful

---

## AFTER WORK

The AI MUST:

1. Test the implementation
2. Check for console errors
3. Check responsive behavior where relevant
4. Update PROJECT_STATE.md
5. Record changed files
6. Record important decisions
7. Record unresolved issues
8. Specify the next logical task

---

## HANDOFF FORMAT

When finishing a task, update PROJECT_STATE.md using:

### Completed
- ...

### Files Changed
- ...

### Decisions
- ...

### Issues
- ...

### Next Task
- ...

---

## DO NOT

- Start over because another AI wrote the previous code
- Replace working components unnecessarily
- Install random libraries
- Change the design system without documenting it
- Introduce backend functionality
- Add unnecessary authentication systems
- Add payment functionality
- Replace local JSON with a backend
- Remove existing functionality without documenting why