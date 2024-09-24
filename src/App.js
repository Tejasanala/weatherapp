import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("Hyderabad");
  const [weatherData, setWeatherData] = useState(null);
  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[currentDate.getMonth()];
  //this currentdate.getmonth() holds the index of the month.So to map them we used array of months.
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  //fetch method to fetch the dat from the API.
  const API_KEY = "730cc8ed399c21d1aff325b58b732e55";
  const fetchweatherData = async () => {
    try {
      //storing the response we are getting
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchweatherData();
  }, []);
  const handleinputchange = (event) => {
    console.log(event.target.value);
    setCity(event.target.value);
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    fetchweatherData();
  };

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clear":
        return "/sun.webp"; // Path to your sunny weather icon
      case "Rain":
        return "/rain_with_cloud.webp"; // Path to your rainy weather icon
      case "Mist":
        return "/Tornado.webp"; // Path to your snowy weather icon
      case "Haze":
        return "/sun.webp"; // Path to your haze weather icon
      case "Clouds":
        return "/thunder.webp";
      // Add more cases for other weather conditions as needed
      default:
        return null;
    }
  };
  return (
    <div className="App">
      <div className="container">
        {weatherData && (
          <>
            <h1 className="container_date">{formattedDate}</h1>
            <h2 className="container_city">{weatherData.name}</h2>
            <img
              className="contaner_img"
              src={getWeatherIconUrl(weatherData.weather[0].main)}
              width="180px"
              alt="WeatherIcon"
            ></img>
            <h2 className="container_degree">
              {(weatherData.main.temp - 273).toFixed(2)}
            </h2>
            <h2 className="container_para">{weatherData.weather[0].main}</h2>
            <form className="form" onSubmit={handlesubmit}>
              <input
                type="text"
                className="input"
                placeholder="Enter city name"
                onChange={handleinputchange}
              />
              <button type="submit">Check</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
