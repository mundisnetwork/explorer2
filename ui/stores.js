import { get, writable } from "svelte/store";
import { _, setupI18n, locale } from "./i18n";

let lang = localStorage.getItem("lang");
if (!lang) {
  localStorage.setItem("lang", "en");
  lang = "en";
} else {
  setupI18n({ withLocale: lang });
}
locale.subscribe((value) => {
  if (value) {
    localStorage.setItem("lang", value);
    setupI18n({ withLocale: value });
  }
});

export const user = writable({});

export const title = writable({
  title: "Mundis Network Explorer",
  page: "",
  path: "",
});

export const errors = writable([]);
errors.subscribe((value) => {
  if (value && value.length > 0 && !value[value.length - 1].ts) {
    value[value.length - 1].ts = Date.now();
  }
  if (value && value.length > 5) {
    errors.set(value.slice(value.length - 5));
  }
});

export const wsSocket = writable({
  client: "connectrion",
  connected: false,
});

export const mockData = {};
