import React from "react";

import { Route, Routes } from "react-router-dom";

import {
  HomePage,
  Exchanges,
  Cryptocurrencies,
  CryptoDetails,
  News,
} from "./index";

const urls = [
  { path: "/", element: HomePage },
  { path: "/cryptocurrencies", element: Cryptocurrencies },
  { path: "/exchanges", element: Exchanges },
  { path: "/crypto/:coinId", element: CryptoDetails },
  { path: "/news", element: News },
];

function AppRoutes() {
  return (
    <Routes>
      {urls.map((url) => (
        <Route exact path={url.path} element={<url.element />}></Route>
      ))}
    </Routes>
  );
}

export default AppRoutes;
