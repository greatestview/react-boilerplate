const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const buildAvif = !env.buildImages || env.buildImages !== "false";
  if (buildAvif) {
    console.log(
      "AVIF Conversion: This build optimizes images by converting them to AVIF format. This might take 10 minutes or more, depending on your machine! If you just want to test something faster, you can use `npm run start-without-images`.\n"
    );
  } else {
    console.log(
      "No AVIF Conversion: This build does NOT optimize images. You should use it for testing purposes only and not check the bundle into Git!\n"
    );
  }
  return {
    entry: "./src/index.jsx",
    output: {
      filename: "bundle.js",
      path: path.join(__dirname, "docroot"),
    },
    devServer: {
      hot: true,
      open: true,
      port: 9000,
      static: {
        directory: path.join(__dirname, "docroot"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(jsx?|tsx?)$/,
          exclude: /node_modules/,
          include: path.join(__dirname, "src"),
          loader: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(png|jpe?g|webp|tiff?|avif)/i,
          type: "asset/resource",
          // `webpack-image-resize-loader` doesn’t support Asset Modules from
          // Webpack 5, so this is a workaround from:
          // https://github.com/Calvin-LL/webpack-image-resize-loader/issues/419
          generator: {
            filename: "assets/[hash][ext]",
            filename: (pathData) => {
              // Get query params from image url
              const info = pathData.module.resourceResolveData;
              // Determine the desired output file extension (or keep existing)
              // Reminder: Changing the file extension does not automatically
              // change the format! That has to be done using separate loaders.
              const originalExtension = path
                .extname(info.path)
                .split(".")
                .pop();
              let extension = buildAvif ? "avif" : originalExtension;
              // Normalize extension (lowercase, jpeg to jpg)
              extension = extension.toLowerCase();
              extension = extension === "jpeg" ? "jpg" : extension;
              // Default filename
              const fileName = "assets/[contenthash][ext]";
              // Fix extension
              return fileName.replace("[ext]", `.${extension}`);
            },
          },
          use: [
            {
              loader: "webpack-image-resize-loader",
              options: {
                ...(buildAvif ? { format: "avif" } : {}),
                fit: "inside",
                height: 1920,
                quality: 90,
                width: 1920,
              },
            },
          ],
        },
        {
          test: /\.(otf|svg|mp4)/,
          type: "asset/resource",
          generator: {
            filename: "assets/[hash][ext]",
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    plugins: [
      // Re-generate index.html with injected script tag.
      // The injected script tag contains a src value of the
      // filename output defined above.
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
};
