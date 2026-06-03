const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const configPath = path.join(root, "app", "config", "upperview-project.config.js");
const generator = require(path.join(root, "app", "platform", "legacy-payload-generator.js"));

function loadConfig() {
  const source = fs.readFileSync(configPath, "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: configPath });
  return sandbox.window.HomePlannerConfig;
}

function writePayloads() {
  const config = loadConfig();
  const payloads = generator.generatePayloads(config);
  const outputRoot = path.join(root, "data", "generated");

  Object.keys(payloads).forEach((relativePath) => {
    const outputPath = path.join(outputRoot, relativePath);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, payloads[relativePath], "utf8");
  });

  return Object.keys(payloads).map((relativePath) => path.join("data", "generated", relativePath));
}

if (require.main === module) {
  const written = writePayloads();
  written.forEach((file) => console.log(file));
}

module.exports = { loadConfig, writePayloads };
