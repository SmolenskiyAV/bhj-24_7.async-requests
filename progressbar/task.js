// ### Task 7.3 ###

const progress = document.getElementById('progress');
const send = document.getElementById('send');
let form = document.getElementById('form');


function getProgress(form) {  // функция получения статуса загрузки файла с сервера
    
    let formData = new FormData(form);
    let request =new XMLHttpRequest();

    request.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php')
    request.setRequestHeader('Content-type', 'multipart/form-data')
    request.send(formData);
    console.log('done..')
};

 
 /* 
    document.addEventListener('click', (event) => { // обработчик события "мышиный клик по странице"
        elem = event.target; // элемент, по которому произведён клик

        if (elem === send) {
                console.log('pushing reqest..');
                console.log(form);
               
              getProgress(form); // вызов асинхронной функции для получения статуса загрузки файла
        
        };
      
    });
*/