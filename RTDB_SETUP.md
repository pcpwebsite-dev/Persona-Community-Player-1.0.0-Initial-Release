# PCP Firebase Realtime Database setup — v1.3

Target Firebase project: `pcp-form-4a4cb`

The website now uses Firebase Authentication + Firebase Realtime Database (RTDB). Firestore is no longer used by the frontend.

## Required Firebase Console setup
1. Open project `pcp-form-4a4cb`.
2. Build > Realtime Database > Create Database.
3. If Firebase gives a database URL different from `https://pcp-form-4a4cb-default-rtdb.firebaseio.com`, replace `databaseURL` in both `js/firebase.js` and `page/PCP_Form_System/js/firebase.js`.
4. Realtime Database > Rules: paste `database.rules.json`, then Publish.
5. Authentication > Sign-in method: enable Email/Password.
6. Authentication > Users: create the PCP admin account.

## Initial RTDB data
Import `rtdb-initial-data.json` once, or create the same nodes manually.

## Data structure
- `/siteSettings/general` — LIVE / MAINTENANCE state
- `/communityProfile/main` — public community profile
- `/forms/{formId}` — forms
- `/responses/{formId}/{responseId}` — submissions
- `/admin_audit` — reserved admin audit data

The maintenance end time is informational only. The site stays in maintenance until an authenticated admin clicks LIVE / RELEASE.
