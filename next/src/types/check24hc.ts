export type Unused = any;

export declare namespace Components {
  namespace Schemas {
    export interface Hotel {
      hotelid: number;
      hotelname: string;
      hotelstars: number;
    }

    export interface Offer {
      offerid: number;
      hotel: Hotel;
      countadults: number;
      countchildren: number;
      price: number;
      mealtype: string;
      oceanview: boolean;
      roomtype: string;
      outbounddeparturedatetime: string;
      outbounddepartureairport: string;
      outboundarrivaldatetime: string;
      outboundarrivalairport: string;
      inbounddeparturedatetime: string;
      inbounddepartureairport: string;
      inboundarrivaldatetime: string;
      inboundarrivalairport: string;

      detail: string;
    }

    namespace APIResponse {
      export interface Trending {
        offers: Offer[];
      }
      export interface AvailableHotelMockImageIndices {
        until: number;
      }
      export interface AirportCodeCity {
        cities: { [key: string]: string };
      }
      export interface MealTypeNames {
        mealtypes: { [key: string]: string };
      }
      export interface RoomTypeNames {
        roomtypes: { [key: string]: string };
      }
    }

    namespace Form {
      export interface Search {
        duration: number;
        earliestdeparturedate: string;
        latestreturndate: string;
        countadults: number;
        countchildren: number;
        departureairports: Array<string>;
      }
    }
  }
}

export declare namespace Paths {
  namespace GetTrendingOffers {
    namespace Parameters {
      export type duration = number;
    }
  }
}
