import {createI18n} from "vue-i18n";
import en from "./translations/en.json";
import es from "./translations/es.json";

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    globalInjection: true,
    messages: { en, es }
});

export default i18n;