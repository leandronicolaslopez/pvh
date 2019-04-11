import { Platform } from 'react-native';

export default class ApiBase {
    constructor() {
        this.baseUrl = Platform.OS == 'ios' ?
            'http://localhost:4000/api' :
            'http://10.0.2.2:4000/api';
    }

    call(url, options = {}) {

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        options.headers = headers

        console.log("Calling", url)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                fetch(url, options)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        resolve(responseJson)
                    })
                    .catch((error) => {
                        reject(error)
                    });
            }, 500)
        });
    }
}