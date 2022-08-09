import App from "App";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "store/store";
import { createGlobalStyle } from "styled-components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: 'Nunito';
    box-sizing: border-box;
  }

  .selected {
    color: #007acc;
  }
`;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>
  </React.StrictMode>
);
