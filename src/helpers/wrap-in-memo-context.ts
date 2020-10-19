/**
 * Wrap func in closure and keep memoized data in store.
 * @param {function} func
 */
function wrapInMemoContext(func: MemoFunctionParam): MemoFunctionParam {
  const store: MemoStore = {};

  return function (key: string, data: any) {
    if (!store.hasOwnProperty(key)) {
      store[key] = func(key, data);
    }
    return store[key];
  };
}

type MemoStore = {
  [key: string]: any;
};

type MemoFunctionParam = (key: string, data: any) => any;

export default wrapInMemoContext;
