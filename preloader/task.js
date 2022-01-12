// ### Task 7.1 ###

const imgLoader = document.getElementById('loader');

async function getCurrency() {
  let response = await fetch('https://netology-slow-rest.herokuapp.com/');

  if (response.ok) {  
    let data = await response.json(); // получаем данные с сервера в виде строки JSON
    console.dir(JSON.parse(data)); // Почему не парсится data? Она ведь JSON.. Мне нужен объект. Как его из data получить?
    imgLoader.classList.remove('loader_active');    
    return data;
  } else {
    alert('error', response.status);    
  };
};

getCurrency();

