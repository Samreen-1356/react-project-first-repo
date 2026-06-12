import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                settings: "Settings",
                notifications: "Enable Notifications",
            },
        },

        hi: {
            translation: {
                settings: "सेटिंग्स",
                notifications: "नोटिफिकेशन चालू करें",
            },
        },
    },

    lng: "en",
    fallbackLng: "en",

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;