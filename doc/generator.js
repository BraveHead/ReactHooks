/* eslint-disable default-case */
// 手写一个runGenerator 函数

function runGenerator(generatorFn) {
    return function(){
        return new Promise((resolve, reject) => {
            let g = generatorFn.call(this, ...arguments);
            function walk(data) {
                console.log('next Data:', data);
                let nextResult = g.next(data);
                if(nextResult.done) {
                    return  resolve(nextResult.value);
                } else {
                    return Promise.resolve(nextResult.value).then(data => {
                        walk(data);
                    })
                }
            };
            walk();
        })
      }
};


const fetchData = function(params) {
    console.log('fetchData params:', params);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2);
        }, 2000);
    });
}

function* genDemo() {
    console.log('-----start-----');
    let a = yield 1;
    console.log('-----a------:', a);
    let b = yield fetchData(a);
    console.log('-----b------:', b);
    let c =  yield 'over';
    console.log('------c------:', c);
    return 'end';
};

// let g = genDemo();

// let a = g.next('begin!');
// let b = g.next(a);


let gen = runGenerator(genDemo);

gen().then((data) => console.log('data:', data));



// function* Demo() {
//     let a = yield 1;
//     let b = yield 2;
//     let c = yield 3;
//     return 'end!';
// };

// let demo = Demo();
// let a = demo.next(); // { value: 1, done: false }
// let b = demo.next(); // { value: 2, done: false }
// let c = demo.next(); // { value: 3, done: false }
// let d = demo.next(); // {value: 'end', done: true}
// console.log('a,b,c,d:', a,b,c,d);

// generator 编译后的代码

let _context = {
    prev: 0,
    next: 0,
    done: false,
    stop: function() {
        this.done = true;
    }
};

function Demo$(context) {
    switch(context.prev = context.next) {
        case 0:
            context.next =1;
            return 1;
        case 1:
            context.next = 2;
            return 2;
        case 2:
            context.next = 3;
            return 3;
        case 3:
        case 'end!':
            context.stop();
            return 'end!';
    }
}


function Demo(Demo$) {
    return {
        next: function() {
            let value = _context.done ? undefined : Demo$(_context);
            let done = _context.done;
            return {
                value,
                done
            }
        }
    }
}


let demo = Demo(Demo$);
let a = demo.next(); // { value: 1, done: false }
let b = demo.next(); // { value: 2, done: false }
let c = demo.next(); // { value: 3, done: false }
let d = demo.next(); // {value: undefind, done: true}
console.log('a,b,c,d:', a,b,c,d);