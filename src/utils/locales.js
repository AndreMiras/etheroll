import messagesEs from '../translations/es.json';
import messagesFr from '../translations/fr.json';


const messages = {
  en: null,
  es: messagesEs,
  fr: messagesFr,
};
const locales = Object.keys(messages);

export { messages, locales };
