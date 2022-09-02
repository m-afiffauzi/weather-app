import "./App.css";
import { useState } from "react";
import Input from "./components/Input";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";

function App() {
  const [data, setData] = useState({});
  return (
    <div className="py-10">
      <p className="text-center text-5xl p-5">Weather</p>
      <Input updateData={(data) => setData(data)} />

      <TimeAndLocation data={data} />
      <TemperatureAndDetails data={data} />
    </div>
  );
}

export default App;
