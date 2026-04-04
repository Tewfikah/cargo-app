import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

const SystemSettings = () => {
  const { i18n, t } = useTranslation();
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("theme") || "light"; } catch (e) { return 'light'; }
  });

  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('i18nextLng') || (i18n.language ? (i18n.language.startsWith('am') ? 'am' : 'en') : 'en'); } catch (e) { return 'en'; }
  });

  useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundColor = "#0f172a"; // slate-900
      document.body.style.color = "#e6eef8";
    } else {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    }
    try { localStorage.setItem("theme", theme); } catch (e) {}
  }, [theme]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    try { localStorage.setItem('i18nextLng', lng); } catch (e) {}
    setLang(lng);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">{t('systemSettings.title')}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">{t('systemSettings.description')}</p>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('systemSettings.languageLabel')}</label>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center">
              <input type="radio" name="language" value="en" checked={lang === 'en'} onChange={() => changeLanguage('en')} className="mr-2" />
              {t('systemSettings.language_en')}
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="language" value="am" checked={lang === 'am'} onChange={() => changeLanguage('am')} className="mr-2" />
              {t('systemSettings.language_am')}
            </label>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center">
              <input type="radio" name="theme" value="light" checked={theme === 'light'} onChange={() => setTheme('light')} className="mr-2" />
              Light
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="theme" value="dark" checked={theme === 'dark'} onChange={() => setTheme('dark')} className="mr-2" />
              Dark
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SystemSettings;
