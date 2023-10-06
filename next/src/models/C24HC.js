// Class should be used to communicate with the ReST-api

export class Model {
  constructor() {
    return;
  }

  toJSON() {
    return {};
  }

  async sendGETReqForTrendingOffers() {
    const apiEndpoint =
      process.env.PRIVATE_API_ENDPOINT + 'projects/c24hc/trendingOffers';

    const res = await fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  }
}
