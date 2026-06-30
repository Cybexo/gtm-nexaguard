# GTM-Rename-04 Export Package Verifier Update

Status: Done  
Date: June 30, 2026  
Program: `GTM-Rename`

## Intent

Create a verifier-backed package manifest for the GTM template release surface and assert CYBEXO-primary markers before release readiness.

## Scope

1. Verify required GTM Community Template sections.
2. Verify release-surface files exist and are non-empty.
3. Generate a SHA-256 manifest for template, metadata, README, logo, and license.
4. Verify CYBEXO-primary marker strings on the package surface.
5. Verify stale `NexaGuard` and source-owned `NXG_*` endpoint names do not remain in package files.

## Explicit Non-Goals

1. No metadata release SHA update in this slice.
2. No remote push or GitHub repository rename.
3. No GTM Gallery publication.

## Acceptance Checks

1. `template.tpl` contains required GTM sections.
2. `metadata.yaml`, `README.md`, `logo.png`, and `LICENSE` are present and non-empty.
3. Package manifest artifact is written under `artifacts/gtm-rename/package/`.
4. Template package surface uses CYBEXO-primary markers.
5. `node scripts/gtm-rename-04-export-package-verify.mjs` passes.

## Completion Notes

1. Verified required GTM Community Template sections.
2. Verified release-surface files exist and are non-empty.
3. Generated SHA-256 package manifest under `artifacts/gtm-rename/package/`.
4. Verified CYBEXO-primary package markers and no stale NexaGuard package markers.
5. Verified with `node scripts/gtm-rename-04-export-package-verify.mjs`.
