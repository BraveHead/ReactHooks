function debounce(callback, delay) {
    let time = new Date().getTime(); // ms
    return () => {
        const currentTime = new Date().getTime();
        const len =  currentTime - time;
        console.log('len:', len);
        if( len < delay) {
            time = currentTime;
            return;
        };
        callback();
        time = new Date().getTime();
    }
};

let i = 0;

let debounceInstance = debounce(() => {
    console.log(i++);
}, 1000);

setTimeout(debounceInstance, 500); 
setTimeout(debounceInstance, 1000); 
setTimeout(debounceInstance, 1500); 
setTimeout(debounceInstance, 1600); 
setTimeout(debounceInstance, 3000); 