// example-1 简单的一个迭代器

function makeIterator(arr) {
    let index = 0;
    return {
        next: function() {
            return index < arr.length ? { done: false, value: arr[index++] } : {done: true, value: undefined};
        },
    }
};

let arrIterator = makeIterator(['hello', 'world!']);

let hello = arrIterator.next();

let world = arrIterator.next();

console.log('hello:', hello, 'world:', world, arrIterator.next());

// example-2 无穷迭代器

function cicleMakeIterator() {
    let index = 0;
    return  {
        next: function() {
            return  { done: false, value: index++ };
        }
    };
};


// example-3 使用生成器的写法

function* makeIteratorGenerator(arr) {
    let index = 0;
    while(index < arr.length) {
        yield arr[index++];
    }
};

let arrGen = makeIteratorGenerator(['ni', 'hao!']);
let a = arrGen.next();
let b = arrGen.next();
let c = arrGen.next();

console.log('a, b, c:', a, b, c);

// example-4 Class 中的迭代器写法

class MakeIteratorGenerator {
    constructor(data) {
        this.data = data;
    };

    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () =>  {
                console.log('this:', this);
                return index < this.data.length ? { done: false, value: this.data[index++] } : {done: true, value: undefined};
            },
        }
    }
};

const simple = new MakeIteratorGenerator([1,2,3,4,5])

for (const val of simple) {
  console.log(val)   //'1' '2' '3' '4' '5'
}


