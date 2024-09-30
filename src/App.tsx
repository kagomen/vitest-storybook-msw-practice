import "./App.css";
import { useEffect, useState } from "react";

type Option = {
  value: string;
  label: string;
};

const defaultOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

function App() {
  const [options, setOptions] = useState<Option[]>(defaultOptions);

  useEffect(() => {
    fetch("/api/options")
      .then((res) => res.json())
      .then((data) => setOptions(data));
  }, []);

  return (
    <form>
      <select>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </form>
  );
}

export default App;
