const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Only block pnpm temp files that crash Metro's file watcher during install.
// Do NOT block the entire .pnpm/ directory — pnpm stores real packages there.
config.resolver.blockList = [
  /node_modules\/\.pnpm\/.*\/_tmp\/.*/,
];

module.exports = config;
