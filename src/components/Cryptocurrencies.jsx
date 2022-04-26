import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import millify from "millify";

import { Card, Row, Col, Input } from "antd";

import { cryptoApi } from "../services";

const { useGetCryptosQuery } = cryptoApi;

function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;

  //all these can't not be put inside the try catch
  //block(They can't be rendered conditionally.I.e they won't be rendered from the )
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => {
      return coin.name.toLowerCase().includes(searchTerm);
    });
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <div> Loading...</div>;

  try {
    return (
      <>
        {renderSearchBar()}
        {cryptos ? (
          <Row gutter={[32, 32]} className="crypto-card-container">
            {renderCryptos(cryptos)}
          </Row>
        ) : (
          <div> Nothing to show </div>
        )}
      </>
    );
  } catch (error) {
    return <div> An Error Occurred in the application</div>;
  }
  function renderSearchBar() {
    return (
      <div className="search-crypto">
        <Input
          placeholder="Search Cryptocurrency"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    );
  }
}

function renderCryptos(cryptos) {
  return cryptos?.map((currency) => {
    return (
      <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
        <Link to={`/crypto/${currency.uuid}`}>
          <Card
            hoverable
            title={`${currency.rank}, ${currency.name}`}
            extra={
              <img
                alt="Cryto Icon"
                className="crypto-image"
                src={currency.iconUrl}
              />
            }
          >
            <p> Price : {millify(currency.price)}</p>
            <p> Market Cap : {millify(currency.marketCap)}</p>
            <p> Daily Change : {millify(currency.change)} %</p>
          </Card>
        </Link>
      </Col>
    );
  });
}

export default Cryptocurrencies;
