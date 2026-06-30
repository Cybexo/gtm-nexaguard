# CYBEXO-GTM-Consent-Template

This repository contains the official **Google Tag Manager Community Template** for the **Cybexo Consent Management Platform (CMP)**.

The template enables websites to:

- Apply **Google Consent Mode v2** defaults via GTM consent APIs
- Configure defaults with **global** values plus optional **region override**
- Set Google developer ID automatically (`developer_id.dZTNmYW`, non-editable)
- Load the Cybexo Web CMP Loader from locked Cybexo endpoints
- Ensure early execution during **Consent Initialization**

This template is intended for GTM users who want to deploy Cybexo CMP without modifying website code directly.

Repository identity: **CYBEXO-GTM-Consent-Template**.

---

## Current behavior

- Uses `setDefaultConsentState` for consent defaults.
- Enforces `wait_for_update` minimum of `500ms` for async-safe consent handling.
- Supports required consent types:
  - `ad_storage`
  - `analytics_storage`
  - `ad_user_data`
  - `ad_personalization`
- Injects Cybexo loader script on every run.
- Passes the locked Cybexo Google developer ID to the loader as `data-developer-id`.
- Passes `data-consent-mode=off` to avoid duplicate default handling by loader.

---

## Main fields

- `settingsId` (required)
- `globalDefaultsJson`
- `regionList` (optional CSV)
- `regionDefaultsJson` (optional JSON)
- `waitForUpdateMs` (minimum enforced at `500`)

---

## Installation (via GTM Community Template Gallery)

1. Open GTM → **Templates**
2. Click **Search Gallery**
3. Search for **Cybexo CMP**
4. Add the template to your workspace
5. Create a new Tag → Select **Cybexo CMP**
6. Enter your **Settings ID**
7. Keep defaults as needed (global + optional region override)
8. Trigger it on **Consent Initialization – All Pages**
9. Validate in Tag Assistant before publishing

---

## Support

For implementation support and documentation, visit:

👉 https://developer.cybexo.com  
👉 https://cybexo.com/

---

## License

This project is licensed under **Apache License 2.0**.
