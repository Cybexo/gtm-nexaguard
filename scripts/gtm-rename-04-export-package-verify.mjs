import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function filePath(file) {
  return path.join(root, file);
}

function read(file) {
  return fs.readFileSync(filePath(file), "utf8");
}

function readBuffer(file) {
  return fs.readFileSync(filePath(file));
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

const checks = [];

function addCheck(id, pass, detail = {}) {
  checks.push({ id, pass: Boolean(pass), ...detail });
}

const packageFiles = ["template.tpl", "metadata.yaml", "README.md", "logo.png", "LICENSE"];
const template = read("template.tpl");
const metadata = read("metadata.yaml");
const readme = read("README.md");

addCheck(
  "required_package_files_present",
  packageFiles.every((file) => fs.existsSync(filePath(file)) && fs.statSync(filePath(file)).size > 0)
);

const requiredSections = [
  "___TERMS_OF_SERVICE___",
  "___INFO___",
  "___TEMPLATE_PARAMETERS___",
  "___SANDBOXED_JS_FOR_WEB_TEMPLATE___",
  "___WEB_PERMISSIONS___",
  "___TESTS___",
  "___NOTES___",
];

addCheck(
  "gtm_template_sections_present",
  requiredSections.every((section) => template.includes(section))
);

addCheck(
  "metadata_release_surface_present",
  metadata.includes('homepage: "https://cybexo.com"') &&
    metadata.includes('documentation: "https://developer.cybexo.com"') &&
    metadata.includes('license: "Apache-2.0"') &&
    metadata.includes("versions:")
);

addCheck(
  "cybexo_primary_markers_present",
  readme.includes("CYBEXO-GTM-Consent-Template") &&
    template.includes('"displayName": "Cybexo CMP"') &&
    template.includes("CYBEXO_LOADER_URL") &&
    template.includes("'data-developer-id': developerId") &&
    template.includes("https://cmp.cybexo.com/loader.js")
);

const textPackage = `${template}\n${metadata}\n${readme}`;
addCheck("no_nexaguard_public_markers", !/NexaGuard|nexaguard/.test(textPackage));
addCheck("no_legacy_nxg_endpoint_constants", !/\bNXG_(LOADER|CDN|ASSETS)_URL\b/.test(template));
addCheck("no_legacy_load_nxg_fixture", !template.includes("loadNXG"));

const files = packageFiles.map((file) => {
  const buffer = readBuffer(file);
  return {
    file,
    bytes: buffer.length,
    sha256: sha256(buffer),
  };
});

const manifest = {
  schema: "cybexo.gtm_template_package_manifest.v1",
  generatedAt: new Date().toISOString(),
  packageName: "CYBEXO-GTM-Consent-Template",
  files,
};

const pass = checks.every((check) => check.pass);
const result = {
  schema: "cybexo.gtm_rename_04_export_package.v1",
  generatedAt: new Date().toISOString(),
  pass,
  checks,
  manifest,
};

const packageArtifactDir = path.join(root, "artifacts", "gtm-rename", "package");
fs.mkdirSync(packageArtifactDir, { recursive: true });
const manifestPath = path.join(
  packageArtifactDir,
  `gtm-rename-04-template-package-manifest-${Date.now()}.json`
);
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const buildArtifactDir = path.join(root, "artifacts", "gtm-rename", "build");
fs.mkdirSync(buildArtifactDir, { recursive: true });
const resultPath = path.join(
  buildArtifactDir,
  `gtm-rename-04-export-package-verify-${Date.now()}.json`
);
fs.writeFileSync(resultPath, `${JSON.stringify(result, null, 2)}\n`);
result.artifactPath = path.relative(root, resultPath);
result.manifestPath = path.relative(root, manifestPath);

console.log(JSON.stringify(result, null, 2));

if (!pass) {
  process.exit(1);
}
