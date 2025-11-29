import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en_common from "./en/common.json";
import en_auth from "./en/auth.json";
import en_settings from "./en/settings.json";
import en_dashboard from "./en/dashboard.json";
import ar_common from "./ar/common.json";
import ar_auth from "./ar/auth.json";
import ar_settings from "./ar/settings.json";
import ar_dashboard from "./ar/dashboard.json";

i18n
    .use(initReactI18next)
    .init({
        ns: ['common', 'auth', 'settings', 'dashboard'],
        defaultNS: ['common', 'auth', 'settings', 'dashboard'],   // <= multiple
        resources: {
            en: {
                common: en_common,
                auth: en_auth,
                settings: en_settings,
                dashboard: en_dashboard,
            },
            ar: {
                common: ar_common,
                auth: ar_auth,
                settings: ar_settings,
                dashboard: ar_dashboard,
            },
        },
        lng: "en",
        fallbackLng: "en",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });

export default i18n;
