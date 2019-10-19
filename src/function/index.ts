const functionFns = {
    after(num: number, fn: Function): Function {
        let iteration = num;

        return function(...args: any[]) {
            if (--iteration === 0) {
                fn.apply(null, args);
            }
        };
    }
};

export default functionFns;
