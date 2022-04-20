import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RAPID_KEY } from "../config";

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const headers = {
  "x-bingapis-sdk": "true",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
  "X-RapidAPI-Key": RAPID_KEY,
};

const createRequest = (url) => ({
  url,
  headers,
});

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
