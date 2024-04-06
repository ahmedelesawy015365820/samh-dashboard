module.exports = {
  apps: [
    {
      name: "Samh Realestate",
      port: "4000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
      env: {
        NODE_ENV: "staging",
        NUXT_PUBLIC_API_BASE: "https://api.samh.com.sa/api/",
        NUXT_PUBLIC_GOOGLE_MAPS_API_KEY:
          "AIzaSyC2MTR_vRbsbQQRPt5f5ZLCvvaKOpzkzlA",
      },
      env_production: {
        NODE_ENV: "production",
        NUXT_PUBLIC_API_BASE: "https://api.samh.com.sa/api/",
        NUXT_PUBLIC_GOOGLE_MAPS_API_KEY:
          "AIzaSyC2MTR_vRbsbQQRPt5f5ZLCvvaKOpzkzlA",
      },
    },
  ],
};
