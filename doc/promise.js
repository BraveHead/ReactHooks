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
        console.log('resolve:', value, this.state);
        if(this.state !== PENDING) {
            return;
        };
        this.state = FULFILLED;
        setTimeout(() => {
            this.value = value;
            console.log('this.value:', value, this.fulfilledCallbacks);
            this.fulfilledCallbacks.forEach((callback) => {
                callback(_this.value);
            })
        }, 0)
    };

    function reject(reason) {
        console.log('reject:', reason, this.state);
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
        debugger;
        executor(resolve.bind(_this), reject.bind(_this));
    } catch (error) {
        reject(error)
    }
};

function resolvePromise(nextPromise, x ,resolve, reject) {
    console.log('resolvePromise123:', x , typeof x, x);
    // 当 输入的 x 和返回的 nextPromise 是同一个promise 
    if(nextPromise === x) {
        reject(new TypeError('Chaining cycle'));
    }
    // console.log('resolvePromise:', x , typeof x, x);
    if( x !== null &&( typeof x === 'object' || typeof x === 'function'))  {
        try {
            let then = x.then;
            console.log('then data:', then);
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
        console.log('then state:',_this.state,onFulfilled );
        if(_this.state === PENDING) {
            if(typeof onFulfilled === 'function' || typeof onFulfilled === 'object') {
                console.log('add onFulfilled12:', );
                _this.fulfilledCallbacks.push(() => {
                    console.log('add onFulfilled:', );
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(_this.value);
                            console.log('fulfilledCallbacks x:', x);
                            resolvePromise(resultPromise, x , resolve, reject)
                        } catch (error) {
                            reject(error);
                        }
                    }, 0)
                });
                console.log('_this.fulfilledCallbacks:', _this.fulfilledCallbacks);
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
    console.log('resultPromise:', resultPromise);
    return resultPromise;
};

let a = new NewPromsie((resolve, reject) => {
    // console.log('NewPromise:', resolve);
    setTimeout(() => {
        resolve('1s后!');
    }, 1000);
});

a.then((data)=> {
    console.log('第一个then fulfilled:', data);
    // resolve('end!');
    return new NewPromsie((resolve, reject) => {
        resolve('end!');
    })
    // return '最后!';
}, (error) => {
    console.log('第一个then rejected:', error);
})
.then((data2) => {
    console.log('data2:', data2);
}, (error2) => {
    console.log('error2:', error2);
})