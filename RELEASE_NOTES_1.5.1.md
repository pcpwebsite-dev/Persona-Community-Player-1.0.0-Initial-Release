# PCP 1.5.1 — Form Reliability Hotfix

- Fixed fatal public form renderer bug that prevented questions from rendering/filling.
- Added graceful form-load failure state.
- Native required/email/number/date/time validation runs before moving section/submitting.
- Submit button locks while sending to prevent duplicate responses.
- Improved send-error recovery.
- Stabilized Publish state in the form builder.
- RTDB response path remains `/responses/{formId}/{responseId}`.
