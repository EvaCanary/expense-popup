const LIMIT = 20000;
const STATUS_ON_LIMIT = "все хорошо";
const STATUS_OFF_LIMIT = "все плохо";
const expenses = [];

const inputNode = document.querySelector(".js-input");
const buttonNode = document.querySelector(".js-button");
const historyNode = document.querySelector(".js-history");
const sumNode = document.querySelector(".js-sum");
const limitNode = document.querySelector(".js-limit");
const statusNode = document.querySelector(".js-status");

limitNode.innerText = LIMIT;
buttonNode.addEventListener("click", function () {
  //если ничего нет в поле ввода - вернуть
  // 1. получаем значение из поля воода
  if (!inputNode.value) {
    return;
  }
  console.log(inputNode.value);
  // ввод пользователя передается в функцию
  const expense = parseInt(inputNode.value);

  const clearInput = () => {
    inputNode.value = "";
  };
  // сброс поля ввода после внесения
  inputNode.value = "";
  // внесение данных по кнопке
  // 2. сохраняем трату в список
  expenses.push(expense);

  // 3. выводим новый список трат
  let expensesListHTML = "";

  expenses.forEach((element) => {
    expensesListHTML += `<li>${element} руб.</li>`;
  });

  historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
  //4. посчитать сумму и вывести ее
  let sum = 0;

  expenses.forEach((element) => {
    sum += element;
  });

  sumNode.innerText = sum;
  //5. Сравнение с лимитом и вывод статуса
  if (sum <= LIMIT) {
    statusNode.innerText = STATUS_ON_LIMIT;
    statusNode.classList.add("status_blue");
  } else {
    statusNode.innerText = `${STATUS_OFF_LIMIT} (${LIMIT - sum} руб.)`;
    statusNode.classList.add("status_red");
  }
});
