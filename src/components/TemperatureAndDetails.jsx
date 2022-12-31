import { UilTemperature, UilTear, UilWind, UilArrowUp, UilArrowDown } from '@iconscout/react-unicons';

function TemperatureAndDetails({ data, units }) {
  return (
    <div className="flex flex-col text-black items-center justify-center">
      {data.main ? (
        <div className="flex flex-col items-center justify-between gap-2">
          <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} className="img-responsive -mt-10 z-10" width={150} height={150} alt="weather-icon" />
          <p className="text-5xl translate-x-1 -mt-10">
            {data.main.temp.toFixed()}°{units}
          </p>
          <p className="text-xl text-md font-medium -mt-2">-- {data.weather[0].main} --</p>
          <div className="flex items-center justify-around text-md gap-1">
            <div className="flex items-center">
              <UilTemperature size="22" className="mr-1 -translate-y-0.5" />
              Feels like:{' '}
              <span className="font-semibold ml-1">
                {data.main.feels_like.toFixed()}°{units}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-around text-md gap-1">
            <div className="flex items-center">
              <UilArrowUp size="22" className="mr-1 -translate-y-0.5" />
              Max:{' '}
              <span className="font-semibold ml-1">
                {data.main.temp_max.toFixed()}°{units}
              </span>
            </div>
            <span>|</span>
            <div className="flex items-center">
              <UilArrowDown size="22" className="mr-1 -ml-1 -translate-y-0.5" />
              Min:{' '}
              <span className="font-semibold ml-1">
                {data.main.temp_min.toFixed()}°{units}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-around text-md gap-1">
            <div className="flex items-center">
              <UilTear size="22" className="mr-1 -translate-y-0.5" />
              Humidity: <span className="font-semibold ml-1">{data.main.humidity}%</span>
            </div>
            <span>|</span>
            <div className="flex items-center">
              <UilWind size="22" className="mr-1 -translate-y-0.5" />
              Wind: <span className="font-semibold ml-1">{data.wind.speed}/h</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-black gap-1">
          <UilArrowUp size="50" className="-my-5" />
          <p className="font-bold text-md mt-4">Search city to get current weather data.</p>
        </div>
      )}
    </div>
  );
}

export default TemperatureAndDetails;
