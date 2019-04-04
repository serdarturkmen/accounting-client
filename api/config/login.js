const request = require('request');

async function login (username, password) {

    console.log("login request is sending ...");
    return new Promise((resolve, reject) => {
        const data = {
            username: username,
            password: password
        };
        request.post({
            headers: {'content-type': 'application/json'},
            url: 'http://91.93.186.173:9001/api/authenticate',
            body: JSON.stringify(data)
        }, function (error, response, body) {
            if(body){
                const bearerToken = response.headers.authorization;
                if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                    const jwt = bearerToken.slice(7, bearerToken.length);
                    return resolve(jwt);
                }else{
                    return null;
                }
            }
            if (error) {
                return null;
                console.log(error);
            }
        });
    })
}

async function get (url) {
    return new Promise((resolve, reject) => {
        request({ url, method: 'GET' }, (error, response, body) => {
            if (error) return reject(error)

            return resolve({ body, response })
        })
    })
}

async function post (url, data) {
    return new Promise((resolve, reject) => {
        request({ url, method: 'POST', data }, (error, response, body) => {
            if (error) return reject(error)

            return resolve({ body, response })
        })
    })
}


module.exports = {
    post,
    get,
    login
}

/*
module.exports = {

    login: (username, password) => {
        console.log(username);
        const data = {
            username: username,
            password: password
        };
        request.post({
            headers: {'content-type': 'application/json'},
            url: 'http://localhost:8080/api/authenticate',
            body: JSON.stringify(data)
        }, function (error, response, body) {
            if(body){
                const bearerToken = response.headers.authorization;
                if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                    const jwt = bearerToken.slice(7, bearerToken.length);
                    console.log("jwt is: ", jwt);
                    return jwt;
                }else{
                    return null;
                }
            }
            if (error) {
                return null;
                console.log(error);
            }
        });
    }

}

*/
