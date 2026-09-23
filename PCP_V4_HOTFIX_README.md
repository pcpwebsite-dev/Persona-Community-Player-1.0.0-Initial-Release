# PCP v4 — Navigation + LIVE state hotfix

- Desktop: one sidebar; mobile: one bottom navigation (no extra wrapped sidebar).
- Maintenance state uses only `/siteSettings/general/releaseState`. Legacy `enabled` is retained for compatibility but cannot override LIVE.
- LIVE button writes `releaseState: live`, `enabled: false`, `released: true`, clears `maintenanceUntil`, and reads back to verify.
- This ZIP does not change database rules or overwrite your existing Firebase data.

## Restore LIVE now
In Firebase Console > Realtime Database > Data > `siteSettings/general`, verify `releaseState` is `live`, `enabled` is `false`, and `released` is `true`. Alternatively sign into PCP Admin > Status Website > LIVE / RELEASE. Do not upload `rtdb-initial-data.json` over production data.

## Deploy
Back up existing hosting files. Upload ZIP contents to site root; clear host/browser/CDN cache. Test dashboard, builder, responses at desktop and mobile widths. Firebase production access cannot be tested offline.
