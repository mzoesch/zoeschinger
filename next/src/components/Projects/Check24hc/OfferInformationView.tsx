'use client';

import styles from '@s/projects/check24hc/main.module.scss';
import more_styles from '@s/projects/check24hc/search_offer.module.scss';
import text_styles from '@s/text/main.module.scss';
import btn_styles from '@s/buttons/main.module.scss';

import { Model } from '@m/Check24hc';

import { Components } from '@t/check24hc';
import Offer = Components.Schemas.Offer;

import { Check24Icon } from '@c/svg';

import { PiAirplaneTakeoffLight, PiAirplaneLandingLight } from 'react-icons/pi';
import { IoAirplaneSharp } from 'react-icons/io5';
import { GiKnifeFork } from 'react-icons/gi';
import { IoBed } from 'react-icons/io5';
import { BsCheck } from 'react-icons/bs';

import { useState, useEffect } from 'react';

import { Rubik } from 'next/font/google';
const rubik = Rubik({ subsets: ['latin-ext'] });
import { Source_Code_Pro } from 'next/font/google';
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] });

import { useRouter } from 'next/router';
import { GetCurrentRoute } from '@l/Routes';

import Image from 'next/image';

import OfferShowcase from './utils/OfferShowcase';

const Demo = () => {
  const route: string = GetCurrentRoute();
  const [model, _] = useState<Model>(new Model());
  const [offer, setOffer] = useState<Offer>();
  const [airportCodesCity, setAirportCodesCity] =
    useState<Components.Schemas.APIResponse.AirportCodeCity>();
  const [mealTypeNames, setMealTypeNames] =
    useState<Components.Schemas.APIResponse.MealTypeNames>();
  const [roomTypeNames, setRoomTypeNames] =
    useState<Components.Schemas.APIResponse.RoomTypeNames>();
  const [moreOffers, setMoreOffers] = useState<Offer[]>([]);

  const hotelMockImageLoader = ({
    src,
    width,
    quality,
  }: {
    src?: string;
    width?: number;
    quality?: number;
  }) => {
    const api: string = model.GetRandomHotelMockImgURL();

    return api;
  };

  useEffect(() => {
    const loadDefault = async (offerid: number) => {
      const loadOfferInformation = async (offerid: number) => {
        const res: Offer = await model.sendGETRegForOfferInformation(offerid);
        setOffer((prev) => res);

        return;
      };

      await loadOfferInformation(offerid);

      return;
    };

    if (route.startsWith('/projects/demo/check24hc/search')) {
      const offerid: number = parseInt(
        route.split('?offerid=')[1].split('&')[0]
      );
      loadDefault(offerid);

      return;
    }

    return;
  }, [route]);

  async function storeAvailableHotelMockImageIndices() {
    model
      .sendGETReqForAvailableHotelMockImageIndices()
      .then(
        (
          res: Components.Schemas.APIResponse.AvailableHotelMockImageIndices
        ) => {
          model.availableHotelMockImgURLIndices = res.until;
        }
      );

    return;
  }

  async function getAirportCodesCity() {
    model
      .sendGETReqForAirportCodeCities()
      .then((res: Components.Schemas.APIResponse.AirportCodeCity) => {
        setAirportCodesCity((prev) => res);
      });
  }

  async function getMealTypeNames() {
    model
      .sendGETReqForMealTypes()
      .then((res: Components.Schemas.APIResponse.MealTypeNames) => {
        setMealTypeNames((prev) => res);
      });
  }

  async function getRoomTypeNames() {
    model
      .sendGETReqForRoomTypes()
      .then((res: Components.Schemas.APIResponse.RoomTypeNames) => {
        setRoomTypeNames((prev) => res);
      });
  }

  async function loadMoreOffersImpl() {
    model
      .sendRequestForMatchingHotel(offer?.hotel.hotelname)
      .then((res: Components.Schemas.APIResponse.Trending) => {
        setMoreOffers((prev) => res.offers);
      });
  }

  async function loadMoreOffers() {
    await storeAvailableHotelMockImageIndices();
    loadMoreOffersImpl();
  }

  useEffect(() => {
    loadMoreOffers();
  }, [offer]);

  useEffect(() => {
    loadMoreOffers();
    getAirportCodesCity();
    getMealTypeNames();
    getRoomTypeNames();
  }, []);

  const convertDateToYear = (date: string): string => {
    const dateObj: Date = new Date(date);
    const day: string =
      dateObj.getDate().toString() +
      '.' +
      dateObj.getMonth().toString() +
      '.' +
      dateObj.getFullYear().toString();

    return day;
  };

  const convertDateToTime = (date: string): string => {
    const dateObj: Date = new Date(date);
    let h: string = dateObj.getHours().toString();
    let m: string = dateObj.getMinutes().toString();

    if (h.length < 2) h = '0' + h;
    if (m.length < 2) m = '0' + m;

    const time: string = h + ':' + m;

    return time;
  };

  const getDurationInHM = (start: string, end: string): string => {
    const startDate: Date = new Date(start);
    const endDate: Date = new Date(end);

    const diff = Math.abs(endDate.getTime() - startDate.getTime());

    const hours = Math.ceil(diff / (1000 * 60 * 60));
    const minutes = Math.ceil((diff / 1000 / 60) % 60);

    return hours.toString() + 'h ' + minutes.toString() + 'm';
  };

  const getDuration = (start: string, end: string): number => {
    const startDate: Date = new Date(start);
    const endDate: Date = new Date(end);

    const diff = Math.abs(endDate.getTime() - startDate.getTime());
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <>
      <div className={rubik.className}>
        <div className={styles.nav}>
          <div>
            <a
              href='https://www.zoeschinger.com/projects/demo/check24hc'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Check24Icon className={styles.logo} />
            </a>
          </div>
          <div className={styles.nav_title}>GenDev Autumn 2023</div>
        </div>
        {offer ? (
          offer.detail ? (
            <div>{offer.detail}</div>
          ) : (
            <div
              className={more_styles.container}
              //   style={{ height: '100vh', backgroundColor: 'red' }}
            >
              <div style={{ backgroundColor: 'lightgrey', padding: '1rem' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <div className={more_styles.hotelname}>
                    {offer.hotel.hotelname}
                  </div>
                  <div className={more_styles.hotel_rating}>
                    {Array.from(Array(offer.hotel.hotelstars), (_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
                <div
                  style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}
                >
                  <div className={more_styles.picture}>
                    <Image
                      loader={hotelMockImageLoader}
                      src={'10'}
                      width={300}
                      height={300}
                      alt='hotel'
                    />
                  </div>
                  <div
                    style={{
                      backgroundColor: 'white',
                      flex: '1',
                      position: 'relative',
                      padding: '1rem',
                    }}
                  >
                    <div className={more_styles.top}>
                      <div>
                        <div>
                          {' '}
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '0.5rem',
                              alignItems: 'center',
                            }}
                          >
                            <IoAirplaneSharp
                              style={{
                                fontSize: '1.3rem',
                              }}
                            />{' '}
                            {convertDateToYear(offer.outbounddeparturedatetime)}
                          </div>
                          <div
                            style={{
                              position: 'relative',
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: '0.75rem',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div>
                                {convertDateToTime(
                                  offer.outbounddeparturedatetime
                                )}
                              </div>
                              <div>
                                {convertDateToTime(
                                  offer.outboundarrivaldatetime
                                )}
                              </div>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                              }}
                            >
                              <div className={more_styles.dot}>
                                <div
                                  style={{
                                    marginLeft: '1.75rem',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {airportCodesCity?.cities &&
                                    airportCodesCity.cities[
                                      offer?.outbounddepartureairport
                                    ]}
                                  {' ('}
                                  {offer.outbounddepartureairport}
                                  {')'}
                                </div>
                              </div>
                              <div className={more_styles.dot_connection}>
                                <div className={more_styles.flight_time}>
                                  {getDurationInHM(
                                    offer.outbounddeparturedatetime,
                                    offer.outboundarrivaldatetime
                                  )}
                                </div>
                              </div>
                              <div className={more_styles.dot}>
                                <div
                                  style={{
                                    marginLeft: '1.75rem',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {airportCodesCity?.cities &&
                                    airportCodesCity.cities[
                                      offer?.outboundarrivalairport
                                    ]}
                                  {' ('}
                                  {offer.outboundarrivalairport}
                                  {')'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{ marginTop: '2rem' }}>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '0.5rem',
                              alignItems: 'center',
                            }}
                          >
                            <IoAirplaneSharp
                              style={{
                                fontSize: '1.3rem',
                                rotate: '180deg',
                              }}
                            />{' '}
                            {convertDateToYear(offer.inbounddeparturedatetime)}
                          </div>
                          <div
                            style={{
                              position: 'relative',
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: '0.75rem',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div>
                                {convertDateToTime(
                                  offer.inbounddeparturedatetime
                                )}
                              </div>
                              <div>
                                {convertDateToTime(
                                  offer.inboundarrivaldatetime
                                )}
                              </div>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                              }}
                            >
                              <div className={more_styles.dot}>
                                <div
                                  style={{
                                    marginLeft: '1.75rem',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {airportCodesCity?.cities &&
                                    airportCodesCity.cities[
                                      offer?.inbounddepartureairport
                                    ]}
                                  {' ('}
                                  {offer.inbounddepartureairport}
                                  {')'}
                                </div>
                              </div>
                              <div className={more_styles.dot_connection}>
                                <div className={more_styles.flight_time}>
                                  {getDurationInHM(
                                    offer.inbounddeparturedatetime,
                                    offer.inboundarrivaldatetime
                                  )}
                                </div>
                              </div>
                              <div className={more_styles.dot}>
                                <div
                                  style={{
                                    marginLeft: '1.75rem',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {airportCodesCity?.cities &&
                                    airportCodesCity.cities[
                                      offer?.inboundarrivalairport
                                    ]}
                                  {' ('}
                                  {offer.inboundarrivalairport}
                                  {')'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={more_styles.side_information}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontSize: '1.6rem',
                            fontWeight: '500',
                          }}
                        >
                          {getDuration(
                            offer.outbounddeparturedatetime,
                            offer.inboundarrivaldatetime
                          )}{' '}
                          Days only
                          <div className={more_styles.price}>
                            €{offer.price}
                          </div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '0.5rem',
                            alignItems: 'center',
                            marginTop: offer.oceanview ? '5rem' : '6.5rem',
                          }}
                        >
                          <GiKnifeFork
                            style={{
                              fontSize: '1.3rem',
                            }}
                          />
                          {mealTypeNames?.mealtypes ? (
                            <>{mealTypeNames.mealtypes[offer.mealtype]}</>
                          ) : (
                            <>{offer.mealtype}</>
                          )}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '0.5rem',
                            alignItems: 'center',
                            marginTop: '0.5rem',
                          }}
                        >
                          <IoBed
                            style={{
                              fontSize: '1.3rem',
                            }}
                          />
                          {roomTypeNames?.roomtypes ? (
                            <>{roomTypeNames.roomtypes[offer.roomtype]}</>
                          ) : (
                            <>{offer.roomtype}</>
                          )}
                        </div>
                        {offer.oceanview ? (
                          <>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '0.5rem',
                                alignItems: 'center',
                                marginTop: '0.5rem',
                              }}
                            >
                              <BsCheck
                                style={{
                                  fontSize: '1.3rem',
                                }}
                              />
                              Oceanview
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                        <div
                          style={{
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'center',
                            marginTop: '0.5rem',
                          }}
                        >
                          {offer.countadults} Adults
                          <div className={more_styles.vertical_line}></div>
                          {offer.countchildren} Children
                        </div>
                      </div>
                    </div>
                    <div className={more_styles.footer}>
                      <div></div>
                      <div
                        className={btn_styles.primary}
                        style={{
                          minWidth: '10rem',
                          minHeight: '2rem',
                          fontSize: '1.3rem',
                        }}
                      >
                        BOOK
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h2>More offers from {offer.hotel.hotelname}:</h2>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {moreOffers === undefined || moreOffers!.length === 0 ? (
                  <h3>Loading more offers of your hotel . . .</h3>
                ) : (
                  <div className={styles.results_area}>
                    {moreOffers.map((offer: Offer) => (
                      <OfferShowcase
                        offer={offer}
                        model={model}
                        key={offer.offerid}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        ) : (
          <h1>Loading your offer. Please be patient . . </h1>
        )}
      </div>
    </>
  );
};

export default Demo;
