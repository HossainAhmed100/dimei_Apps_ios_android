const path = require("path");

module.exports = {
  resolver: {
    resolveRequest: (context, realModuleName, platform) => {
      if (realModuleName === "my-module") {
        const modulePath = path.join(
          context.projectDir,
          "node_modules",
          "my-module"
        );
        return { resolvedPath: modulePath };
      }
      return null;
    },
  },
};

const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();
