import React from "react";

import { Row, Col, Typography } from "antd";
import { Chart as Chartjs } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const { Title } = Typography;

function LineChart({ coinHistory, currentPrice, coinName }) {
  const coinPrices = [];
  const coinTimeStamps = [];

  const history = coinHistory?.data?.history;
  for (let i = history.length - 1; i >= 0; i--) {
    const { price, timestamp } = history[i];
    coinPrices.push(price);
    coinTimeStamps.push(new Date(timestamp * 1000).toLocaleDateString());
  }

  const data = {
    labels: coinTimeStamps,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrices,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
    title: `${coinName} Prices`,
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
}

export default LineChart;
