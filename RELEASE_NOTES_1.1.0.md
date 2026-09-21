# PCP Community Website — Production Community Rebuild

## Major changes
- Full official-community landing page: About, community pillars, programs, principles, CTA, contact/footer.
- Responsive navigation and mobile layout rebuilt.
- Production Control Center with Pre-Release / Live / Maintenance lifecycle.
- Global response intake kill-switch and public announcement controls.
- Community Profile editor for hero copy and official contact/social links.
- Release version/environment/launch note controls.
- Internal production readiness checklist.
- Firestore rules now enforce LIVE + response-intake state for public form reads/submissions.
- Maintenance page supports pre-release state.

## Required deployment step
Deploy `page/PCP_Form_System/firestore.rules` to Firestore before production release. The frontend files alone do not activate the database-side release controls.
