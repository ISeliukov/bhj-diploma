/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, res) => {
      if (res && res.success) {
          App.update();
          App.getModal('createAccount').close();
          this.element.reset();
      }
      else {
          alert(JSON.stringify(res.error));
          this.element.reset();
          this.element.querySelector('.form-group input').focus();
      }
    });
  }
}