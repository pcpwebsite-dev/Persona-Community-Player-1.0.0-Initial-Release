# PCP v1.5.0 — Forms Workspace Rebuild

- Rebuilt form editor around a Google Forms-inspired workflow (original PCP visual identity retained).
- Added dedicated Questions / Responses / Settings navigation.
- Added question types, options, duplicate/delete/reorder, title/description blocks and sections.
- Autosave uses debounce instead of refresh/re-render loops.
- Public form supports sections, progress, optional shuffle, email collection and instant theme switching.
- Responses rebuilt with Summary, Question table and Individual response views.
- RTDB timestamp handling fixed; response dates now render correctly.
- CSV export rebuilt for RTDB data.
- Theme controller no longer reloads pages and expensive global theme transitions were removed.
- All PCP background layers use a subtle 4px blur (~15% visual softening) without blurring foreground UI.
