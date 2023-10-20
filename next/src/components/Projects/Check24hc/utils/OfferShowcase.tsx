import styles from '@s/projects/check24hc/offer_showcase.module.scss';

import { useState, useEffect } from 'react';

import Image from 'next/image';

import Link from 'next/link';

import { Components } from '@t/check24hc';
import Offer = Components.Schemas.Offer;

import { Model } from '@m/Check24hc';

const OfferShowcase = ({ offer, model }: { offer: Offer; model: Model }) => {
  const [breakfast, setBreakfast] = useState<string>('');

  // Just for debugging purposes; remove after finishing
  // offer.countadults = 4;
  // offer.countchildren = 5;

  const getDuration = (offer: Offer): number => {
    const start = new Date(offer.outbounddeparturedatetime);
    const end = new Date(offer.inboundarrivaldatetime);

    const diff = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const getBreakfast = async (offer: Offer): Promise<string> => {
    const res: string = await model.TranslateBreakfastType(offer.mealtype);
    if (res === 'NONE') return '';
    else return res.toLowerCase();
  };

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
    getBreakfast(offer).then((res: string) => setBreakfast(res));
  }, []);

  return (
    <Link
      href={{
        pathname: '/projects/demo/check24hc/search',
        query: { offerid: offer.offerid },
      }}
      style={{ textDecoration: 'none', color: 'inherit' }}
      className={styles.container}
    >
      <div className={styles.picture}>
        <Image
          loader={hotelMockImageLoader}
          src={'10'}
          fill={true}
          alt='hotel'
          sizes='(max-width: 768px) 100vw, 768px'
        />
      </div>
      <div className={styles.content}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <div className={styles.hotel_name}>{offer.hotel.hotelname}</div>
          <div className={styles.hotel_stars}>
            {Array.from(Array(offer.hotel.hotelstars), (_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
        </div>
        <div>
          {getDuration(offer)} days, {breakfast} incl. flight
        </div>
        <div className={styles.bottom_container}>
          {offer.countchildren > 0 ? (
            <div>
              {offer.countchildren}{' '}
              {offer.countchildren > 1 ? 'chldn.' : 'child'}
              {offer.countadults > 0 ? <span>, </span> : <></>}
            </div>
          ) : (
            <></>
          )}
          {offer.countadults > 0 ? (
            <div>
              {offer.countadults} {offer.countadults > 1 ? 'adults' : 'adult'}
            </div>
          ) : (
            <></>
          )}
          <div className={styles.price}>{offer.price} €</div>
        </div>
      </div>
    </Link>
  );
};

export default OfferShowcase;
