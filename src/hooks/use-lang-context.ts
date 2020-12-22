import zecoConfig from '../../config/zeco-config';
import { Language } from '../translations/translations';

/**
 * Singleton which stores current lang to share it between components.
 */
const useLangContext = (() => {
  const langContext = {
    lang: localStorage.getItem('lang') || zecoConfig.getItem(['lang']),
  };

  const _subscribers: Subscriber[] = [];

  const api = {
    subscribe: (updater: Subscriber) => {
      if (!_subscribers.includes(updater)) _subscribers.push(updater);
    },
    unsubscribe: (updater: Subscriber) => {
      let idx = -1;
      void _subscribers.some((s, i) =>
        s === updater ? ((idx = i), true) : false
      );
      if (idx > -1) _subscribers.splice(idx, 1);
    },
    updateDependentStates: (lang: Language) => {
      langContext.lang = lang;
      localStorage.setItem('lang', lang);
      _subscribers.forEach(s => {
        if (s.triggerTranslating) s.triggerTranslating();
        if (s.updateLangAttr) s.updateLangAttr();
      });
    },
    getLang: () => langContext.lang,
  };

  return { ...api };
})();

interface Subscriber {
  id: string;
  triggerTranslating?: () => void;
  updateLangAttr?: () => void;
}

export default useLangContext;
