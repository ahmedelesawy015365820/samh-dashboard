import { useLangStore } from "@/stores/lang";
import { useThemeStore } from "@/stores/theme";
import { useGlobalStore } from "@/stores/global";

export const useHelpers = () => {
  const route = useRoute();
  const router = useRouter();

  return {
    getRandomColor: () => {
      const colors = [
        "#F94144",
        "#F3722C",
        "#F8961E",
        "#F9844A",
        "#F9C74F",
        "#90BE6D",
        "#43AA8B",
        "#4D908E",
        "#577590",
        "#277DA1",
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    },

    getStatus(num) {
      let status = {
        text: "",
        color: "",
      };

      switch (num) {
        case 1:
          if (useLangStore().current_lang == "en") {
            status.text = "Drafted";
          } else {
            status.text = "مسودة";
          }
          status.color = "#889099";
          break;
        case 2:
          if (useLangStore().current_lang == "en") {
            status.text = "In Review";
          } else {
            status.text = "قيد المراجعة";
          }
          status.color = "#FBBF24";
          break;
        case 3:
          if (useLangStore().current_lang == "en") {
            status.text = "Accepted";
          } else {
            status.text = "مقبول";
          }
          status.color = "#34D399";
          break;
        case 4:
          if (useLangStore().current_lang == "en") {
            status.text = "Published";
          } else {
            status.text = "منشور";
          }
          status.color = "#34D399";
          break;
        case 5:
          if (useLangStore().current_lang == "en") {
            status.text = "Incomplete";
          } else {
            status.text = "غير مكتمل";
          }
          status.color = "#EF4444";
          break;
        case 6:
          if (useLangStore().current_lang == "en") {
            status.text = "Updated";
          } else {
            status.text = "محدث";
          }
          status.color = "#509AF8";
          break;
        case 7:
          if (useLangStore().current_lang == "en") {
            status.text = "Rejected";
          } else {
            status.text = "مرفوض";
          }
          status.color = "#EF4444";
          break;
        case 8:
          if (useLangStore().current_lang == "en") {
            status.text = "Archived";
          } else {
            status.text = "مؤرشف";
          }
          status.color = "gray";
          break;
        case 9:
          if (useLangStore().current_lang == "en") {
            status.text = "Closed";
          } else {
            status.text = "مغلق";
          }
          status.color = "#889099";
          break;
        default:
          if (useLangStore().current_lang == "en") {
            status.text = "Drafted";
          } else {
            status.text = "مسودة";
          }
          status.color = "#889099";
          break;
      }

      return status;
    },

    scrollToElement: (sectionId) => {
      if (route.path == "/") {
        const el = document.querySelector(`${sectionId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        new Promise((resolve, reject) => {
          resolve(router.push("/"));
        }).then((res) => {
          setTimeout(() => {
            const el = document.querySelector(`${sectionId}`);
            el.scrollIntoView({ behavior: "smooth" });
          }, 2000);
        });
      }
    },

    capitalizeEveryWord: (sentence) => {
      const words = sentence.split(" ");

      const capitalizedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });

      const capitalizedSentence = capitalizedWords.join(" ");

      return capitalizedSentence;
    },

    shuffle: (array) => {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },

    formatDate(inputDate) {
      const dateObject = new Date(inputDate);

      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, "0");
      const day = String(dateObject.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    },

    getSubRandomArr: (arr) => {
      const shuffledArray = arr.slice();
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }
      return shuffledArray.slice(
        0,
        Math.floor(Math.random() * shuffledArray.length - 1)
      );
    },

    dir: () => {
      return useLangStore().current_lang === "ar" ? "rtl" : "ltr";
    },

    lang: () => {
      return useLangStore().current_lang;
    },

    theme: () => {
      return useThemeStore().current_theme;
    },

    isSmallScreen: () => {
      return useGlobalStore().isSmallScreen;
    },

    screen: () => {
      return useGlobalStore().screenSize;
    },

    scrollDirection: () => {
      return useGlobalStore().scrollDirection;
    },

    hasAnyPermission: (permissions) => {
      // return true if user has any of the permissions
      return useAuthStore().permissions.some((permission) =>
        permissions.includes(permission)
      );
    },

    hasPermission: (permission) => {
      return useAuthStore().permissions.includes(permission);
    },
  };
};
