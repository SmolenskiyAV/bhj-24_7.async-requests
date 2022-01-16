// ### Task 7.3 ###

const progress = document.getElementById('progress');
let form = document.getElementById('form');


function getProgress(form) {  // функция получения статуса загрузки файла с сервера
    
    let formData = new FormData(form);
    let request =new XMLHttpRequest();

    // отслеживаем процесс отправки (взял из примера в учебнике. Для начала, хотя бы так.. тут не до прогресс-бара.. :/ )
    request.upload.onprogress = function(event) {
        console.log(`Отправлено ${event.loaded} из ${event.total}`); // но это не срабатывает
    };

    request.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php');
    request.setRequestHeader('Content-type', 'multipart/form-data');
    //в качестве отправляемого объекта выбираю flv-файл в полтора мегобайта..
    request.send(formData); // загружаем на сервер форму - в ответ получаем перезагруженную страницу с непрерывно загружаемыми(отображаемыми на странице) символами.. Почему?
    console.log('done..')
    // хоть какого-нибуть ответа в мониторе сети в консоли браузера я не вижу.. там пусто. (см.скриншот)
    // Почему сервер начинает "валить" на мой запрос кракозябры и не даёт ответа в консоль???
};

 
  
    form.addEventListener('submit', () => { // обработчик события submit для формы
        
                console.log('pushing reqest..');
                console.log(form);
               
              getProgress(form); // вызов асинхронной функции для получения статуса загрузки файла
        
        
      
    });
