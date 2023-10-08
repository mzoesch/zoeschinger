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

  async function loadTrendingOffers() {
    model.sendGETReqForTrendingOffers().then((res: Offer[]) => {
      setOffers(res);
    });

    return;
  }

  useEffect(() => {
    loadTrendingOffers();
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
          {offers.map((t: Offer) => (
            <div key={t.id}>{t.id}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Demo;
