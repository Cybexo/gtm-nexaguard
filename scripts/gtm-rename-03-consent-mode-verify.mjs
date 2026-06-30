import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

const checks = [];

function addCheck(id, pass, detail = {}) {
  checks.push({ id, pass: Boolean(pass), ...detail });
}

const template = read("template.tpl");
const sliceDoc = read("docs/CYBEXO-GTM-Consent-Template-GTM-Rename-03-Google-Consent-Mode-Verification.md");

const consentKeys = ["ad_storage", "analytics_storage", "ad_user_data", "ad_personalization"];

addCheck(
  "consent_mode_v2_keys_present",
  consentKeys.every((key) => template.includes(`'${key}'`) || template.includes(`"${key}"`))
);

addCheck(
  "developer_id_locked_and_override_tested",
  template.includes("var developerId = 'dZTNmYW';") &&
    template.includes("gtagSet('developer_id.' + developerId, true);") &&
    template.includes("developerId: 'malicious_override'") &&
    template.includes("assertApi('gtagSet').wasNotCalledWith('developer_id.malicious_override', true);")
);

addCheck(
  "global_default_consent_state_present",
  template.includes("var globalState = {") &&
    consentKeys.every((key) => template.includes(`${key}: globalDefaults.${key}`)) &&
    template.includes("setDefaultConsentState(globalState);")
);

addCheck(
  "region_override_consent_state_present",
  template.includes("var regionState = {") &&
    consentKeys.every((key) => template.includes(`${key}: regionDefaults.${key} || globalDefaults.${key}`)) &&
    template.includes("region: regionList") &&
    template.includes("setDefaultConsentState(regionState);")
);

addCheck(
  "wait_for_update_minimum_enforced",
  template.includes("function normalizeWaitForUpdate") &&
    template.includes("if (n < 500) return 500;") &&
    template.includes("wait_for_update: waitMs")
);

addCheck(
  "safe_json_fallbacks_present",
  template.includes("function parseJsonConsentState") &&
    template.includes("function parseConsentStateWithFallback") &&
    template.includes("var fallbackDefaults = {") &&
    consentKeys.every((key) => template.includes(`${key}: 'denied'`))
);

addCheck(
  "missing_settings_id_fails_fast",
  template.includes("if (!settingsId)") &&
    template.includes("data.gtmOnFailure();") &&
    template.includes("assertApi('injectScript').wasNotCalled();")
);

addCheck(
  "gtm_tests_cover_consent_mode_regressions",
  [
    "Uses locked developer ID and global consent defaults",
    "Applies region override defaults",
    "Enforces minimum wait_for_update of 500ms",
    "Uses wait_for_update fallback when invalid input is provided",
    "Fails fast when settings ID is missing",
    "Handles malformed JSON inputs with safe fallback",
  ].every((name) => template.includes(`name: ${name}`))
);

addCheck(
  "access_consent_permission_covers_required_keys",
  template.includes('"publicId": "access_consent"') &&
    consentKeys.every((key) => template.includes(`"string": "${key}"`))
);

addCheck(
  "developer_id_data_layer_permission_locked",
  template.includes('"publicId": "write_data_layer"') &&
    template.includes('"string": "developer_id.dZTNmYW"')
);

addCheck(
  "inject_script_permission_locked_to_cybexo_endpoints",
  template.includes('"publicId": "inject_script"') &&
    template.includes('"string": "https://cmp.cybexo.com/*"') &&
    template.includes('"string": "https://edge.cybexo.com/*"')
);

addCheck("slice_doc_acceptance_present", sliceDoc.includes("Consent Mode v2"));

const pass = checks.every((check) => check.pass);
const result = {
  schema: "cybexo.gtm_rename_03_consent_mode.v1",
  generatedAt: new Date().toISOString(),
  pass,
  checks,
};

const artifactDir = path.join(root, "artifacts", "gtm-rename", "build");
fs.mkdirSync(artifactDir, { recursive: true });
const artifactPath = path.join(
  artifactDir,
  `gtm-rename-03-consent-mode-verify-${Date.now()}.json`
);
fs.writeFileSync(artifactPath, `${JSON.stringify(result, null, 2)}\n`);
result.artifactPath = path.relative(root, artifactPath);

console.log(JSON.stringify(result, null, 2));

if (!pass) {
  process.exit(1);
}
