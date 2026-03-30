const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Exclude pnpm internals from file watching — pnpm creates/deletes temp
// directories (e.g. react-native-web_tmp_214_1, typescript_tmp_263_1)
// during install that crash Metro's file watcher with ENOENT
config.resolver.blockList = [
  /node_modules\/\.pnpm\/.*/,
  /node_modules\/[^/]*_tmp_\d+.*/,
];

module.exports = config;
