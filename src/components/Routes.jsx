import React from "react";

function Routes() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />}></Route>
      <Route exact path="/exchanges" element={<Exchanges />}></Route>
      <Route
        exact
        path="/cryptocurrencies"
        element={<Cryptocurrencies />}
      ></Route>
      <Route exact path="/crypto/:coinId" element={<CryptoDetails />}></Route>
      <Route exact path="/news" element={<News />}></Route>
    </Routes>
  );
}

export default Routes;
