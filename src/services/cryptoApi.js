import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RAPID_KEY } from "../config";

const cryptoApiHeaders = {
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  "X-RapidAPI-Key": RAPID_KEY,
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery } = cryptoApi;
