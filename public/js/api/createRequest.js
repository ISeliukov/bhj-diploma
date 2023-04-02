/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const  createRequest = function (options = {}) {

//    console.log('CREAT  options = ');
//    console.log(options);
//    console.log('CREAT  data = ');
//    console.log(options.data);

    let url = '';
    let formData = new FormData();

///////////////////////////////////////////////////////////////////

    let xhr = new XMLHttpRequest();

    xhr.onprogress = function(event) {

    };
      
    xhr.onerror = function() {
      
    };

    xhr.onload = function() {
        if (xhr.status != 200) {
          alert( 'Ошибка: ' + xhr.status);
          return;
        }
    }; 

    let eLoad = function(e, obj) {
//      console.log("Успех: ", e, obj);
      options.callback(obj.error, obj.response);
    }
    xhr.addEventListener("load", (e) => { eLoad(e, xhr); });

    for (let key in options.data) {
        formData.append(key, options.data[key]);
    }

    xhr.responseType = 'json';
//    xhr.responseType = options.responseType;
    url = options.url;

    try {
//        console.log('OPEN  method = ' + options.method);
//        console.log('OPEN  url = ' + url);
        xhr.open(options.method, url);
        if (options.method === `GET`) {
//            console.log('SEND GET options = ');
//            console.log(options);
            xhr.send();
        }
        else {
//            console.log('SEND  method = ' + options.method);
//            console.log('SEND  data = ');
//            console.log(formData);//options.data);///formData);
            xhr.send(formData);//options.data);///formData);
        }
    }
    catch (error) {
//          options.callback(error);
          console.log(new Error(`Ошибка: `, error));
    }


/*
    let meth = options.method;
    let url = options.url;
    xhr.open(meth, url);

    try {
        console.log('SEND  method = ' + options.method);
        console.log('SEND  url = ' + options.url);
        console.log('SEND2  data = ' + options.data);
        xhr.send(options.data);
    }
    catch(err) {
        console.log('Что то пошло не так на сервере ...', err);
        options.callback(err);
    }
    finally {
    }
*/


};
