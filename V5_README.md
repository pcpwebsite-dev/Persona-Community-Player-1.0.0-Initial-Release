# PCP v5 — repair based on v4 source

- Status LIVE and MAINTENANCE use atomic RTDB update, not read-then-write merge.
- Responses removes duplicated branding header, handles database errors and form deselection, supports answer keys by question id/key or q-index, and escapes CSV formula prefixes.
- Stabilization stylesheet applied after older admin styles.
- Firebase RTDB rules are **unchanged**. Any signed-in account still has broad write access under the existing rules; restrict UID before production.
- Static checks do not prove successful login, authorized production writes, or visual behavior on real devices. Back up site and test on staging first.
