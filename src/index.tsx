import App from "App";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
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
    text-decoration: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .selected {
    color: #007acc;
  }
`;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyles />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
