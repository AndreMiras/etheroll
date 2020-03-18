import messagesEs from '../translations/es.json';
import messagesFr from '../translations/fr.json';
import messagesRu from '../translations/ru.json';


const messages = {
  en: null,
  es: messagesEs,
  fr: messagesFr,
  ru: messagesRu,
};
const locales = Object.keys(messages);

export { messages, locales };
