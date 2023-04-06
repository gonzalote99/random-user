const addUserBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const millonariesBtn = document.getElementById('millonaires');
const richiesBtn = document.getElementById('richest');
const calculateBtn = document.getElementById('calculate');
const main = document.getElementById('main');


let data = [];


async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json(); 

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)

  };

  addData(newUser);


}

function doubleMoney() {
  data = data.map(user => {
    return {...user, money: user.money * 2}
  })
  updateDom();
}


function sortByRichest() {
  data.sort((a, b) => b.money - a.money)

  updateDom();
}

function showMillonaries() {
  data = data.filter(user => user.money > 1000000)

  updateDom();
}


function calculateTotal() {
  const total = data.reduce((acc, user) => (acc += user.money), 0)

  const totalEl = document.createElement('div');
  totalEl.innerHTML = `<h3> total: <strong> ${formatMoney(total)} </strong>  </h3>`

  main.appendChild(totalEl);
}


function addData(obj) {
  data.push(obj)
  updateDom();
}


function updateDom(providedData = data) {
  main.innerHTML = '<h2><strong>person</strong>wealth</h2>'

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;

    main.appendChild(element)
  })

} 

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
richiesBtn.addEventListener('click', sortByRichest);
millonariesBtn.addEventListener('click', showMillonaries);
calculateBtn.addEventListener('click', calculateTotal);


getRandomUser();
getRandomUser();
getRandomUser();

