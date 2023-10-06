import styles from '@s/projects/c24hc/main.module.scss';
import text_styles from '@s/text/main.module.scss';

import { Model } from '@m/C24HC';

import { Components } from '@t/c24hc';
import Offer = Components.Schemas.Offer;

import { Check24Icon } from '@c/svg';

import { useState, useEffect } from 'react';

import { Rubik } from 'next/font/google';
const rubik = Rubik({ subsets: ['latin-ext'] });
import { Source_Code_Pro } from 'next/font/google';
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] });

const Demo = () => {
  const [model, _] = useState<Model>(new Model());
  const [offers, setOffers] = useState<Offer[]>([]);

  // region MISC

  const [updateDOM, setUpdateDOM] = useState(0);
  const handleUpdateDOM = () => {
    if (updateDOM == 1) {
      setUpdateDOM(0);

      return;
    }

    setUpdateDOM(1);
    return;
  };

  // endregion MISC

  async function loadTrendingOffers() {
    const offers: Offer[] = await model.sendGETReqForTrendingOffers();
    if (offers.length == 0) {
      console.error('No trending offers found.');
      return;
    }

    setOffers(offers);

    return;
  }

  useEffect(() => {
    loadTrendingOffers().catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <>
      <div className={rubik.className}>
        <div className={styles.nav}>
          <div>
            <a
              href='https://www.zoeschinger.com/projects/c24hc'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Check24Icon className={styles.logo} />
            </a>
          </div>
          <div className={styles.nav_title}>GenDev Autumn 2023</div>
        </div>
        <div className={styles.btn_area}></div>
        <h2>asdf</h2>
        <div className={styles.results_area}>
          {offers.map((offer: Offer) => (
            <div key={offer.id} className={styles.offer_container}>
              <h1 style={{ color: 'green' }}>hu</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Demo;
