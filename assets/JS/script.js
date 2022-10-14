// current day forecast of target
var currentDayEl = document.getElementById("currentDay");
// 5 day forecast of target // dynamically create the cards
var fiveDayForecastEl = document.getElementById("fiveDayForecast");
// save the searches as buttons
var savedCitiesEl = document.getElementById("savedCities");
// search button element
var searchBtnEl = document.getElementById("searchBtn");
var savedSearchBtn = document.querySelector(".savedSearch");
// geocoding API  ->  gets lat and lon for other fetches
var geocodingUrl = "https://api.openweathermap.org/geo/1.0/direct?q=";
// current weather API
var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
// 5 day API
var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?";
// API key  ->  used in each fetch
var apiKey = "&appid=c068a7f51cbaf75b97e728732e4f8c60";

var tempCitySearch = [];
var lat = [];
var lon = [];

// save search in local storage
function saveSearch() {
    // the searched city // take the input and put into geocoding API
    // need conditional to not make a button for same name
    var tempCitySearch = document.getElementById("location").value.trim();
    var searched = JSON.parse(localStorage.getItem('searched')) || [];
    if (searched.includes(tempCitySearch)){
    // prevents duplicate buttons
    } else {
        searched.push(tempCitySearch);
    }
        localStorage.setItem('searched', JSON.stringify(searched));
        clearSearched();
        renderSearch();
        makeSearch();
};

// puts the searched cities saved in local storage onto list
function renderSearch() {
    var searched = JSON.parse(localStorage.getItem('searched'));
    if (!searched) {
        return;
    }
    for (var i = 0; i < searched.length; i++) {
        var savedBtnEl = document.createElement('button');
        savedBtnEl.classList.add('savedSearch');
        savedBtnEl.classList.add('btn');
        savedBtnEl.textContent = searched[i];
        savedCitiesEl.appendChild(savedBtnEl);
    }
};
// clears search buttons so duplicates dont show up
function clearSearched() {
    while (savedCitiesEl.firstChild) {
        savedCitiesEl.removeChild(savedCitiesEl.firstChild);
    }
};

function makeSearch() {
    fetch(geocodingUrl + document.getElementById("location").value + apiKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = "lat=" + data[0].lat;
            var lon = "&lon=" + data[0].lon;
            // uses previous fetch for lat and long, sets temp to imperial (fahrenheit)
            fetch(currentWeatherUrl + lat + lon + "&units=imperial" + apiKey)
                .then(function (response2) {
                    return response2.json();
                })
                .then(function (data2) {
                    renderCurrentDay(data2);
                })
            fetch(fiveDayUrl + lat + lon + "&units=imperial" + apiKey)
                .then(function (response3) {
                    return response3.json();
                })
                .then(function (data3) {
                    render5Day(data3)
                })
        });
};

function render5Day(data3) {
    var h3El = document.createElement("h3");
    var midDayWeather = [];
    while (fiveDayForecastEl.firstChild) {
        fiveDayForecastEl.removeChild(fiveDayForecastEl.firstChild);
    }
    h3El.textContent = "5 Day Forecast :";
    fiveDayForecastEl.appendChild(h3El);
    midDayWeather.push(data3.list[4]);
    midDayWeather.push(data3.list[12]);
    midDayWeather.push(data3.list[20]);
    midDayWeather.push(data3.list[28]);
    midDayWeather.push(data3.list[36]);
    for (i = 0; i < midDayWeather.length; i++) {

        function makeCards() {
            var containerDiv = document.createElement('div');
            containerDiv.classList.add("col");
            var ulEl = document.createElement('ul');
            ulEl.classList.add("card");
            ulEl.classList.add("customCard")
            ulEl.textContent = midDayWeather[i].dt_txt;
            var liEl1 = document.createElement('li');
            var liEl2 = document.createElement('li');
            var liEl3 = document.createElement('li');
            var liEl4 = document.createElement('li');
            var iconImg = '<img src="https://openweathermap.org/img/wn/'+midDayWeather[i].weather[0].icon+'.png"></img>'
            liEl1.innerHTML = iconImg;
            ulEl.append(liEl1);
            liEl2.textContent = "Temp : " + midDayWeather[i].main.temp + " fahrenheit";
            ulEl.append(liEl2); 
            liEl3.textContent = "Wind Speed :" + midDayWeather[i].wind.speed + " mph";
            ulEl.append(liEl3);
            liEl4.textContent = "Humidity :" + midDayWeather[i].main.humidity + " %";
            ulEl.append(liEl4);
            containerDiv.append(ulEl);
            fiveDayForecastEl.append(containerDiv);
        }

        makeCards();
    }
};

function renderCurrentDay(data2) {
    while (currentDayEl.firstChild) {
        currentDayEl.removeChild(currentDayEl.firstChild)
    }
    var ulEl = document.createElement("ul");
    ulEl.textContent = data2.name + " " + moment().format("MMM Do, YYYY");
    var liEl1 = document.createElement('li');
    var liEl2 = document.createElement('li');
    var liEl3 = document.createElement('li');
    var liEl4 = document.createElement('li');
    var iconImg = '<img src="https://openweathermap.org/img/wn/'+data2.weather[0].icon+'.png"></img>'
    liEl1.innerHTML = iconImg;
    ulEl.append(liEl1);
    liEl2.textContent = "Temp : " + data2.main.temp + " fahrenheit";
    ulEl.append(liEl2); 
    liEl3.textContent = "Wind Speed :" + data2.wind.speed + " mph";
    ulEl.append(liEl3);
    liEl4.textContent = "Humidity :" + data2.main.humidity +" %";
    ulEl.append(liEl4);
    currentDayEl.appendChild(ulEl);
}

// calls for saved list on load
renderSearch();


searchBtnEl.addEventListener('click', function (event) {
    event.preventDefault();
    saveSearch();
});
savedCitiesEl.addEventListener('click', function (event) {
    event.preventDefault();
    var element = event.target;
    if (element.matches("button") === true) {
        document.getElementById("location").value = event.target.textContent;
        makeSearch();
    }
}
);
