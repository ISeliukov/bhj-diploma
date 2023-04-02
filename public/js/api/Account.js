/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */

static url = '/account';

  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback) {
    let opt = {url: this.url + '/' + id, method: 'GET', callback};
    createRequest(opt);
  }

}
