import WeatherDayCard from "./WeatherDayCard"

export default function ResultsComponent({isLoaded, results, foreResult, myDate}) {

  let WeatherDayCardList = (data) => {
    return data.map((item, index) => <WeatherDayCard data={item} key={index} />) 
  }

    return (
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {console.log(results)}
          {console.log(foreResult)}
          {isLoaded && results && <>
            <h3>{results.weather[0].main}</h3>
            <p>Feels like {results.main.feels_like}°C</p>
            <i><p>{results.name}, {results.sys.country}</p></i>
          </>}

          {isLoaded && foreResult &&<div className="row justify-content-center">

            {WeatherDayCardList(foreResult)}

          </div>}
          {/* {isLoaded && foreResult && <>
            <h3>{myDate}</h3>
          </>} */}
          
        </div>
    )
}