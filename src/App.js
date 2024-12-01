import React, { useState } from "react";
import axios from "axios";
import './App.css'


function App() {

  const [weatherdata, setWeatherdata] = useState({})
  const [location, setLocation] = useState('')
  const apikey = process.env.REACT_APP_API_KEY 


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}&unit=imperial`

  const serachLocation = async (event) => {
    if (event.key === 'Enter' && location) {
      console.log('location====>', location);
      try {
        const response = await axios.get(url)
        console.log(response.data);
        setWeatherdata(response.data)
      } catch (error) {
        console.log('error===>', error);
      }
      setLocation('')
    }
  }


  return (
    <div className="home-container">

      <div className="main-container">

        <div className="container-input">
          <input type="text" placeholder="Search Location"
            value={location} onChange={event => setLocation(event.target.value)}
            onKeyDown={serachLocation}
            name="text"
            className="input" />
          {/* <svg
            fill="#000000"
            width="20px"
            height="20px"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
              fillRule="evenodd"
            />
          </svg> */}
        </div>

        {weatherdata.name !== undefined &&
          <>
            <div className="card">

              <h1>{weatherdata.name}</h1>
              {weatherdata.main ? <h2>{(weatherdata.main.temp - 273.15).toFixed(2)}°C</h2> : null}
              {weatherdata.main ? <h3>{weatherdata.weather[0].main}</h3> : null}

            </div>
            <div className="card1">

              <div className="feel-like">
                {weatherdata.main ? <h4>{(weatherdata.main.feels_like - 273.15).toFixed(2)}°C</h4> : null}
                <h4>Feels Like</h4>
              </div>

              <div className="humidity">
                {weatherdata.main ? <h4>{weatherdata.main.humidity }%</h4> : null}
                <h4>Humidity</h4>
              </div>

              <div className="feel-like">
                {weatherdata.main ? <h4>{weatherdata.wind.speed }MPH</h4> : null}
                <h4>Wind Speed</h4>
              </div>

            </div>

          </>


        }


      </div>

    </div>
  );
}

export default App;
