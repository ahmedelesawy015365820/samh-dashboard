export const useAuthStore = defineStore("auth", () => {
  const nuxtApp = useNuxtApp();

  // ======== Handle First Load
  const redirect_token = useCookie("redirect_token");
  const handleFirstLoad = () => {
    const user = nuxtApp.$encryptStorage.getItem("blank_App_User");
    if (!user) return;
    const token = user?.token;
    redirect_token.value = token;
  };

  // ======== Storage
  const user = ref(null);
  const setStorage = (loginData) => {
    user.value = { ...loginData };
    nuxtApp.$encryptStorage.setItem("blank_App_User", loginData);
    redirect_token.value = loginData.token;
  };
  const clearStorage = () => {
    user.value = null;
    nuxtApp.$encryptStorage.removeItem("blank_App_User");
    redirect_token.value = null;
  };

  // ======== Main Actions
  const logIn = async (loginData) => {
    const user = await userService().login(loginData);
    if (user) {
      setStorage(user);
    }
    return user;
  };

  const logOut = async () => {
    const data = await userService().logout();
    if (data) {
      clearStorage();
      return navigateTo("/authentication/login");
    }
  };

  // Permissions
  const permissions = ref([]);
  const getUserPermissions = async () => {
    if (!user.value) return;
    const data = await userService().getUserPermissions();
    if (data) {
      permissions.value = data;
    }
    return data;
  };

  return {
    logIn,
    logOut,

    user,

    handleFirstLoad,
    redirect_token,

    permissions,
    getUserPermissions,

    clearStorage,
  };
});
