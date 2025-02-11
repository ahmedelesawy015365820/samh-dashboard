import { useThemeStore } from "~/stores/theme";
import { useLangStore } from "~/stores/lang";
import { useGlobalStore } from "@/stores/global";

// ========= Google Maps
import { Loader } from "@googlemaps/js-api-loader";

// ************* Fonts
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";

import "@fontsource-variable/noto-kufi-arabic";

export default defineNuxtPlugin((nuxtApp) => {
  // Auth
  const auth_store = useAuthStore();
  auth_store.handleFirstLoad();

  // Theme
  const theme_store = useThemeStore();
  theme_store.handleFirstLoad();

  // Lang
  const lang_store = useLangStore();
  lang_store.handleFirstLoad();

  // Google Map Loader
  const loader = new Loader({
    apiKey: useRuntimeConfig().public.googleMapsApiKey,
    libraries: ["places"],
  });

  nuxtApp.hook("app:mounted", async () => {
    // Map Init
    await loader.load();

    // Handle Resize
    useGlobalStore().handleResize();
    window.addEventListener("resize", useGlobalStore().handleResize);

    // Handle Scroll
    const lastScrollTop = ref(
      window.pageYOffset || document.documentElement.scrollTop
    );
    useGlobalStore().handleScroll(lastScrollTop);
    window.addEventListener(
      "scroll",
      () => {
        useGlobalStore().handleScroll(lastScrollTop);
      },
      false
    );

    // Handle Page Loading...
    nuxtApp.hook("page:start", () => {
      if (useGlobalStore().AppInitLoading) return;
      useGlobalStore().pageLoading = true;
    });
    nuxtApp.hook("page:finish", () => {
      useGlobalStore().pageLoading = false;
    });
  });
});
