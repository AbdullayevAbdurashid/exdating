// const optimizedImages = require("next-optimized-images");
// const withPlugins = require("next-compose-plugins");

//Detectiong brauser local
// import { useState } from "react";
// const [defaults, setDefault] = useState()

// if (navigator.language === "en-EN") {
//   //converting to string
//   setDefault("en")
// } else if (navigator.language === "ru-RU") {
//   setDefault("ru")

// } else {
//   setDefault("en")

// }

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
    SECRET_COOKIE_PASSWORD: "9NdqAL6oFC3qsUh6bqfNCKWZImZlnlbpVDGJ4XHN",
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
