import React from "react";
import { Link } from "react-router-dom";
import { Typography, Space } from "antd";

function Footer() {
  return (
    <div className="footer">
      <Typography.Title
        level={5}
        style={{ color: "white", textAlign: "center" }}
      >
        Cryptoverse
        <br />
        All rights reserved @ {new Date().getFullYear()}
      </Typography.Title>
      <Space>
        <Link to="/"> Home</Link>
        <Link to="/exchanges"> Exchanges</Link>
        <Link to="/news"> News</Link>
      </Space>
    </div>
  );
}

export default Footer;
