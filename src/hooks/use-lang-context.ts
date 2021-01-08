import zecoConfig from '../../config/zeco-config';
import { Language } from '../translations/translations';
import { Dispatch, SetStateAction } from 'react';

/**
 * Singleton which stores current lang to share it between components.
 */
const useLangContext = (() => {
  const langContext = {
    lang:
      (typeof window !== 'undefined' && window.localStorage.getItem('lang')) ||
      zecoConfig.getItem(['lang']),
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
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('lang', lang);
      }
      _subscribers.forEach(s => {
        if (s.triggerTranslating) s.triggerTranslating();
        if (s.updateLangAttr) s.updateLangAttr();
      });
    },
    on: (
      id: string,
      setStateFunc: Dispatch<SetStateAction<Language | string>>,
      innerFunc?: () => string
    ) => {
      const funcName = id === 'SEO' ? 'updateLangAttr' : 'triggerTranslating';
      const updater = {
        id,
        [funcName]: () => {
          setStateFunc(() => (innerFunc || useLangContext.getLang)());
        },
      };
      api.subscribe(updater);
      return updater;
    },
    off: (updater: Subscriber) => {
      api.unsubscribe(updater);
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
