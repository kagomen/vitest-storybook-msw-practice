import { FC, useEffect, useState } from "react";
import "./App.css";

type Option = {
  value: string;
  label: string;
};

type AppProps = {
  onSubmit: (data: unknown) => void;
};

const App: FC<AppProps> = ({ onSubmit }) => {
  const [options, setOptions] = useState<Option[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    const formData = new FormData(e.currentTarget);
    onSubmit(Object.fromEntries(formData));
  };

  useEffect(() => {
    fetch("/api/options")
      .then((res) => res.json())
      .then((data) => {
        setOptions(data.options);
      });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <select name="option">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export default App;
