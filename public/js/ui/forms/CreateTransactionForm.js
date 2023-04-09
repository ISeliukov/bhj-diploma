/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
    renderAccountsList() {
    let accSel = this.element.querySelector('.accounts-select');
    Account.list(User.current(), (err, res) => {
      if (res && res.data) {
          let html1 = "";
          accSel.innerHTML = res.data.reduce((html1, current) => html1 + 
          `<option value="${current.id}">${current.name}</option>`, 0);
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, res) => {
      if (res && res.success) {
          App.update();
          this.element.reset();
          App.getModal('newIncome').close();
          App.getModal('newExpense').close();
      }
    });
  }
}