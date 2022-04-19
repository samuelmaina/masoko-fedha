import React from "react";
import { Route, Routes } from "react-router-dom";

import { Layout } from "antd";

import {
  HomePage,
  Exchanges,
  Cryptocurrencies,
  CryptoDetails,
  News,
  Footer,
} from "./index";

function Main() {
  return (
    <div className="main">
      <Layout>
        <div className="routes">
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route exact path="/exchanges" element={<Exchanges />}></Route>
            <Route
              exact
              path="/cryptocurrencies"
              element={<Cryptocurrencies />}
            ></Route>
            <Route
              exact
              path="/crypto/:coinId"
              element={<CryptoDetails />}
            ></Route>
            <Route exact path="/news" element={<News />}></Route>
          </Routes>
        </div>
      </Layout>
      <Footer />
    </div>
  );
}

export default Main;
