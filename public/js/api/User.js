/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {

static url = '/user';

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
      localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
      localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({url: this.url + '/current', method: 'GET',
    callback: (err, res) => {
      if (res && res.user) {
          this.setCurrent(res.user);
      }
      if (!res.succes) {
          this.unsetCurrent();
      }
      callback(err, res);
    }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  
  static login(data, callback) {
    createRequest({ url: this.url + '/login', method: 'POST', data: data,
    callback: (err, res) => {
      if (res && res.user) {
        this.setCurrent(res.user);
      }
      callback(err, res);
    }
    });
  }


  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({url: this.url + '/register', method: 'POST', data,
    callback: (err, res) => {
        if (res && res.user) {
            this.setCurrent(res.user);
        }
        callback(err, res);
    }
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    let data = {};
    createRequest({url: this.url + '/logout', method: 'POST', data,
    callback: (err, res) => {
      if (res && res.success) {
          this.unsetCurrent();
      }
      callback(err, res);
    }
    });
  }
}
