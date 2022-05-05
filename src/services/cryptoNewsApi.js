import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RAPID_KEY } from "../config";
import { constructEndPoints, RequestCreator } from "./utils";

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

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: constructEndPoints(endpoints),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
