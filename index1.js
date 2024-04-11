const LIMITSTATUS = "нет лимита";
const HISTORYLIST = "нет трат";
const STATUS_IN_LIMIT = "всё хорошо";
const STATUS_OUT_OF_LIMIT = "всё плохо";

const inputNode = document.getElementById("expenseInput");
const inputLimitNode = document.getElementById("expenseLimitInput");
const addButtonNode = document.getElementById("addButton");
const limitButtonNode = document.getElementById("limitButton");
const clearButtonNode = document.getElementById("clearButton");
const limitNode = document.getElementById("limitValue");
const totalValueNode = document.getElementById("totalValue");
const statusNode = document.getElementById("statusText");
const historyList = document.getElementById("historyList");

let sum = 0;
let expenses = [];

const init = () => {
  limitNode.innerText = LIMITSTATUS;
  historyList.innerText = HISTORYLIST;
  statusNode.innerText = STATUS_IN_LIMIT;
  totalValueNode.innerText = sum;
};
init();

let limit;

const getLimit = () => {
  if (!inputLimitNode.value) {
    return;
  }
  limit = parseInt(inputLimitNode.value);
  inputLimitNode.value = "";
  console.log("Expense:", limit);
  return limit;
};

const renderLimit = () => {
  limitNode.innerText = limit;
};
const buttonHandler = () => {
  getLimit();
  renderLimit();
};

const getTotal = () => {
  expenses.forEach((expense) => {
    sum += expense;
  });
  return sum;
};

const addButtonHandler = () => {
  const expense = getLimit();
  console.log("Expense added:", expense);
  expenses.push(expense);
  if (sum > limit) {
    console.log(sum, limit);
    statusNode.innerText = STATUS_OUT_OF_LIMIT;
  }
  if (sum < limit) {
    statusNode.innerText = STATUS_IN_LIMIT;
  }
  renderTotal();
  renderHistory(expenses);
};

const renderHistory = (expenses) => {
  historyList.innerHTML = "";
  expenses.forEach((expense) => {
    const history = document.createElement("li");
    history.innerText = expense;
    historyList.appendChild(history);
  });
};

const renderTotal = () => {
  const total = getTotal(expenses);
  totalValueNode.innerText = total;
};

const reset = () => {
  expenses = [];
  limit = "";
  sum = 0;
  totalValueNode.innerText = sum;
  limitNode.innerText = limit;
  statusNode.innerText = STATUS_IN_LIMIT;
  historyList.innerHTML = "";
};

addButtonNode.addEventListener("click", addButtonHandler);
limitButtonNode.addEventListener("click", buttonHandler);
clearButtonNode.addEventListener("click", reset);
