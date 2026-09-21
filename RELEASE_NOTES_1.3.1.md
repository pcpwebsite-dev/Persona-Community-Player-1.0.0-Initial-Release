# PCP v1.3.1 — Admin Access & Release Control Hotfix

- Added ADMIN access button to public homepage.
- Added ADMIN ACCESS button to maintenance screen so administrators cannot be locked out.
- Fixed Website Status module references that could prevent LIVE / RELEASE from executing.
- Fixed maintenance page JavaScript syntax/runtime issue.
- Maintenance screen now observes RTDB status and automatically returns to the public homepage when an admin switches the site to LIVE.
- Maintenance end time remains optional; blank displays "Waktu maintenance tidak ditentukan."
- LIVE remains manual: maintenance never auto-releases based on the estimate.
