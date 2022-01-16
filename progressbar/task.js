// ### Task 7.3 ###

const progress = document.getElementById('progress'); // элемент "прогресс-бар"
let form = document.getElementById('form'); // форма отправки файла


function getProgress(form) {  // функция получения статуса загрузки файла с сервера
    
    let formData = new FormData(form);
    let request =new XMLHttpRequest();

    // отслеживаем процесс отправки 
    request.upload.onprogress = function(event) {
        console.log(`Отправлено ${event.loaded} из ${event.total}`); // КОНТРОЛЬНЫЕ ТОЧКИ
        progress.setAttribute('value', 
            (Number(event.loaded / event.total).toFixed(1))  // заполняем прогресс-бар по мере передачи файла  
        )
    };

    request.upload.onload = function() { 
        alert(`Данные успешно отправлены.`);
    };
      
    request.upload.onerror = function() {
        alert(`Произошла ошибка во время отправки: ${xhr.status}`);
    };

    request.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php');
    request.setRequestHeader('Content-type', 'multipart/form-data'); // установка заголовка для передаваемых больших медиа-файлов
    // дополнительно в html-форму были добавлены атрибуты: <form  method="POST" enctype="multipart/form-data" 
    
    request.send(formData); // загружаем на сервер форму
};
     
form.addEventListener('submit', (e) => { // обработчик события submit для формы
    e.preventDefault() // сброс дефолтного обработчика браузера при обработке "submit"
    console.log('pushing reqest..');
                            
    getProgress(form); // вызов асинхронной функции для получения статуса загрузки файла
});
