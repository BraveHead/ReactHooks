/**
 * 实现方法一
 * @param {执行函数} callback 
 * @param {延迟时间} delay 
 * @returns 
 */
function throttl (callback, delay) {
    let valid = true;
    return () => {
        if(!valid) {
            return false;
        }
        valid = !valid;
        setTimeout(() => {
            callback();
            valid = true;
        }, delay);
    };
};

/**
 * 实现方法二
 * @param {执行时间} callback 
 * @param {延迟时间} delay 
 * @returns 
 */
function throttl_1 (callback, delay) {
    let timer = null;
    return () => {
        if(timer) {
            return;
        }
        if(!timer) {
            timer = setTimeout(() => {
                callback();
                timer = null;
            }, delay)
        }
    }
}

let i = 0;

const log = throttl_1(() => {
    console.log(i++);
}, 1000);

const timer = setInterval(()=> {
    if(i >= 10) {
        clearInterval(timer);
    };
    log();
}, 200);