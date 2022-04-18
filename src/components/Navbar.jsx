import React from "react";

import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";

import {
  HomeOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  BuildOutlined,
} from "@ant-design/icons";
import { logo } from "../images";

const Navbar = () => {
  return (
    <div className="nav-container">
      {renderLogo()}
      {renderMenu()}
    </div>
  );
};

function renderLogo() {
  return (
    <div className="logo-container">
      <Avatar src={logo} size="large" />
      <Typography.Title level={2} className="logo">
        <Link to="/">Cryptoverse</Link>
      </Typography.Title>
    </div>
  );
}

function renderMenu() {
  const menuItems = [
    { Icon: HomeOutlined, to: "/", displayText: "Home" },
    {
      Icon: FundOutlined,
      to: "/cryptocurrencies",
      displayText: "Cryptocurrencies",
    },
    { Icon: MoneyCollectOutlined, to: "/exchanges", displayText: "Exchanges" },
    { Icon: BuildOutlined, to: "/news", displayText: "News" },
  ];

  return (
    <Menu theme="dark">
      {menuItems.map((item, index) => {
        const { Icon, to, displayText } = item;
        return (
          <Menu.Item icon={<Icon />} key={index}>
            <Link to={to}> {displayText}</Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
}

export default Navbar;
