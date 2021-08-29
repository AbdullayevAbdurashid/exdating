// const optimizedImages = require("next-optimized-images");
// const withPlugins = require("next-compose-plugins");


const nextConfig = {
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
  env: {
    REST_NEXT_API: "http://localhost:3000",
    REST_API: "https://artruso.ru/api",
    REMOTE: "https://artruso.ru",
    // TODO remove SECRET_COOKIE_PASSWORD to .env for production
    SECRET_COOKIE_PASSWORD: "MQj1VxGYm2JoF0rvt6w1Trd3qTvjQUrRhtt5jhZ1",
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    const newConfig = { ...config };

    return newConfig;
  },


};


module.exports = nextConfig;

// module.exports = withPlugins(
//   [
//     [
//       optimizedImages,
//       {
//         optipng: {},
//         responsive: {},
//         svgSpriteLoader: {},
//       },
//     ],

//     // other plugins here
//   ],
//   nextConfig
// );
