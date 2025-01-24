import { useRouter } from "vue-router";

export function useRouterNavigation() {
  const router = useRouter();

  const navigateTo = (route) => {
    if (route) {
      router.push(route);
    }
  };

   const openCreateExperience = (remove = false) => {
    if (!remove) {
      router.push("/create-experience");
    }
  };

  return { navigateTo, openCreateExperience };
}
