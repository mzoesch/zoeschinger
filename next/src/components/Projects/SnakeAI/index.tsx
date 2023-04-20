import styles from '@s/projects/snakeai/main.module.scss';
import text_styles from '@s/text/main.module.scss';
import basic_layout_styles from '@s/projects/basic_layout.module.scss';

import Link from 'next/link';

const SnakeAI = () => {
  return (
    <>
      <div className={basic_layout_styles.wrapper}>
        <div className={basic_layout_styles.main}>
          <div className={basic_layout_styles.top_wrapper}>
            <h1 className={text_styles.title}>Snake AI</h1>
            <div className={basic_layout_styles.top_information}>
              View source code{' '}
              <Link
                href='https://github.com/mzoesch/zoeschinger/tree/master/next/src/lib/projects'
                target='_blank'
                className={text_styles.link}
              >
                here
              </Link>
              .
            </div>
          </div>
          <div className={text_styles.text}>
            <div className={text_styles.paragraph}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium odit cupiditate blanditiis nesciunt, eligendi expedita
              laborum, similique, laboriosam ut in quod temporibus obcaecati.
              Commodi excepturi in accusamus architecto hic laboriosam a
              molestiae sint dolores totam voluptas tempore aliquam deserunt
              debitis atque vitae consequuntur molestias beatae, placeat
              voluptate quaerat deleniti sit! Perspiciatis beatae sapiente ad
              optio. Culpa obcaecati consequatur voluptatum iure mollitia
              dolorem repudiandae, provident perspiciatis laborum asperiores
              fugit sit temporibus explicabo dolores sint? Quam commodi deserunt
              magnam saepe? Quod aliquid quis nulla quia fuga. Tempora accusamus
              natus obcaecati animi? Explicabo laborum accusamus assumenda
              pariatur consequuntur. Distinctio fugiat architecto, asperiores
              rerum consequuntur at voluptas fuga delectus a ea itaque est
              nostrum maxime odio deleniti doloribus, vel accusamus accusantium
              ipsam animi ratione magnam minima ullam? Consequatur corrupti
              facere ad laborum quos expedita aspernatur aliquid quo illo at,
              amet reiciendis similique rem, deserunt ab quidem beatae
              asperiores iusto adipisci, non cupiditate nam unde.
            </div>
          </div>
          <div>
            <h2 className={text_styles.subtitle}>Playable version</h2>
            <div className={text_styles.text}>
              <div className={text_styles.paragraph}>
                This is a playable version from snake. No AI and other stuff.
              </div>
              <div className={text_styles.paragraph}>
                Check it out{' '}
                <Link
                  href='/projects/demo/snakeai-playable'
                  target='_blank'
                  className={text_styles.link}
                >
                  here
                </Link>
                .
              </div>
            </div>
          </div>
          <div>
            <h2 className={text_styles.subtitle}>AI version</h2>
            <div className={text_styles.text}>
              <div className={text_styles.paragraph}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                provident distinctio aperiam omnis blanditiis et nam saepe
                perferendis quaerat! Ipsum nisi sint tempore. Dolorem odio ad
                deserunt cupiditate asperiores nulla, in aspernatur quo. Cumque
                esse impedit sed illum assumenda accusantium cupiditate odio aut
                vero laborum numquam porro minima eveniet ab libero, maxime,
                molestias eius repudiandae eum consequatur, soluta iste nisi
                excepturi. Quidem in enim impedit a nostrum harum animi, ut,
                illo alias similique culpa atque maxime? Totam assumenda
                numquam, modi perspiciatis a tenetur, dignissimos, dolor facilis
                inventore sunt odio delectus doloribus. Doloribus fuga, eum
                ipsam reprehenderit alias iste praesentium magnam vitae neque
                vero possimus labore dolores, optio est minus, quia sit
                asperiores exercitationem delectus commodi repudiandae veniam?
                Tenetur aut vero atque iste sunt quia? Atque, quod ducimus?
                Recusandae rerum nesciunt assumenda ducimus laudantium saepe
                enim id ipsam quo modi. Repellat illo, nostrum incidunt, autem
                rem culpa minus, cumque ratione sit fugiat asperiores
                recusandae. Corporis tenetur dolores nulla nesciunt rem officiis
                sunt placeat numquam nisi cum perspiciatis qui tempore ullam
                consectetur voluptatem quasi non temporibus id quidem, tempora
                recusandae atque pariatur? Adipisci fugit impedit sapiente
                officiis facilis, quas cum consectetur rerum, tenetur quod quos
                nobis nostrum enim totam optio eaque velit!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SnakeAI;
