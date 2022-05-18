import {
  createApi as creator,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

function createApi(reducerPath, baseUrl, endpoints) {
  return creator({
    reducerPath,
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: constructEndPointsObject(endpoints),
  });
}

function constructEndPointsObject(endpoints) {
  return (builder) => {
    const result = {};
    for (const endpoint in endpoints) {
      result[endpoint] = builder.query({
        query: endpoints[endpoint],
      });
    }
    return result;
  };
}

class RequestCreator {
  constructor(headers) {
    this.headers = headers;
  }

  createRequest(url) {
    return {
      url,
      headers: this.headers,
    };
  }
}

export { createApi, RequestCreator };
