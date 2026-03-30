const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Exclude .pnpm hoisted store from file watching — pnpm creates temp files
// (e.g. typescript_tmp_263_1) during install that crash Metro's file watcher
config.resolver.blockList = [
  /node_modules\/\.pnpm\/.*/,
];

module.exports = config;
