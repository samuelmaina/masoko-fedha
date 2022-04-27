import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HTMLReactParser from "html-react-parser";

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

import { LineChart } from "./index";

import { cryptoApi, localUtils } from "../services";

const { Title, Text } = Typography;
const { Option } = Select;
const { useGetCryptoDetailsQuery, useGetCoinHistoryQuery } = cryptoApi;
const { convertToKenyaShillings, displayAsKenyaShilling } = localUtils;

function CryptoDetails() {
  const { coinId } = useParams();

  const { data: cryptoDetailsData, isFetching: isFetchingCryptoDetails } =
    useGetCryptoDetailsQuery(coinId);

  const [timePeriod, setTimePeriod] = useState("7d");

  const { data: coinHistory, isFetching } = useGetCoinHistoryQuery({
    coinId,
    timePeriod,
  });

  const cryptoDetails = cryptoDetailsData?.data?.coin;

  if (isFetching || isFetchingCryptoDetails) return <div> Loading...</div>;

  return (
    <Col className="coin-detail-container">
      {renderHeaderInfo()}
      {renderTimePeriodSelector()}
      {coinHistory ? (
        <LineChart
          coinHistory={coinHistory}
          currentPrice={cryptoDetails.price}
          coinName={cryptoDetails.name}
        />
      ) : (
        <div>Loading </div>
      )}
      {renderStatsContainer()}
      {renderCoinInfo()}
    </Col>
  );

  function renderHeaderInfo() {
    return (
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} {cryptoDetails.slug ? cryptoDetails.slug : ""}
        </Title>
        <p>
          {cryptoDetails.name} live price in Kenya Shilings. View value
          statistics, market cap and supply.
        </p>
      </Col>
    );
  }

  function renderTimePeriodSelector() {
    const time = ["3h", "24h", "7d", "30d", "3m", "1y", "5y"];
    const defaultTime = "Select Time Period";
    return (
      <Select
        defaultValue={timePeriod}
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(period) => {
          if (period === defaultTime) return setTimePeriod("7d");
          setTimePeriod(period);
        }}
      >
        <Option value={defaultTime}>{defaultTime}</Option>
        {time.map((date, index) => (
          <Option key={index} value={date}>
            {date}
          </Option>
        ))}
      </Select>
    );
  }

  function renderStatsContainer() {
    return (
      <Col className="stats-container">
        {renderCoinStats()}
        {renderGlobalStats()}
      </Col>
    );
    function renderCoinStats() {
      const stats = [
        {
          title: "Price to Kenya Shilling",
          value: ` ${
            cryptoDetails?.price && displayAsKenyaShilling(cryptoDetails?.price)
          }`,
          icon: <DollarCircleOutlined />,
        },
        { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        {
          title: "24h Volume",
          value: `${
            cryptoDetails?.["24hVolume"] &&
            displayAsKenyaShilling(cryptoDetails?.["24hVolume"])
          }`,
          icon: <ThunderboltOutlined />,
        },
        {
          title: "Market Cap",
          value: `${
            cryptoDetails?.marketCap &&
            displayAsKenyaShilling(cryptoDetails?.marketCap)
          }`,
          icon: <DollarCircleOutlined />,
        },
        {
          title: "All-time-high(daily avg.)",
          value: `${
            cryptoDetails?.allTimeHigh?.price &&
            displayAsKenyaShilling(cryptoDetails.allTimeHigh.price)
          }`,
          icon: <TrophyOutlined />,
        },
      ];
      return (
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
      );
    }

    function renderGlobalStats() {
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
          value: `${
            cryptoDetails?.supply?.total &&
            displayAsKenyaShilling(cryptoDetails?.supply?.total)
          }`,
          icon: <ExclamationCircleOutlined />,
        },
        {
          title: "Circulating Supply",
          value: `${
            cryptoDetails?.supply?.circulating &&
            displayAsKenyaShilling(cryptoDetails?.supply?.circulating)
          }`,
          icon: <ExclamationCircleOutlined />,
        },
      ];
      return (
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
      );
    }
  }
  function renderCoinInfo() {
    return (
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
    );
  }
}

export default CryptoDetails;
