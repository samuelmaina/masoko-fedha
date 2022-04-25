import React from "react";

import moment from "moment";

import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import { cryptoNewsApi } from "../services";

const { useGetCryptoNewsQuery } = cryptoNewsApi;

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.KGwVXyV6CervtpnzPeXcMy&pid=News";
function News({ simplified }) {
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency ",
    count: simplified ? 6 : 12,
  });

  if (isFetching) return <div> Fetching the news</div>;
  if (!cryptoNews?.value) return <div> Loading...</div>;

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews.value.map((news, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title level={4} className="news-title">
                  {news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="News"
                />
              </div>
              {renderFirst100CharacterOfNews(news)}
              {renderProviderInfo(news)}
            </a>
          </Card>
        </Col>
      ))}
    </Row>
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
