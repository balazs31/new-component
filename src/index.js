#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const program = require("commander");

const {
  getConfig,
  buildPrettifier,
  logIntro,
  logItemCompletion,
  logConclusion,
  logError,
} = require("./helpers");
const {
  requireOptional,
  mkDirPromise,
  readFilePromiseRelative,
  writeFilePromise,
} = require("./utils");

// Load our package.json, so that we can pass the version onto `commander`.
const { version } = require("../package.json");

// Get the default config for this component (looks for local/global overrides,
// falls back to sensible defaults).
const config = getConfig();

// Convenience wrapper around Prettier, so that config doesn't have to be
// passed every time.
const prettify = buildPrettifier(config.prettierConfig);

program
  .version(version)
  .arguments("<componentName>")
  .option(
    "-d, --dir <pathToDirectory>",
    'Path to the "components" directory (default: "src/components")',
    config.dir
  )
  .parse(process.argv);

const [componentName] = program.args;

// Templates
const templateComponentPath = "./templates/component.tsx";
const templateStylesPath = "./templates/component.styles.ts";
const templateIndexPath = "./templates/index.ts";

// Target files
const componentDir = `${program.dir}/${componentName}`;
const componentPath = `${componentDir}/${componentName}.tsx`;
const stylesPath = `${componentDir}/${componentName}.styles.ts`;
const indexPath = `${componentDir}/index.ts`;

// Logging ...
logIntro({ name: componentName, dir: componentDir });

// Check if componentName is provided
if (!componentName) {
  logError(
    `Sorry, you need to specify a name for your component like this: new-component <name>`
  );
  process.exit(0);
}

// Check to see if a directory at the given path exists
const fullPathToParentDir = path.resolve(program.dir);
if (!fs.existsSync(fullPathToParentDir)) {
  logError(
    `Sorry, you need to create a parent "components" directory.\n(new-component is looking for a directory at ${program.dir}).`
  );
  process.exit(0);
}

// Check to see if this component has already been created
const fullPathToComponentDir = path.resolve(componentDir);
if (fs.existsSync(fullPathToComponentDir)) {
  logError(
    `Looks like this component already exists! There's already a component at ${componentDir}.\nPlease delete this directory and try again.`
  );
  process.exit(0);
}

// Create the files one by one
mkDirPromise(componentDir)
  .then(() => readFilePromiseRelative(templateComponentPath))
  .then((template) => {
    logItemCompletion("Directory created.");
    return template;
  })
  .then((template) =>
    // Replace our placeholders with real data (so far, just the component name)
    template.replace(/COMPONENT_NAME/g, componentName)
  )
  .then((template) =>
    // Format it using prettier, to ensure style consistency, and write to file.
    writeFilePromise(componentPath, prettify(template))
  )
  .then((template) => {
    logItemCompletion("Component created.");
    return template;
  })
  .then(() => readFilePromiseRelative(templateStylesPath))
  .then((template) =>
    // Replace our placeholders with real data (so far, just the component name)
    template.replace(/COMPONENT_NAME/g, componentName)
  )
  .then((template) =>
    // Format it using prettier, to ensure style consistency, and write to file.
    writeFilePromise(stylesPath, prettify(template))
  )
  .then((template) => {
    logItemCompletion("Styles created.");
    return template;
  })

  .then(() => readFilePromiseRelative(templateIndexPath))
  .then((template) =>
    // Replace our placeholders with real data (so far, just the component name)
    template.replace(/COMPONENT_NAME/g, componentName)
  )
  .then((template) =>
    // Format it using prettier, to ensure style consistency, and write to file.
    writeFilePromise(indexPath, prettify(template))
  )
  .then((template) => {
    logItemCompletion("Index created.");
    return template;
  })
  .then((template) => {
    logConclusion();
  })
  .catch((err) => {
    console.error(err);
  });
