/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const  createRequest = function (options = {}) {

    let url = options.url;
    let formData = new FormData();

    if (options.method != 'GET') {
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
    }
    else {
        url += '?';
        for (let key in options.data) {
            url += `${key}=${options.data[key]}&`;
        }
    }    

    let xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if (xhr.status != 200) {
          alert( 'Ошибка: ' + xhr.status);
          return;
        }
    }; 

    let eLoad = function(e, obj) {
      options.callback(obj.error, obj.response);
    }
    xhr.addEventListener("load", (e) => { eLoad(e, xhr); });

    xhr.responseType = 'json';

    try {
        xhr.open(options.method, url);
        if (options.method === `GET`) {
            xhr.send();
        }
        else {
            xhr.send(formData);
        }
    }
    catch (error) {
        console.log(new Error(`Ошибка: `, error));
    }


};
