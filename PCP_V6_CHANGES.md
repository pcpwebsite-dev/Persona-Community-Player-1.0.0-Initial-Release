# PCP v6 — Unified Admin Layout

Rebuilt the shared admin shell across Dashboard, Status Website, Community, Form Builder, Responses, and Operations. Each now contains exactly one desktop sidebar and one mobile navigation bar (shown only below 900px), with a shared top header and stylesheet `page/PCP_Form_System/css/unified-v6.css`.

Existing Firebase JavaScript and form database paths were preserved. Admin login is intentionally a separate layout. No Firebase production connection or browser-based interaction test has been performed; test LIVE/MAINTENANCE and response access on staging before replacing production.

Upload the ZIP contents to the hosting document root, preserving directory structure. Clear CDN/browser cache. Keep a backup of the existing production site.
