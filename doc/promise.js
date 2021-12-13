const PENDING  = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function NewPromsie(executor) {
    let _this = this;
    this.state = PENDING;
    this.value = undefined; // 成功的值
    this.reason = undefined; // 失败的原因
    this.fulfilledCallbacks = []; // then为 pending状态时onFulfilled存起来的队列
    this.rejectedCallbacks = []; // then 为 pendding状态时onRejected 存起来的队列

    function resolve(value) {
        if(this.state !== PENDING) {
            return;
        };
        this.state = FULFILLED;
        setTimeout(() => {
            this.value = value;
            this.fulfilledCallbacks.forEach((callback) => {
                callback(_this.value);
            })
        }, 0)
    };

    function reject(reason) {
        if(this.state !== PENDING) {
            return;
        };
        this.state = REJECTED;
        setTimeout(() => {
            this.reason = reason;
            this.rejectedCallbacks.forEach(callback => {
                callback(_this.value);
            });
        }, 0);
    };
    
    try {
        executor(resolve.bind(_this), reject.bind(_this));
    } catch (error) {
        reject(error)
    }
};

function resolvePromise(nextPromise, x ,resolve, reject) {
    // 当 输入的 x 和返回的 nextPromise 是同一个promise 
    if(nextPromise === x) {
        reject(new TypeError('Chaining cycle'));
    }
    if( x !== null &&( typeof x === 'object' || typeof x === 'function'))  {
        try {
            let then = x.then;
            if(typeof then === 'function') {
                then.call(x, (y) => { resolve(y) }, (r) => { reject(r) })
            } else {
                resolve(x);
            }
        } catch (error) {
            reject(error);
        }
    } else {
        resolve(x);
    }
}

NewPromsie.prototype.then = function(onFulfilled, onRejected) {
    let _this = this;
    let resultPromise = new NewPromsie((resolve, reject) => {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : (error) => { throw error };
        if(_this.state === PENDING) {
            if(typeof onFulfilled === 'function' || typeof onFulfilled === 'object') {
                _this.fulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(_this.value);
                            resolvePromise(resultPromise, x , resolve, reject)
                        } catch (error) {
                            reject(error);
                        }
                    }, 0)
                });
                _this.rejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(_this.reason);
                            resolvePromise(resultPromise, x , resolve, reject)
                        } catch (error) {
                            reject(error);
                        }
                    }, 0)
                })
            };
        };
        if(_this.state === FULFILLED) {
            setTimeout(() => {
                try {
                    let x = onFulfilled(_this.value);
                    resolvePromise(resultPromise, x , resolve, reject)
                } catch (error) {
                    reject(error);
                }
            }, 0)
        };
        if(_this.state === REJECTED) {
            setTimeout(() => {
                try {
                    let x = onRejected(_this.reason);
                    resolvePromise(resultPromise, x , resolve, reject)
                } catch (error) {
                    reject(error);
                }
            }, 0)
        };
    });
    return resultPromise;
};

NewPromsie.all = function(...args) {
    if(arguments.length < 1) {
        return;
    }
    let promises = arguments[0];
    let result = [];

    let executorNumber = 0;

    const processPromise = (p, index, resolve, reject) => {
        p.then((value) => {
            result[index] = value;
            ++executorNumber;
            if(executorNumber === promises.length) {
                resolve(result);
            }
        }, (error) => {
            reject(error);
        })
    }

    return new NewPromsie((resolve, reject) => {
        promises.forEach((p, index) => {
            if(p instanceof NewPromsie) {
                processPromise(p, index, resolve, reject);
            } else {
                result[index] = p;
            }
        })
    })
}

NewPromsie.race = function(...args) {
    if(arguments.length < 1) {
        return;
    };
    let racePromises = arguments[0];

    // let result = [];

    let processCounter = 0;

    return new NewPromsie((resolve, reject) => {
        if(racePromises.length === 0) {
            resolve(racePromises);
        };

        racePromises.forEach((promise, index) => {
            if(processCounter >= 1) return; 
            if(promise instanceof NewPromsie) {
                promise.then((data) => {
                    resolve(data);
                    ++processCounter;
                }, (error) => {
                    reject(error);
                    ++processCounter;
                });
            } else {
                resolve(promise);
                ++processCounter;
            };
        })
    })
}

let a = new NewPromsie((resolve, reject) => {
    setTimeout(() => {
        resolve('1s后!');
        console.log('1s 后');
    }, 1000);
});

let b = new NewPromsie((resolve, reject) => {
    resolve('0s后');
});

let c = new NewPromsie((resolve, reject) => {
    // reject('error data!');
    setTimeout(() => {
        resolve('2s 后');
        console.log('2s 后');
    }, 2000)
});

let d = '常量d';

// a.then((data)=> {
//     console.log('第一个then fulfilled:', data);
//     // resolve('end!');
//     return new NewPromsie((resolve, reject) => {
//         resolve('end!');
//     })
//     // return '最后!';
// }, (error) => {
//     console.log('第一个then rejected:', error);
// })
// .then((data2) => {
//     console.log('data2:', data2);
// }, (error2) => {
//     console.log('error2:', error2);
// });

NewPromsie.race([a,d, b, c, ]).then(data => {
    console.log('promise race data:', data);
}, (error) => {
    console.log('error:', error);
})