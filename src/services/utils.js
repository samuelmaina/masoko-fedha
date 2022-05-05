function constructEndPoints(endpoints) {
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

export { constructEndPoints, RequestCreator };
