const arrayFns = {
    compact(arr: any[]) {
        return arr.filter(Boolean);
    },
    difference(arr: any[], vals: any[]) {
        return arr.filter((val) => !(~vals.indexOf(val)));
    },
    findIndex(arr: any[], fn: (val: any) => boolean, index: number = 0) {
        for (let i = index; i < arr.length; i++) {
            if (fn(arr[i])) {
                return i;
            }
        }

        return -1;
    }
};

export default arrayFns;
