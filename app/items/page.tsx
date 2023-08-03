"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Item, Items } from "../types/Items";
import Link from "next/link";
import styles from "./page.module.scss";
import { apiPath, serverPath } from "@/utils/server";
import Image from "next/image";
import Categories from "@/components/Categories";
import { NextSeo } from "next-seo";

const fetchItems = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  return response.json();
};

const SearchPage = () => {
  const search = useSearchParams();
  const searchQuery = search?.get("search") ?? "";

  const encodedSearchQuery = encodeURI(searchQuery);

  /**
   * I use useSWR hook. SWR is a React Hooks library for data fetching. The name “SWR” is derived
   * from stale-while-revalidate, a cache invalidation strategy popularized by HTTP RFC 5861. SWR
   * first returns the data from cache (stale), then sends the request (revalidate), and finally
   * comes with the up-to-date data again.
   */
  const { data, isLoading } = useSWR<Items>(
    `${apiPath}/items?q=${encodedSearchQuery}`,
    fetchItems
  );

  if (!data) return null;

  return !isLoading ? (
    <>
      {/* FIXME: NextSeo is not working */}
      <NextSeo
        title={`Resultados de búsqueda para "${searchQuery}" - Mercado Libre`}
        description={`Encuentra los mejores productos para "${searchQuery}" en Mercado Libre.`}
      />
      <Categories categories={data.categories} />
      <ul className={styles.ListItems}>
        {data.items.map((item: Item) => {
          return (
            <li key={item.id}>
              <Link
                className={styles.ListItemCard}
                href={{
                  pathname: `/items/${item.id}`,
                }}
                shallow={true}
              >
                <div className={styles.listItemCardImage}>
                  <Image
                    src={item.picture}
                    width={180}
                    height={180}
                    alt={"Picture of " + item.title}
                  />
                </div>

                <div className={styles.listItemCardBody}>
                  <div className={styles.listItemCardPriceAndShip}>
                    {item?.price.currency +
                      " " +
                      item?.price.amount.toLocaleString("es-AR") +
                      "," +
                      item?.price.decimals}
                    {item.free_shipping && (
                      <div className={styles.listItemCardFreeShipping}>
                        <Image
                          src="/assets/icons/truck.png"
                          alt="Mercado Libre logo"
                          width={10}
                          height={10}
                        />
                      </div>
                    )}
                  </div>
                  <div className={styles.listItemCardTitle}>{item?.title}</div>
                </div>
                <div className={styles.listItemCardLocation}>
                  {item?.location}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default SearchPage;
