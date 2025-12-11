// used for Drawer in Layout
import type { RouteLocationNormalizedLoadedGeneric } from "vue-router";

export interface DrawerButton {
  to: string;
  src: string;
  alt: string;
}

export const DrawerButtons: DrawerButton[] = [
  { to: "/home", src: "/home_icon.gif", alt: "home icon" },
  { to: "/quest/create", src: "/new_post_icon.gif", alt: "post icon" },
  { to: "/profile", src: "/profile.gif", alt: "profile icon" },
  { to: "/inbox", src: "/inbox.gif", alt: "inbox icon" },
];

export function toastError(msg: string) {
  useToast().add({
    title: "Error",
    description: msg,
    icon: "i-lucide-alert-circle",
    color: "error",
  });
}
