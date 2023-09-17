import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
  IoMdClose,
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
import cityList from "./city-list.json";
import ashImg from "./assets/img/ash.jpg";
import cloudyImg from "./assets/img/cloudy.jpg";
import drizzleImg from "./assets/img/drizzle.jpg";
import dustImg from "./assets/img/dust.jpg";
import fogImg from "./assets/img/fog.jpg";
import hazeImg from "./assets/img/haze.jpg";
import mistImg from "./assets/img/mist.jpg";
import rainImg from "./assets/img/rain.jpg";
import smokeImg from "./assets/img/smoke.jpg";
import snowImg from "./assets/img/snow.jpg";
import sunnyImg from "./assets/img/sunny.jpg";
import tornadoImg from "./assets/img/tornado.jpg";
import thunderstormImg from "./assets/img/thunderstorm.jpg";

const APIKey = process.env.REACT_APP_API_KEY;

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("London");
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setSearch(e.target.value);
    if (search.length <= 1) {
      setSearchData([]);
    } else {
      getSearchData(search);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setLocation(search);
      setSearchData([]);
      setSearch("");
    } else {
      return;
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setSearch("");
    setSearchData([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(search);
    setSearchData([]);
    if (search === "") {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
    setSearch("");
  };

  const getSearchData = (search) => {
    if (search !== "") {
      const filteredCity = cityList.filter((city) => {
        return city.name.toLowerCase().startsWith(search.toLowerCase());
      });
      setSearchData(filteredCity.slice(0, 10));
    } else {
      setSearchData([]);
    }
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
  let placeholderImage;
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      backgroundImage = cloudyImg;
      placeholderImage = "bg-cloudy";
      break;
    case "Rain":
      icon = <IoMdRainy />;
      backgroundImage = rainImg;
      placeholderImage = "bg-rain";
      break;
    case "Clear":
      icon = <IoMdSunny />;
      backgroundImage = sunnyImg;
      placeholderImage = "bg-sunny";
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      backgroundImage = drizzleImg;
      placeholderImage = "bg-drizzle";
      break;
    case "Snow":
      icon = <IoMdSnow />;
      backgroundImage = snowImg;
      placeholderImage = "bg-snow";
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      backgroundImage = thunderstormImg;
      placeholderImage = "bg-thunderstorm";
      break;
    case "Mist":
      icon = <BsCloudHaze2Fill />;
      backgroundImage = mistImg;
      placeholderImage = "bg-mist";
      break;
    case "Smoke":
      icon = <BsCloudHaze2Fill />;
      backgroundImage = smokeImg;
      placeholderImage = "bg-smoke";
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      backgroundImage = hazeImg;
      placeholderImage = "bg-haze";
      break;
    case "Dust":
      icon = <BsCloudHaze2Fill />;
      backgroundImage = dustImg;
      placeholderImage = "bg-dust";
      break;
    case "Fog":
      icon = <BsCloudHaze2Fill />;
      backgroundImage = fogImg;
      placeholderImage = "bg-fog";
      break;
    case "Sand":
      icon = <BsCloudHaze2Fill />;
      backgroundImage = dustImg;
      placeholderImage = "bg-dust";
      break;
    case "Ash":
      icon = <BsCloudHaze2Fill />;
      backgroundImage = ashImg;
      placeholderImage = "bg-ash";
      break;
    case "Squall":
      icon = <BsCloudHaze2Fill />;
      backgroundImage = hazeImg;
      placeholderImage = "bg-haze";
      break;
    case "Tornado":
      icon = <TbTornado />;
      backgroundImage = tornadoImg;
      placeholderImage = "bg-tornado";
      break;
    default:
      icon = <IoMdSunny />;
      backgroundImage = sunnyImg;
      placeholderImage = "bg-sunny";
      break;
  }

  const unixDate = new Date(data.dt * 1000);

  return (
    <div
      className={`relative min-w-full min-h-screen transition-all flex flex-col items-center justify-center px-4 lg:px-0`}
    >
      <img
        loading="lazy"
        src={backgroundImage}
        alt="Background"
        width={100}
        height={100}
        className={`absolute top-0 left-0 w-full h-full -z-10 object-cover ${placeholderImage} bg-no-repeat bg-cover bg-center`}
      />
      {/* app name */}
      <h1 className="text-white text-2xl font-bold text-center bg-black/80 w-full max-w-sm backdrop:blur-xl my-2 px-2 pt-2 h-12 rounded-full">
        --- Weather ---
      </h1>
      {/* form */}
      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } relative h-12 mb-2 bg-black/80 w-full max-w-sm backdrop:blur-xl rounded-full`}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            type="text"
            value={search}
            autoComplete="off"
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent capitalize outline-none placeholder:text-white text-white text-md font-light pl-6 h-full"
            placeholder="Search city / country ..."
          />
          {search !== "" && (
            <button
              id="delete"
              aria-label="delete"
              onClick={handleDelete}
              className="bg-red-400 hover:bg-red-500 hover:scale-105 w-7 h-7 flex justify-center items-center transition-all duration-300 rounded-2xl mr-2"
            >
              <IoMdClose className="text-lg text-white" />
            </button>
          )}
          <button
            id="search"
            aria-label="search"
            onClick={(e) => handleSubmit(e)}
            className="bg-primary hover:bg-blue-600 hover:scale-105 w-16 h-7 flex justify-center items-center transition-all duration-300 rounded-2xl mr-1"
          >
            <IoMdSearch className="text-lg text-white" />
          </button>

          <ul
            className={`absolute w-96 bg-white flex flex-col rounded-2xl top-[52px] left-0`}
          >
            {searchData?.map((city) => {
              return (
                <li
                  onClick={(e) => {
                    setSearch(city.name);
                    setSearchData([]);
                  }}
                  key={city.id}
                  className="bg-white hover:bg-primary focus-within:bg-primary cursor-pointer rounded-2xl overflow-clip"
                >
                  <button
                    id={city.name}
                    aria-label={city.name}
                    className="w-full px-2 py-1  text-start outline-none"
                  >
                    {city.name}, {city.country}
                  </button>
                </li>
              );
            })}
          </ul>
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
