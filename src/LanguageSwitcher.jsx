import React from "react";
import i18n from "./i18n";

const LanguageSwitcher = () => {
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <button onClick={() => changeLanguage("uz")}>Uz</button>
      <button onClick={() => changeLanguage("ru")}>Ru</button>
      <button onClick={() => changeLanguage("en")}>En</button>
    </div>
  );
};

export default LanguageSwitcher;
