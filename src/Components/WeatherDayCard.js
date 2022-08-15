let moment = require('moment');

export default function WeatherDayCard({ data }) {

    let displayDate = new Date(data.dt * 1000);
    const imgURL = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";


    return (
        <div className="cardContainer col-sm-2">
            <div className="card">
            <h3 className="card-title">{moment(displayDate).format('dddd')}</h3>
            <p className="">{moment(displayDate).format('MMMM Do, h:mm a')}</p>
            <i className={imgURL}></i>
            <h2>{Math.round(data.main.temp)} °F</h2>
            <div className="card-body">
                <p className="card-text">{data.weather[0].description}</p>
            </div>
            </div>
        </div>
    )
}