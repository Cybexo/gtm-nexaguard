import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const targetRemote = "https://github.com/Cybexo/CYBEXO-GTM-Consent-Template.git";

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  }).trim();
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

const checks = [];

function addCheck(id, pass, detail = {}) {
  checks.push({ id, pass: Boolean(pass), ...detail });
}

const tracker = read("docs/CYBEXO-GTM-Consent-Template-Rename-Execution-Tracker.md");
const template = read("template.tpl");

addCheck(
  "prior_slice_docs_done",
  [
    "GTM-Rename-01 | Identity",
    "GTM-Rename-02 | Runtime",
    "GTM-Rename-03 | Consent Mode",
    "GTM-Rename-04 | Release Package",
  ].every((marker) => tracker.includes(marker)) &&
    [
      "| GTM-Rename-01 | Identity | Public identity cleanup |",
      "| GTM-Rename-02 | Runtime | Runtime contract alignment |",
      "| GTM-Rename-03 | Consent Mode | Google Consent Mode verification |",
      "| GTM-Rename-04 | Release Package | Export/package verifier update |",
    ].every((marker) => tracker.includes(marker))
);

addCheck(
  "release_surface_cybexo_primary",
  template.includes("CYBEXO_LOADER_URL") &&
    template.includes("'data-developer-id': developerId") &&
    !template.includes("NXG_LOADER_URL") &&
    !template.includes("loadNXG")
);

const currentBranch = run("git", ["branch", "--show-current"]);
const currentRemote = run("git", ["remote", "get-url", "origin"]);
const gitStatus = run("git", ["status", "--short"]);
const remoteReady = currentRemote === targetRemote;

addCheck("git_branch_detected", Boolean(currentBranch), { currentBranch });
addCheck("git_status_available", typeof gitStatus === "string", { dirty: gitStatus.length > 0 });
addCheck("target_remote_documented", tracker.includes("GTM-Rename-05"), { targetRemote });

let liveBuild = null;
let liveBuildError = null;
try {
  const response = await fetch("https://cmp.cybexo.com/cybexo-cmp-build.json?verify=gtm-rename-05");
  liveBuild = await response.json();
} catch (error) {
  liveBuildError = error instanceof Error ? error.message : String(error);
}

addCheck(
  "live_web_cmp_loader_manifest_reachable",
  Boolean(liveBuild && liveBuild.channel === "production" && liveBuild.version && liveBuild.commit),
  { liveBuild, liveBuildError }
);

const pass = checks.every((check) => check.pass);
const result = {
  schema: "cybexo.gtm_rename_05_release_readiness.v1",
  generatedAt: new Date().toISOString(),
  pass,
  checks,
  releaseReadiness: {
    currentBranch,
    currentRemote,
    targetRemote,
    remoteReady,
    remoteAction: remoteReady
      ? "No remote change required."
      : "Set origin to target remote before final release push.",
    gitStatus,
    liveBuild,
  },
};

const artifactDir = path.join(root, "artifacts", "gtm-rename", "release");
fs.mkdirSync(artifactDir, { recursive: true });
const artifactPath = path.join(
  artifactDir,
  `gtm-rename-05-release-readiness-verify-${Date.now()}.json`
);
fs.writeFileSync(artifactPath, `${JSON.stringify(result, null, 2)}\n`);
result.artifactPath = path.relative(root, artifactPath);

console.log(JSON.stringify(result, null, 2));

if (!pass) {
  process.exit(1);
}
