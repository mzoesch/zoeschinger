export type Unused = any;

declare namespace Components {
  declare namespace Schemas {
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
    declare namespace APIResponse {
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
  }
}

declare namespace Paths {
  declare namespace GetTrendingOffers {
    namespace Parameters {
      export type duration = number;
    }
  }
}
