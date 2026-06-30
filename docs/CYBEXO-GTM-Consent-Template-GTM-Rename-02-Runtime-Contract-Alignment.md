# GTM-Rename-02 Runtime Contract Alignment

Status: Done  
Date: June 30, 2026  
Program: `GTM-Rename`

## Intent

Align the GTM template with the CYBEXO Web CMP Engine runtime contract while preserving current Consent Mode behavior and installed customer compatibility.

## Scope

1. Keep `https://cmp.cybexo.com/loader.js` as the locked loader endpoint.
2. Continue passing `data-settings-id`, `data-cdn-url`, `data-assets-url`, and `data-consent-mode=off`.
3. Explicitly pass the locked Google developer ID to the loader through `data-developer-id`.
4. Verify the template does not call legacy `initNXGCMP` or direct `nxg:*` public runtime events.
5. Document that public runtime APIs/events are owned by the loaded Web CMP Engine, not by the GTM template itself.

## Explicit Non-Goals

1. No change to Google Consent Mode default/update behavior.
2. No change to locked endpoint values.
3. No direct GTM event listener bridge in this slice.
4. No removal of Web CMP Engine legacy aliases.

## Acceptance Checks

1. Loader URL uses `CYBEXO_LOADER_URL`.
2. Loader params include `data-developer-id`.
3. `data-consent-mode=off` is preserved.
4. Template source does not call `initNXGCMP`.
5. Template source does not directly emit or listen to `nxg:*` events.
6. `node scripts/gtm-rename-02-runtime-contract-verify.mjs` passes.

## Completion Notes

1. Loader injection still uses locked CYBEXO production endpoints.
2. Loader parameters now explicitly include `data-developer-id` with the locked Google CMP partner ID.
3. `data-consent-mode=off` remains in place so GTM owns default consent handling.
4. The template still does not directly call runtime init APIs or direct legacy `nxg:*` events.
5. Verified with `node scripts/gtm-rename-02-runtime-contract-verify.mjs`.
