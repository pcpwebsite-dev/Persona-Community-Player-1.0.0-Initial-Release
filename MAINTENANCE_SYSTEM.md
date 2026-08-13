# PCP Global Maintenance System

Maintenance mode is centrally controlled through Firebase Firestore.

## Central document
`siteSettings/general`

## Control panel
`page/PCP_Form_System/admin/dashboard.html`

## Public routing
- `index.html` checks `siteSettings/general`.
- `enabled=false` -> homepage.
- `enabled=true` -> `page/LockScreen/Maintenance/`.

## Important
Deploy the complete `WebSIte` folder and publish `page/PCP_Form_System/firestore.rules` in Firebase Firestore Rules.
The shared Firebase module is available at `js/firebase.js`.
