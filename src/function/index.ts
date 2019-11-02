const functionFns = {
    after(num: number, fn: Function): Function {
        let iteration = num;

        return function(...args: any[]) {
            if (--iteration === 0) {
                fn.apply(null, args);
            }
        };
    },
    ary(fn: Function, n: number = fn.length): Function {
        return (...args: any[]): any => {
            args.length = n;
            return fn.apply(null, args);
        };
    },
    before<T>(n: number, fn: (...args: any[]) => T): () => T {
        let lastCall: T;

        return (...args: any[]): T => {
            if (n-- > 0) {
                lastCall = fn.apply(this, args);
            }

            return lastCall;
        };
    }
};

export default functionFns;
