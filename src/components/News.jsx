import React, { useState } from "react";

import moment from "moment";

import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import { cryptoNewsApi, cryptoApi } from "../services";

const { useGetCryptoNewsQuery } = cryptoNewsApi;

const { useGetCryptosQuery } = cryptoApi;

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.KGwVXyV6CervtpnzPeXcMy&pid=News";

function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  const { data } = useGetCryptosQuery(100);

  if (isFetching) return <div> Fetching the news</div>;
  if (!cryptoNews?.value) return <div> Loading...</div>;

  return (
    <Row gutter={[24, 24]}>
      {renderNewsForSpecificCurrency()}

      {cryptoNews.value.map((news, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          {renderNewsCard(news)}
        </Col>
      ))}
    </Row>
  );

  function renderNewsForSpecificCurrency() {
    return (
      !simplified && (
        <Col span={24}>
          <Select
            className="select-news"
            placeholder="Select Crypto to show news for"
            optionFilterProp="children"
            onChange={(value) => {
              if (value === "All") {
                return setNewsCategory("Cryptocurrency");
              }
              setNewsCategory(value);
            }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) > 0
            }
          >
            <Option value="All"> All Cryptocurrencies</Option>
            {data?.data?.coins.map((coin, index) => (
              <Option value={coin.name} key={index}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )
    );
  }
}

function renderNewsCard(news) {
  return (
    <Card hoverable>
      <a href={news.url} target="_blank" rel="noreferrer">
        <div className="news-image-container">
          <Title level={4} className="news-title">
            {news.name}
          </Title>
          <img
            styles={
              //to avoid overflow of the images
              {
                maxHeight: "100px",
                maxWidth: "200px",
              }
            }
            src={news?.image?.thumbnail?.contentUrl || demoImage}
            alt="News"
          />
        </div>
        {renderFirst100CharacterOfNews(news)}
        {renderProviderInfo(news)}
      </a>
    </Card>
  );
}

function renderFirst100CharacterOfNews(news) {
  return (
    <p style={{ color: "black" }}>
      {news.description > 100
        ? `${news.description.substring(0, 100)}...`
        : news.description}
    </p>
  );
}

function renderProviderInfo(news) {
  return (
    <div>
      <Avatar
        src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
        alt="news"
        style={{ marginRight: "6px" }}
      />
      <Text>{moment(news.datePublished).startOf("ss").fromNow()}</Text>
    </div>
  );
}

export default News;
