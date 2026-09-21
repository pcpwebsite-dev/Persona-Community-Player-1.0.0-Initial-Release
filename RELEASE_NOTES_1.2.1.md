# PCP 1.2.1 — Production Admin Repair

- Admin panels separated into Overview, Website Status, Community Profile, Forms, Responses, Operations.
- Production state simplified to LIVE and MAINTENANCE only.
- LIVE button directly clears legacy `enabled` and `released` maintenance flags.
- Maintenance date/time is optional and informational only.
- Maintenance never auto-expires; admin must press LIVE / RELEASE.
- Public homepage now fails open on configuration read errors and locks only on explicit maintenance.
- Maintenance page returns to homepage immediately after LIVE is activated.
- Admin CSS rebuilt for consistent desktop/mobile layout.
- Firestore rules updated for the simplified lifecycle.
