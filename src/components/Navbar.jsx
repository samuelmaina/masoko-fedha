import React, { useState, useEffect } from "react";

import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";

import {
  HomeOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  BuildOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { logo } from "../images";

const Navbar = () => {
  const [shouldRenderMenu, setShouldRenderMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(changeScreenSize, []);

  useEffect(decideToRender, [screenSize]);

  return (
    <div className="navbar">
      <div className="nav-container">
        {renderLogo()}
        {dropDownButton()}
        {shouldRenderMenu && renderMenu()}
      </div>
    </div>
  );

  function changeScreenSize() {
    const handleSize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleSize);
    handleSize();
    return () => window.removeEventListener("resize", handleSize);
  }

  function decideToRender() {
    if (screenSize < 786) setShouldRenderMenu(false);
    else setShouldRenderMenu(true);
  }

  function dropDownButton() {
    return (
      <Button
        className="menu-control-container"
        onClick={() => {
          setShouldRenderMenu(!shouldRenderMenu);
        }}
      >
        <MenuOutlined />
      </Button>
    );
  }
};

function renderLogo() {
  return (
    <div className="logo-container">
      <Avatar src={logo} size="large" />
      <Typography.Title level={3} className="logo">
        <Link to="/">Masoko Fedha</Link>
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
    { Icon: BuildOutlined, to: "/news", displayText: "News" },
    { Icon: MoneyCollectOutlined, to: "/exchanges", displayText: "Exchanges" },
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
