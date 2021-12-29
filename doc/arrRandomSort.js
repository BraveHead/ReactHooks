let arr = [1, 2, 3, 4, 5,6,7,8,9,10]

// 第一种写法 缺点: 位置不是自定义的sort 是依次比较的 
function randomSort(a, b) {
    console.log('a:', a,b);
    return Math.random() > 0.5 ? -1 : 1;
};

// 随机抽取然后插入
function randomSpliceSort(list) {
    let arr = [];
    while(list.length > 0) {
        let randomIndex = Math.floor(Math.random() * list.length);
        arr.push(list[randomIndex]);
        list.splice(randomIndex, 1);
    };
    return arr;
}

// 随机交换数组内的元素(类似洗牌算法)
function randomExchangeSort(list) {
    let index = null;
    let temp = null;
    let len = list.length;

    for(index = 0; index < len; index++ ) {
        let randomIndex = Math.floor(Math.random() * (len - index)) + 1;
        temp = list[index];
        list[index] = list[randomIndex];
        list[randomIndex] = temp;
    };
    return list;
}

// 还可以利用 es6
function randomExchangeSortByES6(list) {
    let index, len = list.length;
    for (index = 0; index < len; index++) {
        let randomIndex = Math.floor(Math.random()* (len - index)) + index;
        [list[index], list[randomIndex]] = [list[randomIndex], list[index]];        
    };
    return list;
}


console.log('arr:', randomExchangeSortByES6(arr));