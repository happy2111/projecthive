import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import uz from "./locales/uz.json";
import ru from "./locales/ru.json";
import en from "./locales/en.json";

i18n.use(initReactI18next).init({
  resources: {
    uz: {
      translation: uz,
    },
    ru: {
      translation: ru,
    },
    en: {
      translation: en,
    },
  },
  lng: "uz", // Начальный язык
  fallbackLng: "ru", // Язык по умолчанию, если перевода нет
  interpolation: {
    escapeValue: false, // React уже защищает от XSS
  },
});

export default i18n;
