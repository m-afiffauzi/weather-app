import { useState } from 'react';
import Footer from './components/Footer';
import Input from './components/Input';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import TimeAndLocation from './components/TimeAndLocation';

function App() {
  const [data, setData] = useState({});
  const [units, setUnits] = useState('');
  return (
    <div className="py-10">
      <p className="text-center text-5xl p-5">Weather</p>
      <Input updateData={(data) => setData(data)} data={data} updateUnits={(units) => setUnits(units)} />
      <TimeAndLocation data={data} />
      <TemperatureAndDetails data={data} units={units} />
      <Footer />
    </div>
  );
}

export default App;
