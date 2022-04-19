import React from "react";

import { Link } from "react-router-dom";

import millify from "millify";

import { Typography, Row, Col, Statistic } from "antd";

import { cryptoApi } from "../services";

const { useGetCryptosQuery } = cryptoApi;

const { Title } = Typography;

function HomePage() {
  const { data, isFetching } = useGetCryptosQuery();

  const globalStats = data?.data?.stats;

  if (isFetching) return <div>Loading</div>;

  const cols = [
    { title: "Total CrypoCurrencies", value: globalStats.total },
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
    </>
  );
}

function renderColumns(cols) {
  return cols.map((col) => {
    const { title, value } = col;

    /**
     * the col has a span of 24 colums so 12 will take
     * have the width of the screen.
     */

    return (
      <Col span={12}>
        <Statistic title={title} value={value}></Statistic>
      </Col>
    );
  });
}

export default HomePage;
