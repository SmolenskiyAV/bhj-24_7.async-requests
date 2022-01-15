// ### Task 7.2 ###

const pollTitle = document.getElementById('poll__title'); // элемент заголовка опросного листа
const pollAnswers = document.getElementById('poll__answers'); // элемент блока вопросов опросного листа

let buttonPollAnswer = pollAnswers.querySelectorAll('button'); // коллекция кнопок с ответами на вопрос
let questionID; // переменная для фиксации идентификатора передаваемого с сервера вопроса

async function getQuestion() {  // асинхронная функция получения данных опроса (опросного листа) с сервера
    let response = await fetch('https://netology-slow-rest.herokuapp.com/poll.php');
  
    if (response.ok) {  // если ответ от сервера успешный
      let data = await response.json(); // получаем данные с сервера в виде объекта
      /*
      let currencyList = Object.keys(data.response.Valute); // массив списка (названий ключей) валют из объекта, полученного по запросу к серверу
      let currencyListLength =  currencyList.length; // размер списка валют (длина массива)
      */
        console.log('ID= ' + data.id)
        console.log(data.data.title)
        questionID = data.id; // обновляем переданный с сервера идентификатор вопроса

        let titleValue = data.data.title;

        pollTitle.textContent = titleValue; // добавление нового вопроса в элемент, являющийся заголовком опросного листа
        
      for (let key in data.data.answers) { // перебор свойств (данных опроса) объекта, полученного по запросу к серверу
        
            //let value = data.response.Valute[key].Value; // численное значение валюты из полученного списка 
            //let charCode = data.response.Valute[key].CharCode; // название валюты из полученного списка
  
            let pollAnswer = data.data.answers[key];

            pollAnswers.insertAdjacentHTML('beforeend', `
                <button class="poll__answer">
                    ${pollAnswer}
                </button>`); // добавление нового DOM-элемента, являющегося кнопкой с вариантом ответа на вопрос
        };
        
        buttonPollAnswer = pollAnswers.querySelectorAll('button'); // обновление коллекции кнопок после обработки очередного запроса к серверу

    } else {
      alert('error', response.status);    
    };
    
  };
  
  async function postAnswer(b, questionID) { //    асинхронная функция отправки ответа в виде post-запроса серверу

    let response = await fetch('https://netology-slow-rest.herokuapp.com/poll.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `vote=${questionID}&answer=${b}` // включение в тело ответа, пересылаемого обратно на сервер, идентификатора вопроса(questionID) и варианта ответа на него(b)
      });
    
    if (response.ok) {  // если ответ от сервера успешный
      
        let data = await response.json(); // получаем данные с сервера в виде JSON-объекта
        alert('Спасибо, Ваш голос засчитан!');
        pollAnswers.innerHTML = '';   // удаление всех кнопок из блока вопросов опросного листа, оставляя титул(название) вопроса

        let summ = 0; // сумма голосов по вопросу, на который получен ответ с сервера

        for (let key in data.stat) {
            summ = summ + Number(data.stat[key].votes); // подсчёт суммы голосов перебором всех возможных вариантов ответа
        };

      for (let key in data.stat) { // перебор свойств (данных опроса) объекта, полученного по запросу к серверу
        
        //let value = data.response.Valute[key].Value; // численное значение валюты из полученного списка 
        //let charCode = data.response.Valute[key].CharCode; // название валюты из полученного списка

        let answer = data.stat[key].answer; // название текущего варианта ответа
        let votes_percent = (100 * Number(data.stat[key].votes) / summ).toFixed(2); // процентная величина по текущему варианту ответа в процентах с округлением до второго разряда
        
        pollAnswers.insertAdjacentHTML('beforeend', `
            <div>
                <div class="stat__answer">
                    ${answer}: 
                </div>
                <div class="stat__votes">
                    ${votes_percent}%
                </div>
            </div>`); // добавление нового DOM-элемента, сводки статистики ответов по текущему вопросу
            pollAnswers.classList.add('stat__answers_inline'); // приведение формата отображения статистики к целевому варианту
      };

    };
      
  };
  
  getQuestion(); // вызов асинхронной функции для загрузки с сервера данных запроса. Отображение  этого запроса на странице

  
    document.addEventListener('click', (event) => { // обработчик события "мышиный клик по странице"
        elem = event.target; // элемент, по которому произведён клик

        for (let b = 0; b < buttonPollAnswer.length; b++) { // если кликнута кнопка с ответом на вопрос
            
            if (elem === buttonPollAnswer[b]) {
                console.log('pushing ID: ' +  questionID);
                postAnswer(b, questionID); // отправляем результат опроса обратно на сервер
            };
        };
      
    });