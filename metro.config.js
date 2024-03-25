const { getDefaultConfig } = require('@expo/metro-config');

//eslint-disable-next-line
const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');

module.exports = defaultConfig;
