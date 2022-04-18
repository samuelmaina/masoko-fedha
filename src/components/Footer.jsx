import React from "react";
import { Typography } from "antd";

function Footer() {
  return (
    <Typography.Title level={5} style={{ color: "white" }}>
      Crypoverse <br />
      All Right reserved @ {new Date().getFullYear()}
    </Typography.Title>
  );
}

export default Footer;
