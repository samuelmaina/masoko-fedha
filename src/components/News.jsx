import React from "react";

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
          <Card>
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
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default News;
