export default {
    // 更换下标
    changeIndex: (arr, indexA, indexB) => {
        const newArr = arr.concat([]);
        const temp = newArr[indexA];
        newArr[indexA] = newArr[indexB];
        newArr[indexB] = temp;
        return newArr;
    },

    // 寻找相同元素
    findSameEl(arr1, arr2, key) {
        const result = [];
        arr1.forEach(item => {
            const obj = arr2.find(it => (key ? it[key] : it) === (key ? item[key] : item));
            if (obj) {
                result.push(obj);
            }
        });
        return result;
    },

    // 删除指定元素
    deleteEl(arr, deleteArr, key) {
        const result = arr.concat([]);
        deleteArr.forEach(item => {
            const currentIndex = result.findIndex(it => (key ? it[key] : it) === item);
            if (currentIndex >= 0) {
                result.splice(currentIndex, 1);
            }
        });
        return result;
    },

    // 向指定位置后插入元素
    pushIndex(index, arr, ...rest) {
        let result = arr.concat([]);
        arr.splice(index + 1, 0, ...rest);
        result = arr.concat([]);
        return result;
    }
};
