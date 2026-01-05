import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en_common from "./en/common.json";
import en_auth from "./en/auth.json";
import en_settings from "./en/settings.json";
import en_dashboard from "./en/dashboard.json";
import en_tables from "./en/tables.json";
import en_forms from "./en/forms.json";
import en_subscription from "./en/subscription.json";
import ar_common from "./ar/common.json";
import ar_auth from "./ar/auth.json";
import ar_settings from "./ar/settings.json";
import ar_dashboard from "./ar/dashboard.json";
import ar_tables from "./ar/tables.json";
import ar_forms from "./ar/forms.json";
import ar_subscription from "./ar/subscription.json";


i18n
    .use(initReactI18next)
    .init({
        ns: ['common', 'auth', 'settings', 'dashboard', 'tables', 'forms', 'subscription'],
        defaultNS: ['common', 'auth', 'settings', 'dashboard', 'tables', 'forms', 'subscription'],   // <= multiple
        resources: {
            en: {
                common: en_common,
                auth: en_auth,
                settings: en_settings,
                dashboard: en_dashboard,
                tables: en_tables,
                forms: en_forms,
                subscription: en_subscription,
            },
            ar: {
                common: ar_common,
                auth: ar_auth,
                settings: ar_settings,
                dashboard: ar_dashboard,
                tables: ar_tables,
                forms: ar_forms,
                subscription: ar_subscription,
            },
        },
        lng: "en",
        fallbackLng: "en",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });

export default i18n;
