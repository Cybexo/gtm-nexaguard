# CYBEXO GTM Consent Template Rename Execution Tracker

Status: Done  
Last Updated: June 30, 2026  
Source PRD: `docs/CYBEXO-GTM-Consent-Template-Rename-PRD.md`

## Session Checkpoint

- Checkpoint Date: June 30, 2026
- Current Active Item: Complete
- Program Scope: CYBEXO GTM template identity, runtime contract alignment, Consent Mode verification, export/package verification, and release readiness.
- Delivery posture: slice-by-slice, verifier-backed, compatibility-preserving.

## Status Legend

- `NS` = Not Started
- `IP` = In Progress
- `BL` = Blocked
- `RV` = In Review
- `DN` = Done

## Detailed Tracker

| ID | Phase | Task | Deliverable | Owner Role | Dependencies | Status | Actual Date | Notes |
|---|---|---|---|---|---|---|---|---|
| GTM-Rename-01 | Identity | Public identity cleanup | Canonical repo identity in README/docs/template source, no behavior change | Platform | Name lock | DN | 2026-06-30 | Completed with README identity, program docs, CYBEXO endpoint constant naming, and green verifier evidence. |
| GTM-Rename-02 | Runtime | Runtime contract alignment | CYBEXO-primary loader/API/event/debug names with legacy fallbacks | Platform + Integrations | GTM-Rename-01 | DN | 2026-06-30 | Completed with explicit `data-developer-id` loader contract alignment and green verifier evidence. |
| GTM-Rename-03 | Consent Mode | Google Consent Mode verification | Consent Mode v2 default/update ordering and developer ID verification | Platform + QA | GTM-Rename-02 | DN | 2026-06-30 | Completed with static Consent Mode v2 verifier evidence. |
| GTM-Rename-04 | Release Package | Export/package verifier update | Regenerated/verifier-backed template package checks | Platform + QA | GTM-Rename-03 | DN | 2026-06-30 | Completed with package manifest and CYBEXO-primary export verifier evidence. |
| GTM-Rename-05 | Release | Release readiness | GitHub/template publication readiness and live loader smoke test | Platform + Ops | GTM-Rename-04 | DN | 2026-06-30 | Completed with release-readiness verifier, live Web CMP loader metadata check, and canonical target remote configuration. |

## Change Log

- 2026-06-30: Started `GTM-Rename` program and added PRD/tracker baseline.
- 2026-06-30: Completed `GTM-Rename-01` with canonical `CYBEXO-GTM-Consent-Template` README identity, CYBEXO endpoint constant names, test fixture naming cleanup, slice docs, and verifier evidence from `node scripts/gtm-rename-01-public-identity-verify.mjs`.
- 2026-06-30: Completed `GTM-Rename-02` with explicit `data-developer-id` loader parameter alignment, preserved locked endpoints and `data-consent-mode=off`, and verifier evidence from `node scripts/gtm-rename-02-runtime-contract-verify.mjs`.
- 2026-06-30: Completed `GTM-Rename-03` with static verification of Consent Mode v2 keys, locked developer ID behavior, global and region defaults, `wait_for_update`, missing Settings ID failure, GTM tests, and permissions.
- 2026-06-30: Completed `GTM-Rename-04` with GTM section checks, package surface SHA-256 manifest, CYBEXO-primary marker checks, and verifier evidence from `node scripts/gtm-rename-04-export-package-verify.mjs`.
- 2026-06-30: Completed `GTM-Rename-05` with release-readiness checks, live CYBEXO Web CMP production metadata verification, and canonical target remote configuration for `https://github.com/Cybexo/CYBEXO-GTM-Consent-Template.git`.
