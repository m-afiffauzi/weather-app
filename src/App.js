import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
  IoMdArrowUp,
  IoMdArrowDown,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWind,
  BsWater,
  BsThermometer,
  BsSpeedometer2,
} from "react-icons/bs";
import { TbTemperatureCelsius, TbTornado } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

const APIKey = process.env.REACT_APP_API_KEY;

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("London");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputValue !== "") {
      setLocation(inputValue);
    }
    const input = document.querySelector("input");
    if (input.value === "") {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
    input.value = "";
    e.preventDefault();
  };

  useEffect(() => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}`;
    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 1000);

    return () => clearTimeout(timer);
  }, [error]);

  if (!data) {
    return (
      <div className="w-full h-screen bg-primary bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
        <div>
          <ImSpinner8 className="text-white text-5xl animate-spin" />
        </div>
      </div>
    );
  }

  let icon;
  let backgroundImage;
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      backgroundImage = "bg-cloudy";
      break;
    case "Rain":
      icon = <IoMdRainy />;
      backgroundImage = "bg-rain";
      break;
    case "Clear":
      icon = <IoMdSunny />;
      backgroundImage = "bg-sunny";
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      backgroundImage = "bg-drizzle";
      break;
    case "Snow":
      icon = <IoMdSnow />;
      backgroundImage = "bg-snow";
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      backgroundImage = "bg-thunderstorm";
      break;
    case "Mist":
      icon = <BsCloudHaze2Fill />;
      backgroundImage = "bg-mist";
      break;
    case "Smoke":
      icon = <BsCloudHaze2Fill />;
      backgroundImage = "bg-smoke";
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      backgroundImage = "bg-haze";
      break;
    case "Dust":
      icon = <BsCloudHaze2Fill />;
      backgroundImage = "bg-dust";
      break;
    case "Fog":
      icon = <BsCloudHaze2Fill />;
      backgroundImage = "bg-fog";
      break;
    case "Sand":
      icon = <BsCloudHaze2Fill />;
      backgroundImage = "bg-dust";
      break;
    case "Ash":
      icon = <BsCloudHaze2Fill />;
      backgroundImage = "bg-ash";
      break;
    case "Squall":
      icon = <BsCloudHaze2Fill />;
      backgroundImage = "bg-haze";
      break;
    case "Tornado":
      icon = <TbTornado />;
      backgroundImage = "bg-tornado";
      break;
    default:
      icon = <IoMdSunny />;
      backgroundImage = "bg-sunny";
      break;
  }

  const unixDate = new Date(data.dt * 1000);

  return (
    <div
      className={`min-w-full min-h-screen ${backgroundImage} bg-no-repeat bg-cover bg-center transition-all flex flex-col items-center justify-center px-4 lg:px-0`}
    >
      {/* app name */}
      <h1 className="text-white text-2xl font-bold text-center bg-black/80 w-full max-w-sm backdrop:blur-xl my-2 px-2 pt-2 h-12 rounded-full">
        --- Weather ---
      </h1>
      {/* form */}
      <form
        onChange={handleInput}
        className={`${
          animate ? "animate-shake" : "animate-none"
        } relative h-12 mb-2 bg-black/80 w-full max-w-sm backdrop:blur-xl rounded-full`}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            className="flex-1 bg-transparent capitalize outline-none placeholder:text-white text-white text-md font-light pl-6 h-full"
            type="text"
            placeholder="Search city / country ..."
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-primary hover:bg-blue-600 hover:scale-105 w-16 h-7 flex justify-center items-center transition-all duration-300 rounded-2xl mr-1"
          >
            <IoMdSearch className="text-lg text-white" />
          </button>
        </div>
        {/* error */}
        {error && (
          <div className="absolute top-[10px] left-2">
            <div className="w-full ml-1 py-1 px-16 lg:px-20 bg-red-500 text-sm text-white capitalize rounded-full">{`${error.response.data.message}`}</div>
          </div>
        )}
      </form>
      {/* card */}
      <div className="w-full max-w-sm bg-black/80 min-h-[500px] text-white backdrop:blur-[32px] py-6 px-6 rounded-3xl">
        {loading ? (
          <div className="w-full min-h-[400px] flex justify-center items-center">
            <ImSpinner8 className="text-white text-5xl animate-spin" />
          </div>
        ) : (
          <div>
            {/* card top */}
            <div className="flex justify-center items-center gap-x-5">
              {/* icon */}
              <div className="text-7xl">{icon}</div>
              <div className="flex flex-col">
                {/* country name */}
                <div className="text-2xl font-semibold">
                  {data.name}, {data.sys.country}
                </div>
                {/* date */}
                <div>
                  {unixDate.getHours()}:{unixDate.getMinutes()}
                </div>
                <div>
                  {unixDate.toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  })}
                </div>
              </div>
            </div>
            {/* card body */}
            <div className="my-10">
              <div className="flex justify-center items-center">
                {/* temp */}
                <div className="text-8xl leading-none font-light">
                  {parseInt(data.main.temp)}
                </div>
                {/* temp metric */}
                <div className="text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>
              {/* weather */}
              <div className="capitalize text-center font-bold text-xl mb-2">
                -- {data.weather[0].main} --
              </div>
              {/* weather description */}
              <div className="capitalize text-center text-xs">
                - {data.weather[0].description} -
              </div>
            </div>
            {/* card bottom */}
            <div className="max-w-sm mx-auto flex flex-col gap-y-4 text-xs lg:text-base">
              <div className="flex justify-center">
                <div className="text-xl">
                  <BsThermometer />
                </div>
                <div className="flex items-center ml-1">
                  Feels Like: {parseInt(data.main.feels_like)}
                  <span>
                    <TbTemperatureCelsius />
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-1">
                  {/* icon */}
                  <div className="text-xl">
                    <IoMdArrowDown />
                  </div>
                  <div className="flex items-center ml-1">
                    Min. Temp: {parseInt(data.main.temp_min)}
                    <span>
                      <TbTemperatureCelsius />
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-x-1">
                  {/* icon */}
                  <div className="text-xl">
                    <IoMdArrowUp />
                  </div>
                  <div className="flex items-center ml-1">
                    Max. Temp: {parseInt(data.main.temp_max)}
                    <span>
                      <TbTemperatureCelsius />
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-1">
                  {/* icon */}
                  <div className="text-xl">
                    <BsEye />
                  </div>
                  <div className="ml-1">
                    Visibility: {Math.round(data.visibility / 1000)} km
                  </div>
                </div>
                <div className="flex items-center gap-x-1">
                  {/* icon */}
                  <div className="text-xl">
                    <BsWater />
                  </div>
                  <div className="ml-1">Humidity: {data.main.humidity} %</div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-1">
                  {/* icon */}
                  <div className="text-xl">
                    <BsSpeedometer2 />
                  </div>
                  <div className="flex items-center ml-1">
                    Pressure: {parseInt(data.main.pressure)} hPa
                  </div>
                </div>
                <div className="flex items-center gap-x-1">
                  {/* icon */}
                  <div className="text-xl">
                    <BsWind />
                  </div>
                  <div className="flex items-center ml-1">
                    Wind: {data.wind.speed} m/s
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* footer */}
      <footer className=" w-full max-w-sm text-white text-md text-center">
        <div className="bg-black/80 backdrop:blur-xl my-2 pt-3 h-12 rounded-full">
          <div>
            Data provided by{" "}
            <a
              href="https://openweathermap.org/"
              target="_blank"
              rel="noreferrer"
              className="text-orange-500 hover:underline"
            >
              OpenWeather
            </a>
          </div>
        </div>
        <div className="bg-black/80 backdrop:blur-xl mb-2 pt-3 h-12 rounded-full">
          <div>
            © {unixDate.getFullYear()} {""}
            <a
              href="https://m-afiffauzi.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-[#28d6b6] hover:underline"
            >
              M. A. F.
            </a>{" "}
            All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
