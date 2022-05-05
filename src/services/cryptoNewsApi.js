import { createApi, RequestCreator } from "./utils";
import { RAPID_KEY } from "../config";

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const headers = {
  "x-bingapis-sdk": "true",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  "X-RapidAPI-Key": RAPID_KEY,
};

const requester = new RequestCreator(headers);

const endpoints = {
  getCryptoNews: ({ newsCategory, count }) =>
    requester.createRequest(
      `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
    ),
};

export const cryptoNewsApi = createApi("cryptoNewsApi", baseUrl, endpoints);

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
