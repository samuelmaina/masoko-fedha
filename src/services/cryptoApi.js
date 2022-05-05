import { RAPID_KEY } from "../config";
import { createApi, RequestCreator } from "./utils";

const headers = {
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  "X-RapidAPI-Key": RAPID_KEY,
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const requester = new RequestCreator(headers);

const endpoints = {
  getCryptos: (count) => requester.createRequest(`/coins?limit=${count}`),
  getCryptoDetails: (coinId) => requester.createRequest(`/coin/${coinId}`),
  getCoinHistory: ({ coinId, timePeriod }) =>
    requester.createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
};

export const cryptoApi = createApi("cryptoApi", baseUrl, endpoints);

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCoinHistoryQuery,
} = cryptoApi;
