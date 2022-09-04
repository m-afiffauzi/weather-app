import React, { useState, useEffect } from "react";
import axios from "axios";
import { UilSearch, UilMinusCircle } from "@iconscout/react-unicons";

function Input(props) {
  const [city, setCity] = useState("");
  const [units, setUnits] = useState("metric");
  const url = `/api?q=${city}&units=${units}`;

  useEffect(() => {
    axios.get(url).then((response) => {
      props.updateData(response.data);
    });
    // FIXME: fix this error
  }, [units]);

  const getWeather = () => {
    axios.get(url).then((response) => {
      props.updateData(response.data);
    });
  };

  const resetSearch = () => {
    setCity("");
    props.updateData([]);
  };
  return (
    <div className="flex flex-col text-black items-center justify-center mb-3">
      <div className="flex flex-row justify-center mb-3">
        <div className="flex flex-row-row items-center justify-between gap-3">
          <UilMinusCircle onClick={resetSearch} size="23" className="cursor-pointer transition ease-in-out hover:scale-125" />
          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            type="text"
            placeholder="search city..."
            className="px-3 pt-2 pb-1 texl-xl font-bold border border-black rounded-2xl capitalize placeholder:lowercase bg-transparent focus:bg-transparent"
          />
          <UilSearch onClick={getWeather} size="20" className="cursor-pointer transition ease-in-out hover:scale-125" />
        </div>
      </div>

      {props.data.main ? (
        <div className="flex flex-row-row items-center justify-center">
          <button onClick={() => setUnits("metric")} className="font-mono font-semibold transition ease-in-out hover:scale-125 active:scale-125">
            °C
          </button>
          <p className="font-mono font-bold mx-2">|</p>
          <button onClick={() => setUnits("imperial")} className="font-mono font-semibold transition ease-in-out hover:scale-125 active:scale-125">
            °F
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Input;
