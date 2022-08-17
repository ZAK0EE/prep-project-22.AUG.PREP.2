import { useEffect, useState } from "react";

import '../assets/styles/App.css';
import logo from '../mlh-prep.png';
import ErrorComponent from "./Error";
import ResultsComponent from "./Results";
import SearchComponent from "./Search";
import SearchDateTimeComponent from "./SearchDateTimeComponent";
import RequiredItems from "./RequiredItems";
import GetMyLocationButton from "./GetMyLocationButton";
import Map from "./Map";
import Footer from "./Footer/Footer";


export default function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [coords, setCoords] = useState(null)
  const [results, setResults] = useState(null);
  const [foreResult, setforeRes] = useState(null);
  
  const [myDate, setMyDate] = useState(new Date());

  const changeCity = (city) => setCity(city);
  const changeDate = (date) => setMyDate(date);
  const [background, setBackground] = useState("")

  // Fetch data based on geolocation
  function getUserLocation() {
    setIsLoaded(false);

    // Use Geolocation API to locate user coordinates
    const geolocateUser = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(function (pos) {
        let lat = pos.coords.latitude
        let lon = pos.coords.longitude
        resolve({ lat, lon });
      }, error)
    })

    // Use coordinates to fetch weather
    geolocateUser.then(res => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${res.lat}&lon=${res.lon}&units=metric&appid=${process.env.REACT_APP_APIKEY}`)
      .then(res => res.json())
      .then((result) => {
        setIsLoaded(true)
        setCity(result.name)
        setResults(result)
      },
      (error) => {
        setIsLoaded(true)
        setError(error)
      })
    })
  }

  // Fetch data based on user input
  useEffect(() => { // weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            setIsLoaded(false)
          } else {
            setCoords({lat: result.coord.lat, lon: result.coord.lon})
            setBackground(result.weather[0].main)
            setResults(result);
            setIsLoaded(true);
          }
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )


  }, [city])

  useEffect(() => {
      fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== "200") {
            setIsLoaded(false);
          } else {
            setIsLoaded(true);
            setforeRes(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )


  }, [city])

  if (error) {
    return <ErrorComponent error={error} />;
  } else {

    return (
      <>
        <div className={(isLoaded && results) ? background : undefined}>
          <img className="logo" src={logo} alt="MLH Prep Logo"></img>
          <h2>Enter a city below 👇</h2>
          <SearchComponent city={city} changeCity={setCity} />
          <GetMyLocationButton getUserLocation={getUserLocation} />
          <div className="card-container">
            <ResultsComponent isLoaded={isLoaded} results={results}/>
            {isLoaded && results && <RequiredItems weatherKind={results.weather[0].main} />}
            <SearchDateTimeComponent myDate = {myDate} changeDate ={changeDate}/>
          </div>
          <Map setIsLoaded={setIsLoaded} setResults={setResults} setError={setError} coords={coords} />
          <Footer />
        </div>
      </>
    )

  }
}