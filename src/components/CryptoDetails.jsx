import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HTMLReactParser from "html-react-parser";

import { Typography, Col, Row } from "antd";

import { LineChart } from "./index";

import { cryptoApi } from "../services";
import { basics } from "./Natives";
import { stats } from "../data";

const { cryptoStats, genericStats } = stats;

const {
  createTitle,
  createColumn,
  createParagraph,
  createSelect,
  createOption,
  createText,
} = basics;

const { Title, Text } = Typography;

const { useGetCryptoDetailsQuery, useGetCoinHistoryQuery } = cryptoApi;

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

  return createColumn(
    <>
      {renderHeaderInfo()}
      {renderTimePeriodSelector()}
      {renderLineChart()}
      {renderStatsContainer()}
      {renderCoinInfo()}
    </>,
    "coin-detail-container"
  );

  function renderHeaderInfo() {
    return createColumn(
      <>
        {createTitle(
          2,
          `${cryptoDetails.name} ${
            cryptoDetails.slug ? cryptoDetails.slug : " "
          }`,
          "coin-name"
        )}
        {createParagraph(`${cryptoDetails.name} live price in Kenya Shilings. View value
        statistics, market cap and supply.`)}
      </>,
      "coin-heading-container"
    );
  }

  function renderTimePeriodSelector() {
    const time = ["3h", "24h", "7d", "30d", "3m", "1y", "5y"];
    const defaultTime = "Select Time Period";

    const onChange = (period) => {
      if (period === defaultTime) return setTimePeriod("7d");
      setTimePeriod(period);
    };

    return createSelect(
      <>
        {createOption(defaultTime)}
        {time.map((date, index) => createOption(date, index))}
      </>,
      "Select Time Period",
      onChange,
      timePeriod,
      "select-timeperiod"
    );
  }

  function renderLineChart() {
    return coinHistory ? (
      <LineChart
        coinHistory={coinHistory}
        currentPrice={cryptoDetails.price}
        coinName={cryptoDetails.name}
      />
    ) : (
      <div>Loading </div>
    );
  }

  function renderStatsContainer() {
    return createColumn(
      <>
        {renderCoinStats()}
        {renderGlobalStats()}
      </>,
      "stats-container"
    );
  }
  function renderCoinStats() {
    const stats = cryptoStats(cryptoDetails);
    return createColumn(
      createColumn(
        <>
          {createTitle(
            2,
            `${cryptoDetails.name} Value Statistics`,
            "coin-details-heading"
          )}
          {createParagraph(
            `An overview showing the stats of ${cryptoDetails.name}`
          )}

          {displayStats(stats)}
        </>,
        "coin-value-statistics-heading"
      ),
      "coin-value-statistics"
    );
  }

  function renderGlobalStats() {
    const stats = genericStats(cryptoDetails);

    return createColumn(
      createColumn(
        <>
          {createTitle(3, "Other Value Statistics", "coin-details-heading")}
          {createParagraph(
            "An overview showing the stats of all other cryptoCurrencies"
          )}

          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text key={1}>{icon}</Text>
                <Text key={2}>{title}</Text>
              </Col>
              {/* <Text className="stats">{value} </Text> */}
            </Col>
          ))}
        </>,
        "coin-value-statistics-heading"
      ),
      "other-stats-info"
    );
  }

  function displayStats(stats) {
    return stats.map(
      ({ icon, title, value }) =>
        createColumn(
          <>
            {createColumn(
              <>
                {createText(icon)}
                {createText(title)}
              </>,
              "coin-stats-name"
            )}
            {createText(value, "stats")}
          </>
        ),
      "coin-stats"
    );
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
