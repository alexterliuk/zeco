import { getPositiveIntegerOrZero, isFunction } from './value-checker';

/**
 * Invoke preCall -> willCall after delay -> postCall. If no willCall, do nothing.
 * @param {function} willCall
 * @param {number} [delay]
 * @param {function} [preCall]
 * @param {function} [postCall]
 */
function delayAndCall(
  willCall: () => void,
  delay: number,
  preCall?: () => void,
  postCall?: () => void
): void {
  const [main, pre, post] = isFunction(willCall, preCall, postCall);

  const _delay = getPositiveIntegerOrZero(delay);

  if (main) {
    if (pre) pre();
    setTimeout(() => {
      main();
      if (post) post();
    }, _delay);
  }
}

export default delayAndCall;
