// example_1 利用 map结构缓存避免迭代  
function processData(data) {
    if(data && data.length < 1) {
        return  [];
    };

    let result = [];
    let current = {};
    data.forEach((item) => {
        current[item.id] = { ...item, children: [] }
    });

    console.log('current:', current);

    data.forEach((item) => {
        if(item.pid === 0) {
            result.push(current[item.id]);
        } else {
            current[item.pid].children.push(current[item.id]);
        }
    });
    console.log('result:', result);
    return result;

};

let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
];

processData(arr);