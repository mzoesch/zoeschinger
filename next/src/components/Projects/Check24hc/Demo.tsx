import styles from '@s/projects/check24hc/main.module.scss';
import text_styles from '@s/text/main.module.scss';

import { Model } from '@m/Check24hc';

import { Components } from '@t/check24hc';
import Offer = Components.Schemas.Offer;
import SearchForm = Components.Schemas.Form.Search;
import { Check24Icon } from '@c/svg';

import { useState, useEffect } from 'react';

import { Rubik } from 'next/font/google';
const rubik = Rubik({ subsets: ['latin-ext'] });
import { Source_Code_Pro } from 'next/font/google';
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] });

import OfferShowcase from './utils/OfferShowcase';
import Form from './utils/Form';

const Demo = () => {
  const [model, _] = useState<Model>(new Model());
  const [offers, setOffers] = useState<Offer[]>([]);

  async function onSubmitSearchForm(params: SearchForm) {
    model
      .sendRequestForMatchingOffers(
        params.duration,
        params.earliestdeparturedate,
        params.latestreturndate,
        params.countadults,
        params.countchildren,
        params.departureairports
      )
      .then((res: Components.Schemas.APIResponse.Trending) => {
        setOffers((prev) => res.offers);
      });

    return;
  }

  async function loadTrendingOffers() {
    model
      .sendGETReqForTrendingOffers()
      .then((res: Components.Schemas.APIResponse.Trending) => {
        setOffers((prev) => res.offers);
      });

    return;
  }

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

  async function loadDefault() {
    await storeAvailableHotelMockImageIndices();
    loadTrendingOffers();
  }

  useEffect(() => {
    loadDefault();
  }, []);

  return (
    <>
      <div className={rubik.className}>
        <div className={styles.nav}>
          <div>
            <a
              href='https://www.zoeschinger.com/projects/check24hc'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Check24Icon className={styles.logo} />
            </a>
          </div>
          <div className={styles.nav_title}>GenDev Autumn 2023</div>
        </div>
        <div className={styles.main}>
          <div className={styles.btn_area}>
            <Form submitCallback={onSubmitSearchForm} model={model} />
          </div>
          <h2 className={styles.offers_title}>Our best offers:</h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div className={styles.results_area}>
              {offers.map((offer: Offer) => (
                <OfferShowcase
                  offer={offer}
                  model={model}
                  key={offer.offerid}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Demo;
