import { apiPath, serverPath } from "@/utils/server";
import styles from "./page.module.scss";
import Image from "next/image";
import Categories from "@/components/Categories";

const ItemPage = async ({ params }: any) => {
  const response = await fetch(`${apiPath}/items/${params?.id}`);
  const data = await response.json();
  const item = data.item;

  return item ? (
    <>
      <Categories categories={data.categories} />
      <div className={styles.itemLayout}>
        <section className={styles.itemBody}>
          <div className={styles.itemImage}>
            <Image
              src={serverPath + "/images/" + item.picture}
              width={680}
              height={680}
              sizes="100vw"
              alt={"Picture of " + item.title}
            />
          </div>
          <div className={styles.itemData}>
            <div className={styles.itemDataStatus}>
              {item.condition} - {item.sold_quantity} vendidos
            </div>
            <div className={styles.itemDataTitle}>{item.title}</div>
            <div className={styles.itemDataPrice}>
              {item?.price.currency +
                " " +
                item?.price.amount.toLocaleString("es-AR") +
                "," +
                item?.price.decimals}
            </div>
            <button className={styles.itemDataButton}>Comprar</button>
          </div>
        </section>
        <section className={styles.itemFooter}>
          <div className={styles.itemFooterTitle}>Descripción del producto</div>
          <div className={styles.itemFooterDescription}>{item.description}</div>
        </section>
      </div>
    </>
  ) : (
    <div>El producto no existe</div>
  );
};

export default ItemPage;

export async function generateMetadata({ params }: any) {
  /**
   * FIXME
   * I tried to use Head component in order to avoid to duplicate request.
   * However it doesn't work for replace meta data. I tried next, but it didn't work:
   * https://github.com/vercel/next.js/issues/35172
   * In order to add SEO data, the only way worked was defining generateMetadata method.
   * I think with time, I could fix it, using Head in next way or using a cache for request:
   *
   * return item ? (
   * <>
   *   <Head>
   *     <title>{item.title} - Mi Tienda</title>
   *     <meta property="og:title" content="My page title" key="title" />
   *    <meta
   *       name="description"
   *       key="description"
   *       content={`Compre ${item.title} al mejor precio en Mi Tienda. ${item.description}`}
   *     />
   *   </Head>
   *  {...}
   * </>
   * ) : (
   *  <div>El producto no existe</div>
   * );
   */

  const response = await fetch(`${apiPath}/items/${params?.id}`);
  const data = await response.json();
  const item = data.item;
  return {
    title: item.title,
    description: `Compre ${item.title} al mejor precio en Mi Tienda. ${item.description}`,
  };
}
