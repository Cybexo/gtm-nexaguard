# GTM-Rename-05 Release Readiness

Status: Done  
Date: June 30, 2026  
Program: `GTM-Rename`

## Intent

Confirm the template is ready for GitHub rename/push and later GTM Gallery release metadata update.

## Scope

1. Re-run all GTM rename verifiers.
2. Verify live CYBEXO Web CMP loader production metadata is reachable.
3. Verify local Git state and canonical remote readiness.
4. Document the expected canonical remote: `https://github.com/Cybexo/CYBEXO-GTM-Consent-Template.git`.
5. Leave GTM Gallery release SHA update for the post-commit/push step.

## Explicit Non-Goals

1. No automatic GitHub repository rename in this verifier.
2. No metadata `versions[].sha` update before final commit SHA exists.
3. No GTM Gallery publication.

## Acceptance Checks

1. Slices 01 through 04 verifiers pass.
2. Live `https://cmp.cybexo.com/cybexo-cmp-build.json` reports `channel: production`.
3. Release readiness report identifies whether the current remote already matches the target remote.
4. `node scripts/gtm-rename-05-release-readiness-verify.mjs` passes when code readiness is complete and reports whether the canonical remote is configured.

## Completion Notes

Completed with release-readiness verifier evidence. The code/package readiness checks pass, live CYBEXO Web CMP production metadata is reachable, and the local origin is configured as `https://github.com/Cybexo/CYBEXO-GTM-Consent-Template.git`.

GTM Gallery publication remains held until the canonical pushed commit SHA is available.
