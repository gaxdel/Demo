// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

const weather = {};
weather.temperature = {
    unit : "celsius"
};

const KELVIN = 273;
const key = "82005d27a116c2880c8f0fcb866998a0";
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}
else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<P>Browser doesn't support geolocation`;
}
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude,longitude);
}
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} <p>`;
}
function getWeather(latitude,longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api).then(function(response){
        let data = response.json();
        console.log(data);
        return data;
    }).then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
        console.log(weather.temperature.value);
        displayWeather();
    });
}
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value} <span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city} , ${weather.country}`;
    console.log(weather);
}
function CelsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}
tempElement.addEventListener("click",function(){
    if(weather.temperature.value === undefined) return;
    if(weather.temperature.unit === 'celsius'){
        tempElement.innerHTML = `${Math.floor(CelsiusToFahrenheit(weather.temperature.value))} <span>F</span>`;
        weather.temperature.unit = 'fahrenheit';
    }
    else{
        tempElement.innerHTML = `${weather.temperature.value} <span>C</span>`;
        weather.temperature.unit = 'celsius';
    }

})