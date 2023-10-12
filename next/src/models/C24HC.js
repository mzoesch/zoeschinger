// Class should be used to communicate with the ReST-api

export class Model {
  availableHotelMockImgURLIndices = -1;

  constructor() {
    return;
  }

  toJSON() {
    return {};
  }

  async sendGETReqForTrendingOffers() {
    const apiEndpoint =
      process.env.PRIVATE_API_ENDPOINT + 'projects/c24hc/trending';

    const res = await fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  }

  async sendGETReqForAvailableHotelMockImageIndices() {
    const apiEndpoint =
      process.env.PRIVATE_API_ENDPOINT + 'projects/c24hc/img_details';

    const res = await fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  }

  async sendGETRegForOfferInformation(offerId) {
    const apiEndpoint =
      process.env.PRIVATE_API_ENDPOINT + 'projects/c24hc/offer/' + offerId;

    const res = await fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  }

  GetRandomHotelMockImgURL() {
    const random_index = Math.floor(
      Math.random() * this.availableHotelMockImgURLIndices
    );

    const apiEndpoint =
      process.env.PRIVATE_API_ENDPOINT + 'projects/c24hc/img/' + random_index;

    return apiEndpoint;
  }

  async TranslateBreakfastType(breakfastType) {
    const apiEndpoint =
      process.env.PRIVATE_API_ENDPOINT +
      'projects/c24hc/translate_meal_type/' +
      breakfastType;

    const res = await fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  }

  async sendGETReqForAirportCodeCities() {
    const apiEndpoint =
      process.env.PRIVATE_API_ENDPOINT + 'projects/c24hc/airport_codes_city';

    const res = await fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  }

  async sendGETReqForMealTypes() {
    const apiEndpoint =
      process.env.PRIVATE_API_ENDPOINT + 'projects/c24hc/meal_type_names';

    const res = await fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  }

  async sendGETReqForRoomTypes() {
    const apiEndpoint =
      process.env.PRIVATE_API_ENDPOINT + 'projects/c24hc/room_type_names';

    const res = await fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  }
}
