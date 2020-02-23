import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import * as serviceWorker from "./serviceWorker";

import graphqlClient from "./api/graphql";
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,500&display=swap');

  body {
    font-family: Roboto, sans-serif;
  }
`;

ReactDOM.render(
  <ApolloProvider client={graphqlClient}>
    <GlobalStyle />
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
