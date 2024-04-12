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

const selectedCategory = document.querySelector(".selectedCategory");

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

const getExpense = () => {
  if (!inputNode.value) {
    return;
  }
  expense = parseInt(inputNode.value);
  inputNode.value = "";
  return expense;
};

const setLimit = () => {
  if (!inputLimitNode.value) {
    return;
  }
  limit = parseInt(inputLimitNode.value);
  inputLimitNode.value = "";
  return limit;
};

const renderLimit = () => {
  limitNode.innerText = limit;
};
const buttonHandler = () => {
  setLimit();
  renderLimit();
};

const getTotal = () => {
  expenses.forEach((expense) => {
    sum += expense;
  });
  return sum;
};

const getCategory = () => {
  getCategory.addEventListener("change", (event) => {
    getCategory = event.target.value;
    console.log("Выбрана категория:", selectedCategory);
  });
};

const addButtonHandler = () => {
  const expense = getExpense();
  console.log("Expense added:", expense);
  if (sum > limit) {
    console.log(sum, limit);
    statusNode.innerText = STATUS_OUT_OF_LIMIT;
  }
  if (sum < limit) {
    statusNode.innerText = STATUS_IN_LIMIT;
  }
  const selectedCategory = getCategory();
  if (selectedCategory === "Категория") {
    return;
  }
  const newExpense = { amount: expense, category: selectedCategory };
  expenses.push(newExpense);
  console.log(newExpense);
  renderTotal();
  renderHistory(expenses);
  getCategory();
};

const renderHistory = (expenses) => {
  historyList.innerHTML = "";
  expenses.forEach((expense) => {
    const history = document.createElement("li");
    history.innerText = `${expense.amount} - ${expense.category}`;
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
