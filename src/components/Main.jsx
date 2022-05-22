import React from "react";

import { Layout } from "antd";

import { Footer, Routes } from "./index";

function Main() {
  return (
    <div className="main">
      <Routes />
      <Footer />
    </div>
  );
}

export default Main;
