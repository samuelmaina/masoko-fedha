import React from "react";

import { Link } from "react-router-dom";

import millify from "millify";

import { Typography, Row, Col, Statistic } from "antd";

import { cryptoApi } from "../services";

import { Cryptocurrencies, News } from "./index";
const { useGetCryptosQuery } = cryptoApi;

const { Title } = Typography;

function HomePage() {
  const count = 10;
  const { data, isFetching } = useGetCryptosQuery(count);

  const globalStats = data?.data?.stats;

  if (isFetching) return <div>Loading...</div>;

  const cols = [
    { title: "Total CrypoCurrencies", value: millify(globalStats.total) },
    { title: "Total Exchanges", value: millify(globalStats.totalExchanges) },
    { title: "Total Market Cap", value: millify(globalStats.totalMarketCap) },
    { title: "Total 24hr Volume", value: millify(globalStats.total24hVolume) },
    { title: "Total Markets", value: millify(globalStats.totalMarkets) },
  ];
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>{renderColumns(cols)}</Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the World
        </Title>
        <Title level={4} className="show-more">
          <Link to="/cryptocurrencies"> Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={4} className="show-more">
          <Link to="/news"> Show more</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
}

function renderColumns(cols) {
  return cols.map((col, index) => {
    const { title, value } = col;

    /**
     * the col has a span of 24 colums so 12 will take
     * have the width of the screen.
     */

    return (
      <Col span={12}>
        <Statistic title={title} value={value} key={index}></Statistic>
      </Col>
    );
  });
}

export default HomePage;
