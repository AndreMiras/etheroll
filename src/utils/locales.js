import messagesCn from '../translations/cn.json';
import messagesEs from '../translations/es.json';
import messagesFr from '../translations/fr.json';
import messagesRu from '../translations/ru.json';
import messagesVn from '../translations/vn.json';


const messages = {
  en: null,
  cn: messagesCn,
  es: messagesEs,
  fr: messagesFr,
  ru: messagesRu,
  vn: messagesVn,
};
const locales = Object.keys(messages);

export { messages, locales };
