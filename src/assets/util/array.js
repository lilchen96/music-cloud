export default {
    changeIndex: (arr, indexA, indexB) => {
        const newArr = arr.concat([]);
        const temp = newArr[indexA];
        newArr[indexA] = newArr[indexB];
        newArr[indexB] = temp;
        return newArr;
    }
};
