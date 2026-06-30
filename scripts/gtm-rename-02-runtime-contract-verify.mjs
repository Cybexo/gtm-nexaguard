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

const readme = read("README.md");
const template = read("template.tpl");
const sliceDoc = read("docs/CYBEXO-GTM-Consent-Template-GTM-Rename-02-Runtime-Contract-Alignment.md");

addCheck(
  "locked_cybexo_loader_endpoint_preserved",
  template.includes("var CYBEXO_LOADER_URL = 'https://cmp.cybexo.com/loader.js';") &&
    template.includes("appendParams(CYBEXO_LOADER_URL")
);

addCheck(
  "locked_supporting_endpoints_preserved",
  template.includes("var CYBEXO_CDN_URL = 'https://edge.cybexo.com';") &&
    template.includes("var CYBEXO_ASSETS_URL = 'https://cmp.cybexo.com';")
);

addCheck(
  "developer_id_passed_to_loader",
  template.includes("var developerId = 'dZTNmYW';") &&
    template.includes("'data-developer-id': developerId")
);

addCheck(
  "gtm_developer_id_set_preserved",
  template.includes("gtagSet('developer_id.' + developerId, true);")
);

addCheck(
  "consent_mode_off_preserved",
  template.includes("'data-consent-mode': 'off'")
);

addCheck(
  "settings_and_asset_params_preserved",
  template.includes("'data-settings-id': settingsId") &&
    template.includes("'data-cdn-url': CYBEXO_CDN_URL") &&
    template.includes("'data-assets-url': CYBEXO_ASSETS_URL")
);

addCheck("no_legacy_init_call_in_template", !template.includes("initNXGCMP"));
addCheck("no_cybexo_init_call_in_template", !template.includes("initCybexoCMP"));
addCheck("no_direct_legacy_event_bridge_in_template", !/['"]nxg:/.test(template));
addCheck("runtime_contract_doc_present", sliceDoc.includes("data-developer-id"));
addCheck("readme_runtime_contract_note_present", readme.includes("data-developer-id"));

const pass = checks.every((check) => check.pass);
const result = {
  schema: "cybexo.gtm_rename_02_runtime_contract.v1",
  generatedAt: new Date().toISOString(),
  pass,
  checks,
};

const artifactDir = path.join(root, "artifacts", "gtm-rename", "build");
fs.mkdirSync(artifactDir, { recursive: true });
const artifactPath = path.join(
  artifactDir,
  `gtm-rename-02-runtime-contract-verify-${Date.now()}.json`
);
fs.writeFileSync(artifactPath, `${JSON.stringify(result, null, 2)}\n`);
result.artifactPath = path.relative(root, artifactPath);

console.log(JSON.stringify(result, null, 2));

if (!pass) {
  process.exit(1);
}
