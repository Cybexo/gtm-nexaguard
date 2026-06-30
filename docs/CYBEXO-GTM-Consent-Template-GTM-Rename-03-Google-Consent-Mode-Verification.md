# GTM-Rename-03 Google Consent Mode Verification

Status: Done  
Date: June 30, 2026  
Program: `GTM-Rename`

## Intent

Prove the rename work has not drifted Google Consent Mode v2 behavior.

## Scope

1. Verify the required Consent Mode v2 consent keys.
2. Verify locked developer ID behavior.
3. Verify global defaults and optional region override paths.
4. Verify `wait_for_update` fallback and enforced minimum.
5. Verify missing Settings ID failure behavior.
6. Verify GTM permissions remain aligned with required consent, data layer, logging, and script-injection behavior.

## Explicit Non-Goals

1. No behavior change to consent defaults.
2. No endpoint change.
3. No GTM Gallery release metadata update.

## Acceptance Checks

1. Consent keys include `ad_storage`, `analytics_storage`, `ad_user_data`, and `ad_personalization`.
2. `developer_id.dZTNmYW` is set and override attempts are tested against.
3. `setDefaultConsentState` is used for global defaults and region overrides.
4. `wait_for_update` is normalized to a minimum of `500`.
5. Missing Settings ID calls `gtmOnFailure`.
6. GTM tests cover locked developer ID, region override, wait fallback/minimum, missing ID, and malformed JSON.
7. Required template permissions include consent read/write, data layer write for developer ID, and locked CYBEXO script injection endpoints.
8. `node scripts/gtm-rename-03-consent-mode-verify.mjs` passes.

## Completion Notes

1. Consent Mode v2 keys remain present and covered by tests.
2. Locked developer ID behavior remains present and override attempts remain tested.
3. Global defaults, region override, malformed JSON fallback, minimum `wait_for_update`, and missing Settings ID behavior remain covered.
4. Required GTM permissions remain aligned to consent, developer ID data layer write, logging, and locked CYBEXO script injection endpoints.
5. Verified with `node scripts/gtm-rename-03-consent-mode-verify.mjs`.
