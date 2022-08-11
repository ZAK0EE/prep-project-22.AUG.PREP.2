import { useEffect, useState } from "react";
import '../App.css';
import logo from '../mlh-prep.png'
import ErrorComponent from "./Error Component";
import ResultsComponent from "./Results Component";
import SearchComponent from "./Search Component";
import SearchDateTimeComponent from "./Search Date Time Component";


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);
  const [foreResult, setforeRes] = useState(null);

  const changeCity = (city) => setCity(city);

  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            setIsLoaded(false)
          } else {
            setIsLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
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
    return <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>
        <h2>Enter a city below 👇</h2>
        <SearchComponent city={city} changeCity={changeCity} />
        <SearchDateTimeComponent />
        <ResultsComponent isLoaded={isLoaded} results={results} foreResult={foreResult}/>
      </div>
    </>
  }
}

export default App;
