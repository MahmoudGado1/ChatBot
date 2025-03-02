import React, { useEffect } from "react";

const TranslateButton = () => {
  useEffect(() => {
    loadGoogleTranslate();
  }, []);

  const loadGoogleTranslate = () => {
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", includedLanguages: "en,ar", autoDisplay: false },
          "google_translate_element"
        );
      };

      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  };

  const translateTo = (lang) => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: "none",position:'absolute' }}></div>

      <button className="translate-btn arabic-btn" onClick={() => translateTo("ar")}>Arabic</button>
      <button className="translate-btn english-btn" onClick={() => translateTo("en")}>English</button>
    </>
  );
};

export default TranslateButton;
