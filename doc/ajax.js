// 手写ajxa 函数

function getJson(url, type, params, callback) {
    let xhr = new XMLHttpRequest();

    xhr.open(type, url, true);

    xhr.onreadystatechange = function() {
        console.log('readyState:', this.readyState);
        if(this.readyState !== 4) return;
        
        // 成功请求
        if(this.status === 200) {
            callback(this.response);
        } else{
            console.error('error:', this.statusText);
        };
    }

    // error
    xhr.onerror = function() {
        console.error(this.statusText);
    };

    xhr.responseType = 'json';
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.send(params);
};

// getJson('http://192.168.0.102:8080/data.json', 'GET', { test: 'test'},
//     (result) => {
//         const content = document.createElement('div');
//         content.innerText = result.name;
//         document.body.appendChild(content);
//     }
// );

function  getJsonPromsie(url, type, params) {
    let promsie  = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open(type, url, true);

        xhr.onreadystatechange = function() {
            if(this.readyState !== 4) return;
            
            if(this.status === 200) {
                resolve(this.response);
            } else  {
                reject(new Error(this.statusText));
            };
        };

        xhr.onerror = function() {
            Promise.reject(new Error(this.statusText));
        };

        xhr.responseType = 'json';
        xhr.setRequestHeader('Accept', 'application/json');

        xhr.send(params);
    });

    return promsie;
};

getJsonPromsie('http://192.168.0.102:8080/data.json', 'GET', { test: 'test' }).then((result) => {
    console.log('getJsonPromsie data:', result);
}).catch((error) => {
    console.error('error:', error);
});