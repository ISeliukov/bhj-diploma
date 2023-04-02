/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */

  static url = "";

  static list(data, callback) {
    let opt = { url: this.url, data, method: 'GET', callback };
    createRequest(opt);
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */

  static create(data, callback) {
    let opt = { url: this.url, data, method: 'PUT', callback };
    createRequest(opt);
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */

  static remove(data, callback) {
    let opt = { url: this.url, data, method: 'DELETE', callback };
    createRequest(opt);
  }  
}
