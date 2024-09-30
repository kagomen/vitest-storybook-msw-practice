import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const onSubmit = (data: unknown) => {
  console.log(data);
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App onSubmit={onSubmit} />
  </StrictMode>
);
