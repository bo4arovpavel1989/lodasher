const arrayFns = {
    chunk(arr: any[], size: number): any[][] {
        if (size <= 0) {
            return [];
        }

        return arr.reduce((chunks, val) => {
            const lastItem = chunks.length - 1;
            const lastChunk = chunks[lastItem];

            if (lastChunk && lastChunk.length < size) {
                lastChunk.push(val);
            } else {
                chunks.push([val]);
            }

            return chunks;
        }, []);
    },
    compact(arr: any[]) {
        return arr.filter(Boolean);
    },
    concat(arr: any[], ...args: Array<any | any[]>): any[] {
        const newArr = [];

        for (let i = 0; i < arr.length + args.length; i++) {
            if (arr[i]) {
                newArr.push(arr[i]);
                continue;
            }

            const argsIndex = i - arr.length;

            if (Array.isArray(args[argsIndex])) {
                newArr.push(...args[argsIndex]);
            } else {
                newArr.push(args[argsIndex]);
            }
        }

        return newArr;
    },
    difference(arr: any[], vals: any[]): any[] {
        return arr.filter((val) => !(~vals.indexOf(val)));
    },
    differenceBy(arr: any[], vals: any[], iteratee: (val: any) => any): any[] {
        let iterateeFn = iteratee;

        if (typeof iteratee === 'string') {
            const prop = iteratee;
            iterateeFn = (val: any) => val[prop];
        }

        const iteratedVals = vals.map((val) => iterateeFn(val));
        return arr.filter((val) => !(~iteratedVals.indexOf(iterateeFn(val))));
    },
    differenceWith(arr: any[], vals: any[], comparator: (val: any, other: any) => boolean) {
        return arr.filter((val) => !(vals.some((otherVal) => comparator(val, otherVal))));
    },
    drop(arr: any[], num = 1): any[] {
        return arr.slice(num);
    },
    dropRight(arr: any[], num = 1): any[] {
        return arr.slice(0, -num);
    },
    dropRightWhile(arr: any, fn: (val: any, i: number, arr: any[]) => boolean): any[] {
        while (fn(arr[arr.length - 1], arr.length - 1, arr)) {
            arr = arr.slice(0, -1);
        }

        return arr;
    },
    fill(arr: any[], val: any, start = 0, end = arr.length): any[] {
        for (let i = start; i < end; i++) {
            arr[i] = val;
        }

        return arr;
    },
    findIndex(arr: any[], fn: (val: any) => boolean, index: number = 0) {
        for (let i = index; i < arr.length; i++) {
            if (fn(arr[i])) {
                return i;
            }
        }

        return -1;
    },
    findLastIndex(arr: any[], fn: (val: any) => boolean, index: number = arr.length - 1) {
        for (let i = index; i >= 0; i--) {
            if (fn(arr[i])) {
                return i;
            }
        }

        return -1;
    },
    head(arr: any[]): any {
        return arr[0];
    }
};

export default arrayFns;
