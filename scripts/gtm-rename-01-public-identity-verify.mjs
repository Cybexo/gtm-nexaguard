import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

const checks = [];

function addCheck(id, pass, detail = {}) {
  checks.push({ id, pass: Boolean(pass), ...detail });
}

const readme = read("README.md");
const template = read("template.tpl");
const tracker = read("docs/CYBEXO-GTM-Consent-Template-Rename-Execution-Tracker.md");
const sliceDoc = read("docs/CYBEXO-GTM-Consent-Template-GTM-Rename-01-Public-Identity-Cleanup.md");

addCheck(
  "canonical_repo_identity_present",
  readme.includes("CYBEXO-GTM-Consent-Template") &&
    tracker.includes("CYBEXO-GTM-Consent-Template") &&
    sliceDoc.includes("CYBEXO-GTM-Consent-Template")
);

addCheck(
  "program_docs_present",
  exists("docs/CYBEXO-GTM-Consent-Template-Rename-PRD.md") &&
    exists("docs/CYBEXO-GTM-Consent-Template-Rename-Execution-Tracker.md") &&
    exists("docs/CYBEXO-GTM-Consent-Template-GTM-Rename-01-Public-Identity-Cleanup.md")
);

addCheck(
  "cybexo_endpoint_constants_present",
  template.includes("var CYBEXO_LOADER_URL = 'https://cmp.cybexo.com/loader.js';") &&
    template.includes("var CYBEXO_CDN_URL = 'https://edge.cybexo.com';") &&
    template.includes("var CYBEXO_ASSETS_URL = 'https://cmp.cybexo.com';")
);

addCheck(
  "legacy_endpoint_constant_names_removed",
  !/\bNXG_(LOADER|CDN|ASSETS)_URL\b/.test(template)
);

addCheck(
  "loader_still_uses_locked_cybexo_endpoints",
  template.includes("appendParams(CYBEXO_LOADER_URL") &&
    template.includes("'data-cdn-url': CYBEXO_CDN_URL") &&
    template.includes("'data-assets-url': CYBEXO_ASSETS_URL")
);

addCheck("legacy_load_nxg_fixture_removed", !template.includes("loadNXG"));
addCheck("cybexo_fixture_name_present", template.includes("loadCybexo: false"));

addCheck(
  "gtm_display_name_unchanged",
  template.includes('"displayName": "Cybexo CMP"')
);

addCheck(
  "developer_id_lock_unchanged",
  template.includes("var developerId = 'dZTNmYW';") &&
    template.includes("gtagSet('developer_id.' + developerId, true);")
);

const pass = checks.every((check) => check.pass);
const result = {
  schema: "cybexo.gtm_rename_01_public_identity.v1",
  generatedAt: new Date().toISOString(),
  pass,
  checks,
};

const artifactDir = path.join(root, "artifacts", "gtm-rename", "build");
fs.mkdirSync(artifactDir, { recursive: true });
const artifactPath = path.join(
  artifactDir,
  `gtm-rename-01-public-identity-verify-${Date.now()}.json`
);
fs.writeFileSync(artifactPath, `${JSON.stringify(result, null, 2)}\n`);
result.artifactPath = path.relative(root, artifactPath);

console.log(JSON.stringify(result, null, 2));

if (!pass) {
  process.exit(1);
}
