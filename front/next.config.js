const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  compress: true,
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? `https://dev-life.kr`
      : "http://localhost:3000",
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === "production";

    return {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval",
      plugins: [
        ...config.plugins,
        // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
        new webpack.ContextReplacementPlugin(
          /highlight\.js\/lib\/languages$/,
          new RegExp(`^./(${["javascript", "css"].join("|")})$`)
        ),
      ],
    };
  },
});
