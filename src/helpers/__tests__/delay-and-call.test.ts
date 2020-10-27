import delayAndCall from '../delay-and-call';

describe('delayAndCall', () => {
  it('first calls pre, then main, then post functions', done => {
    let main: any, pre: any, post: any;
    const log = (name: string) => {
      console.log(
        name + ':\n  pre  - ',
        pre,
        '\n  main - ',
        main,
        '\n  post - ',
        post
      );
    };

    const mainFunc = () => {
      main = 2;
      log('mainFunc');
    };
    const delay = 500;
    const preFunc = () => {
      pre = 1;
      log('preFunc');
    };
    const postFunc = () => {
      post = 3;
      log('postFunc');
    };

    delayAndCall(mainFunc, delay, preFunc, postFunc);

    expect(pre).toBe(1);
    expect(main).toBe(undefined);
    expect(post).toBe(undefined);

    setTimeout(() => {
      expect(pre).toBe(1);
      expect(main).toBe(2);
      expect(post).toBe(3);

      done();
    }, delay);
  });

  it('does not crash if got not functions as arguments', done => {
    let main: any, pre: any, post: any;
    const delay = 500;

    // @ts-ignore
    delayAndCall(null, delay, 1, {});
    setTimeout(() => {
      expect(main).toBe(undefined);
      expect(pre).toBe(undefined);
      expect(post).toBe(undefined);

      done();
    }, delay);
  });
});
