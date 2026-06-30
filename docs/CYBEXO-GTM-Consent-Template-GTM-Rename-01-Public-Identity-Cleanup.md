# GTM-Rename-01 Public Identity Cleanup

Status: Done  
Date: June 30, 2026  
Program: `GTM-Rename`

## Intent

Make the GTM template repository read as `CYBEXO-GTM-Consent-Template` before changing runtime contract behavior.

## Scope

1. Add program docs and execution tracker.
2. Update README repository identity.
3. Rename source-only internal `NXG_*` endpoint constants to `CYBEXO_*`.
4. Rename test-only `loadNXG` fixture field to `loadCybexo`.
5. Add a verifier for public identity cleanup.

## Explicit Non-Goals

1. No change to GTM template display name.
2. No change to locked production endpoints.
3. No change to Consent Mode defaults or developer ID behavior.
4. No local folder, remote, or GitHub repository rename in this slice.

## Acceptance Checks

1. README carries `CYBEXO-GTM-Consent-Template`.
2. Template source uses `CYBEXO_LOADER_URL`, `CYBEXO_CDN_URL`, and `CYBEXO_ASSETS_URL`.
3. No source-owned `NXG_*` endpoint constants remain.
4. No `loadNXG` test fixture field remains.
5. `node scripts/gtm-rename-01-public-identity-verify.mjs` passes.

## Completion Notes

1. README now carries `CYBEXO-GTM-Consent-Template` repository identity.
2. Added PRD, execution tracker, and slice documentation under `docs/`.
3. Renamed internal endpoint constants from `NXG_*` to `CYBEXO_*` without changing locked endpoint values.
4. Renamed the test-only `loadNXG` fixture field to `loadCybexo`.
5. Verified with `node scripts/gtm-rename-01-public-identity-verify.mjs`.
