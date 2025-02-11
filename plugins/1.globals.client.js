import { EncryptStorage } from "encrypt-storage";

import AOS from "aos";
import "aos/dist/aos.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import VueSweetalert2 from "vue-sweetalert2";
const options = {
  confirmButtonColor: "#032358",
  // cancelButtonColor: "#ff7674",
};
import "sweetalert2/dist/sweetalert2.min.css";

export default defineNuxtPlugin(({ vueApp }) => {
  const encryptStorage = new EncryptStorage("hash-123-amoz");

  iziToast.settings({
    timeout: 3000, // default timeout
    resetOnHover: true,
    // icon: '', // icon class
    transitionIn: "flipInX",
    transitionOut: "flipOutX",
    position: "topRight", // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    onOpen: function () {},
    onClose: function () {},
  });

  const _AOS = AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
    initClassName: "aos-init", // class applied after initialization
    animatedClassName: "aos-animate", // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 250, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 800, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
  });

  vueApp.use(VueSweetalert2, options);

  return {
    provide: {
      Swal: vueApp.config.globalProperties.$swal,
      encryptStorage,
      iziToast,
      _AOS,
    },
  };
});
