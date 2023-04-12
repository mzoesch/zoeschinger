import styles from '@s/dashboard/main.module.scss';
import text_styles from '@s/text/main.module.scss';

export interface IProps {
  desktop: boolean;
}

const Content = (props: IProps) => {
  return (
    <>
      <div
        style={
          props.desktop
            ? { color: 'white' }
            : { color: 'rgb(var(--primary-negativ) / 100%)' }
        }
      >
        <div className={text_styles.paragraph}>content tbd</div>
        <div className={text_styles.paragraph}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque minima
          perspiciatis minus asperiores ipsam explicabo ad non distinctio
          adipisci ullam error, cumque nihil eos sit facilis similique optio
          beatae ab, dolore reiciendis! Debitis velit dolores quam, eveniet
          dolore laboriosam quod minima iure, aliquam aperiam, laborum suscipit
          quidem labore deleniti provident cum nobis modi dolorum repellat
          deserunt iusto ipsam mollitia. Modi vero error molestiae labore quos
          explicabo itaque? Pariatur adipisci possimus, itaque magni sint vitae
          incidunt tenetur, voluptatum illum nam recusandae odit sit?
          Distinctio, nulla? Quos voluptas quo facilis pariatur accusantium
          assumenda error nemo commodi expedita in consequatur fuga, quae ipsam
          inventore doloribus ea placeat, praesentium temporibus fugit aliquid
          atque beatae? Dolore at quibusdam magni cumque illo aliquid quis,
          debitis numquam odit laboriosam delectus maiores voluptatem inventore.
          Voluptate esse sapiente, nihil omnis, impedit non velit repellat odio
          a soluta nisi! Aut unde hic quis corporis commodi pariatur velit
          eligendi voluptatem. Ipsum.
        </div>
      </div>
    </>
  );
};

export default Content;
