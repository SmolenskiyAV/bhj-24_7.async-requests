// ### Task 7.1 ###

let storage;
alert('Содержимое хранилища: ' + localStorage.getItem('savedResponse')); // тестовый вывод извлечённых из LocalStorage данных



const imgLoader = document.getElementById('loader');  // элемент "gif-анимация загрузки"
const items = document.getElementById('items'); // контейнер, в котором содержится список валют

async function getCurrency() {  // асинхронная функция получения данных списка валют с сервера
  let response = await fetch('https://netology-slow-rest.herokuapp.com/');

  if (response.ok) {  // если ответ от сервера успешный
    let data = await response.json(); // получаем данные с сервера в виде объекта
    /*
    let currencyList = Object.keys(data.response.Valute); // массив списка (названий ключей) валют из объекта, полученного по запросу к серверу
    let currencyListLength =  currencyList.length; // размер списка валют (длина массива)
    */
    imgLoader.classList.remove('loader_active');  // скрываем анимацию на странице

    let dataArr = ['{', '}']; // пустой массив для строковых занчений списка валют

    for (let key in data.response.Valute) { // перебор свойств (списка валют) объекта, полученного по запросу к серверу
      let i = 1;
      let value = data.response.Valute[key].Value; // численное значение валюты из полученного списка 
      let charCode = data.response.Valute[key].CharCode; // название валюты из полученного списка

      items.insertAdjacentHTML('beforeend', `
      <div class="item">
        <div class="item__code">
          ${charCode}
        </div>
        <div class="item__value">
          ${value}
        </div>
        <div class="item__currency">
          руб.
        </div>
      </div>`); // добавление нового DOM-элемента, являющегося блоком списка валют

      dataArr.splice(i, 0, `${charCode}`, ':', `${value}`, ','); // заполнение строкового массива
      i++;
    };

       localStorage.setItem('savedResponse', JSON.stringify(dataArr.join(''))); //запись полученного списка валют в виде json-объекта(который потом передаём в парсер) в LocalStorage

    return data; //вывод из функции значения списка всех валют в виде JSON объекта
  } else {
    alert('error', response.status);    
  };
};


// вызов асинхронной функции для загрузки с сервера списка валют. Отображение  этого списка на странице
getCurrency(); 



document.addEventListener('click', () => { // тестовая функция для очистки хранилища
  delete localStorage.savedResponse;
  alert('Локальное хранилище очищено!')
});


document.addEventListener('keydown', (event) => { // тестова функция запуска парсинга строки, полученной из ответа на запрос серверу

  pressedSymbol = event.key; // получение символа по нажатию на кнопку клавиатуры
  
  if ((pressedSymbol === 'j') && (localStorage.savedResponse !== null)) { // если нажата "j" и хранилище не пустое, начинаем парсинг
  console.dir('ОБЪЕКТ JSON:  ' + JSON.parse(localStorage.getItem('savedResponse'))); // На этот раз аргумент парсинга - стопудовая строка с правильными символами в начале { и в конце } через запятые. Пачему жеж оно не парсится???
  console.log(event.key)
  }
});


  





