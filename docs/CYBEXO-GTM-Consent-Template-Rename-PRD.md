# CYBEXO GTM Consent Template Rename PRD

Status: Complete  
Date: June 30, 2026  
Program: `GTM-Rename`

## Objective

Rename and align the Google Tag Manager consent template as `CYBEXO-GTM-Consent-Template` while preserving existing customer behavior and validating compatibility with the CYBEXO Web CMP Engine production runtime.

## Scope

1. Public repository and documentation identity.
2. Template metadata and source naming cleanup.
3. CYBEXO-primary runtime contract alignment.
4. Google Consent Mode v2 behavior verification.
5. Export/package verification and release readiness.

## Non-Goals

1. No breaking removal of existing installed template behavior.
2. No change to the locked Google developer ID.
3. No change to locked production endpoints unless a later slice explicitly verifies it.
4. No rename of Google consent keys or GTM API names.

## Slice Plan

| Slice | Goal | Behavior Change |
|---|---|---|
| `GTM-Rename-01` | Public identity cleanup | No |
| `GTM-Rename-02` | Runtime contract alignment | Compatibility-preserving |
| `GTM-Rename-03` | Google Consent Mode verification | No intended behavior drift |
| `GTM-Rename-04` | Export/package verifier update | No runtime drift |
| `GTM-Rename-05` | Release readiness | Release/deploy only |

## Acceptance

1. Public repo identity is `CYBEXO-GTM-Consent-Template`.
2. README and template source prefer CYBEXO naming.
3. Runtime contract prefers CYBEXO Web CMP Engine production names.
4. Consent Mode v2 defaults, region overrides, and `wait_for_update` behavior remain verified.
5. Template release artifacts and metadata are ready for GitHub/GTM publication.

## Completion

Completed on June 30, 2026 with verifier-backed evidence for all five slices. The repository is now aligned to `Cybexo/CYBEXO-GTM-Consent-Template`. GTM Gallery publication remains an explicit release action after the final pushed commit SHA is available.
