/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('Элемент не существует.');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    try {
      this.render(this.lastOptions);
    } catch {
      return null;
    }
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      let elem = event.target.closest('.remove-account');
      if (elem) {
          this.removeAccount();
      }
      elem = event.target.closest('.transaction__remove');
      if (elem) {
          this.removeTransaction(elem.dataset.id);
      }
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if (!this.lastOptions) {
      return;
    }

    if (confirm('Вы действительно хотите удалить счёт?')) {
      let id1 = this.lastOptions.account_id;
      Account.remove({ id: id1 }, (err, res) => {
              if (res && res.success) {
                  App.update();
              }
          }
      );
      this.clear();
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
          Transaction.remove({ id }, (err, res) => {
          if (res && res.success) {
              App.update();
          }
      });
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {

    if (!options) {
      return;
    }
    this.lastOptions = options;    

//    console.log(options);
    Account.get(options.account_id, (err, res) => {
//      console.log(err, res);
      if(res && res.data) {
//        console.log(res);
        this.renderTitle(res.data.name);
      }
    });

    let data = {
      email: User.current().email,
      password: User.current().password
    };

    Transaction.list(data, (err, res) => {
          //      console.log(err, res);
      if(res && res.data) {
          console.log(res);
          this.renderTransactions(res.data);
      }
    });

  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    let elem = document.querySelector(".content-title");
    if(elem) {
      elem.nextElementSibling.textContent = name;
    }
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    let currentDate = new Date(date);
    let day = currentDate.toLocaleString('ru', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    let time = currentDate.toLocaleString('ru', {
        hour: 'numeric',
        minute: 'numeric',
    });

    return '${day} в ${time}';
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {

    let id = item.id;
    let type = item.type;
    let name = item.name;
    let sum = item.sum;
    let date = this.formatDate(item.created_at);

    let code = 
     '<div class="transaction transaction_'+type.toLowerCase()+' row">'+
     '<div class="col-md-7 transaction__details">'+
     '<div class="transaction__icon">'+
     '<span class="fa fa-money fa-2x"></span>'+
     '</div>'+
     '<div class="transaction__info">'+
     '<h4 class="transaction__title">'+name+'</h4>'+
    '<!-- дата -->'+
    '<div class="transaction__date">'+date+'</div>'+
    '</div>'+
    '</div>'+
    '<div class="col-md-3">'+
    '<div class="transaction__summ">'+
    '<!--  сумма -->'+
    sum+' <span class="currency">₽</span>'+
    '</div>'+
    '</div>'+
    '<div class="col-md-2 transaction__controls">'+
    '<!-- в data-id нужно поместить id -->'+
    '<button class="btn btn-danger transaction__remove" data-id='+id+'>'+
    '<i class="fa fa-trash"></i>'+
    '</button>'+
    '</div>'+
    '</div>';

    return code;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
        let cont = this.element.querySelector('.content');
        cont.innerHTML = '';
        for (let elem of data) {
            cont.innerHTML += this.getTransactionHTML(elem);
        }
  }
}
