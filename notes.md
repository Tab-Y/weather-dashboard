#notes

5 day weather forcast
The base URL should look like the following: `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`

use local storage   You will use `localStorage` to store any persistent data. For more information on how to work with the OpenWeather API, refer to the [Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys).


GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

** gradient header <!-- background-image: linear-gradient(to right, red, yellow) -->
weather dashboard displayed centered over the 5 day forcast
each card must display:
    city name (the date)
    an icon for weather (rain, sunny, cloudy, ect)
    temperature
    humidity
    wind speed
    *uv index was shown in class*
5 cards for 5 days (5 days out)
current (day) has full width
left hand column
search bar +input
---seperation border---
stored searches as buttons
(append searches as buttons based on search click)

