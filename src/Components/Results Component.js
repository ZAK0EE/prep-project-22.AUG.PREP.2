
export default function ResultsComponent({isLoaded, results, foreResult}) {

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

          {isLoaded && foreResult && <>
            <h3>{foreResult[0][0].dt_txt}</h3>
          </>}
          
        </div>
    )
}