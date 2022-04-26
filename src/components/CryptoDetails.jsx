import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { cryptoApi } from "../services";

import millify from "millify";

import { Typography, Col, Row, Select } from "antd";

import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import HTMLReactParser from "html-react-parser";

const { Title, Text } = Typography;
const { Option } = Select;
const { useGetCryptoDetailsQuery } = cryptoApi;

function CryptoDetails() {
  const { coinId } = useParams();

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

  const [timePeriod, setTimePeriod] = useState("7d");

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <div> Loading...</div>;

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} {cryptoDetails.slug ? cryptoDetails.slug : ""}
        </Title>
        <p>
          {cryptoDetails.name} live price in US dollars. View value statistics,
          market cap and
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(period) => setTimePeriod(period)}
      >
        {time.map((date, index) => (
          <Option key={index}>{date}</Option>
        ))}
      </Select>
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Value Statistics
            </Title>
            <p> An overview showing the stats of {cryptoDetails.name}</p>
            {stats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text key={1}>{icon}</Text>
                  <Text key={2}>{title}</Text>
                </Col>
                <Text className="stats">{value} </Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Value Statistics
            </Title>
            <p> An overview showing the stats of all other cryptoCurrencies</p>
            {genericStats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text key={1}>{icon}</Text>
                  <Text key={2}>{title}</Text>
                </Col>
                <Text className="stats">{value} </Text>
              </Col>
            ))}
          </Col>
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}
            {HTMLReactParser(cryptoDetails.description)}
          </Title>
        </Row>
        <Row>
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Links
            </Title>
            {cryptoDetails.links.map((link, index) => (
              <Row className="coin-link" key={index}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            ))}
          </Col>
        </Row>
      </Col>
    </Col>
  );
}

export default CryptoDetails;
