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
var geocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
// current weather API
var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
// 5 day API
var fiveDayUrl = "api.openweathermap.org/data/2.5/forecast?";
// API key  ->  used in each fetch
var apiKey = "&appid=c068a7f51cbaf75b97e728732e4f8c60";

var tempCitySearch = [];
var lat = [];
var lon = [];
// make array to hold and be updated about the search
// is cleared after search is complete
// if saved search button is pressed, puts text in and searches


// save search in local storage
function saveSearch () {
    // the searched city // take the input and put into geocoding API
    // need conditional to not make a button for same name
    var tempCitySearch = document.getElementById("location").value.trim();
    var searched = JSON.parse(localStorage.getItem('searched')) || [];
    searched.push(tempCitySearch);
    localStorage.setItem('searched', JSON.stringify(searched));
    clearSearched();
    renderSearch();
    makeSearch();
};

// puts the searched cities saved in local storage onto list
function renderSearch () {
    var searched = JSON.parse(localStorage.getItem('searched'));
    if (!searched){
        return;
    }
    for (var i=0;i<searched.length; i++){
        var savedBtnEl = document.createElement('button');
        savedBtnEl.classList.add('savedSearch');
        savedBtnEl.classList.add('btn');
        savedBtnEl.textContent = searched[i];
        savedCitiesEl.appendChild(savedBtnEl);
    }
};
// clears search buttons so duplicates dont show up
function clearSearched(){
    while (savedCitiesEl.firstChild){
        savedCitiesEl.removeChild(savedCitiesEl.firstChild);
    }
};



function makeSearch() {
    fetch(geocodingUrl+document.getElementById("location").value+"&limit=5"+apiKey)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var lat = "lat="+data[0].lat;
        var lon = "&lon="+data[0].lon;
        // uses previous fetch for lat and long, sets temp to imperial (fahrenheit)
        fetch(currentWeatherUrl+lat+lon+"&units=imperial"+apiKey)
        .then(function (response2) {
            return response2.json();
        })
        .then(function (data2) {
            
            console.log(data2.main.temp);
            // resets search criteria
            tempCitySearch = [];
            lat = [];
            lon = [];
        })
        // fetch(fiveDayUrl+lat+lon+"&units=imperial"+apiKey)
        // .then(function (response3) {
            //     return response3.json();
            // })
            // .then(function (data3) {
                //     console.log(data3);
                // })
            });
    // fetch geocoding API lat and lon
    // then fetch current weather
    //- renderCurrentDay();
    // start function to print to current card
    // then fetch 5 day
    // calls card function 5 times for 5 different objects (1 for each day)
    //- render5Day();
};



function render5Day(){
    // create <h3> 5 day forecast :</h3>
    // append <h3> to div id fiveDayForecast
    // start loop for 5 cards
    // search through JSON info and get what is needed as variables
    // create elements and put info in place
    // <div class="col">
    // <ul class="card customCard"> date
    // create <li><i> weather icon</i></li>
    // append to <ul>
    // create <li>temp</li>
    // append to <ul>
    // create <li>wind speed</li>
    // append to <ul>
    // create <li>humidity</li>
    // appened to <ul>
    // append <ul> to <div>
    // append <div> to fiveDayForecast
};
function renderCurrentDay(){
    // creates current card
    // <ul> city name and date (data[0].name)
    // <li><i> weather icon (link is https://openweathermap.org/img/wn/+data[0].weather(array)[0].icon+.png   ./description)
    // <li> for each : temp (data2.main.temp), wind speed(data.wind.speed), humidity (data.main.humidity)
}


// calls for saved list on load
renderSearch();

// needs event listener for already searched to load them again -- // -- need page reset for inbetween searches to not stack multiple cities
searchBtnEl.addEventListener('click', function(event){
    event.preventDefault();
    saveSearch()
    });
savedCitiesEl.addEventListener('click', function (event){
    event.preventDefault();
    var element = event.target;
    if (element.matches("button") === true) {
        var searchAgain = event.target.textContent;
        tempCitySearch.push(searchAgain)
        document.getElementById("location").textContent = searchAgain;
        console.log(tempCitySearch)
        // saveSearch();
    }

    // var searchForAgain = document.getElementById("location");
    // searchForAgain.textContent = event.target

}
);
// need 3rd party api's to make weather app


// // create the elements to dynamically build page

// // stored searches as buttons to do searches again
// // (append searches as buttons based on search click)

// ////global variables
// // search history as empy array
// // weather api root
// // api key


// // render search
// // clear history (current display)
// // update info

// // add search to history
// // use local storage to store search

// // function for 1 card
// // loop through function for each day needed

// // fetch weather (input location)

// // fetch coords (geo api)

// check though 6-021 for logic structure example *****


// // basic structure provided by seth

// // Global variables
// // search history as an empty array
// // weather api root url
// // api key

// // DOM element references
// // search form
// // search input
// // container/section for today's weather
// // container/section for the forecast 
// // search history container


// // Function to display the search history list.
// function renderSearchHistory() {
//     // empty the search history container
  
//     // loop through the history array creating a button for each item
  
//       // append to the search history container
//   }
  
//   // Function to update history in local storage then updates displayed history.
//   function appendToHistory(search) {
//     // push search term into search history array
  
//     // set search history array to local storage
//     renderSearchHistory();
//   }
  
//   // Function to get search history from local storage
//   function initSearchHistory() {
//      // get search history item from local storage
  
//     // set search history array equal to what you got from local storage
//     renderSearchHistory();
//   }
  
//   // Function to display the CURRENT weather data fetched from OpenWeather api.
//   function renderCurrentWeather(city, weather) {
//     // Store response data from our fetch request in variables
//       // temperature, wind speed, etc.
  
  
//     // document.create the elements you'll want to put this information in  
  
//     // append those elements somewhere
  
//     // give them their appropriate content
  
//   }
  
//   // Function to display a FORECAST card given an object (from our renderForecast function) from open weather api
//   // daily forecast.
//   function renderForecastCard(forecast) {
//     // variables for data from api
//       // temp, windspeed, etc.
  
//     // Create elements for a card
  
//     // append
  
//     // Add content to elements
  
//     // append to forecast section
//   }
  
//   // Function to display 5 day forecast.
//   function renderForecast(dailyForecast) {
//   // set up elements for this section
    
//   // append
  
//   // loop over dailyForecast
  
//     for (var i = 0; i < dailyForecast.length; i++) {
  
//       // send the data to our renderForecast function as an argument
//           renderForecastCard(dailyForecast[i]);
//     }
//   }
  
//   function renderItems(city, data) {
//     renderCurrentWeather(city, data.list[0]);
//     renderForecast(data.list);
//   }
  
//   // Fetches weather data for given location from the Weather Geolocation
//   // endpoint; then, calls functions to display current and forecast weather data.
//   function fetchWeather(location) {
//     // varialbles of longitude, latitude, city name - coming from location
  
//     // api url
  
//     // fetch, using the api url, .then that returns the response as json, .then that calls renderItems(city, data)
  
//   }
  
//   function fetchCoords(search) {
//     // variable for you api url
  
//     // fetch with your url, .then that returns the response in json, .then that does 2 things - calls appendToHistory(search), calls fetchWeather(the data)
  
//   }
  
//   function handleSearchFormSubmit(e) {
//     // Don't continue if there is nothing in the search form
//     if (!searchInput.value) {
//       return;
//     }
  
//     e.preventDefault();
//     var search = searchInput.value.trim();
//     fetchCoords(search);
//     searchInput.value = '';
//   }
  
//   function handleSearchHistoryClick(e) {
//     // grab whatever city is is they clicked
    
//     fetchCoords(search);
//   }
  
//   initSearchHistory();
//   // click event to run the handleFormSubmit 
//   // click event to run the handleSearchHistoryClick