(function () {

    const form = document.getElementById('wheatherForm');
    const cityInput = document.getElementById('cityInput');
    const feedback = document.querySelector('.feedback');
    const apiKey = "2435fc688f0adb7743c5e50435243297";
    
    form.addEventListener("submit", event => {
        event.preventDefault();
        const city = cityInput.value;

        if (city.length === 0) {
            showFeedback('Plz enter the name of city');
        }else {
            cityInput.value = "";
            // ajax
            getWeather(city);
            
        }
    });
    function showFeedback(text) {
        feedback.classList.add('showItem');
        feedback.innerHTML = `<p>${text}</p>`

        setTimeout( () =>{
            feedback.classList.remove('showItem');
        }, 2000)
    }

function getWeather(city) { 
   // 觀察API call
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;
    // units=metric參數 作為轉換單位之用
    fetch(url)
    .then(data => data.json()) // JSON解析
    .then(data => showWeather(data))  // showWeather(data)
    .catch(e => console.log(e));
 }

 function showWeather(data) { 
    const result = document.querySelector('.results');
    const cityName = document.getElementById('cityName');
    const cityCountry = document.getElementById('cityCountry');
    const cityIcon = document.getElementById('cityIcon');
    const cityTemp = document.getElementById('cityTemp');
    const cityHumidity = document.getElementById('cityHumidity');
     console.log(data);
     if (data.message === "city not found") {
        //console.log( data.message);
        showFeedback("We can't find the  city ")
     } else {
         // 觀察 JSON資料表內的 name
        const {name, sys: {country}, main: {temp, humidity}} = data;
        const {icon} =  data.weather[0];
        result.classList.add('showItem');
        cityName.textContent = name;
        cityCountry.textContent = country;
        cityTemp.textContent = temp;
        cityHumidity.textContent = humidity
        cityIcon.src = `https://openweathermap.org/img/w/${icon}.png`;
     }
  }
})()