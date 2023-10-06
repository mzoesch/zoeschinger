export type Unused = any;

declare namespace Components {
  declare namespace Schemas {
    export interface Offer {
      id: number;
      price: number;
    }
  }
}

declare namespace Paths {
  declare namespace GetTrendingOffers {
    namespace Parameters {
      export type duration = number;
    }

    export interface QueryParameters {
      duration: Parameters.duration;
    }
  }
}
